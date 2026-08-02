import React, { useEffect, useState } from 'react';

export default function CustomCursor({ activePreviewItem }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-[#86EFAC]/40 transition-all duration-300 ${
          activePreviewItem ? 'scale-150 border-[#86EFAC]' : 'scale-100'
        }`} />
      </div>

      {/* Dynamic Hover Card Preview */}
      {activePreviewItem && (
        <div
          className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-100 ease-out hidden md:block"
          style={{
            transform: `translate3d(${position.x + 20}px, ${position.y + 20}px, 0)`,
          }}
        >
          <div className="w-56 p-3 rounded-2xl bg-[#0F382C]/95 border border-[#86EFAC]/30 shadow-2xl backdrop-blur-xl animate-float">
            <img
              src={activePreviewItem.image}
              alt={activePreviewItem.name}
              className="w-full h-32 object-cover rounded-xl mb-2"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#86EFAC] uppercase tracking-wider">
                {activePreviewItem.category}
              </span>
              <span className="text-xs font-bold text-yellow-400">
                GH₵{activePreviewItem.price.toFixed(2)}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white truncate mt-0.5">
              {activePreviewItem.name}
            </h4>
            <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">
              {activePreviewItem.tagline}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
