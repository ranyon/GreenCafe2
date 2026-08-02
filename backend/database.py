import sqlite3
import os

# Check if we are given a directory for a persistent volume (e.g., /data on Fly.io)
DB_DIR = os.getenv("DB_DIR", os.path.dirname(__file__))
DB_PATH = os.path.join(DB_DIR, "database.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Merchants (SaaS Users)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS merchants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone_number TEXT UNIQUE NOT NULL,
        message_credits INTEGER DEFAULT 0,
        business_details TEXT
    )
    ''')
    
    # Orders
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        merchant_id INTEGER,
        customer_phone TEXT NOT NULL,
        total_amount REAL NOT NULL,
        payment_ref TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'PENDING',
        FOREIGN KEY (merchant_id) REFERENCES merchants (id)
    )
    ''')
    
    # Chat History (For Gemini Context)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_phone TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    
    # Insert a dummy merchant for testing if none exist
    cursor.execute("SELECT COUNT(*) as count FROM merchants")
    if cursor.fetchone()['count'] == 0:
        dummy_menu = """
        Business Name: Test Cafe
        Menu:
        - Jollof Rice: GHS 45
        - Fried Rice: GHS 40
        - Coke: GHS 10
        Rules: Delivery is GHS 15 flat rate.
        """
        cursor.execute('''
        INSERT INTO merchants (name, phone_number, message_credits, business_details) 
        VALUES ('Test Cafe', '+233123456789', 100, ?)
        ''', (dummy_menu,))
        conn.commit()
        
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
