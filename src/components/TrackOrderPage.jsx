import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Package, ChefHat, Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { db } from '../services/db';

const statuses = [
  { id: 'Pending', label: 'Order Received', icon: Package, description: 'We have received your order' },
  { id: 'Preparing', label: 'Preparing', icon: ChefHat, description: 'Freshly making your items' },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck, description: 'Your order is on the way' },
  { id: 'Delivered', label: 'Delivered', icon: CheckCircle2, description: 'Enjoy your GreenCafe!' }
];

export default function TrackOrderPage() {
  const { orderId: urlOrderId } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(urlOrderId || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!urlOrderId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!urlOrderId) {
      setLoading(false);
      setOrder(null);
      return;
    }

    setLoading(true);
    setError('');
    
    // Subscribe to all orders to get real-time updates for this specific order
    const unsubscribe = db.onSnapshot('orders', (allOrders) => {
      const found = allOrders.find(o => o.id === urlOrderId);
      if (found) {
        setOrder(found);
        setError('');
      } else {
        setOrder(null);
        setError("Order not found. Please check your tracking code.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [urlOrderId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/track/${searchInput.trim()}`);
  };

  const getStatusIndex = (status) => statuses.findIndex(s => s.id === status);
  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-10 bg-white flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Enter your unique tracking code to see real-time updates on your fresh GreenCafe order.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-32 py-4 border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm text-lg font-medium tracking-wide uppercase"
            placeholder="e.g. ORD-A3B9X"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-black hover:bg-gray-800 text-white font-bold px-6 rounded-full transition-colors"
          >
            Track
          </button>
        </form>

        {loading && (
          <div className="text-center text-gray-400 animate-pulse">Searching for your order...</div>
        )}

        {error && (
          <div className="text-center text-red-500 font-medium bg-red-50 py-4 rounded-xl border border-red-100 max-w-xl mx-auto">
            {error}
          </div>
        )}

        {/* Order Details & Timeline */}
        {order && !loading && (
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
              <div>
                <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-2">Order ID</p>
                <p className="font-display text-3xl font-bold tracking-widest text-black">{order.id}</p>
                {order.customerName && order.customerName !== 'Guest' && (
                  <p className="text-gray-500 mt-2 font-medium">For: {order.customerName}</p>
                )}
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-2">Total</p>
                <p className="font-display text-3xl font-bold text-black">GH₵{order.total?.toFixed(2) || '0.00'}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Desktop Progress Line Background */}
              <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-gray-200 rounded-full" />
              
              {/* Desktop Progress Line Fill */}
              <div 
                className="hidden md:block absolute top-6 left-12 h-1 bg-black rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `calc(${Math.max(0, currentStatusIndex) / (statuses.length - 1) * 100}% - 48px)` }}
              />

              <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                {statuses.map((status, index) => {
                  const Icon = status.icon;
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <div key={status.id} className="flex md:flex-col items-center gap-4 md:gap-4 flex-1">
                      {/* Mobile Line Connector */}
                      {index !== statuses.length - 1 && (
                        <div className={`md:hidden absolute left-[1.35rem] top-12 bottom-0 w-0.5 -mt-4 -mb-8 ${isCompleted ? 'bg-black' : 'bg-gray-200'}`} />
                      )}
                      
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-black border-black text-white' 
                            : 'bg-white border-gray-200 text-gray-300'
                        } ${isCurrent ? 'ring-4 ring-black/10' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="md:text-center pt-1 md:pt-0 pb-6 md:pb-0">
                        <h4 className={`font-bold text-sm md:text-base mb-1 transition-colors ${
                          isCompleted ? 'text-black' : 'text-gray-400'
                        }`}>
                          {status.label}
                        </h4>
                        <p className={`text-xs ${
                          isCurrent ? 'text-gray-600 font-medium' : 'text-gray-400'
                        }`}>
                          {status.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Items Ordered</h4>
                <ul className="space-y-3">
                  {order.items.map((item, idx) => {
                    const itemName = typeof item === 'string' ? item : `${item.quantity}x ${item.name}`;
                    return (
                      <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-black/20" />
                        {itemName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
