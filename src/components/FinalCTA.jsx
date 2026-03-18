import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      toast.success("Welcome to the Zangi world. Check your email for confirmation.");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fffaf5_100%)] py-20 sm:py-28">
      <div className="site-shell">
        <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#7c2d12_0%,#c2410c_100%)] p-8 text-white shadow-[0_30px_90px_rgba(124,45,18,0.22)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/68">
                Next step
              </p>
              <h2
                className="mt-4 text-5xl font-bold leading-none sm:text-6xl lg:text-[4.5rem]"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                Choose how you want to read Zangi.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/84">
                Browse the books, pick digital or hardcopy, and keep your orders
                in one place through the portal.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="brandSecondary" size="pillLg">
                  <Link to="/shop">
                    <span>Open the shop</span>
                    <ChevronRight size={18} />
                  </Link>
                </Button>

                <Button asChild variant="brandGhost" size="pillLg" className="border-white">
                  <Link to="/portal/login">
                    <span>Visit the portal</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/14 bg-white/10 p-7 backdrop-blur-md sm:p-8">
              <h3 className="text-2xl font-semibold text-white">Join the adventure</h3>
              <p className="mt-3 text-base leading-7 text-white/78">
                Subscribe for new titles, launch news, and learning ideas from
                the Zangi world.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="mt-6 grid gap-3">
                <label className="relative block">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-full border border-white/20 bg-white px-12 pr-4 text-slate-900 outline-none transition focus:border-white/60 focus:ring-4 focus:ring-white/20"
                  />
                </label>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="brandSecondary"
                  size="pillLg"
                  className="justify-center"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
