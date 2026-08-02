import React, { useEffect, useRef } from 'react';
import { Leaf, Droplets, Utensils, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const storyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-card', 
        {
          y: 60,
          scale: 0.92,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.25,
          ease: 'power3.out',
        }
      );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: '01',
      title: '100% Organic Local Sourcing',
      description: 'We partner directly with certified organic local farmers to harvest crisp produce at peak nutritional density.',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      highlights: ['Non-GMO Certified', 'Zero Pesticides', 'Harvested Daily at 5am']
    },
    {
      step: '02',
      title: 'Hydraulic Cold-Pressing',
      description: 'Our raw green juices are extracted using thousands of pounds of pressure without heat, preserving vital live enzymes.',
      icon: Droplets,
      color: 'from-lime-400 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
      highlights: ['Zero Added Water', '100% Pure Raw Juice', 'Unpasteurized & Fresh']
    },
    {
      step: '03',
      title: 'Artisan Hand-Rolled Craft',
      description: 'Every wrap and sourdough sandwich is hand-assembled to order with house-crafted pestos and wild-caught proteins.',
      icon: Utensils,
      color: 'from-amber-400 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      highlights: ['Wild-Caught Proteins', 'House Cashew Pesto', 'Biodegradable Packaging']
    }
  ];

  return (
    <section ref={storyRef} id="story-section" className="py-16 lg:py-24 bg-[#040D0A] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#86EFAC]">
            Uncompromising Standards
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            THE CRAFT BEHIND <span className="text-gradient-lime italic font-serif">EVERY BITE</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            From farm soil to your final wrap, discover our 3-step obsession with pure taste & vibrant vitality.
          </p>
        </div>

        {/* 3 Step Process Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="story-card glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between hover:border-[#86EFAC]/40 transition-all duration-300 group"
              >
                {/* Background Glow Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#86EFAC]/5 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-display font-extrabold text-white/20 group-hover:text-[#86EFAC] transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#071913] rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#86EFAC]" />
                      </div>
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="h-44 rounded-2xl overflow-hidden mb-6 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
