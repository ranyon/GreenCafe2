import React, { useState } from 'react';
import { INGREDIENTS_LIST } from '../data/menuData';
import { Sparkles, Plus, Trash2, Check, Activity, Box, Filter } from 'lucide-react';

export default function RecipeBuilder({ onAddCustomToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIngredients, setSelectedIngredients] = useState([
    INGREDIENTS_LIST[0], // Baby Spinach
    INGREDIENTS_LIST[3], // English Cucumber
    INGREDIENTS_LIST[12], // Chargrilled Chicken
    INGREDIENTS_LIST[19], // Smashed Avocado
    INGREDIENTS_LIST[20], // Feta Cheese
  ]);
  const [customName, setCustomName] = useState('My Custom 1000 cc Bowl');

  const categories = ['All', 'Veggies', 'Protein', 'Toppings & Extras'];

  const filteredIngredients = activeCategory === 'All'
    ? INGREDIENTS_LIST
    : INGREDIENTS_LIST.filter((ing) => ing.category === activeCategory);

  const toggleIngredient = (ing) => {
    if (selectedIngredients.some((item) => item.id === ing.id)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ing.id));
    } else {
      if (selectedIngredients.length >= 8) return; // Limit to 8
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const totalPrice = 50.00 + selectedIngredients.length * 5.00;

  const handleAddCustom = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      category: 'salads',
      name: customName || 'Custom 1000 cc Bowl',
      tagline: `Handcrafted 1000 cc bowl with ${selectedIngredients.map((i) => i.name).join(', ')}`,
      price: totalPrice,
      size: '1000 cc',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Bowl', '1000 cc', 'Made Fresh'],
    };
    onAddCustomToCart(customItem);
  };

  return (
    <section id="builder-section" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 border border-gray-900/30 text-black text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Custom Bowl Builder
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            CREATE YOUR <span className="text-gradient-lime italic font-serif">OWN BOWL</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Mix and match fresh veggies, premium proteins, and delicious toppings & extras for your custom 1000 cc bowl.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Ingredient Selector with Category Tabs */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>Select Ingredients</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  {selectedIngredients.length} / 8 Selected
                </span>
              </h3>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      activeCategory === cat
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 max-h-[480px] overflow-y-auto pr-1">
              {filteredIngredients.map((ing) => {
                const isSelected = selectedIngredients.some((item) => item.id === ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gray-100 border-gray-900 shadow-lg shadow-black/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ing.icon className="w-5 h-5 text-black" />
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-black text-white' : 'bg-gray-200 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-0.5">
                        {ing.category}
                      </span>
                      <p className="text-xs font-bold text-gray-900 truncate">{ing.name}</p>
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
                Name Your Custom Bowl
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 font-bold text-sm focus:outline-none focus:border-black"
                placeholder="e.g. My Custom 1000 cc Bowl"
              />
            </div>

            {/* Selected Ingredients Tags */}
            <div className="mb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Assembled Veggies, Proteins & Extras
              </span>
              <div className="flex flex-wrap gap-2 min-h-[80px] p-3 rounded-xl bg-white border border-gray-200">
                {selectedIngredients.map((ing) => (
                  <span
                    key={ing.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-black text-xs font-semibold border border-gray-300 animate-scale-in"
                  >
                    <ing.icon className="w-3.5 h-3.5 text-black" />
                    <span>{ing.name}</span>
                    <button
                      onClick={() => toggleIngredient(ing)}
                      className="hover:text-red-500 transition-colors ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Portion Size & Layer Metrics Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-white border border-gray-200 mb-6 relative overflow-hidden shadow-sm">
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-amber-500" />
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Bowl Size</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">1000 cc</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-amber-400 h-full rounded-full w-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Layers</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">{selectedIngredients.length} / 8</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(selectedIngredients.length / 8) * 100}%` }}
                  />
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
                Add Bowl to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
