from fastapi import FastAPI, Request
import uvicorn
from agent import process_message
from moolre_api import send_whatsapp_message
import database

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GreenCafe AI SaaS Webhooks")

# Allow the React frontend to fetch data from this Python API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "online"}

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):
    """
    Receives incoming WhatsApp messages from Moolre.
    """
    data = await request.json()
    print("Received WhatsApp Webhook:", data)
    
    sender_phone = data.get("sender")
    message_text = data.get("message")
    
    if sender_phone and message_text:
        ai_reply = process_message(sender_phone, message_text)
        print(f"AI Replying to {sender_phone}: {ai_reply}")
        # send_whatsapp_message(sender_phone, ai_reply)
        
    return {"status": "received"}

@app.post("/webhook/whatsapp-web")
async def whatsapp_web_webhook(request: Request):
    """
    Receives incoming WhatsApp messages from the local whatsapp-web.js bridge.
    """
    data = await request.json()
    sender_phone = data.get("sender")
    message_text = data.get("message")
    
    if sender_phone and message_text:
        # Process via AI Agent
        ai_reply = process_message(sender_phone, message_text)
        # Return the AI reply back to the Node.js bridge to send natively
        return {"status": "success", "reply": ai_reply}
    
    return {"status": "error", "error": "Missing phone or message"}

@app.post("/webhook/moolre")
async def moolre_payment_webhook(request: Request):
    """
    Receives successful payment notifications from Moolre.
    """
    data = await request.json()
    print("Received Moolre Payment Webhook:", data)
    
    # Assuming Moolre sends { "status": 1, "externalref": "uuid", "amount": "100" }
    if data.get("status") == 1 or data.get("status") == "1":
        payment_ref = data.get("externalref")
        
        conn = database.get_db()
        cursor = conn.cursor()
        
        # Update order status
        cursor.execute("UPDATE orders SET status = 'PAID' WHERE payment_ref = ?", (payment_ref,))
        
        # Get customer phone to send receipt
        cursor.execute("SELECT customer_phone FROM orders WHERE payment_ref = ?", (payment_ref,))
        order = cursor.fetchone()
        conn.commit()
        conn.close()
        
        if order:
            receipt_msg = "✅ Payment received! Your order is confirmed and will be processed immediately. Thank you for shopping with us!"
            # send_whatsapp_message(order['customer_phone'], receipt_msg)
            print(f"Payment Confirmed! Sending receipt to {order['customer_phone']}")
            
            # NOTE: Here is where we would also call `payoutMerchant()` via moolre_api.py 
            # to transfer the funds minus our 1% markup.
            
    return {"status": "received"}

# ==========================================
# SAAS DASHBOARD API ENDPOINTS (For React)
# ==========================================

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    """Returns total orders, total revenue, and remaining AI credits for the dashboard."""
    conn = database.get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT message_credits FROM merchants LIMIT 1")
    merchant = cursor.fetchone()
    
    cursor.execute("SELECT COUNT(id) as count, SUM(total_amount) as revenue FROM orders WHERE status = 'PAID'")
    orders = cursor.fetchone()
    
    conn.close()
    return {
        "remaining_credits": merchant['message_credits'] if merchant else 0,
        "total_orders": orders['count'] or 0,
        "total_revenue": orders['revenue'] or 0.0
    }

@app.get("/api/dashboard/chats")
def get_dashboard_chats():
    """Returns the full conversation history to read on the dashboard."""
    conn = database.get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT customer_phone, role, content, timestamp FROM chat_history ORDER BY timestamp ASC")
    rows = cursor.fetchall()
    
    chats = {}
    for row in rows:
        phone = row['customer_phone']
        if phone not in chats:
            chats[phone] = []
        chats[phone].append({
            "role": row['role'],
            "content": row['content'],
            "timestamp": row['timestamp']
        })
        
    conn.close()
    return {"chats": chats}

@app.post("/api/dashboard/reply")
async def send_manual_reply(request: Request):
    """Allows the merchant to send a manual reply from the React dashboard."""
    data = await request.json()
    customer_phone = data.get("customer_phone")
    message_text = data.get("message")
    
    if customer_phone and message_text:
        # 1. Send the official WhatsApp message via Moolre API
        send_whatsapp_message(customer_phone, message_text)
        
        # 2. Log it in the chat history so it shows up in the dashboard correctly
        conn = database.get_db()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO chat_history (customer_phone, role, content) VALUES (?, 'merchant', ?)", 
            (customer_phone, message_text)
        )
        conn.commit()
        conn.close()
        
        return {"success": True, "message": "Manual reply sent"}
    return {"success": False, "error": "Missing phone or message"}

if __name__ == "__main__":
    # Run the server locally on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
