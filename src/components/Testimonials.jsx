import React from 'react';
import { testimonials } from '../data/mock';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-amber-50/30">
      <div className="site-shell">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p 
            className="text-lg uppercase tracking-widest mb-4"
            style={{ color: '#24a3ba' }}
          >
            What Parents Say
          </p>
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
            Real Stories, Real Impact
          </h2>
          <div className="w-24 h-1.5 mx-auto" style={{ backgroundColor: '#c43500' }}></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Quote Icon */}
              <div 
                className="absolute top-6 right-6 opacity-10 transition-all duration-500 group-hover:opacity-20"
              >
                <Quote size={60} style={{ color: '#893614' }} />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill="#c43500" 
                    style={{ color: '#c43500' }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <p 
                  className="font-bold text-lg mb-1"
                  style={{ color: '#893614' }}
                >
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>

              {/* Decorative Border */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: '#24a3ba' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
