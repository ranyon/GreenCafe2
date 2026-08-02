import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Leaf, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExplore, onOpenLab }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Animations that apply to ALL screens
      mm.add("all", () => {
        // Master Entrance Timeline
        const tl = gsap.timeline();
        // Staggered headline and text
        tl.from(headlineRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        }, "-=0.8")
        // Animate the right column (image stage)
        .from(rightColRef.current, {
          x: 50,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out'
        }, "-=1.2");

        // Continuous Floating hero image animation
        gsap.to('.hero-float-img', {
          y: -20,
          rotate: 1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        
        // Continuous floating badges
        gsap.to('.float-badge', {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5
        });
      });

      // Animations that apply ONLY to large screens (parallax)
      mm.add("(min-width: 1024px)", () => {
        // ScrollTrigger Parallax
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

        gsap.to(rightColRef.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
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

  const heroImageBlock = (
    <div className="relative w-full max-w-md aspect-video lg:aspect-square rounded-2xl lg:rounded-3xl glass-panel p-1.5 lg:p-4 border border-[#86EFAC]/20 shadow-2xl flex items-center justify-center mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#164E3D]/40 to-transparent pointer-events-none rounded-2xl lg:rounded-3xl" />

      {/* Main Showcase Image */}
      <div className="hero-float-img relative z-10 w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        <img
          src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80"
          alt="GreenCafe Green Goddess Wrap"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071913] via-[#071913]/20 to-transparent opacity-90 lg:opacity-80" />

        <div className="absolute bottom-2 left-2 right-2 lg:bottom-4 lg:left-4 lg:right-4 p-3 lg:p-4 rounded-xl glass-card backdrop-blur-xl border border-white/10 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] lg:text-xs font-bold text-[#86EFAC] uppercase tracking-wide">Featured Wrap</span>
            <span className="text-[10px] lg:text-xs font-semibold text-yellow-400 flex items-center gap-1">★ 4.9 <span className="hidden sm:inline">(1.2k)</span></span>
          </div>
          <h3 className="text-sm lg:text-base font-bold text-white leading-tight">Green Goddess Chicken Wrap</h3>
          <p className="hidden sm:block text-xs text-gray-300 mt-1">Avocado, organic spinach & green herb dressing</p>
        </div>
      </div>

      {/* Floating Badge Widget */}
      <div className="absolute -top-3 -right-2 lg:-top-3 lg:-right-3 z-20 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl lg:rounded-2xl bg-[#0F382C] border border-[#86EFAC]/40 shadow-xl backdrop-blur-md flex items-center gap-1.5 lg:gap-2 float-badge text-left scale-90 lg:scale-100 origin-top-right">
        <span className="text-base lg:text-lg">🧃</span>
        <div>
          <p className="hidden sm:block text-[10px] uppercase font-bold text-[#86EFAC]">Cold-Pressed</p>
          <p className="text-[10px] lg:text-xs font-extrabold text-white">100% Raw</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] pt-28 lg:pt-32 pb-20 flex items-start lg:items-center justify-center overflow-hidden bg-gradient-to-b from-[#040D0A] via-[#071913] to-[#0B261D]"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & CTA */}
        <div ref={leftColRef} className="lg:col-span-7 text-center lg:text-left">
          {/* Kinetic Headline */}
          <div ref={headlineRef} className="space-y-1 lg:space-y-2 mb-1 lg:mb-6">
            <h1 className="font-display font-black text-4xl leading-[1.05] sm:text-6xl xl:text-7xl tracking-tight text-white">
              PURE ENERGY. <br />
              <span className="text-gradient-lime italic font-serif">ARTFULLY WRAPPED.</span>
            </h1>
            <p className="text-sm sm:text-xl text-gray-300 max-w-2xl font-normal leading-snug lg:leading-relaxed pt-1">
              Clean, nutrient-dense organic wraps, gourmet sourdough sandwiches, and raw cold-pressed green juices designed to power your body & mind.
            </p>
          </div>

          {/* MOBILE ONLY: Hero Graphic Visual Stage */}
          <div className="block lg:hidden w-full my-3 lg:my-10 animate-in fade-in zoom-in duration-1000 delay-300">
            {heroImageBlock}
          </div>

          {/* Call To Action Buttons */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-4 mt-2 lg:mt-0">
            <button
              onClick={onExplore}
              className="relative w-full px-2 py-3 lg:px-8 lg:py-4 text-[12px] lg:text-sm font-bold text-[#071913] bg-gradient-to-r from-[#86EFAC] to-[#A3E635] hover:opacity-90 rounded-xl lg:rounded-full shadow-[0_0_20px_rgba(134,239,172,0.4)] hover:shadow-[0_0_35px_rgba(134,239,172,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-1 lg:gap-2 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl lg:rounded-full"></div>
              <span className="truncate relative z-10">Explore Menu</span>
              <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 shrink-0 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={onOpenLab}
              className="w-full px-2 py-3 lg:px-8 lg:py-4 text-[12px] lg:text-sm font-semibold text-white glass-panel hover:bg-[#164E3D] rounded-xl lg:rounded-full border border-[#86EFAC]/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1 lg:gap-2"
            >
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 shrink-0 text-[#86EFAC]" />
              <span className="truncate">Custom Juice</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Graphic Visual Stage (DESKTOP ONLY) */}
        <div ref={rightColRef} className="hidden lg:flex lg:col-span-5 relative justify-center">
          {heroImageBlock}
        </div>
      </div>
    </section>
  );
}
