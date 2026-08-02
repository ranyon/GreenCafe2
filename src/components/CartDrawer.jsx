import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import { payment } from '../services/payment';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const orderId = `ORD-${Date.now()}`;
      const orderData = { 
        id: orderId, 
        items: cartItems, 
        total, 
        status: 'pending', 
        timestamp: new Date().toISOString() 
      };
      
      // Save order to mock database (1:1 with Firestore/Supabase)
      await db.addDocument('orders', orderData);
      
      // Update Live Feed for admin
      await db.addDocument('feed', {
        user: "Guest Customer",
        action: `initiated checkout for GHS ${total.toFixed(2)}.`,
        time: "Just now"
      });

      // Generate Moolre Payment Link
      const paymentRes = await payment.generatePaymentLink(total, orderId);
      
      if (paymentRes.success) {
        if (paymentRes.isMock) {
          // Silent fallback to local completion
        } else if (paymentRes.link) {
          // Redirect to payment link (avoiding popup blockers)
          window.location.href = paymentRes.link;
        }
        
        setIsCheckingOut(false);
        setOrderComplete(true);
        setTimeout(() => {
          onClearCart();
          setOrderComplete(false);
          onClose();
        }, 3000);
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
        <div className="w-screen max-w-md bg-[#071913] border-l border-[#86EFAC]/20 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#86EFAC]" />
              <h3 className="font-display font-bold text-xl text-white">Your Order</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#164E3D] text-[#86EFAC]">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {orderComplete ? (
            <div className="my-auto text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-[#86EFAC] mx-auto animate-bounce" />
              <h4 className="font-display font-bold text-2xl text-white">Order Confirmed!</h4>
              <p className="text-xs text-gray-300 max-w-xs mx-auto">
                Thank you for choosing GreenCafe. Your organic wraps and cold-pressed juices are being prepared fresh right now.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="my-auto text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-2xl">
                🥗
              </div>
              <h4 className="font-display font-bold text-lg text-white">Your Cart is Empty</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our signature menu of wraps, sandwiches & cold-pressed green juices to get started.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-3.5 rounded-2xl border border-white/10 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-white truncate">{item.name}</h5>
                    <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                      GH₵{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
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

          {/* Footer Checkout Summary */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-white">GH₵{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#86EFAC] text-lg">GH₵{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full py-4 text-xs font-bold text-[#071913] bg-gradient-to-r from-[#86EFAC] to-[#A3E635] hover:opacity-90 rounded-full shadow-lg shadow-[#86EFAC]/20 transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing Fresh Order...</span>
                ) : (
                  <>
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
