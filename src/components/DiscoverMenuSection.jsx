import React from 'react';
import { useNavigate } from 'react-router-dom';
import smoothiesImage from '../assets/smoothies_juices_banner.png';

const categories = [
  {
    id: 'salads',
    title: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wraps',
    title: 'Wraps',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
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
