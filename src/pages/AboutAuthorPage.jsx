import React from "react";
import PageHero from "@/components/PageHero";
import { authorProfile } from "@/data/mock";

const AboutAuthorPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="About the Author"
        title="Why Zangi is being built as a lasting story world."
        description="Zangi is designed with the ambition of a world, not only a single product. This page explains the creative intent behind that decision."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <img
              src={authorProfile.portrait}
              alt={authorProfile.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              {authorProfile.name}
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#7c2d12] sm:text-5xl">
              {authorProfile.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {authorProfile.bio}
            </p>

            <div className="mt-8 grid gap-4">
              {authorProfile.principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-[1.5rem] border border-amber-100 bg-[#fffaf5] p-5"
                >
                  <p className="text-base leading-7 text-slate-700">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAuthorPage;
