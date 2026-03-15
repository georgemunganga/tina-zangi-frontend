import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { navigationItems } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold tracking-tight transition-all duration-300 hover:scale-105"
            style={{ 
              fontFamily: "'ADVENTURES', sans-serif",
              color: isScrolled ? '#893614' : '#fff',
              textShadow: isScrolled ? 'none' : '3px 3px 6px rgba(0,0,0,0.5)',
              fontSize: '2rem',
              letterSpacing: '0.05em'
            }}
          >
            ZANGI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 relative group ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c43500] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              to="/books"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#c43500' }}
            >
              <ShoppingBag size={18} />
              <span>Shop Books</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
          <nav className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: '#c43500' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag size={18} />
              <span>Shop Books</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
