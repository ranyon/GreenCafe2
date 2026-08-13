import React, { useState } from 'react';
import { INGREDIENTS_LIST } from '../data/menuData';
import { Sparkles, Plus, Trash2, Check, Flame, Activity } from 'lucide-react';

export default function RecipeBuilder({ onAddCustomToCart }) {
  const [selectedIngredients, setSelectedIngredients] = useState([
    INGREDIENTS_LIST[0], // Baby Spinach
    INGREDIENTS_LIST[2], // Chicken
    INGREDIENTS_LIST[3], // Avocado
    INGREDIENTS_LIST[7], // Pesto
  ]);
  const [customName, setCustomName] = useState('My Energy Power Wrap');

  const toggleIngredient = (ing) => {
    if (selectedIngredients.some((item) => item.id === ing.id)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ing.id));
    } else {
      if (selectedIngredients.length >= 6) return; // Limit to 6
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const totalCals = selectedIngredients.reduce((acc, curr) => acc + curr.cals, 180); // Base tortilla 180
  const totalProtein = selectedIngredients.reduce((acc, curr) => acc + curr.protein, 6);
  const totalPrice = 9.50 + selectedIngredients.length * 1.25;

  const handleAddCustom = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      category: 'wraps',
      name: customName || 'Custom Green Wrap',
      tagline: `Handcrafted with ${selectedIngredients.map((i) => i.name).join(', ')}`,
      price: totalPrice,
      calories: totalCals,
      protein: `${totalProtein}g`,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Lab', 'Made Fresh'],
    };
    onAddCustomToCart(customItem);
  };

  return (
    <section id="builder-section" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 border border-gray-900/30 text-black text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Recipe Lab
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            BUILD YOUR <span className="text-gradient-lime italic font-serif">CUSTOM ENERGY</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Mix and match fresh organic ingredients. Watch real-time calorie & protein macros update as you assemble.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Ingredient Selector */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
              <span>Select Ingredients (Max 6)</span>
              <span className="text-xs text-black font-semibold">
                {selectedIngredients.length} / 6 Selected
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {INGREDIENTS_LIST.map((ing) => {
                const isSelected = selectedIngredients.some((item) => item.id === ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gray-100 border-gray-900 shadow-lg shadow-black/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ing.icon className="w-6 h-6 text-black" />
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-black text-white' : 'bg-gray-50 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 truncate">{ing.name}</p>
                      <p className="text-[10px] text-gray-400">
                        {ing.cals} kcal • {ing.protein}g protein
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Recipe Visualization & Live Nutrition Bar */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-gray-900/30 bg-gray-50 backdrop-blur-2xl">
            {/* Custom Title Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                Name Your Creation
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-200 text-gray-900 font-bold text-sm focus:outline-none focus:border-gray-900"
                placeholder="e.g. GreenCafe Power Wrap"
              />
            </div>

            {/* Selected Ingredients Tags */}
            <div className="mb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Assembled Layers
              </span>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 rounded-xl bg-black/30 border border-white/5">
                {selectedIngredients.map((ing) => (
                  <span
                    key={ing.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-black text-xs font-semibold border border-gray-900/30 animate-scale-in"
                  >
                    <ing.icon className="w-4 h-4" />
                    <span>{ing.name}</span>
                    <button
                      onClick={() => toggleIngredient(ing)}
                      className="hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Live Macro Metrics Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-black/40 border border-gray-200 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Calories</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">{totalCals} <span className="text-[10px] text-gray-500 font-semibold uppercase">/ 800</span></span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-700 ease-out relative" style={{ width: `${Math.min((totalCals / 800) * 100, 100)}%` }}>
                    <div className="absolute inset-0 bg-gray-50 w-full h-full animate-[pulse_2s_infinite]"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-black" />
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Protein</span>
                  </div>
                  <span className="text-xl font-black text-black">{totalProtein}g <span className="text-[10px] text-gray-500 font-semibold uppercase">/ 50g</span></span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-full rounded-full transition-all duration-700 ease-out relative" style={{ width: `${Math.min((totalProtein / 50) * 100, 100)}%` }}>
                    <div className="absolute inset-0 bg-gray-50 w-full h-full animate-[pulse_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Custom to Cart CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Total Price</span>
                <span className="text-2xl font-extrabold text-gray-900">GH₵{totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleAddCustom}
                className="px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-gray-800 to-black hover:opacity-90 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Custom Creation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
