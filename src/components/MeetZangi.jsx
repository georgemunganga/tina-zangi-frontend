import React from 'react';
import { zangiCharacter } from '../data/mock';
import { Compass, Heart, Lightbulb, Sparkles } from 'lucide-react';

const iconMap = {
  'Courageous': Compass,
  'Curious': Lightbulb,
  'Kind-hearted': Heart,
  'Resourceful': Sparkles
};

const MeetZangi = () => {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">
      {/* Subtle Background Elements - Corporate Refined */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-gradient-cool rounded-full blur-[120px] opacity-10"></div>
      <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-gradient-warm rounded-full blur-[120px] opacity-10"></div>

      <div className="relative max-w-[1300px] mx-auto px-6 sm:px-12 z-10">
        
        {/* Section Header - Professional Spacing */}
        <div className="text-center mb-20 lg:mb-24">
          
          {/* Main Title - Better Hierarchy */}
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-bold mb-8 leading-none tracking-tight"
            style={{ 
              fontFamily: "'ADVENTURES', sans-serif",
              background: 'linear-gradient(135deg, #893614 0%, #c43500 50%, #f4a261 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Meet {zangiCharacter.name}
          </h2>
          
          {/* Decorative Line - Refined */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-[#c43500] rounded-full"></div>
            <Sparkles size={20} className="text-[#c43500] opacity-60" />
            <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-[#c43500] rounded-full"></div>
          </div>

          {/* Character Tagline - Professional */}
          <p 
            className="text-2xl sm:text-3xl mb-10 italic font-semibold text-[#c43500] opacity-90"
            style={{ lineHeight: '1.4' }}
          >
            "{zangiCharacter.tagline}"
          </p>
          
          {/* Description - Better Line Height */}
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal" style={{ lineHeight: '1.8' }}>
            {zangiCharacter.description}
          </p>
        </div>

        {/* Character Traits Grid - Corporate Polish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {zangiCharacter.traits.map((trait, index) => {
            const Icon = iconMap[trait.name];
            const gradients = ['from-[#e76f51] to-[#f4a261]', 'from-[#24a3ba] to-[#4ecdc4]', 'from-[#ffd166] to-[#f4a261]', 'from-[#e76f51] to-[#c43500]'];
            const gradient = gradients[index % 4];
            
            return (
              <div
                key={trait.name}
                className="group bg-white rounded-2xl p-8 text-center transition-all duration-400 hover:-translate-y-2"
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              >
                {/* Icon - Refined Gradient */}
                <div 
                  className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 mx-auto transition-transform duration-400 group-hover:scale-110`}
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                >
                  <Icon className="text-white" size={36} />
                </div>

                {/* Trait Name - Better Typography */}
                <h3 
                  className="text-2xl font-bold mb-4 text-[#893614]"
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '-0.01em'
                  }}
                >
                  {trait.name}
                </h3>

                {/* Trait Description - Professional Line Height */}
                <p className="text-gray-600 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {trait.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Character Details - Corporate Clean */}
        <div className="mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#e76f51] to-[#f4a261] mb-4 transition-transform duration-300 hover:scale-110" style={{ boxShadow: '0 6px 20px rgba(231, 111, 81, 0.3)' }}>
              <Sparkles className="text-white" size={24} />
            </div>
            <p className="text-xs uppercase tracking-widest text-[#24a3ba] mb-2 font-bold">Age</p>
            <p className="text-2xl font-bold text-[#893614]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {zangiCharacter.age}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#24a3ba] to-[#4ecdc4] mb-4 transition-transform duration-300 hover:scale-110" style={{ boxShadow: '0 6px 20px rgba(36, 163, 186, 0.3)' }}>
              <Heart className="text-white" size={24} />
            </div>
            <p className="text-xs uppercase tracking-widest text-[#24a3ba] mb-2 font-bold">Homeland</p>
            <p className="text-2xl font-bold text-[#893614]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {zangiCharacter.homeland}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetZangi;
