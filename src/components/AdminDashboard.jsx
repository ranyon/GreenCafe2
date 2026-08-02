import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Activity, Users, Gift, Star, Search, Menu, X, ArrowUp, ArrowDown, MessageSquare, Send } from 'lucide-react';

import { db } from '../services/db';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'WhatsApp AI', icon: MessageSquare }, // NEW TAB
  { name: 'Live Operations', icon: Activity },
  { name: 'Customers', icon: Users },
  { name: 'Loyalty & Gifting', icon: Gift },
  { name: 'Feedback', icon: Star }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [customers, setCustomers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loyalty, setLoyalty] = useState([]);
  const [feed, setFeed] = useState([]);
  const [aiStats, setAiStats] = useState({ remaining_credits: 0, total_orders: 0, total_revenue: 0 });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- WHATSAPP AI STATE ---
  const [chats, setChats] = useState({});
  const [selectedChatPhone, setSelectedChatPhone] = useState(null);
  const [manualMessage, setManualMessage] = useState("");
  const chatScrollRef = useRef(null);


  // Fetch data from mock DB using real-time listeners (1:1 with Firestore)
  useEffect(() => {
    let unsubs = [];
    
    if (activeTab === 'Overview' || activeTab === 'WhatsApp AI' || activeTab === 'Live Operations') {
      unsubs.push(db.onSnapshot('stats', data => setAiStats(data)));
      unsubs.push(db.onSnapshot('customers', data => setCustomers(data)));
      unsubs.push(db.onSnapshot('feedback', data => setFeedback(data)));
      unsubs.push(db.onSnapshot('loyalty', data => setLoyalty(data)));
      unsubs.push(db.onSnapshot('feed', data => setFeed(data)));
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
  }, [activeTab]);

  // Scroll to bottom of chat when it updates
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chats, selectedChatPhone]);

  const handleGift = (name) => {
    alert(`Gift logged for ${name}!`);
  };

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

  return (
    <div className="flex h-screen bg-[#071913] text-[#F3F7F4] font-sans overflow-hidden">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0A2219] border-r border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="font-display font-bold text-xl tracking-wide text-[#86EFAC]">GREEN CAFE <span className="text-white/50 text-sm tracking-normal">CRM</span></div>
          <button className="md:hidden text-white/70" onClick={() => setIsSidebarOpen(false)}>
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
                    ? 'bg-[#164E3D]/50 text-[#86EFAC]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#86EFAC]' : 'text-white/50'} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOPBAR */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/10 bg-[#071913]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold tracking-wide hidden sm:block">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search orders, customers..." 
                className="w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#86EFAC]/50 focus:bg-white/10 transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-[#86EFAC]">Store Manager</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#164E3D] flex items-center justify-center border border-[#86EFAC]/30 group-hover:border-[#86EFAC] transition-colors">
                <Users size={18} className="text-[#86EFAC]" />
              </div>
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
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#86EFAC]/5 rounded-full blur-2xl group-hover:bg-[#86EFAC]/10 transition-all"></div>
                    <div className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">{kpi.label}</div>
                    <div className="text-3xl font-bold font-display tracking-tight text-white mb-2">{kpi.value}</div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${kpi.positive ? 'text-[#86EFAC]' : 'text-red-400'}`}>
                      {kpi.positive && i < 2 ? <ArrowUp size={14} /> : null}
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CUSTOMERS TABLE */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-lg font-semibold tracking-wide">Top Customers (Gifting Target)</h2>
                    <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                          <th className="p-4 font-medium">Customer</th>
                          <th className="p-4 font-medium">Total Visits</th>
                          <th className="p-4 font-medium">Last Visit</th>
                          <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {customers.map(c => (
                          <tr key={c.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium text-white">{c.name}</td>
                            <td className="p-4">
                              <span className="bg-[#164E3D] text-[#86EFAC] px-2.5 py-1 rounded-full text-xs font-bold border border-[#86EFAC]/20">
                                {c.visits}
                              </span>
                            </td>
                            <td className="p-4 text-white/50 text-sm">{c.lastVisit}</td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => handleGift(c.name)}
                                className="bg-white/10 hover:bg-[#86EFAC] hover:text-[#071913] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                              >
                                Send Gift
                              </button>
                            </td>
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
              <div className="flex-1 flex overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm min-h-[600px]">
                
                {/* Chat List Sidebar */}
                <div className="w-80 border-r border-white/10 flex flex-col bg-[#071913]/30">
                  <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
                      <MessageSquare size={18} className="text-[#86EFAC]" /> Active Chats
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {Object.keys(chats).length === 0 ? (
                      <div className="p-6 text-center text-white/40 text-sm">No active WhatsApp chats yet.</div>
                    ) : (
                      Object.keys(chats).map(phone => (
                        <button
                          key={phone}
                          onClick={() => setSelectedChatPhone(phone)}
                          className={`w-full text-left p-4 border-b border-white/5 transition-colors ${selectedChatPhone === phone ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="font-medium text-white truncate">{phone}</div>
                          <div className="text-xs text-white/50 truncate mt-1">
                            {chats[phone][chats[phone].length - 1]?.content || "..."}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Chat Inbox Area */}
                <div className="flex-1 flex flex-col bg-[#0A2219]/50 relative">
                  {selectedChatPhone ? (
                    <>
                      <div className="p-4 border-b border-white/10 bg-[#071913]/50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                        <div className="font-semibold">{selectedChatPhone}</div>
                        <div className="text-xs text-[#86EFAC] bg-[#164E3D] px-2 py-1 rounded-md border border-[#86EFAC]/30">Live</div>
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
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                  {isCustomer ? 'Customer' : isMerchant ? 'Merchant (You)' : 'AI Assistant'}
                                </span>
                              </div>
                              <div 
                                className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                                  isCustomer 
                                    ? 'bg-white/10 text-white rounded-tl-none border border-white/5' 
                                    : isMerchant
                                    ? 'bg-[#164E3D] text-[#F3F7F4] rounded-tr-none border border-[#86EFAC]/20'
                                    : 'bg-[#86EFAC] text-[#071913] rounded-tr-none font-medium'
                                }`}
                              >
                                {msg.content}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Manual Reply Input */}
                      <div className="p-4 border-t border-white/10 bg-[#071913]/80 backdrop-blur-md">
                        <form onSubmit={handleManualReply} className="relative flex items-center">
                          <input 
                            type="text" 
                            value={manualMessage}
                            onChange={(e) => setManualMessage(e.target.value)}
                            placeholder="Type a manual reply to override the AI..." 
                            className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#86EFAC]/50 focus:bg-white/10 transition-colors"
                          />
                          <button 
                            type="submit" 
                            disabled={!manualMessage.trim()}
                            className="absolute right-2 p-2 rounded-full bg-[#86EFAC] text-[#071913] hover:bg-[#A7F3D0] disabled:opacity-50 disabled:hover:bg-[#86EFAC] transition-colors"
                          >
                            <Send size={16} className="ml-0.5" />
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-white/40 flex-col gap-4">
                      <MessageSquare size={48} className="opacity-20" />
                      <p>Select a conversation to view or reply manually.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Live Operations' && (
            <div className="max-w-4xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Live Operations Feed</h2>
                  <div className="flex gap-2">
                    <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg">Filter</button>
                    <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg">Export</button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {feed.map(f => (
                    <div key={f.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-[#164E3D]/50 border border-[#86EFAC]/30 flex items-center justify-center shrink-0 group-hover:border-[#86EFAC] transition-colors">
                        <Star size={16} className="text-[#86EFAC]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 leading-relaxed">
                          <strong className="text-white font-medium">{f.user}</strong> {f.action}
                        </p>
                        <span className="text-xs text-white/40 mt-1 block">{f.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          
          {activeTab === 'Customers' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Customer Directory</h2>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Search customers..." className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#86EFAC]/50" />
                    <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg">Export CSV</button>
                  </div>
                </div>
                <div className="overflow-x-auto flex-1 p-6">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium rounded-tl-lg">Customer Name</th>
                        <th className="p-4 font-medium">Total Visits</th>
                        <th className="p-4 font-medium">Last Visit</th>
                        <th className="p-4 font-medium text-right rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#164E3D] flex items-center justify-center text-[#86EFAC] text-xs font-bold border border-[#86EFAC]/30">
                              {c.name.charAt(0)}
                            </div>
                            {c.name}
                          </td>
                          <td className="p-4">
                            <span className="bg-[#164E3D] text-[#86EFAC] px-2.5 py-1 rounded-full text-xs font-bold border border-[#86EFAC]/20">
                              {c.visits} orders
                            </span>
                          </td>
                          <td className="p-4 text-white/50 text-sm">{c.lastVisit}</td>
                          <td className="p-4 text-right">
                            <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors">View Profile</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Loyalty & Gifting' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Loyalty Programs & Rewards</h2>
                  <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Gift size={14} /> New Campaign
                  </button>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {loyalty.map((l, i) => {
                    const cust = customers.find(c => c.id === l.customerId);
                    return (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:bg-white/10 transition-colors">
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl transition-all ${l.tier === 'Gold' ? 'bg-yellow-400/10 group-hover:bg-yellow-400/20' : l.tier === 'Silver' ? 'bg-gray-300/10 group-hover:bg-gray-300/20' : 'bg-[#86EFAC]/5 group-hover:bg-[#86EFAC]/10'}`}></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div>
                            <div className="text-lg font-semibold text-white">{cust?.name || 'Unknown'}</div>
                            <div className="text-xs text-white/50">{l.tier} Member</div>
                          </div>
                          <div className="bg-[#164E3D] text-[#86EFAC] px-3 py-1 rounded-lg text-sm font-bold border border-[#86EFAC]/30">
                            {l.points} pts
                          </div>
                        </div>
                        <div className="mb-4 relative z-10">
                          <div className="text-xs text-white/50 mb-1">Next Reward</div>
                          <div className="text-sm text-white font-medium">{l.nextReward}</div>
                          <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                            <div className="bg-[#86EFAC] h-1.5 rounded-full" style={{ width: `${(l.points % 500) / 5}%` }}></div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleGift(cust?.name)}
                          className="w-full relative z-10 bg-white/5 hover:bg-[#86EFAC] hover:text-[#071913] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all flex justify-center items-center gap-2"
                        >
                          <Gift size={14} /> Send Custom Gift
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Feedback' && (
            <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col h-full min-h-[600px]">
                 <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-lg font-semibold tracking-wide">Customer Reviews</h2>
                  <div className="flex gap-2">
                    <button className="text-xs font-medium text-white/50 hover:text-white transition-colors px-3 py-1.5">Latest</button>
                    <button className="text-xs font-medium text-white/50 hover:text-white transition-colors px-3 py-1.5">Lowest Rated</button>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.map(f => (
                    <div key={f.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-semibold text-white">{f.customer}</div>
                          <div className="text-xs text-white/40">{f.date}</div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < f.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">"{f.comment}"</p>
                      <div className="mt-4 flex gap-2">
                        <button className="text-xs font-medium text-[#86EFAC] hover:text-white transition-colors bg-[#86EFAC]/10 px-3 py-1.5 rounded-lg">Reply via WhatsApp</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'Overview' && activeTab !== 'Live Operations' && activeTab !== 'WhatsApp AI' && activeTab !== 'Customers' && activeTab !== 'Loyalty & Gifting' && activeTab !== 'Feedback' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-white/40 animate-in fade-in">
              <Activity size={48} className="opacity-50" />
              <p className="text-lg">Module <strong className="text-white/70">{activeTab}</strong> is currently under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
