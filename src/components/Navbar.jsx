import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Create Your Bowl', path: '/lab', icon: Sparkles },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || !isHomePage
          ? 'bg-black/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl'
          : 'bg-black/40 backdrop-blur-md py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              GREENCAFE
              <span className="w-2 h-2 rounded-full bg-[#86EFAC] animate-ping" />
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/15 p-1.5 rounded-full shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#86EFAC] text-[#071913] font-semibold shadow-md'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#071913]' : 'text-[#86EFAC]'}`} />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#164E3D]/60 hover:bg-[#164E3D] text-[#86EFAC] border border-[#86EFAC]/30 transition-all hover:scale-105 active:scale-95"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#86EFAC] text-[#071913] text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-[#071913] bg-gradient-to-r from-[#86EFAC] to-[#A3E635] hover:opacity-90 rounded-full shadow-lg shadow-[#86EFAC]/25 transition-all hover:scale-105 active:scale-95"
          >
            Order Fresh
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/98 border-b border-white/10 px-6 pt-4 pb-8 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 w-full text-left py-2.5 px-4 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-[#86EFAC] text-[#071913] font-bold'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-[#071913]' : 'text-[#86EFAC]'}`} />}
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/menu"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 text-sm font-bold text-[#071913] bg-gradient-to-r from-[#86EFAC] to-[#A3E635] rounded-full shadow-md mt-4"
          >
            Order Fresh
          </Link>
        </div>
      )}
    </header>
  );
}

