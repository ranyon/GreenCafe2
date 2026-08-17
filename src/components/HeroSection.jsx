import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Leaf, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExplore, onOpenLab }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: 'Crispy Vegan Spicy Wrap',
      description: 'Packed with fiery plant-based protein, fresh crunch, and our signature Green Cafe spicy aioli. Wrapped to perfection.',
      badge: 'Bestseller',
      badgeIcon: '🔥',
    },
    {
      title: 'Green Goddess Bowl',
      description: 'A nutrient-dense powerhouse of quinoa, roasted sweet potatoes, avocado, and our house-made herb tahini dressing.',
      badge: 'Nutrient Dense',
      badgeIcon: '🥑',
    },
    {
      title: 'Golden Milk Iced Latte',
      description: 'Anti-inflammatory turmeric, ginger, and oat milk shaken over ice. A refreshing, healing elixir.',
      badge: 'Immunity Boost',
      badgeIcon: '✨',
    }
  ];

  const currentSlide = slides[activeIndex];

  // Auto-play text loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("all", () => {
        // Removed redundant GSAP entrance animation on text to speed up initial load
        // Framer Motion handles the text entrance
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-24 lg:pt-32 pb-28 lg:pb-10 flex flex-col justify-end lg:justify-center gap-2 lg:gap-6 overflow-hidden"
    >
      {/* Dark Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gray-950">
        <img 
          src="/assets/space_sunlit_916.jpg" 
          alt="Cafe Background Desktop" 
          className="hidden md:block w-full h-full object-cover opacity-100"
        />
        <img 
          src="/assets/mobile_hero.jpg" 
          alt="Cafe Background Mobile" 
          className="block md:hidden w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center mt-4">
        
        {/* Top/Center Text & CTA */}
        <div ref={headlineRef} className="w-full text-center flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 mb-6 lg:mb-8"
            >
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md text-xs font-bold uppercase tracking-wide">
                <span className="text-base">{currentSlide.badgeIcon}</span> {currentSlide.badge}
              </div>
              
              <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-7xl leading-[1.1] tracking-tight text-white drop-shadow-lg">
                {currentSlide.title}
              </h1>
              
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call To Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 lg:gap-4 mt-2">
            <button
              onClick={onExplore}
              className="px-6 py-3 lg:px-8 lg:py-4 text-[13px] lg:text-sm font-bold text-gray-900 bg-white hover:bg-gray-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenLab}
              className="px-6 py-3 lg:px-8 lg:py-4 text-[13px] lg:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Custom Juice</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
