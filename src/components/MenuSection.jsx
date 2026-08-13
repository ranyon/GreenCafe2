import React, { useState, useEffect, useRef } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Plus, Star, Info, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection({ onAddToCart, onHoverItem, onItemClick }) {
  const [activeTab, setActiveTab] = useState('wraps');
  const [addedIds, setAddedIds] = useState({});
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const handleAdd = (e, item) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  // Staggered reveal for menu items when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { y: 40, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeTab]);

  // ScrollTrigger for the whole section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header', {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu-section" ref={sectionRef} className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="menu-header text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Artisan Culinary Creations
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-900 mt-2 tracking-tight">
            THE GREENCAFE <span className="text-gradient-lime italic font-serif">MENU</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Handcrafted daily using 100% organic produce, wild-caught proteins, and freshly cold-pressed fruit & veg.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-12">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg shadow-black/10 scale-105'
                  : 'glass-card text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group glass-card rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-900/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Header */}
              <div className="relative h-32 sm:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gray-50 backdrop-blur-md border border-gray-200 flex items-center gap-1 text-xs font-semibold text-gray-900">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-gray-900" />
                  <span>{item.rating}</span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black text-white text-sm font-extrabold shadow-lg">
                  GH₵{item.price.toFixed(2)}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2.5 py-0.5 rounded-md bg-gray-100/80 text-black border border-gray-900/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-bold text-xs sm:text-xl text-gray-900 group-hover:text-black transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="hidden sm:block text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Nutrition Footprint */}
                <div className="mt-3 pt-3 sm:mt-5 sm:pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 text-[10px] sm:text-xs text-gray-600">
                    <div>
                      <span className="font-bold text-gray-900">{item.calories}</span> <span className="text-[10px] text-gray-400">kcal</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
                    <div>
                      <span className="font-bold text-black">{item.protein}</span> <span className="text-[10px] text-gray-400">protein</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAdd(e, item)}
                    className={`min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 flex items-center justify-center ${
                      addedIds[item.id]
                        ? 'bg-emerald-500 text-gray-900'
                        : 'bg-gray-100 hover:bg-black text-black hover:text-white border border-gray-900/30'
                    }`}
                    title="Add to Cart"
                  >
                    {addedIds[item.id] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
