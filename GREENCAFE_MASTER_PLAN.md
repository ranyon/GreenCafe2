# GreenCafe WhatsApp Single-Number Automation Plan
**Target**: Implement 24/7 automated WhatsApp ordering & customer service for GreenCafe (Osu, Accra) using a single phone number via `whatsapp-web.js`.

---

## 📱 1. Architecture Overview (Node.js + Python FastAPI Bridge)

```
[ Customer WhatsApp ]
        │
        ▼ (Inbound Message)
[ Node.js: backend/whatsapp_bot.js ] (whatsapp-web.js)
        │
        ▼ (HTTP POST /webhook/whatsapp-web)
[ Python: backend/main.py ] (FastAPI)
        │
        ▼
[ Python: backend/agent.py ] (Gemini 2.5 Flash AI + Moolre Payment Tool)
        │
        ▼ (AI Reply Text)
[ Node.js: backend/whatsapp_bot.js ]
        │
        ▼ (msg.reply)
[ Customer WhatsApp ]
```

---

## 🛠️ 2. Key Components to Implement

### Component 1: `backend/whatsapp_bot.js` (New File)
- **Library**: `whatsapp-web.js` + `qrcode-terminal` + `axios`.
- **Authentication**: `LocalAuth({ dataPath: './wa_session' })` to persist session across restarts.
- **Headless Mode**: `puppeteer: { headless: true, args: ['--no-sandbox'] }`.
- **Event Listeners**:
  - `client.on('qr')`: Displays QR code in terminal for initial 1-minute linking.
  - `client.on('ready')`: Logs bot status as online.
  - `client.on('message')`: Captures customer text, forwards to `http://localhost:8000/webhook/whatsapp-web`, and sends back AI reply.

### Component 2: `backend/main.py` (Modify Existing File)
- Add route `@app.post("/webhook/whatsapp-web")`:
  ```python
  @app.post("/webhook/whatsapp-web")
  async def whatsapp_web_webhook(request: Request):
      data = await request.json()
      sender_phone = data.get("sender")
      message_text = data.get("message")
      
      if sender_phone and message_text:
          ai_reply = process_message(sender_phone, message_text)
          return {"status": "success", "reply": ai_reply}
      return {"status": "error", "error": "Missing phone or message"}
  ```

### Component 3: `package.json` (Modify Existing File)
- Add execution script:
  ```json
  "scripts": {
    "wa-bot": "node backend/whatsapp_bot.js"
  }
  ```

---

## 📋 3. Step-by-Step Setup & Verification Guide

1. **Start Python Backend**:
   ```bash
   python backend/main.py
   ```
2. **Start WhatsApp Bot**:
   ```bash
   npm run wa-bot
   ```
3. **Scan QR Code**:
   - Open WhatsApp Business App on phone -> **Settings > Linked Devices > Link a Device**.
   - Scan the QR code displayed in the terminal.
4. **Test Live Conversation**:
   - Send a text from a second phone to the GreenCafe WhatsApp number (e.g. *"Hi, what wraps do you have today?"*).
   - Verify that Gemini AI responds automatically on WhatsApp while the owner can still post WhatsApp Stories natively.
