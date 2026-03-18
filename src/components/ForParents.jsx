import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import { parentBenefits } from "@/data/mock";
import { Button } from "@/components/ui/button";

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
      "The books feel calm, premium, and readable rather than noisy or overwhelming.",
  },
  {
    title: "Values that stay useful",
    description:
      "Kindness, empathy, courage, and imagination show up as lived choices in the stories.",
  },
  {
    title: "Flexible for home and school",
    description:
      "The reading and activity formats work well for families, educators, and group settings.",
  },
];

const ForParents = () => {
  return (
    <section className="bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              For parents and educators
            </p>
            <h2
              className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.5rem]"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Story-led trust for the adults choosing it.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Zangi gives adults a clear reason to say yes: emotional substance,
              cultural care, and practical value beyond a single reading.
            </p>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Why families trust it
              </p>
              <div className="mt-6 space-y-4">
                {trustPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-[1.5rem] bg-[#fffaf5] px-5 py-5"
                  >
                    <p className="font-semibold text-[#7c2d12]">{pillar.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
              <Button asChild variant="brand" size="pill" className="mt-6">
                <Link to="/parents">Visit the parents page</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {parentBenefits.map((benefit) => {
              const Icon = iconMap[benefit.icon];

              return (
                <article
                  key={benefit.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
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
