import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { heroData } from "@/data/mock";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(145deg,#7c2d12_0%,#c2410c_45%,#ea580c_100%)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5%] top-10 h-72 w-72 rounded-full bg-[#facc15]/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-80 w-80 rounded-full bg-[#22d3ee]/20 blur-3xl" />
      </div>

      <Star className="absolute left-[10%] top-[20%] text-white/40" size={18} />
      <Star className="absolute right-[12%] top-[28%] text-[#fde68a]/50" size={22} />
      <Sparkles className="absolute right-[8%] top-[42%] text-white/25" size={20} />

      <div className="site-shell relative">
        <div className="grid min-h-[calc(100vh-80px)] items-end gap-14 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="flex flex-col justify-center pb-8 text-white">
            <div
              className={`inline-flex items-center gap-3 self-start rounded-full border border-white/20 bg-white/10 px-5 py-2.5 shadow-lg backdrop-blur transition-all duration-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <Sparkles size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/80">
                {heroData.subtitle}
              </p>
            </div>

            <h1
              className={`mt-8 text-7xl font-bold leading-[0.88] sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[10rem] transition-all duration-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{
                fontFamily: "'ADVENTURES', sans-serif",
                textShadow: "0 16px 42px rgba(0,0,0,0.28)",
              }}
            >
              ZANGI
            </h1>

            <p
              className={`mt-6 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl transition-all duration-700 delay-100 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {heroData.tagline}
            </p>

            <p
              className={`mt-6 max-w-xl text-lg leading-8 text-white/82 sm:text-xl transition-all duration-700 delay-200 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {heroData.description}
            </p>

            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <Link
                to={heroData.primaryCtaLink}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#7c2d12] shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span>{heroData.primaryCtaText}</span>
                <ChevronRight size={18} />
              </Link>
              <Link
                to={heroData.secondaryCtaLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span>{heroData.secondaryCtaText}</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div
              className={`relative transition-all duration-1000 ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="absolute bottom-[8%] left-1/2 h-[140px] w-[280px] -translate-x-1/2 rounded-full bg-[#fcd34d]/20 blur-3xl sm:h-[180px] sm:w-[360px] lg:h-[220px] lg:w-[460px]" />
              <img
                src={heroData.characterImage}
                alt="Zangi character art"
                className="relative z-10 w-[78vw] max-w-[360px] sm:max-w-[460px] lg:max-w-[560px]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  filter: "drop-shadow(0 24px 55px rgba(0,0,0,0.24))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
