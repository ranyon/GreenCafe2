import React from 'react';
import { Award, HeartPulse, Sparkles, Clock } from 'lucide-react';

export default function MetricsSection() {
  const metrics = [
    {
      icon: Award,
      value: '100%',
      label: 'Certified Organic Produce',
      subtext: 'Directly sourced from trusted regional farms',
    },
    {
      icon: HeartPulse,
      value: '0g',
      label: 'Added Sugar or Concentrates',
      subtext: 'Pure natural fruit & vegetable sweetness',
    },
    {
      icon: Clock,
      value: '< 24h',
      label: 'Farm-to-Bottle Freshness',
      subtext: 'Pressed daily using cold hydraulic pressure',
    },
    {
      icon: Sparkles,
      value: '15,000+',
      label: 'Happy Healthy Foodies',
      subtext: 'Serving high-vibe nutrition across the city',
    },
  ];

  return (
    <section id="nutrition-section" className="py-12 lg:py-20 bg-gray-50 relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {metrics.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 text-center border border-gray-200 hover:border-gray-900/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100/60 text-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-1">
                  {m.value}
                </h4>
                <p className="text-sm font-bold text-black mb-1">
                  {m.label}
                </p>
                <p className="text-xs text-gray-400">
                  {m.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
