import { collection, doc, setDoc, addDoc, updateDoc, getDocs, onSnapshot as firestoreOnSnapshot, getDoc, writeBatch } from 'firebase/firestore';
import { db as firestore } from './firebase';

// Initial seed data (used only once to populate an empty database)
const initialData = {
  customers: [
    { id: 'c1', name: "Sarah Jenkins", visits: 14, lastVisit: "2 days ago" },
    { id: 'c2', name: "Michael Chen", visits: 11, lastVisit: "Today" },
    { id: 'c3', name: "Emily Blunt", visits: 8, lastVisit: "1 week ago" },
    { id: 'c4', name: "David O'Connor", visits: 7, lastVisit: "3 days ago" }
  ],
  feed: [
    { id: 'f1', user: "Michael Chen", action: "left a 5-star review: 'Loved the spicy kale wrap!'", time: "10 mins ago", createdAt: Date.now() - 600000 },
    { id: 'f2', user: "Sarah Jenkins", action: "was sent a complimentary cold-pressed juice.", time: "1 hour ago", createdAt: Date.now() - 3600000 },
    { id: 'f3', user: "Emma Watson", action: "ordered 2x Artisan Sandwiches.", time: "3 hours ago", createdAt: Date.now() - 10800000 },
    { id: 'f4', user: "David O'Connor", action: "dined in (Table 12).", time: "Yesterday", createdAt: Date.now() - 86400000 }
  ],
  orders: [
    { id: 'o1', customerName: 'Emma Watson', items: ['2x Artisan Sandwiches'], total: 45.50, status: 'Pending', time: '10:30 AM', createdAt: Date.now() - 1000 },
    { id: 'o2', customerName: "David O'Connor", items: ['1x Spicy Kale Wrap', '1x Green Detox Juice'], total: 32.00, status: 'Preparing', time: '10:15 AM', createdAt: Date.now() - 2000 },
    { id: 'o3', customerName: 'Sarah Jenkins', items: ['1x Quinoa Bowl'], total: 28.50, status: 'Out for Delivery', time: '09:45 AM', createdAt: Date.now() - 3000 },
    { id: 'o4', customerName: 'Michael Chen', items: ['1x Cold-Pressed Juice'], total: 15.00, status: 'Delivered', time: '09:00 AM', createdAt: Date.now() - 4000 }
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
    { id: 'l1', customerId: 'c1', points: 1250, tier: "Gold", nextReward: "Free Juice (at 1500 pts)" },
    { id: 'l2', customerId: 'c2', points: 850, tier: "Silver", nextReward: "10% off next order (at 1000 pts)" },
    { id: 'l3', customerId: 'c3', points: 420, tier: "Bronze", nextReward: "Free pastry (at 500 pts)" },
    { id: 'l4', customerId: 'c4', points: 150, tier: "Bronze", nextReward: "Free pastry (at 500 pts)" }
  ]
};

// Seed database if it's completely empty
const seedDatabaseIfNeeded = async () => {
  try {
    const statsRef = doc(firestore, 'stats', 'overview');
    const statsSnap = await getDoc(statsRef);
    if (!statsSnap.exists()) {
      console.log("Seeding Firestore with initial data...");
      const batch = writeBatch(firestore);
      
      // Seed Collections
      const collectionsToSeed = ['customers', 'feed', 'orders', 'feedback', 'loyalty'];
      collectionsToSeed.forEach(colName => {
        initialData[colName].forEach(item => {
          const docRef = doc(collection(firestore, colName), item.id);
          batch.set(docRef, item);
        });
      });

      // Seed Stats (single document)
      batch.set(statsRef, initialData.stats);

      await batch.commit();
      console.log("Seeding complete.");
    }
  } catch (err) {
    console.error("Error checking/seeding database:", err);
  }
};

// Fire and forget seed
seedDatabaseIfNeeded();

export const db = {
  async getCollection(collectionName) {
    try {
      if (collectionName === 'stats') {
        const docRef = doc(firestore, collectionName, 'overview');
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : {};
      } else if (collectionName === 'chats') {
        // Mock returning chats from memory for now since it wasn't a standard array collection
        return initialData.chats;
      } else {
        const collRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collRef);
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
    } catch (err) {
      console.error(`Error getting collection ${collectionName}:`, err);
      return [];
    }
  },

  async addDocument(collectionName, data) {
    try {
      const dataWithTimestamp = { ...data, createdAt: Date.now() };
      if (data.id) {
        const docRef = doc(firestore, collectionName, data.id);
        await setDoc(docRef, dataWithTimestamp);
        return dataWithTimestamp;
      } else {
        const collRef = collection(firestore, collectionName);
        const newDocRef = await addDoc(collRef, dataWithTimestamp);
        return { id: newDocRef.id, ...dataWithTimestamp };
      }
    } catch (err) {
      console.error(`Error adding document to ${collectionName}:`, err);
      throw err;
    }
  },

  async updateDocument(collectionName, id, updates) {
    try {
      if (collectionName === 'stats') {
        const docRef = doc(firestore, collectionName, 'overview');
        await setDoc(docRef, updates, { merge: true });
      } else {
        const docRef = doc(firestore, collectionName, id);
        await updateDoc(docRef, updates);
      }
    } catch (err) {
      console.error(`Error updating document ${id} in ${collectionName}:`, err);
      throw err;
    }
  },

  onSnapshot(collectionName, callback) {
    try {
      if (collectionName === 'stats') {
        const docRef = doc(firestore, collectionName, 'overview');
        return firestoreOnSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data());
          } else {
            callback({});
          }
        });
      } else if (collectionName === 'chats') {
        callback(initialData.chats);
        return () => {};
      } else {
        const collRef = collection(firestore, collectionName);
        return firestoreOnSnapshot(collRef, (snapshot) => {
          const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          // Sort so newest shows first (simulating the array prepend from localStorage)
          data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          callback(data);
        });
      }
    } catch (err) {
      console.error(`Error subscribing to ${collectionName}:`, err);
      return () => {}; // return empty unsubscribe
    }
  }
};

export default db;
