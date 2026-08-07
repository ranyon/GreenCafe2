import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, Sparkles, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExplore, onOpenLab }) {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroRef = useRef(null);
  const leftColRef = useRef(null);

  const slides = [
    {
      badge: 'Featured Wrap',
      title: 'Osu Spice Chicken Wrap',
      description: 'Avocado, organic spinach & green herb dressing with our signature Osu spice.',
      image: '/assets/spicy_wrap 1.png',
      rating: '4.9',
      reviews: '1.2k',
      badgeIcon: '🌯',
      tag: 'Spicy & Savory'
    },
    {
      badge: 'Cold-Pressed',
      title: 'Pineapple & Ginger',
      description: '100% raw, vibrant juice designed to power your body & mind.',
      image: '/assets/pineapple_juice 1.png',
      rating: '5.0',
      reviews: '850',
      badgeIcon: '🧃',
      tag: '100% Raw'
    },
    {
      badge: "Chef's Special",
      title: 'Spicy Chicken Quinoa Bowl',
      description: 'Roasted sweet potatoes, fresh greens, and quinoa loaded with protein.',
      image: '/assets/quinoa_bowl 1.png',
      rating: '4.8',
      reviews: '920',
      badgeIcon: '🥗',
      tag: 'Protein Packed'
    }
  ];

  const currentSlide = slides[activeIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Animations that apply ONLY to large screens (parallax)
      mm.add("(min-width: 1024px)", () => {
        gsap.to(leftColRef.current, {
          y: -100,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
        
        // Floating accents parallax
        gsap.to('.animate-float-accent', {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] pt-28 lg:pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#040D0A] via-[#071913] to-[#0B261D]"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.1) 0%, rgba(134,239,172,0) 70%)' }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,78,61,0.25) 0%, rgba(22,78,61,0) 70%)' }} />

      {/* Floating Botanical Leaf Accents */}
      <div className="hidden lg:block absolute top-28 left-[10%] opacity-20 pointer-events-none animate-float-accent">
        <Leaf className="w-16 h-16 text-[#86EFAC]" />
      </div>
      <div className="hidden lg:block absolute bottom-32 left-[5%] opacity-15 pointer-events-none animate-float-accent" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-12 h-12 text-yellow-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 flex-1">
        
        {/* Left Column: Copy & CTA */}
        <div ref={leftColRef} className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 mt-4 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#86EFAC] text-xs font-bold uppercase tracking-wide">
                <span className="text-base">{currentSlide.badgeIcon}</span> {currentSlide.badge}
              </div>
              
              <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-white">
                {currentSlide.title}
              </h1>
              
              <p className="text-sm sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call To Action Buttons */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4 mt-2">
            <button
              onClick={onExplore}
              className="relative w-full lg:w-auto px-4 py-3 lg:px-8 lg:py-4 text-[12px] lg:text-sm font-bold text-[#071913] bg-gradient-to-r from-[#86EFAC] to-[#A3E635] hover:opacity-90 rounded-xl lg:rounded-full shadow-[0_0_20px_rgba(134,239,172,0.4)] hover:shadow-[0_0_35px_rgba(134,239,172,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl lg:rounded-full"></div>
              <span className="truncate relative z-10">Explore Menu</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={onOpenLab}
              className="w-full lg:w-auto px-4 py-3 lg:px-8 lg:py-4 text-[12px] lg:text-sm font-semibold text-white glass-panel hover:bg-[#164E3D] rounded-xl lg:rounded-full border border-[#86EFAC]/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-[#86EFAC]" />
              <span className="truncate">Custom Juice</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Graphic Visual Stage */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center order-1 lg:order-2 h-[35vh] lg:h-[60vh] max-h-[500px]">
          
          {/* Main Showcase Swiper */}
          <Swiper
            modules={[Controller, EffectFade, Autoplay]}
            onSwiper={setFirstSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            controller={{ control: secondSwiper }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full h-full max-w-md aspect-square relative z-10"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center w-full h-full p-4 lg:p-8">
                <div className="relative w-full h-full flex items-center justify-center group">
                  {/* Background glow removed as per request */}
                  
                  <motion.img
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 group-hover:rotate-2 transition-all duration-700"
                    style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.5))' }}
                  />

                  {/* Floating Elements attached to the active image */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-4 left-0 lg:bottom-10 lg:-left-4 z-20 px-3 py-2 rounded-xl bg-[#0F382C] border border-[#86EFAC]/40 shadow-xl backdrop-blur-md flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">★ {slide.rating}</span>
                    <span className="text-xs text-gray-300">({slide.reviews})</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-0 lg:top-10 lg:-right-4 z-20 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#86EFAC] to-[#A3E635] shadow-[0_0_15px_rgba(134,239,172,0.3)] text-[#071913] font-bold text-[10px] uppercase tracking-wider"
                  >
                    {slide.tag}
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div className="max-w-7xl mx-auto w-full px-4 mt-6 lg:mt-8 relative z-20">
        <Swiper
          modules={[Controller]}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          spaceBetween={16}
          slidesPerView="auto"
          slideToClickedSlide={true}
          className="w-full pb-4"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div 
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-2 pr-4 flex items-center gap-3 border backdrop-blur-md
                  ${activeIndex === index 
                    ? 'bg-white/10 border-[#86EFAC] shadow-[0_0_15px_rgba(134,239,172,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'}`}
              >
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center p-1.5">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-contain" />
                </div>
                <div className="block">
                  <p className="text-xs font-bold text-white leading-tight">{slide.title}</p>
                  <p className="text-[10px] text-[#86EFAC]">{slide.badge}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
