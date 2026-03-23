import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import { contactDetails } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/api";
import RequestStatusNotice from "@/components/ui/request-status-notice";
import { getRequestHint, getRequestMessage } from "@/lib/network";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestState, setRequestState] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setRequestState({
      tone: "loading",
      title: "Sending your message",
      message: "We are submitting your message to the Zangi team now.",
      hint: "Please keep this page open until the request finishes.",
    });

    try {
      const result = await submitContactMessage(formState);
      toast.success("Message received. We will be in touch soon.");
      setRequestState({
        tone: "success",
        title: "Message sent",
        message: "Your message has been received and the team has been notified.",
        hint: `Reference #${result.contactMessageId} has been created for this request.`,
      });
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      const message = getRequestMessage(
        error,
        "We could not send your message right now.",
      );
      const hint = getRequestHint(error);
      setRequestState({
        tone: error?.code === "NETWORK_ERROR" || error?.status === 0 ? "network" : "error",
        title: "Message not sent",
        message,
        hint,
      });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Zangi team."
        description="Use this page for general support, bulk-order questions, school partnerships, or product guidance."
        backgroundImage="/images/contact.png"
        backgroundImagePosition="72% center"
      />

      <section className="bg-[#fffaf5] pb-6 pt-12">
        <div className="site-shell">
          <div className="grid gap-4 rounded-[2rem] border border-amber-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Prefer self-serve help?
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                The support center includes the policy pages, FAQ, payment help,
                order tracking guidance, and event ticket instructions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild variant="brandDark" size="pill">
                <Link to="/help/overview">
                  <span>Open help center</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="brandSecondary" size="pill">
                <Link to="/help/contact-support">
                  <span>Support article</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-black p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
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
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Send a message
            </p>
            <div className="mt-6 grid gap-5">
              {requestState ? (
                <RequestStatusNotice
                  tone={requestState.tone}
                  title={requestState.title}
                  message={requestState.message}
                  hint={requestState.hint}
                />
              ) : null}
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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

            <Button
              type="submit"
              variant="brand"
              size="pill"
              className="mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
