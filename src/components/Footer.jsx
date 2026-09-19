import React from 'react';
import { Leaf, MapPin, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-200">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-extrabold text-2xl tracking-tight text-gray-900">
                GREENCAFE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
              Artisan organic wraps, gourmet sourdough sandwiches, and raw cold-pressed green juices handcrafted fresh daily.
            </p>

            {/* Value Badges */}
            <div className="flex flex-wrap gap-2 pt-2 text-[10px] sm:text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> 100% Organic Sourcing
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Zero Added Sugar
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Made Fresh Daily
              </div>
            </div>

            {/* Social Handles */}
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Follow Us @greencafegh
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://instagram.com/greencafegh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-xs font-bold text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://facebook.com/greencafegh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-xs font-bold text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://snapchat.com/add/greencafegh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-xs font-bold text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm"
                  title="Snapchat"
                >
                  <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12.012 2c-3.568 0-5.952 2.502-6.002 5.679 0 .979.288 1.802.739 2.457.143.208.199.363.14.542-.08.243-.464.385-.92.518-.465.136-.983.287-1.196.656-.164.283-.105.698.175.98.636.64 1.579.526 2.062.467.148-.018.258.077.297.202.193.626.83 2.181 4.705 2.181 3.876 0 4.512-1.555 4.705-2.181.039-.125.149-.22.297-.202.483.059 1.426.173 2.062-.467.28-.282.339-.697.175-.98-.213-.369-.731-.52-1.196-.656-.456-.133-.84-.275-.92-.518-.059-.179-.003-.334.14-.542.451-.655.739-1.478.739-2.457-.05-3.177-2.434-5.679-6.002-5.679z"/>
                  </svg>
                  Snapchat
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-black">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-gray-600 font-medium">
              <li>
                <Link to="/menu" className="hover:text-black transition-colors">
                  Signature Menu
                </Link>
              </li>
              <li>
                <Link to="/lab" className="hover:text-black transition-colors">
                  Custom Bowl Builder
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black transition-colors">
                  Nutritional Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Location */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-black">
              Hours & Location
            </h5>
            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 font-bold">GreenCafe Osu</strong>
                  <span className="text-gray-600">61 Lokko Road, Osu</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-1 text-xs">
                <p className="font-bold text-gray-900 uppercase text-[10px] tracking-wider mb-1">
                  Operating Hours
                </p>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Monday — Friday</span>
                  <span className="font-bold text-gray-900">7:00am — 5:00pm</span>
                </div>
                <div className="flex justify-between items-center text-gray-700 pt-1 border-t border-gray-100">
                  <span className="font-semibold">Saturdays</span>
                  <span className="font-bold text-gray-900">8:30am — 4:00pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} GreenCafe Gh. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <a href="#" className="hover:text-gray-600">Location Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
