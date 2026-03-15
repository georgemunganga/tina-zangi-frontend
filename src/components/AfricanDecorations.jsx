import React from 'react';

// Floating African Pattern Decorations Component
const AfricanDecorations = () => {
  return (
    <>
      {/* Top Left Pattern */}
      <div className="absolute top-20 left-10 opacity-20 animate-float-slow pointer-events-none" style={{ animationDelay: '0s' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="#893614" strokeWidth="3"/>
          <circle cx="40" cy="40" r="25" stroke="#c43500" strokeWidth="2"/>
          <circle cx="40" cy="40" r="15" stroke="#24a3ba" strokeWidth="2"/>
          <path d="M40 5 L40 75 M5 40 L75 40" stroke="#893614" strokeWidth="2"/>
        </svg>
      </div>

      {/* Top Right Pattern */}
      <div className="absolute top-40 right-20 opacity-20 animate-float pointer-events-none" style={{ animationDelay: '1s' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="#c43500" strokeWidth="3" transform="rotate(45 50 50)"/>
          <rect x="25" y="25" width="50" height="50" stroke="#24a3ba" strokeWidth="2" transform="rotate(45 50 50)"/>
        </svg>
      </div>

      {/* Bottom Left Pattern */}
      <div className="absolute bottom-32 left-16 opacity-15 animate-scale-rotate pointer-events-none" style={{ animationDelay: '2s' }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <polygon points="60,10 110,110 10,110" stroke="#893614" strokeWidth="3" fill="none"/>
          <polygon points="60,30 90,90 30,90" stroke="#c43500" strokeWidth="2" fill="none"/>
          <circle cx="60" cy="70" r="15" stroke="#24a3ba" strokeWidth="2"/>
        </svg>
      </div>

      {/* Bottom Right Pattern */}
      <div className="absolute bottom-20 right-24 opacity-20 animate-float-slow pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <path d="M45 5 L85 45 L45 85 L5 45 Z" stroke="#24a3ba" strokeWidth="3" fill="none"/>
          <path d="M45 25 L65 45 L45 65 L25 45 Z" stroke="#c43500" strokeWidth="2" fill="none"/>
          <circle cx="45" cy="45" r="8" stroke="#893614" strokeWidth="2"/>
        </svg>
      </div>

      {/* Center Floating Pattern */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 animate-pulse pointer-events-none">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <circle cx="75" cy="75" r="70" stroke="#893614" strokeWidth="2" strokeDasharray="5,10"/>
          <circle cx="75" cy="75" r="50" stroke="#c43500" strokeWidth="2" strokeDasharray="5,10"/>
          <circle cx="75" cy="75" r="30" stroke="#24a3ba" strokeWidth="2" strokeDasharray="5,10"/>
        </svg>
      </div>
    </>
  );
};

export default AfricanDecorations;
