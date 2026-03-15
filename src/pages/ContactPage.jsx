import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import { contactDetails } from "@/data/mock";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Message received. We will be in touch soon.");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Zangi team."
        description="Use this page for general support, bulk-order questions, school partnerships, or product guidance."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5eead4]">
              Contact details
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-[#f97316]" size={20} />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-white/75">{contactDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-[#f97316]" size={20} />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-white/75">{contactDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-[#f97316]" size={20} />
                <div>
                  <p className="font-semibold">Studio</p>
                  <p className="text-sm text-white/75">{contactDetails.address}</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-white/60">{contactDetails.responseTime}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Send a message
            </p>
            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition-colors focus:border-[#f97316]"
                  required
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition-colors focus:border-[#f97316]"
                  required
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Message</span>
                <textarea
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  rows={6}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition-colors focus:border-[#f97316]"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
