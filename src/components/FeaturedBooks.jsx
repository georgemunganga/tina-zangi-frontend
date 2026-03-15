import React from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/mock';
import { Check, ShoppingCart, Sparkles } from 'lucide-react';

const FeaturedBooks = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={28} style={{ color: '#24a3ba' }} />
            <p className="text-lg uppercase tracking-widest" style={{ color: '#24a3ba' }}>
              Available Now
            </p>
            <Sparkles size={28} style={{ color: '#24a3ba' }} />
          </div>
          <h2 
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[110px] font-bold mb-6 leading-none"
            style={{ 
              fontFamily: "'ADVENTURES', sans-serif",
              background: 'linear-gradient(135deg, #893614 0%, #c43500 50%, #f4a261 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em'
            }}
          >
            Begin Your Adventure
          </h2>
          <div className="w-24 h-1.5 mx-auto mb-8" style={{ backgroundColor: '#c43500' }}></div>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the complete Zangi collection. Premium storytelling that children love and parents trust.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Book Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Book Type Badge */}
                <div 
                  className="absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold text-white backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(36, 163, 186, 0.9)' }}
                >
                  {book.type}
                </div>

                {/* In Stock Badge */}
                {book.inStock && (
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold text-white bg-green-500/90 backdrop-blur-md">
                    In Stock
                  </div>
                )}
              </div>

              {/* Book Content */}
              <div className="p-8">
                {/* Title */}
                <h3 
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ 
                    fontFamily: "'Agu Display', serif",
                    color: '#893614'
                  }}
                >
                  {book.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  {book.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {book.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div 
                        className="mt-1 rounded-full p-1"
                        style={{ backgroundColor: '#24a3ba' }}
                      >
                        <Check className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p 
                      className="text-4xl font-bold"
                      style={{ color: '#893614' }}
                    >
                      ${book.price}
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ backgroundColor: '#c43500' }}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Decorative Border */}
              <div 
                className="absolute top-0 left-0 right-0 h-2 transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: '#c43500' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="mt-16 text-center">
          <div 
            className="inline-block bg-gradient-to-r from-amber-50 to-orange-50 border-2 rounded-2xl p-8 shadow-lg"
            style={{ borderColor: '#c43500' }}
          >
            <p className="text-2xl font-bold mb-3" style={{ color: '#893614' }}>
              Bundle & Save!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Get both the Story Book and Activity Books together
            </p>
            <Link
              to="/books"
              className="inline-block px-10 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#893614' }}
            >
              View Bundle Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
