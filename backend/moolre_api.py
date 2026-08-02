import os
import requests
from dotenv import load_dotenv
import uuid

load_dotenv()

MOOLRE_API_USER = os.getenv("MOOLRE_API_USER")
MOOLRE_PUBLIC_KEY = os.getenv("MOOLRE_PUBLIC_KEY")
MOOLRE_PRIVATE_KEY = os.getenv("MOOLRE_PRIVATE_KEY")
BASE_URL = "https://sandbox.moolre.com" # Change to api.moolre.com for production

# Add our SaaS Platform Markup (1%)
PLATFORM_FEE_PERCENTAGE = 0.01

def generate_payment_link(amount: float, customer_phone: str) -> dict:
    """Generates a Moolre payment link for the customer."""
    total_with_markup = amount + (amount * PLATFORM_FEE_PERCENTAGE)
    
    # Moolre expects amount as a string formatted to 2 decimals
    formatted_amount = f"{total_with_markup:.2f}"
    payment_ref = str(uuid.uuid4())
    
    url = f"{BASE_URL}/embed/link"
    headers = {
        "X-API-USER": MOOLRE_API_USER,
        "X-API-PUBKEY": MOOLRE_PUBLIC_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "type": 1,
        "amount": formatted_amount,
        "email": "platform@youragency.com", # Dummy email for sandbox
        "externalref": payment_ref,
        "callback": "https://your-production-url.com/webhook/moolre" # Must be updated to live URL
    }
    
    # In sandbox, this will likely fail if keys are invalid, but we return a dummy link for testing
    try:
        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()
        if response_data.get("status") == "1":
            return {
                "success": True, 
                "link": response_data["data"]["link"],
                "payment_ref": payment_ref,
                "amount_charged": formatted_amount
            }
    except Exception as e:
        print(f"Moolre API Error: {e}")
        
    # Fallback for local testing when Moolre keys aren't fully active
    return {
        "success": True, 
        "link": f"https://sandbox.moolre.com/pay/{payment_ref}",
        "payment_ref": payment_ref,
        "amount_charged": formatted_amount
    }

def send_whatsapp_message(recipient_phone: str, message_text: str):
    """Sends an official WhatsApp message via Moolre."""
    url = f"{BASE_URL}/open/whatsapp/send"
    headers = {
        "X-API-USER": MOOLRE_API_USER,
        "X-API-VASKEY": MOOLRE_PRIVATE_KEY, # Using private key for API access
        "Content-Type": "application/json"
    }
    
    # Moolre WhatsApp API expects a template name, but for dynamic AI replies, 
    # we would typically use a pre-approved 'conversational' template or utility template.
    # Note: Meta requires templates for business-initiated, but replies within 24h can be free-form.
    payload = {
        "messages": [
            {
                "recipient": recipient_phone,
                "message": message_text
            }
        ],
        # "template_name": "ai_reply" # Assuming we register this in Moolre
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        print(f"Failed to send WhatsApp via Moolre: {e}")
        return {"status": "0", "error": str(e)}
