import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import axios from 'axios';

// Initialize the WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './wa_session' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp app to link the device:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is online and ready!');
});

client.on('message', async (msg) => {
    // Only process text messages and ignore status broadcasts or group messages
    if (msg.body && !msg.isStatus && !msg.from.includes('@g.us')) {
        console.log(`Received message from ${msg.from}: ${msg.body}`);
        
        try {
            // Forward the message to the Python FastAPI backend
            const response = await axios.post('http://127.0.0.1:8000/webhook/whatsapp-web', {
                sender: msg.from,
                message: msg.body
            });
            
            if (response.data && response.data.reply) {
                console.log(`AI Replying to ${msg.from}: ${response.data.reply}`);
                // Reply back to the customer on WhatsApp
                await msg.reply(response.data.reply);
            }
        } catch (error) {
            console.error('Error reaching backend:', error.message);
        }
    }
});

client.initialize();
