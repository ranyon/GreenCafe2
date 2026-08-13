import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Leaf, Coffee, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SpaceScrollSection() {
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const slides = [
    {
      step: '01',
      tag: 'Sunlit Mornings',
      title: 'NATURAL SUNLIGHT & FOLIAGE',
      subtitle: 'Golden rays beaming onto lush monstera foliage and hand-carved wooden interiors.',
      icon: Leaf,
      image: '/assets/space_sunlit_916.png'
    },
    {
      step: '02',
      tag: 'Craft Service Bar',
      title: 'HANDCRAFTED WOODEN BAR',
      subtitle: 'Frontal perspective of our warm timber counter, fresh juices, and organic pastry display.',
      icon: Sparkles,
      image: '/assets/space_bar_916.png'
    },
    {
      step: '03',
      tag: 'Artisan Coffee',
      title: 'LA MARZOCCO & SEATING',
      subtitle: 'Precision espresso brewing surrounded by woven pendant lighting and cozy dining tables.',
      icon: Coffee,
      image: '/assets/space_coffee_916.png'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline scrubbed over native CSS sticky track with clean snap
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          snap: {
            snapTo: [0, 0.5, 1], // Snaps cleanly to Slide 1 (0.0), Slide 2 (0.5), or Slide 3 (1.0)
            duration: { min: 0.25, max: 0.5 },
            delay: 0.05,
            ease: "power2.out"
          },
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) {
              setActiveStep(0);
            } else if (progress < 0.67) {
              setActiveStep(1);
            } else {
              setActiveStep(2);
            }
          }
        }
      });

      // Slide 1 -> Slide 2 (Img 2 fades in over Img 1 so there is ZERO black background gap)
      tl.fromTo(img2Ref.current, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "none" },
        0
      );

      // Slide 2 -> Slide 3 (Img 3 fades in over Img 2 so there is ZERO black background gap)
      tl.fromTo(img3Ref.current, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "none" },
        1
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToStep = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index === 0 ? 0 : index === 1 ? 0.5 : 1.0;
    
    window.scrollTo({
      top: containerTop + (containerHeight * targetProgress),
      behavior: 'smooth'
    });
  };

  return (
    /* 250vh track container providing scroll distance */
    <section ref={containerRef} className="relative h-[250vh] bg-gray-950 text-white w-full">
      
      {/* Sticky 100dvh Screen Container */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden z-20">
        
        {/* Full-Bleed Mobile / Centered Frame Desktop Stage */}
        <div className="absolute inset-0 flex items-center justify-center p-0 md:p-6 lg:p-8">
          <div className="relative w-full h-full md:aspect-[9/16] md:max-h-[92vh] md:rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border-0 md:border md:border-white/10 bg-gray-900">
            
            {/* Image 1 (Base image: ALWAYS 100% OPAQUE underneath to prevent any black background flash) */}
            <img
              ref={img1Ref}
              src={slides[0].image}
              alt={slides[0].title}
              className="absolute inset-0 w-full h-full object-cover object-center z-10 opacity-100 will-change-transform"
            />

            {/* Image 2 (Fades in over Image 1) */}
            <img
              ref={img2Ref}
              src={slides[1].image}
              alt={slides[1].title}
              className="absolute inset-0 w-full h-full object-cover object-center z-20 opacity-0 will-change-transform"
            />

            {/* Image 3 (Fades in over Image 2) */}
            <img
              ref={img3Ref}
              src={slides[2].image}
              alt={slides[2].title}
              className="absolute inset-0 w-full h-full object-cover object-center z-30 opacity-0 will-change-transform"
            />

            {/* Dark Vignette Overlay for Mobile Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/30 z-40 pointer-events-none" />

            {/* Content Overlay Box */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-50 flex flex-col justify-end text-left">
              
              {/* Badge & Step indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest mb-3 w-fit">
                <span className="text-emerald-400 font-mono font-extrabold">{slides[activeStep].step}</span>
                <span>•</span>
                <span>{slides[activeStep].tag}</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-2">
                {slides[activeStep].title}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-sm sm:max-w-md">
                {slides[activeStep].subtitle}
              </p>

              {/* Interactive Step Progress Dots */}
              <div className="flex items-center gap-3 mt-5 sm:mt-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToStep(idx)}
                    aria-label={`Snap to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === idx 
                        ? 'w-9 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' 
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Header Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 text-center w-full px-4 pointer-events-none">
          <span className="inline-block text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-emerald-400 bg-black/70 px-3.5 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md">
            OUR CAFE AMBIENCE
          </span>
        </div>

        {/* Scroll Indicator Pill */}
        <div className="absolute bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold animate-pulse pointer-events-none">
          <span>Scroll to Snap</span>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
        </div>

      </div>
    </section>
  );
}
