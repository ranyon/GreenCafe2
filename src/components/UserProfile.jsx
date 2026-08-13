import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Package, Award, Clock, MapPin, CheckCircle } from 'lucide-react';
import { db } from '../services/db';

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    
    // In a real Firebase setup, we'd query by userId.
    // For now, we mock it by filtering orders where customerName loosely matches.
    const unsub = db.onSnapshot('orders', data => {
      // Mock filtering by the logged in user's first name
      const userFirstName = currentUser.displayName?.split(' ')[0] || '';
      const myOrders = data.filter(o => o.customerName.includes(userFirstName));
      setOrders(myOrders);
      
      // Give them some mock loyalty points based on orders
      setLoyaltyPoints(myOrders.length * 50);
    });

    return () => unsub && unsub();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6 mb-12">
        <img 
          src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}&size=128`} 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-xl"
        />
        <div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">{currentUser.displayName}</h1>
          <p className="text-gray-500">{currentUser.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Loyalty Panel */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award size={100} />
            </div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2 relative z-10">Loyalty Balance</h2>
            <div className="text-5xl font-extrabold mb-1 relative z-10">{loyaltyPoints}</div>
            <p className="text-sm text-gray-400 relative z-10">Points Available</p>
            
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <p className="text-xs text-gray-400 mb-2">Next Reward at {(Math.floor(loyaltyPoints / 500) + 1) * 500} pts</p>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-white h-1.5 rounded-full" style={{ width: `${(loyaltyPoints % 500) / 500 * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Panel */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Package size={20} className="text-gray-400" /> Recent Orders
              </h2>
            </div>
            
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Package size={48} className="mx-auto mb-3 opacity-20" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">{order.time}</span>
                        <h3 className="font-bold text-gray-900 mt-2">Order #{order.id}</h3>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        order.status === 'Delivered' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                        order.status === 'Out for Delivery' ? 'bg-black text-white border-black' :
                        'bg-white border-gray-300 text-gray-900'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex justify-between">
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="font-bold text-gray-900">GHS {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
