import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Menu, ShoppingBag, X } from "lucide-react";
import { navigationItems } from "@/data/mock";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

function getPortalLabel(session) {
  const portalMode =
    session?.portalMode || (["corporate", "wholesale"].includes(session?.role) ? "group" : "individual");
  const groupType =
    session?.groupType || (portalMode === "group" ? (session?.role === "wholesale" ? "wholesale" : "corporate") : null);

  if (portalMode === "group") {
    return groupType === "wholesale" ? "Wholesale Dashboard" : "Group Dashboard";
  }

  return "Reader Dashboard";
}

const Header = ({ forceDarkLogo = false, forceDarkText = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session: portalSession } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const portalLink = portalSession ? "/portal" : "/portal/login";
  const portalLabel = portalSession ? getPortalLabel(portalSession) : "Login to portal";
  const useDarkHeaderText = isScrolled || forceDarkText;
  const logoSrc =
    isScrolled || forceDarkLogo
      ? "/images/logo-Zangi.svg"
      : "/images/logo-white-Zangi.svg";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="site-shell">
        <div className="flex py-2 items-center justify-between">
          <Link
            to="/"
            className="transition-all duration-300 hover:scale-[1.02]"
            aria-label="Zangi home"
          >
            <img
              src={logoSrc}
              alt="Zangi"
              className="h-14 w-auto sm:h-20"
              loading="eager"
              decoding="async"
              style={{
                filter: isScrolled || forceDarkLogo
                  ? "none"
                  : "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            />
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  useDarkHeaderText ? "text-gray-800" : "text-white"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c2410c] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Button asChild variant="brand" size="pill">
              <Link to="/shop">
                <ShoppingBag size={18} />
                <span>Shop</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={useDarkHeaderText ? "brandSecondary" : "brandGhost"}
              size="pill"
            >
              <Link to={portalLink}>
                <LayoutDashboard size={16} />
                <span>{portalLabel}</span>
              </Link>
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className={`rounded-lg p-2 transition-colors md:hidden ${
              useDarkHeaderText ? "text-gray-800" : "text-white"
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
            <Button asChild variant="brand" size="pillLg" className="w-full">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingBag size={18} />
                <span>Open Shop</span>
              </Link>
            </Button>
            <Button asChild variant="brandSecondary" size="pillLg" className="w-full">
              <Link to={portalLink} onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard size={18} />
                <span>{portalSession ? `Open ${portalLabel}` : "Portal"}</span>
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
