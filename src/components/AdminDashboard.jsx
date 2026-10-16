import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Activity, Users, Star, Search, Menu, X, ArrowUp, MessageSquare, Send, Lock, LogOut, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/db';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'WhatsApp AI', icon: MessageSquare }, // NEW TAB
  { name: 'Live Operations', icon: Activity },
  { name: 'Customers', icon: Users },
  { name: 'Feedback', icon: Star }
];

export default function AdminDashboard() {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(() => {
    return localStorage.getItem('greencafe_staff_auth') === 'true';
  });

  const isAuthenticated = !!currentUser || isStaffAuthenticated;

  const [activeTab, setActiveTab] = useState('Overview');
  const [customers, setCustomers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loyalty, setLoyalty] = useState([]);
  const [feed, setFeed] = useState([]);
  const [orders, setOrders] = useState([]);
  const [aiStats, setAiStats] = useState({ remaining_credits: 0, total_orders: 0, total_revenue: 0 });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Track previous orders length to know when a NEW order arrives
  const previousOrdersLength = useRef(null);

  // --- WHATSAPP AI STATE ---
  const [chats, setChats] = useState({});
  const [selectedChatPhone, setSelectedChatPhone] = useState(null);
  const [manualMessage, setManualMessage] = useState("");
  const chatScrollRef = useRef(null);

  const handlePasscodeLogin = (e) => {
    e.preventDefault();
    const validPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'greencafe2026';
    if (passcode.trim() === validPasscode) {
      localStorage.setItem('greencafe_staff_auth', 'true');
      setIsStaffAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid staff passcode. Please try again.');
    }
  };

  const handleAdminLogout = async () => {
    localStorage.removeItem('greencafe_staff_auth');
    setIsStaffAuthenticated(false);
    if (currentUser) {
      await logout();
    }
  };

  // Fetch data from DB only when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    let unsubs = [];
    
    if (activeTab === 'Overview' || activeTab === 'WhatsApp AI' || activeTab === 'Live Operations') {
      unsubs.push(db.onSnapshot('stats', data => setAiStats(data)));
      unsubs.push(db.onSnapshot('customers', data => setCustomers(data)));
      unsubs.push(db.onSnapshot('feedback', data => setFeedback(data)));
      unsubs.push(db.onSnapshot('loyalty', data => setLoyalty(data)));
      unsubs.push(db.onSnapshot('feed', data => setFeed(data)));
      unsubs.push(db.onSnapshot('orders', data => setOrders(data)));
    }

    if (activeTab === 'WhatsApp AI') {
      unsubs.push(db.onSnapshot('chats', data => {
        setChats(data || {});
        if (!selectedChatPhone && Object.keys(data || {}).length > 0) {
          setSelectedChatPhone(Object.keys(data)[0]);
        }
      }));
    }

    return () => unsubs.forEach(unsub => unsub && unsub());
  }, [activeTab, isAuthenticated, selectedChatPhone]);

  // Scroll to bottom of chat when it updates
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chats, selectedChatPhone]);

  // Play notification sound when a new order arrives
  useEffect(() => {
    if (previousOrdersLength.current !== null && orders.length > previousOrdersLength.current) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.error("Audio play blocked by browser:", e));
    }
    previousOrdersLength.current = orders.length;
  }, [orders]);

  const handleManualReply = async (e) => {
    e.preventDefault();
    if (!manualMessage.trim() || !selectedChatPhone) return;

    const tempMessage = manualMessage;
    setManualMessage("");

    try {
      const currentChat = chats[selectedChatPhone] || [];
      const updatedChat = [...currentChat, { role: 'merchant', content: tempMessage, timestamp: new Date().toISOString() }];
      
      // Update chat in the mock database
      const dbInstance = await db.getCollection('chats');
      dbInstance[selectedChatPhone] = updatedChat;
      // In a real app we'd use updateDocument, but since 'chats' is a single object here we update the whole collection
      localStorage.setItem('greencafe_mock_db', JSON.stringify({ ...JSON.parse(localStorage.getItem('greencafe_mock_db')), chats: dbInstance }));
      // Manually trigger refresh for this mock implementation
      setChats(dbInstance);
      
    } catch (err) {
      console.error("Error sending manual reply:", err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await db.updateDocument('orders', orderId, { status: newStatus });
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 text-white relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none bg-emerald-500/10 blur-[120px]" />
        
        <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">GreenCafe Admin Portal</h2>
            <p className="text-xs text-gray-400 mt-1">Authorized Store Managers & Staff Only</p>
          </div>

          {passcodeError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
              {passcodeError}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={async () => {
                try {
                  await loginWithGoogle();
                } catch (err) {
                  setPasscodeError(err.message || 'Google sign in failed');
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Or staff passcode</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handlePasscodeLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Enter Staff Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs transition-all shadow-md active:scale-[0.98]"
              >
                Access Dashboard
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              ← Return to GreenCafe Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="font-display font-bold text-xl tracking-wide text-black">GREEN CAFE <span className="text-gray-900/50 text-sm tracking-normal">CRM</span></div>
          <button className="md:hidden text-gray-900/70" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100/50 text-black' 
                    : 'text-gray-900/60 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-black' : 'text-gray-900/50'} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOPBAR */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-gray-200 bg-gray-50 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-900/70 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold tracking-wide hidden sm:block">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900/40" />
              <input 
                type="text" 
                placeholder="Search orders, customers..." 
                className="w-64 bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-900/50 focus:bg-gray-50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{currentUser?.displayName || 'Store Staff'}</div>
                <div className="text-xs text-emerald-600 font-bold">{currentUser?.email || 'Store Manager'}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-900/30">
                <Users size={18} className="text-black" />
              </div>
              <button
                onClick={handleAdminLogout}
                title="Sign Out"
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          {activeTab === 'Overview' && (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* KPIs - UPDATED WITH REAL AI STATS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Active Customers (30d)", value: "482", delta: "+12%", positive: true },
                  { label: "Avg Feedback Score", value: "4.9", delta: "+0.2", positive: true },
                  { label: "AI Credits Remaining", value: aiStats.remaining_credits, delta: "Auto-recharge enabled", positive: true },
                  { label: "AI Revenue", value: `GHS ${aiStats.total_revenue.toFixed(2)}`, delta: `${aiStats.total_orders} Orders`, positive: true }
                ].map((kpi, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:bg-gray-50 transition-colors">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-all"></div>
                    <div className="text-gray-900/50 text-xs font-semibold tracking-wider uppercase mb-2">{kpi.label}</div>
                    <div className="text-3xl font-bold font-display tracking-tight text-gray-900 mb-2">{kpi.value}</div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${kpi.positive ? 'text-black' : 'text-red-400'}`}>
                      {kpi.positive && i < 2 ? <ArrowUp size={14} /> : null}
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CUSTOMERS TABLE */}
                <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold tracking-wide">Top Customers</h2>
                    <button className="text-xs font-medium text-black hover:text-gray-900 transition-colors bg-black/10 px-3 py-1.5 rounded-lg">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-gray-50 text-gray-900/50 text-xs uppercase tracking-wider">
                          <th className="p-4 font-medium">Customer</th>
                          <th className="p-4 font-medium">Total Visits</th>
                          <th className="p-4 font-medium">Last Visit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {customers.map(c => (
                          <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{c.name}</td>
                            <td className="p-4">
                              <span className="bg-gray-100 text-black px-2.5 py-1 rounded-full text-xs font-bold border border-gray-900/20">
                                {c.visits}
                              </span>
                            </td>
                            <td className="p-4 text-gray-900/50 text-sm">{c.lastVisit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'WhatsApp AI' && (
            <div className="max-w-7xl mx-auto h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex-1 flex overflow-hidden bg-gray-50 border border-gray-200 rounded-2xl backdrop-blur-sm min-h-[600px]">
                
                {/* Chat List Sidebar */}
                <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
                      <MessageSquare size={18} className="text-black" /> Active Chats
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {Object.keys(chats).length === 0 ? (
                      <div className="p-6 text-center text-gray-900/40 text-sm">No active WhatsApp chats yet.</div>
                    ) : (
                      Object.keys(chats).map(phone => (
                        <button
                          key={phone}
                          onClick={() => setSelectedChatPhone(phone)}
                          className={`w-full text-left p-4 border-b border-white/5 transition-colors ${selectedChatPhone === phone ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        >
                          <div className="font-medium text-gray-900 truncate">{phone}</div>
                          <div className="text-xs text-gray-900/50 truncate mt-1">
                            {chats[phone][chats[phone].length - 1]?.content || "..."}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Chat Inbox Area */}
                <div className="flex-1 flex flex-col bg-gray-50 relative">
                  {selectedChatPhone ? (
                    <>
                      <div className="p-4 border-b border-gray-200 bg-gray-50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                        <div className="font-semibold">{selectedChatPhone}</div>
                        <div className="text-xs text-black bg-gray-100 px-2 py-1 rounded-md border border-gray-900/30">Live</div>
                      </div>
                      
                      {/* Messages Scroll Area */}
                      <div className="flex-1 p-6 overflow-y-auto space-y-4" ref={chatScrollRef}>
                        {chats[selectedChatPhone]?.map((msg, idx) => {
                          const isCustomer = msg.role === 'customer';
                          const isMerchant = msg.role === 'merchant';
                          const isSystem = msg.role === 'system';

                          if (isSystem) return null; // Hide system prompts

                          return (
                            <div key={idx} className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] text-gray-900/40 uppercase tracking-widest font-bold">
                                  {isCustomer ? 'Customer' : isMerchant ? 'Merchant (You)' : 'AI Assistant'}
                                </span>
                              </div>
                              <div 
                                className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                                  isCustomer 
                                    ? 'bg-gray-50 text-gray-900 rounded-tl-none border border-white/5' 
                                    : isMerchant
                                    ? 'bg-gray-100 text-gray-900 rounded-tr-none border border-gray-900/20'
                                    : 'bg-black text-white rounded-tr-none font-medium'
                                }`}
                              >
                                {msg.content}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Manual Reply Input */}
                      <div className="p-4 border-t border-gray-200 bg-gray-50 backdrop-blur-md">
                        <form onSubmit={handleManualReply} className="relative flex items-center">
                          <input 
                            type="text" 
                            value={manualMessage}
                            onChange={(e) => setManualMessage(e.target.value)}
                            placeholder="Type a manual reply to override the AI..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-gray-900/50 focus:bg-gray-50 transition-colors"
                          />
                          <button 
                            type="submit" 
                            disabled={!manualMessage.trim()}
                            className="absolute right-2 p-2 rounded-full bg-black text-white hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-colors"
                          >
                            <Send size={16} className="ml-0.5" />
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-900/40 flex-col gap-4">
                      <MessageSquare size={48} className="opacity-20" />
                      <p>Select a conversation to view or reply manually.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Live Operations' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Live Orders Board</h2>
                <div className="flex gap-2">
                  <button className="text-xs font-medium text-black hover:bg-gray-100 transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">Filter</button>
                  <button className="text-xs font-medium text-black hover:bg-gray-100 transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">Export</button>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map(status => (
                  <div key={status} className="flex flex-col h-full bg-gray-50/50 rounded-2xl p-4 min-w-[280px]">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-900 text-sm tracking-wide uppercase">{status}</h3>
                      <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {orders.filter(o => o.status === status).length}
                      </span>
                    </div>
                    
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-2">
                      {orders.filter(o => o.status === status).map(order => (
                        <div key={order.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
                          {/* Customer Name & Order ID */}
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <span className="font-bold text-gray-900 text-sm block leading-tight">{order.customerName}</span>
                              <span className="text-[10px] font-mono text-gray-400 font-semibold">{order.id}</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-md">
                              {order.time || (order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                            </span>
                          </div>

                          {/* Customer Phone & Location */}
                          {(order.customerPhone || order.customerLocation) && (
                            <div className="my-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-[11px] space-y-1.5">
                              {order.customerPhone && (
                                <div className="flex items-center gap-1.5 text-gray-700">
                                  <Phone size={12} className="text-emerald-600 shrink-0" />
                                  <a href={`tel:${order.customerPhone}`} className="hover:underline font-medium">{order.customerPhone}</a>
                                  <a 
                                    href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="ml-auto text-[10px] font-bold text-emerald-700 hover:underline bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                                  >
                                    WhatsApp
                                  </a>
                                </div>
                              )}
                              {order.customerLocation && (
                                <div className="flex items-start gap-1.5 text-gray-600">
                                  <MapPin size={12} className="text-amber-600 shrink-0 mt-0.5" />
                                  <span className="leading-tight">{order.customerLocation}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Order Items with Custom Ingredients */}
                          <div className="text-xs text-gray-700 my-3 space-y-2">
                            {order.items?.map((item, idx) => {
                              const isObj = typeof item === 'object';
                              const itemName = isObj ? `${item.quantity || 1}x ${item.name}` : item;
                              const tagline = isObj ? item.tagline : null;
                              return (
                                <div key={idx} className="bg-white/80 pb-1">
                                  <div className="font-semibold text-gray-900">• {itemName}</div>
                                  {tagline && (
                                    <div className="text-[10px] text-emerald-800 bg-emerald-50/70 rounded p-1.5 mt-0.5 border border-emerald-100 leading-relaxed font-medium">
                                      {tagline}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Price & Status Actions */}
                          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <span className="font-extrabold text-gray-900 text-sm">GHS {Number(order.total || 0).toFixed(2)}</span>
                            
                            <select 
                              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 font-medium cursor-pointer"
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {activeTab === 'Customers' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Customer Directory</h2>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Search customers..." className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-gray-900/50" />
                    <button className="text-xs font-medium text-black hover:text-gray-900 transition-colors bg-black/10 px-3 py-1.5 rounded-lg">Export CSV</button>
                  </div>
                </div>
                <div className="overflow-x-auto flex-1 p-6">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 text-gray-900/50 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium rounded-tl-lg">Customer Name</th>
                        <th className="p-4 font-medium">Total Visits</th>
                        <th className="p-4 font-medium">Last Visit</th>
                        <th className="p-4 font-medium text-right rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black text-xs font-bold border border-gray-900/30">
                              {c.name.charAt(0)}
                            </div>
                            {c.name}
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-100 text-black px-2.5 py-1 rounded-full text-xs font-bold border border-gray-900/20">
                              {c.visits} orders
                            </span>
                          </td>
                          <td className="p-4 text-gray-900/50 text-sm">{c.lastVisit}</td>
                          <td className="p-4 text-right">
                            <button className="text-xs font-medium text-black hover:text-gray-900 transition-colors">View Profile</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Feedback' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Customer Reviews</h2>
                  <div className="flex gap-2">
                    <button className="text-xs font-medium text-gray-900/50 hover:text-gray-900 transition-colors px-3 py-1.5">Latest</button>
                    <button className="text-xs font-medium text-gray-900/50 hover:text-gray-900 transition-colors px-3 py-1.5">Lowest Rated</button>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.map(f => (
                    <div key={f.id} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{f.customer}</div>
                          <div className="text-xs text-gray-900/40">{f.date}</div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < f.rating ? "text-gray-900 fill-yellow-400" : "text-gray-900/20"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-900/80 leading-relaxed">"{f.comment}"</p>
                      <div className="mt-4 flex gap-2">
                        <button className="text-xs font-medium text-black hover:text-gray-900 transition-colors bg-black/10 px-3 py-1.5 rounded-lg">Reply via WhatsApp</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'Overview' && activeTab !== 'Live Operations' && activeTab !== 'WhatsApp AI' && activeTab !== 'Customers' && activeTab !== 'Feedback' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-900/40 animate-in fade-in">
              <Activity size={48} className="opacity-50" />
              <p className="text-lg">Module <strong className="text-gray-900/70">{activeTab}</strong> is currently under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
