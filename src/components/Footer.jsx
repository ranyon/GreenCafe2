import React from 'react';
import { Leaf, Globe, Share2, MapPin, Phone, Mail, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#040D0A] pt-20 pb-10 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#86EFAC] flex items-center justify-center text-[#071913] text-lg font-bold">
                🥗
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                GREENCAFE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Artisan organic wraps, gourmet sourdough sandwiches, and raw cold-pressed green juices handcrafted fresh daily.
            </p>

            {/* Value Badges */}
            <div className="flex flex-wrap gap-2 pt-2 text-[10px] sm:text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Leaf className="w-3.5 h-3.5 text-[#86EFAC]" /> 100% Organic Sourcing
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> Zero Added Sugar
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Made Fresh Hourly
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#86EFAC] hover:text-[#071913] transition-colors" title="Social Media">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#86EFAC] hover:text-[#071913] transition-colors" title="Share App">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#86EFAC]">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Signature Menu
                </Link>
              </li>

              <li>
                <Link to="/lab" className="hover:text-white transition-colors">
                  Juice & Wrap Lab
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Nutritional Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Location */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#86EFAC]">
              Hours & Location
            </h5>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span>742 Organic Way, Green District, City 10024</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>+1 (800) 555</span>
              </div>
              <div className="pt-2 text-[11px] text-gray-400">
                <p><strong className="text-white">Mon — Fri:</strong> 7:00 AM — 9:00 PM</p>
                <p><strong className="text-white">Sat — Sun:</strong> 8:00 AM — 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} GreenCafe Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Allergen Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
