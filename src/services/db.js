const DB_KEY = 'greencafe_mock_db';

// Initial seed data
const initialData = {
  customers: [
    { id: 'c1', name: "Sarah Jenkins", visits: 14, lastVisit: "2 days ago" },
    { id: 'c2', name: "Michael Chen", visits: 11, lastVisit: "Today" },
    { id: 'c3', name: "Emily Blunt", visits: 8, lastVisit: "1 week ago" },
    { id: 'c4', name: "David O'Connor", visits: 7, lastVisit: "3 days ago" }
  ],
  feed: [
    { id: 'f1', user: "Michael Chen", action: "left a 5-star review: 'Loved the spicy kale wrap!'", time: "10 mins ago" },
    { id: 'f2', user: "Sarah Jenkins", action: "was sent a complimentary cold-pressed juice.", time: "1 hour ago" },
    { id: 'f3', user: "Emma Watson", action: "ordered 2x Artisan Sandwiches.", time: "3 hours ago" },
    { id: 'f4', user: "David O'Connor", action: "dined in (Table 12).", time: "Yesterday" }
  ],
  orders: [
    { id: 'o1', customerName: 'Emma Watson', items: ['2x Artisan Sandwiches'], total: 45.50, status: 'Pending', time: '10:30 AM' },
    { id: 'o2', customerName: "David O'Connor", items: ['1x Spicy Kale Wrap', '1x Green Detox Juice'], total: 32.00, status: 'Preparing', time: '10:15 AM' },
    { id: 'o3', customerName: 'Sarah Jenkins', items: ['1x Quinoa Bowl'], total: 28.50, status: 'Out for Delivery', time: '09:45 AM' },
    { id: 'o4', customerName: 'Michael Chen', items: ['1x Cold-Pressed Juice'], total: 15.00, status: 'Delivered', time: '09:00 AM' }
  ],
  stats: {
    remaining_credits: 850,
    total_orders: 124,
    total_revenue: 3450.50
  },
  chats: {
    "+233541234567": [
      { role: "customer", content: "Hi, do you have the green detox juice?", timestamp: new Date().toISOString() },
      { role: "merchant", content: "Yes we do! It's fresh and ready for pickup.", timestamp: new Date().toISOString() }
    ]
  },
  feedback: [
    { id: 'fb1', customer: "Michael Chen", rating: 5, comment: "Loved the spicy kale wrap! The delivery was also super fast.", date: "2026-07-30" },
    { id: 'fb2', customer: "Emily Blunt", rating: 4, comment: "Great juice, but I wish the packaging was more eco-friendly.", date: "2026-07-28" },
    { id: 'fb3', customer: "Sarah Jenkins", rating: 5, comment: "Always my go-to for healthy lunches in Osu.", date: "2026-07-25" }
  ],
  loyalty: [
    { customerId: 'c1', points: 1250, tier: "Gold", nextReward: "Free Juice (at 1500 pts)" },
    { customerId: 'c2', points: 850, tier: "Silver", nextReward: "10% off next order (at 1000 pts)" },
    { customerId: 'c3', points: 420, tier: "Bronze", nextReward: "Free pastry (at 500 pts)" },
    { customerId: 'c4', points: 150, tier: "Bronze", nextReward: "Free pastry (at 500 pts)" }
  ]
};

// Initialize DB if empty
if (!localStorage.getItem(DB_KEY)) {
  localStorage.setItem(DB_KEY, JSON.stringify(initialData));
}

const getDb = () => JSON.parse(localStorage.getItem(DB_KEY));
const saveDb = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

// A basic event emitter to simulate real-time listeners (like Firestore onSnapshot)
const listeners = {};
const emit = (collectionName) => {
  if (listeners[collectionName]) {
    listeners[collectionName].forEach(cb => cb(getDb()[collectionName]));
  }
};

export const db = {
  // Simulate fetching a collection
  async getCollection(collectionName) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getDb()[collectionName] || [];
  },

  // Simulate adding a document
  async addDocument(collectionName, data) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const database = getDb();
    
    if (!database[collectionName]) {
      database[collectionName] = [];
    }

    const newDoc = { id: Date.now().toString(), ...data };
    // Prepend for feeds/orders so newest is first
    database[collectionName] = [newDoc, ...database[collectionName]]; 
    saveDb(database);
    emit(collectionName);
    return newDoc;
  },

  // Simulate updating a document or stats
  async updateDocument(collectionName, id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const database = getDb();
    
    if (collectionName === 'stats') {
      database.stats = { ...database.stats, ...updates };
    } else if (database[collectionName]) {
      const index = database[collectionName].findIndex(doc => doc.id === id);
      if (index !== -1) {
        database[collectionName][index] = { ...database[collectionName][index], ...updates };
      }
    }
    
    saveDb(database);
    emit(collectionName);
  },

  // Simulate real-time listeners
  onSnapshot(collectionName, callback) {
    if (!listeners[collectionName]) {
      listeners[collectionName] = [];
    }
    listeners[collectionName].push(callback);
    
    // Immediately call with current data
    callback(getDb()[collectionName]);

    // Return unsubscribe function
    return () => {
      listeners[collectionName] = listeners[collectionName].filter(cb => cb !== callback);
    };
  }
};

export default db;

