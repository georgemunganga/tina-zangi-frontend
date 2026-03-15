import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Menu, ShoppingBag, X } from "lucide-react";
import { navigationItems } from "@/data/mock";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="site-shell">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'ADVENTURES', sans-serif",
              color: isScrolled ? "#7c2d12" : "#fff",
              textShadow: isScrolled ? "none" : "3px 3px 6px rgba(0,0,0,0.5)",
              fontSize: "2rem",
              letterSpacing: "0.05em",
            }}
          >
            ZANGI
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c2410c] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#c2410c" }}
            >
              <ShoppingBag size={18} />
              <span>Shop</span>
            </Link>

            <Link
              to="/portal/login"
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "border-slate-300 bg-white text-slate-800"
                  : "border-white/30 bg-white/10 text-white"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Portal</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className={`rounded-lg p-2 transition-colors md:hidden ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-gray-200 bg-white shadow-xl md:hidden">
          <nav className="site-shell space-y-4 py-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block rounded-lg px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/shop"
              className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: "#c2410c" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag size={18} />
              <span>Open Shop</span>
            </Link>
            <Link
              to="/portal/login"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>Portal</span>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
