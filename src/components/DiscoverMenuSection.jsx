import React from 'react';
import { useNavigate } from 'react-router-dom';
import smoothiesImage from '../assets/smoothies_juices_banner.webp';
import chickenSaladImg from '../assets/chicken_salad.webp';
import categoryBreakfastImg from '../assets/category_breakfast.png';
import sandwichImg from '../assets/gourmet_sandwich.webp';
import categoryWrapsImg from '../assets/category_wraps.png';

const categories = [
  {
    id: 'salads',
    title: 'Salads',
    image: chickenSaladImg,
  },
  {
    id: 'wraps',
    title: 'Wraps',
    image: categoryWrapsImg,
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches',
    image: sandwichImg,
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    image: categoryBreakfastImg,
  },
  {
    id: 'smoothies-juices',
    title: 'Smoothies & Juices',
    image: smoothiesImage,
  }
];

export default function DiscoverMenuSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching the red theme from the screenshot but adapted to our brand */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#164E3D] tracking-tight mb-2">
            Discover Our Menu
          </h2>
          <div className="w-24 h-2 bg-[#86EFAC] mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate('/menu')} // In a full implementation, you could pass state to auto-select this tab
              className="relative h-64 md:h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Gradient overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Title positioned at bottom left */}
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
