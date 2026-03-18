import React from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/mock";

const Testimonials = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="site-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Social proof
          </p>
          <h2
            className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.4rem]"
            style={{ fontFamily: "'ADVENTURES', sans-serif" }}
          >
            What readers and adults respond to.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Early responses center on how the books feel: warm, meaningful, and
            worth staying with after the page turns.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1 text-[#ea580c]">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <Quote size={20} className="text-[#ea580c]/40" />
              </div>

              <p className="mt-6 text-lg leading-8 text-slate-700">
                "{testimonial.quote}"
              </p>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="font-semibold text-[#7c2d12]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
