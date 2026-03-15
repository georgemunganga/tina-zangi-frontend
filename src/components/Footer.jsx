import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { navigationItems, socialLinks } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <h3 
              className="text-4xl font-bold mb-4"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: '#c43500'
              }}
            >
              ZANGI
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              An African adventure story brand celebrating courage, culture, and the magic of childhood wonder.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href={socialLinks.facebook}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={socialLinks.instagram}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={socialLinks.twitter}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={socialLinks.youtube}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#24a3ba' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#24a3ba' }}>
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/books"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Story Books
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Activity Books
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Book Bundles
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#24a3ba' }}>
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="mt-1 flex-shrink-0" style={{ color: '#c43500' }} />
                <a 
                  href="mailto:hello@zangi.com"
                  className="hover:text-white transition-colors"
                >
                  hello@zangi.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={20} className="mt-1 flex-shrink-0" style={{ color: '#c43500' }} />
                <a 
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="mt-1 flex-shrink-0" style={{ color: '#c43500' }} />
                <span>
                  Adventure Lane<br />
                  Story City, SC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Zangi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
