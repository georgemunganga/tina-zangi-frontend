import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PageHero = ({
  eyebrow,
  title,
  description,
  actions = [],
  align = "center",
  className = "",
  backgroundImage,
  backgroundImagePosition = "center",
  children,
}) => {
  const centered = align === "center";
  const resolvedBackgroundImage =
    backgroundImage || '/images/banner bg (1).png';

  return (
    <section
      className={`relative overflow-hidden bg-[linear-gradient(145deg,#7c2d12_0%,#b45309_45%,#ea580c_100%)] py-28 text-white sm:py-32 ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.34]"
        style={{
          backgroundImage: `url("${resolvedBackgroundImage}")`,
          backgroundPosition: backgroundImagePosition,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(124,45,18,0.62)_0%,rgba(180,83,9,0.54)_45%,rgba(234,88,12,0.66)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.18)_0%,transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.32)_0%,transparent_34%)]" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#facc15]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#38bdf8]/20 blur-3xl" />
      </div>

      <div className="site-shell relative">
        <div className={centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
          {/* {eyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              {eyebrow}
            </p>
       \   ) : null} */}

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
                <Button
                  key={`${action.label}-${action.to}`}
                  asChild
                  variant={action.variant === "outline" ? "brandGhost" : "brandSecondary"}
                  size="pillLg"
                >
                  <Link to={action.to}>
                    <span>{action.label}</span>
                    <ChevronRight size={18} />
                  </Link>
                </Button>
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
