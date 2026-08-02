import os
from google import genai
from google.genai import types
from moolre_api import generate_payment_link
import database
import json

# Initialize the Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def process_message(customer_phone: str, message: str) -> str:
    """Processes an incoming message, manages history, and returns the AI's reply."""
    conn = database.get_db()
    cursor = conn.cursor()
    
    # 1. Save user message to history
    cursor.execute(
        "INSERT INTO chat_history (customer_phone, role, content) VALUES (?, 'user', ?)", 
        (customer_phone, message)
    )
    conn.commit()
    
    # 2. Get Merchant info (using the dummy test cafe for now)
    cursor.execute("SELECT * FROM merchants LIMIT 1")
    merchant = cursor.fetchone()
    if not merchant:
        return "System error: Merchant not configured."
    
    business_details = merchant['business_details']
    merchant_id = merchant['id']
    
    # Check if they have credits to reply
    if merchant['message_credits'] <= 0:
        # Silently fail or send a static fallback (won't use AI)
        return "I am currently offline for maintenance. Please check back later!"
        
    # 3. Retrieve recent chat history for context (last 10 messages)
    cursor.execute(
        "SELECT role, content FROM chat_history WHERE customer_phone = ? ORDER BY id ASC LIMIT 10",
        (customer_phone,)
    )
    history_rows = cursor.fetchall()
    
    # Format history for Gemini
    contents = []
    for row in history_rows:
        # Note: In production, we'd map our DB 'role' to Gemini's expected roles ('user' or 'model')
        contents.append(
            types.Content(
                role="user" if row['role'] == "user" else "model",
                parts=[types.Part.from_text(text=row['content'])]
            )
        )
    
    # 4. Define the Tool/Function Calling Schema for Payment
    def trigger_checkout(items: list[str], total_amount: float) -> str:
        """Generates a checkout link when a customer confirms their order."""
        # 1. Generate the Moolre Link
        payment_info = generate_payment_link(total_amount, customer_phone)
        
        # 2. Save the pending order to our database
        cursor.execute(
            '''INSERT INTO orders (merchant_id, customer_phone, total_amount, payment_ref, status) 
               VALUES (?, ?, ?, ?, 'PENDING')''',
            (merchant_id, customer_phone, total_amount, payment_info['payment_ref'])
        )
        conn.commit()
        
        return f"Checkout link generated: {payment_info['link']}. Tell the customer their total is GHS {payment_info['amount_charged']} (including fees) and to click the link to pay."

    system_instruction = f"""
    You are a helpful AI ordering assistant for {merchant['name']}.
    Here is the business knowledge base:
    {business_details}
    
    Rules:
    1. Answer questions concisely and politely.
    2. If a customer is ready to order and confirms the items, calculate the total price based on the menu.
    3. You MUST use the `trigger_checkout` tool immediately when they confirm they want to pay.
    """
    
    # 5. Call Gemini
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                tools=[trigger_checkout],
                temperature=0.3
            )
        )
        
        final_reply = response.text
        
        # Handle if the model decided to call the tool
        if response.function_calls:
            for tool_call in response.function_calls:
                if tool_call.name == "trigger_checkout":
                    args = tool_call.args
                    # Execute the local python function
                    tool_result = trigger_checkout(args['items'], args['total_amount'])
                    
                    # We send the result back to the model to generate the final human-readable message
                    contents.append(response.candidates[0].content)
                    contents.append(
                        types.Content(
                            role="user",
                            parts=[types.Part.from_function_response(
                                name="trigger_checkout",
                                response={"result": tool_result}
                            )]
                        )
                    )
                    
                    follow_up = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=contents,
                        config=types.GenerateContentConfig(
                            system_instruction=system_instruction,
                            temperature=0.3
                        )
                    )
                    final_reply = follow_up.text
                    
        # 6. Save AI reply to history
        cursor.execute(
            "INSERT INTO chat_history (customer_phone, role, content) VALUES (?, 'model', ?)", 
            (customer_phone, final_reply)
        )
        
        # Deduct 1 credit for SaaS Billing
        cursor.execute("UPDATE merchants SET message_credits = message_credits - 1 WHERE id = ?", (merchant_id,))
        conn.commit()
        
        conn.close()
        return final_reply
        
    except Exception as e:
        print(f"Gemini Error: {e}")
        conn.close()
        return "Sorry, I am having trouble processing your request right now."
