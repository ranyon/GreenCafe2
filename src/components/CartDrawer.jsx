import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import { payment } from '../services/payment';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', location: '' });
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' or 'details'
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Reset step if cart is emptied
  if (cartItems.length === 0 && checkoutStep !== 'cart' && !completedOrderId) {
    setCheckoutStep('cart');
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.location.trim()) {
      alert("Please fill in your name, phone, and delivery location to continue.");
      return;
    }

    setIsCheckingOut(true);
    try {
      const shortId = Math.random().toString(36).substring(2, 7).toUpperCase();
      const orderId = `ORD-${shortId}`;
      const orderData = { 
        id: orderId, 
        items: cartItems, 
        total, 
        status: 'Pending', 
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerLocation: customerInfo.location,
        timestamp: new Date().toISOString() 
      };
      
      // Save order to mock database (1:1 with Firestore/Supabase)
      await db.addDocument('orders', orderData);
      
      // Update Live Feed for admin
      await db.addDocument('feed', {
        user: customerInfo.name,
        action: `initiated checkout for GHS ${total.toFixed(2)}.`,
        time: "Just now"
      });

      // Initiate Paystack Payment
      const paymentRes = await payment.generatePaymentLink(total, orderId);
      
      if (paymentRes.success) {
        if (paymentRes.isMock) {
          // Silent fallback to local completion if no key is found
        }
        // If it reaches here, either mock was successful or Paystack popup was completed
        
        setIsCheckingOut(false);
        setCompletedOrderId(orderId);
        onClearCart();
      } else {
        alert("Payment failed: " + paymentRes.error);
        setIsCheckingOut(false);
      }
    } catch(err) {
      console.error(err);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 animate-in slide-in-from-right duration-500 ease-out">
        <div className="w-screen max-w-md bg-white border-l border-gray-900/20 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h3 className="font-display font-bold text-xl text-gray-900">Your Order</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-black">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {completedOrderId ? (
            <div className="my-auto text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-black mx-auto animate-bounce" />
              <h4 className="font-display font-bold text-2xl text-gray-900">Order Confirmed!</h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                Thank you for choosing GreenCafe. Your organic wraps and cold-pressed juices are being prepared fresh right now.
              </p>
              <div className="mt-6 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Your Tracking Code</p>
                <p className="font-display font-bold text-2xl tracking-widest text-black">{completedOrderId}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate(`/track/${completedOrderId}`);
                  setCompletedOrderId(null);
                }}
                className="w-full mt-4 py-4 text-xs font-bold text-white bg-black hover:bg-gray-800 rounded-full shadow-lg transition-all"
              >
                Track My Order
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="my-auto text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-2xl">
                🥗
              </div>
              <h4 className="font-display font-bold text-lg text-gray-900">Your Cart is Empty</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our signature menu of wraps, sandwiches & cold-pressed green juices to get started.
              </p>
            </div>
          ) : checkoutStep === 'details' ? (
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <button 
                  onClick={() => setCheckoutStep('cart')}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  &larr; Back to Cart
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Delivery Details</h4>
                <p className="text-xs text-gray-500">Please provide your information so we can deliver your fresh order.</p>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Delivery Location" 
                    value={customerInfo.location}
                    onChange={(e) => setCustomerInfo({...customerInfo, location: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-3.5 rounded-2xl border border-gray-200 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-gray-900 truncate">{item.name}</h5>
                    <p className="text-xs text-gray-900 font-semibold mt-0.5">
                      GH₵{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-gray-50 hover:bg-gray-50 text-gray-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-gray-900 px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-gray-50 hover:bg-gray-50 text-gray-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Checkout Summary & Form */}
          {!completedOrderId && cartItems.length > 0 && (
            <div className="pt-6 border-t border-gray-200 space-y-4">
              
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-900">GH₵{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-black text-lg">GH₵{total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full py-4 text-xs font-bold text-white bg-gradient-to-r from-gray-800 to-black hover:opacity-90 rounded-full shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="w-full py-4 text-xs font-bold text-white bg-gradient-to-r from-green-700 to-green-900 hover:opacity-90 rounded-full shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span>Processing Securely...</span>
                  ) : (
                    <>
                      <span>Confirm & Pay GH₵{total.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
