import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import {
  contactDetails,
  footerNavigation,
  navigationItems,
  socialLinks,
} from "@/data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">
      <div className="site-shell py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3
              className="mb-4 text-4xl font-bold"
              style={{
                fontFamily: "'ADVENTURES', sans-serif",
                color: "#f97316",
              }}
            >
              ZANGI
            </h3>
            <p className="mb-6 leading-relaxed text-gray-400">
              A story-led brand built around courage, culture, and premium
              reading experiences for children, families, and schools.
            </p>
            <div className="flex gap-4">
              <a
                href={socialLinks.facebook}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.youtube}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold" style={{ color: "#2dd4bf" }}>
              Explore
            </h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="inline-block text-gray-400 transition-colors duration-300 hover:translate-x-2 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold" style={{ color: "#2dd4bf" }}>
              More
            </h4>
            <ul className="space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold" style={{ color: "#2dd4bf" }}>
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail
                  size={20}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#f97316" }}
                />
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone
                  size={20}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#f97316" }}
                />
                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin
                  size={20}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#f97316" }}
                />
                <span>{contactDetails.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="site-shell py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-gray-400 sm:text-left">
              © {currentYear} Zangi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/portal/login"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Portal Login
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Bulk Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
