import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount, onOpenCart }) {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#071913]/90 backdrop-blur-xl py-3 border-b border-[#86EFAC]/15 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >

          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              GREENCAFE
              <span className="w-2 h-2 rounded-full bg-[#86EFAC] animate-ping" />
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full">
          <Link
            to="/"
            className="text-sm font-medium text-gray-200 hover:text-[#86EFAC] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/lab"
            className="text-sm font-medium text-gray-200 hover:text-[#86EFAC] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
            Juice & Wrap Lab
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-gray-200 hover:text-[#86EFAC] transition-colors"
          >
            Nutrition
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {!currentUser ? (
            <button
              onClick={loginWithGoogle}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:text-[#86EFAC] transition-colors"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-[#86EFAC]/30 hover:border-[#86EFAC] transition-all">
                <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} alt="Profile" className="w-full h-full object-cover" />
              </Link>
              <button
                onClick={logout}
                className="hidden sm:inline-flex text-xs font-medium text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={onOpenCart}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#164E3D]/60 hover:bg-[#164E3D] text-[#86EFAC] border border-[#86EFAC]/30 transition-all hover:scale-105"
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
        <div className="md:hidden bg-[#071913]/98 border-b border-[#86EFAC]/20 px-6 pt-6 pb-12 space-y-4 backdrop-blur-2xl">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-left py-2 text-lg font-medium text-white hover:text-[#86EFAC]"
          >
            Home
          </Link>
          <Link
            to="/lab"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-left py-2 text-lg font-medium text-white hover:text-[#86EFAC]"
          >
            Juice & Wrap Lab
          </Link>
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-left py-2 text-lg font-medium text-white hover:text-[#86EFAC]"
          >
            Nutrition
          </Link>
        </div>
      )}
    </header>
  );
}
