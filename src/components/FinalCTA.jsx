import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';
import { toast } from 'sonner';

const FinalCTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock newsletter signup
    setTimeout(() => {
      toast.success('Welcome to the Zangi adventure! Check your email for confirmation.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section 
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #893614 0%, #c43500 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <h2 
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] font-bold text-white mb-6 leading-none"
          style={{ 
            fontFamily: "'ADVENTURES', sans-serif",
            textShadow: '6px 6px 12px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em'
          }}
        >
          Ready for Adventure?
        </h2>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Give your child the gift of adventure, culture, and courage. Start the Zangi journey today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/books"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold bg-white transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
            style={{ color: '#893614' }}
          >
            <span>Shop Books Now</span>
            <ChevronRight 
              size={24} 
              className="transition-transform duration-300 group-hover:translate-x-2" 
            />
          </Link>

          <Link
            to="/story"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white border-2 border-white transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-2xl group"
            style={{ 
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#893614'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
          >
            <span>Explore the Story</span>
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Agu Display', serif" }}
            >
              Join the Adventure
            </h3>
            <p className="text-white/80 mb-6">
              Subscribe to get updates on new books, activities, and special offers
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={20} 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#24a3ba',
                  color: '#fff'
                }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
