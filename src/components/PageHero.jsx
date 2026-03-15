import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const baseActionClass =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5";

const variants = {
  solid: "bg-white text-[#7c2d12] shadow-lg hover:shadow-xl",
  outline: "border border-white/60 bg-white/10 text-white hover:bg-white/15",
};

const PageHero = ({
  eyebrow,
  title,
  description,
  actions = [],
  align = "center",
  children,
}) => {
  const centered = align === "center";

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(145deg,#7c2d12_0%,#b45309_45%,#ea580c_100%)] py-28 text-white sm:py-32">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#facc15]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#38bdf8]/20 blur-3xl" />
      </div>

      <div className="site-shell relative">
        <div className={centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
          {eyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              {eyebrow}
            </p>
          ) : null}

          <h1
            className="text-5xl font-bold leading-none sm:text-6xl lg:text-[5.5rem]"
            style={{ fontFamily: "'ADVENTURES', sans-serif" }}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">
            {description}
          </p>

          {actions.length ? (
            <div
              className={`mt-10 flex flex-wrap gap-4 ${
                centered ? "justify-center" : "justify-start"
              }`}
            >
              {actions.map((action) => (
                <Link
                  key={`${action.label}-${action.to}`}
                  to={action.to}
                  className={`${baseActionClass} ${variants[action.variant || "solid"]}`}
                >
                  <span>{action.label}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          ) : null}

          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
