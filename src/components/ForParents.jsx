import React from 'react';
import { parentBenefits } from '../data/mock';
import { BookOpen, Heart, GraduationCap, Users } from 'lucide-react';

const iconMap = {
  'BookOpen': BookOpen,
  'Heart': Heart,
  'GraduationCap': GraduationCap,
  'Users': Users
};

const ForParents = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p 
            className="text-lg uppercase tracking-widest mb-4"
            style={{ color: '#24a3ba' }}
          >
            For Parents & Educators
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
            Why Choose Zangi?
          </h2>
          <div className="w-24 h-1.5 mx-auto mb-8" style={{ backgroundColor: '#c43500' }}></div>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            More than just a story—Zangi is a premium learning experience that builds character, celebrates culture, and inspires young minds.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          {parentBenefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: '#24a3ba' }}
                >
                  <Icon className="text-white" size={32} />
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#893614' }}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Border */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                  style={{ backgroundColor: '#c43500' }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 sm:p-16 text-center shadow-xl">
          <h3 
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ 
              fontFamily: "'Agu Display', serif",
              color: '#893614'
            }}
          >
            Trusted by Parents & Educators Worldwide
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of families who have discovered the magic of Zangi. Our books are crafted with care, cultural authenticity, and a commitment to quality storytelling that both children and adults appreciate.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="text-center">
              <p 
                className="text-5xl font-bold mb-2"
                style={{ color: '#c43500' }}
              >
                5★
              </p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-gray-300"></div>
            <div className="text-center">
              <p 
                className="text-5xl font-bold mb-2"
                style={{ color: '#c43500' }}
              >
                10,000+
              </p>
              <p className="text-sm text-gray-600">Happy Readers</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-gray-300"></div>
            <div className="text-center">
              <p 
                className="text-5xl font-bold mb-2"
                style={{ color: '#c43500' }}
              >
                Ages 5-17
              </p>
              <p className="text-sm text-gray-600">Perfect For</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForParents;
