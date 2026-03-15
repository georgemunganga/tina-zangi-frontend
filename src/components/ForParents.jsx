import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import { parentBenefits } from "@/data/mock";

const iconMap = {
  BookOpen,
  Heart,
  GraduationCap,
  Users,
};

const trustPillars = [
  {
    title: "Thoughtful pacing",
    description:
      "The books are designed to feel calm, premium, and readable rather than noisy or overwhelming.",
  },
  {
    title: "Values that stay useful",
    description:
      "Kindness, empathy, courage, and imagination are presented as lived choices, not slogans.",
  },
  {
    title: "Flexible for home and school",
    description:
      "The reading and activity formats work for families, educators, and group settings alike.",
  },
];

const ForParents = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50/40 to-white py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              For parents and educators
            </p>
            <h2
              className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.6rem]"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Story-led trust, not just story-led style.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Zangi is built to help adults say yes with confidence. The books
              carry emotional substance, cultural care, and practical value for
              readers who need more than disposable entertainment.
            </p>
            <div className="mt-8 rounded-[2rem] bg-[#7c2d12] p-8 text-white shadow-[0_24px_70px_rgba(124,45,18,0.24)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Parent confidence
              </p>
              <div className="mt-4 space-y-4">
                {trustPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl bg-white/10 p-4">
                    <p className="font-semibold">{pillar.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/parents"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#7c2d12] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Visit the parents page
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {parentBenefits.map((benefit) => {
              const Icon = iconMap[benefit.icon];

              return (
                <article
                  key={benefit.title}
                  className="rounded-[2rem] border border-amber-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[#7c2d12]">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForParents;
