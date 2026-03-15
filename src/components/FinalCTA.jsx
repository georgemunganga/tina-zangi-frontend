import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail } from "lucide-react";
import { toast } from "sonner";

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
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="site-shell relative">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            className="mb-6 text-7xl font-bold leading-none text-white sm:text-8xl md:text-9xl lg:text-[120px]"
            style={{
              fontFamily: "'ADVENTURES', sans-serif",
              textShadow: "6px 6px 12px rgba(0,0,0,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Ready to choose your next format?
          </h2>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">
            Browse the books, pick digital or hardcopy, and keep every order in
            one place through the Zangi portal.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              style={{ color: "#7c2d12" }}
            >
              <span>Open the shop</span>
              <ChevronRight
                size={24}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>

            <Link
              to="/portal/login"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-white bg-transparent px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl"
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "#7c2d12";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "#fff";
              }}
            >
              <span>Visit the portal</span>
            </Link>
          </div>

          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
              <h3
                className="mb-3 text-2xl font-bold text-white"
                style={{ fontFamily: "'Agu Display', serif" }}
              >
                Join the Adventure
              </h3>
              <p className="mb-6 text-white/80">
                Subscribe to hear about new titles, learning ideas, and format
                releases.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-full py-4 pl-12 pr-4 text-gray-800 transition-all focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-8 py-4 font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: "#0f766e",
                    color: "#fff",
                  }}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
