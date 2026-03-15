import React from "react";
import PageHero from "@/components/PageHero";
import { faqData, parentPageSections, testimonials } from "@/data/mock";

const ParentsPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Parents"
        title="A calmer, more confident way to say yes to the story."
        description="This page is designed to help parents, schools, and educators quickly understand why Zangi is valuable, how it supports children, and what kind of experience the books are built to deliver."
        actions={[
          { label: "Shop now", to: "/shop", variant: "solid" },
          { label: "Contact us", to: "/contact", variant: "outline" },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parentPageSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                  Parent lens
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-[#7c2d12]">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {section.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5eead4]">
                Frequently asked
              </p>
              <div className="mt-6 space-y-5">
                {faqData.map((item) => (
                  <article key={item.question} className="rounded-2xl bg-white/5 p-5">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                Parent reflections
              </p>
              <div className="mt-6 space-y-5">
                {testimonials.slice(0, 2).map((testimonial) => (
                  <article key={testimonial.name} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                    <p className="text-base leading-7 text-slate-600">
                      "{testimonial.quote}"
                    </p>
                    <p className="mt-4 font-semibold text-[#7c2d12]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentsPage;
