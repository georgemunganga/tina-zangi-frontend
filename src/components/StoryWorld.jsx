import React from 'react';
import { storyWorld } from '../data/mock';
import { MapPin } from 'lucide-react';
import AfricanDecorations from './AfricanDecorations';

const StoryWorld = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-amber-50/40 overflow-hidden">
      {/* African Decorative Patterns */}
      <AfricanDecorations />
      
      {/* Artistic background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 20px 20px, #893614 2px, transparent 0)`,
               backgroundSize: '80px 80px'
             }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header with Artistic Touch */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <MapPin size={28} style={{ color: '#24a3ba' }} className="animate-float" />
          </div>
          
          <h2 
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[110px] font-bold mb-8 leading-none"
            style={{ 
              fontFamily: "'ADVENTURES', sans-serif",
              background: 'linear-gradient(135deg, #893614 0%, #c43500 50%, #f4a261 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em'
            }}
          >
            {storyWorld.title}
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="relative animate-float-slow">
              <div className="h-2 w-40" style={{ backgroundColor: '#c43500' }}></div>
              <div className="h-2 w-32 mt-1 mx-auto" style={{ backgroundColor: '#24a3ba' }}></div>
              <div className="h-2 w-24 mt-1 mx-auto" style={{ backgroundColor: '#893614' }}></div>
            </div>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {storyWorld.description}
          </p>
        </div>

        {/* Locations Grid with Enhanced Artistic Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {storyWorld.locations.map((location, index) => (
            <div
              key={location.name}
              className="group relative"
              style={{
                animation: `slideInFromRight 0.8s ease-out ${index * 200}ms both`
              }}
            >
              {/* Decorative frame corners */}
              <div className="absolute -inset-3 border-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" 
                   style={{ 
                     borderColor: index === 0 ? '#c43500' : index === 1 ? '#24a3ba' : '#893614',
                     borderImage: 'linear-gradient(135deg, currentColor 0%, transparent 100%) 1'
                   }}></div>

              {/* Main Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-6 hover:scale-105">
                {/* Location Image */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-2"
                  />
                  
                  {/* Gradient Overlays - More Artistic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#893614]/20 via-transparent to-[#24a3ba]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating decorative element */}
                  <div className="absolute top-6 right-6 w-16 h-16 border-4 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-500 animate-float"
                       style={{ 
                         borderColor: index === 0 ? '#f4a261' : index === 1 ? '#24a3ba' : '#c43500'
                       }}></div>
                </div>

                {/* Location Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {/* Location number badge */}
                  <div className="absolute top-[-40px] left-8 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl backdrop-blur-md"
                       style={{ 
                         backgroundColor: index === 0 ? '#c43500' : index === 1 ? '#24a3ba' : '#893614',
                         boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                       }}>
                    {index + 1}
                  </div>

                  <h3 
                    className="text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500 group-hover:translate-x-2"
                    style={{ 
                      fontFamily: "'Agu Display', serif",
                      textShadow: '3px 3px 8px rgba(0,0,0,0.8)'
                    }}
                  >
                    {location.name}
                  </h3>
                  
                  <div className="w-16 h-1 mb-4 transition-all duration-500 group-hover:w-24"
                       style={{ 
                         backgroundColor: index === 0 ? '#f4a261' : index === 1 ? '#24a3ba' : '#c43500'
                       }}></div>
                  
                  <p className="text-base sm:text-lg leading-relaxed opacity-95 transition-all duration-500 group-hover:opacity-100">
                    {location.description}
                  </p>
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                     style={{ 
                       background: index === 0 
                         ? 'linear-gradient(90deg, #c43500, #f4a261)' 
                         : index === 1 
                         ? 'linear-gradient(90deg, #24a3ba, #4ecdc4)'
                         : 'linear-gradient(90deg, #893614, #c43500)'
                     }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <div className="flex gap-3 items-center">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#893614' }}></div>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#c43500', animationDelay: '0.3s' }}></div>
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#24a3ba', animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryWorld;
