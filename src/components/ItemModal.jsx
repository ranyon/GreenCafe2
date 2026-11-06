import React, { useState, useEffect } from 'react';
import { X, Star, Box, Sparkles, Plus, Check } from 'lucide-react';

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [selectedProtein, setSelectedProtein] = useState(null);

  useEffect(() => {
    if (item?.proteinOptions && item.proteinOptions.length > 0) {
      setSelectedProtein(item.proteinOptions[0]);
    } else {
      setSelectedProtein(null);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white border border-gray-900/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-gray-600 hover:text-gray-900 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-gray-100 text-black border border-gray-900/30">
              {item.category}
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              GH₵{item.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-gray-900 font-bold">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{item.rating} / 5.0 Exceptional Rating</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-gray-900">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              {item.tagline}
            </p>
          </div>

          {/* Key Ingredients */}
          {item.ingredients && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                Fresh Ingredients Inside
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    • {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Protein Choice (if customizable) */}
          {item.proteinOptions && item.proteinOptions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center justify-between">
                <span>Select Protein Choice</span>
                <span className="text-[10px] text-emerald-600 font-semibold lowercase">required</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {item.proteinOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedProtein(opt)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedProtein === opt
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {selectedProtein === opt && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Item Metrics */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
            {item.size ? (
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Portion Size</p>
                  <p className="text-base font-extrabold text-gray-900">{item.size}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Quality</p>
                  <p className="text-base font-extrabold text-gray-900">Made Fresh</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Rating</p>
                <p className="text-base font-extrabold text-gray-900">{item.rating} / 5.0</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              const itemToAdd = selectedProtein
                ? {
                    ...item,
                    id: `${item.id}-${selectedProtein.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                    name: `${item.name} (${selectedProtein})`,
                    selectedProtein
                  }
                : item;
              onAddToCart(itemToAdd);
              onClose();
            }}
            className="w-full py-4 text-xs font-bold text-white bg-gradient-to-r from-gray-800 to-black hover:opacity-90 rounded-full shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Order — GH₵{item.price.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
