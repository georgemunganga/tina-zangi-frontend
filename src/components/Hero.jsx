import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Star } from 'lucide-react';
import { heroData } from '../data/mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end" style={{
      background: 'linear-gradient(135deg, #822819 0%, #D04A1D 25%, #F77539 50%, #A02A25 100%)'
    }}>
      {/* Refined Glow Effect - Matching the provided image */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" 
             style={{ 
               background: 'radial-gradient(circle, rgba(255, 170, 153, 0.3) 0%, transparent 70%)',
               filter: 'blur(80px)'
             }}></div>
      </div>

      {/* Subtle Floating Sparkles - Light colored for dark bg */}
      <Star className="absolute top-[15%] left-[12%] text-white opacity-30 animate-pulse" size={20} style={{ animationDelay: '0s' }} />
      <Star className="absolute top-[25%] right-[18%] text-[#FFAA99] opacity-40 animate-pulse" size={24} style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute top-[40%] right-[12%] text-white opacity-25 animate-pulse" size={22} style={{ animationDelay: '0.5s' }} />

      {/* Content Container - Properly Grounded */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 pb-0">
        
        <div className="grid lg:grid-cols-2 gap-16 items-end min-h-[calc(100vh-80px)]">
          
          {/* Left: Text Content - Vertically Centered */}
          <div className="flex flex-col justify-center py-20 lg:py-32">
            
            {/* Subtitle Badge - Corporate Refined for dark bg */}
            <div 
              className={`inline-flex items-center self-start gap-3 px-5 py-2.5 rounded-full shadow-md mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Sparkles size={18} className="text-white" />
              <p className="text-white font-bold text-sm tracking-wider uppercase">
                {heroData.subtitle}
              </p>
            </div>

            {/* Main Title - Better Hierarchy with White/Light Color */}
            <div 
              className={`mb-8 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <h1 
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-bold leading-[0.9] tracking-tight"
                style={{ 
                  fontFamily: "'ADVENTURES', sans-serif",
                  color: '#ffffff',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.3), 0 0 40px rgba(255, 170, 153, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}
              >
                ZANGI
              </h1>
            </div>

            {/* Tagline - Better Typography with White */}
            <div 
              className={`mb-10 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '-0.02em',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {heroData.tagline}
              </h2>
            </div>

            {/* Description - Professional Spacing with WHITE text */}
            <div 
              className={`mb-12 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <p className="text-lg sm:text-xl text-white max-w-xl leading-relaxed font-normal" style={{ lineHeight: '1.7', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                {heroData.description}
              </p>
            </div>

            {/* CTA Button - Corporate Polish - White button for dark bg */}
            <div 
              className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <Link
                to={heroData.ctaLink}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold transition-all duration-400 hover:shadow-2xl hover:scale-105 group relative overflow-hidden"
                style={{ 
                  background: 'white',
                  color: '#c43500',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                <span className="relative z-10">{heroData.ctaText}</span>
                <ChevronRight 
                  size={22} 
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f4a261]/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
              </Link>
            </div>
          </div>

          {/* Right: Character - GROUNDED at Bottom */}
          <div className="relative flex items-end justify-center lg:justify-end h-full">
            <div 
              className={`relative transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {/* Refined Glow - More Subtle */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-t from-[#f4a261]/30 to-transparent rounded-full blur-3xl"></div>
              
              {/* Character Card - Grounded */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                {/* Character Image - No Floating */}
                <img
                  src={heroData.characterImage}
                  alt="Zangi - The Brave Explorer"
                  className="w-full max-w-md lg:max-w-lg"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))'
                  }}
                />
                
                {/* Refined Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-xl" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                  <Star size={28} className="text-[#ffd166] fill-[#ffd166]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Scroll Indicator - White for dark bg */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-xs font-semibold text-white tracking-widest uppercase">Scroll</p>
        <div className="w-5 h-8 border-2 border-white rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
