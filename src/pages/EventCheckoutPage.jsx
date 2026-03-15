import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PaymentDetailsSection from "@/components/PaymentDetailsSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCommerce } from "@/providers/CommerceProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { events } from "@/data/mock";
import {
  addStoredTicketPurchase,
  createMockTicketPurchase,
} from "@/lib/portal-store";
import {
  buildPaymentRecord,
  getPaymentMethodLabel,
  validatePaymentDetails,
} from "@/lib/payment";

const defaultTheme = {
  primary: "rgba(124,45,18,0.84)",
  secondary: "rgba(15,118,110,0.72)",
  accent: "#fde68a",
};

const EventCheckoutPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = useMemo(() => events.find((item) => item.slug === slug), [slug]);
  const {
    checkoutNotice,
    convertFromUsd,
    currencyCode,
    formatCheckoutFromUsd,
    formatStoredAmount,
    paymentOptions,
  } = useCommerce();
  const defaultPaymentMethod = paymentOptions[0]?.value || "mobile-money";

  const [buyerType, setBuyerType] = useState("individual");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [formState, setFormState] = useState({
    buyerName: "",
    email: "",
    phone: "",
    organizationName: "",
    ticketHolderName: "",
  });
  const [paymentState, setPaymentState] = useState({
    mobileProvider: "mtn-momo",
    mobileAccountName: "",
    mobileNumber: "",
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (!paymentOptions.some((option) => option.value === paymentMethod)) {
      setPaymentMethod(defaultPaymentMethod);
    }
  }, [defaultPaymentMethod, paymentMethod, paymentOptions]);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  if (event.status === "sold-out") {
    return <Navigate to={`/events/${event.slug}`} replace />;
  }

  const theme = { ...defaultTheme, ...(event.heroTheme || {}) };
  const unitPrice = convertFromUsd(event.standardTicket.price);
  const total = Number((unitPrice * quantity).toFixed(2));
  const effectiveTicketHolder = formState.ticketHolderName || formState.buyerName;
  const bannerStyle = {
    backgroundImage: `
      linear-gradient(120deg, rgba(15,23,42,0.74) 0%, rgba(15,23,42,0.3) 38%, rgba(15,23,42,0.84) 100%),
      radial-gradient(circle at top left, ${theme.primary} 0%, transparent 38%),
      radial-gradient(circle at bottom right, ${theme.secondary} 0%, transparent 42%),
      url(${event.image})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const paymentError = validatePaymentDetails(paymentMethod, paymentState);

    if (paymentError) {
      toast.error(paymentError);
      return;
    }

    const payment = buildPaymentRecord(paymentMethod, paymentState, {
      currencyCode,
    });

    const ticketPurchase = createMockTicketPurchase({
      eventSlug: event.slug,
      eventTitle: event.title,
      startDate: event.startDate,
      dateLabel: event.dateLabel,
      timeLabel: event.timeLabel,
      locationLabel: event.locationLabel,
      buyerType,
      buyerName: formState.buyerName,
      email: formState.email,
      phone: formState.phone,
      organizationName:
        buyerType === "corporate" ? formState.organizationName : "",
      currency: currencyCode,
      ticketHolderName: effectiveTicketHolder,
      quantity,
      unitPrice,
      total,
      payment,
    });

    addStoredTicketPurchase(ticketPurchase);
    toast.success(
      `Payment ${payment.reference} captured. Continue in the portal.`,
    );
    navigate(
      `/portal/login?role=${buyerType}&ticket=${ticketPurchase.id}&email=${encodeURIComponent(
        formState.email,
      )}`,
    );
  };

  return (
    <div className="bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_36%,#f8fafc_100%)] py-24 sm:py-28">
      <div className="site-shell">
        <section className="relative overflow-hidden rounded-[2.75rem] text-white shadow-[0_32px_110px_rgba(15,23,42,0.18)]">
          <div className="absolute inset-0" style={bannerStyle} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12)_0%,transparent_24%)]" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <Link
              to={`/events/${event.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ArrowLeft size={16} />
              <span>Back to event</span>
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
                  Event checkout
                </p>
                <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                  Complete your ticket details in one step.
                </h1>
                <p className="mt-5 text-base leading-8 text-white/82 sm:text-lg">
                  You are checking out for <strong>{event.title}</strong>. The
                  purchase remains digital-only, and the ticket pass appears in the
                  portal after submission.
                </p>
                <p className="mt-5 rounded-[1.5rem] border border-white/12 bg-white/10 px-5 py-4 text-sm leading-7 text-white/82 backdrop-blur-xl">
                  {checkoutNotice}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
                    <CalendarDays size={15} />
                    <span>{event.dateLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
                    <Clock3 size={15} />
                    <span>{event.timeLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
                    <MapPin size={15} />
                    <span>{event.locationLabel}</span>
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/12 p-6 backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: theme.accent, color: "#7c2d12" }}
                  >
                    <Ticket size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                      Ticket type
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {event.standardTicket.label}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-4xl font-semibold">
                  {formatCheckoutFromUsd(event.standardTicket.price)}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  {event.availabilityNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Buyer details
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12]">
              Reserve your digital event pass
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Checkout stays intentionally simple. Enter the buyer details, choose
              quantity, choose a payment method, and optionally name a different
              ticket holder if the pass is for someone else.
            </p>

            <div className="mt-10 grid gap-5">
              <div className="grid gap-2">
                <Label>Buyer type</Label>
                <Select value={buyerType} onValueChange={setBuyerType}>
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Choose buyer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate / School</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ticket-buyer-name">Buyer name</Label>
                <Input
                  id="ticket-buyer-name"
                  className="h-12 rounded-2xl"
                  value={formState.buyerName}
                  onChange={(eventField) =>
                    setFormState((current) => ({
                      ...current,
                      buyerName: eventField.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ticket-email">Email</Label>
                <Input
                  id="ticket-email"
                  type="email"
                  className="h-12 rounded-2xl"
                  value={formState.email}
                  onChange={(eventField) =>
                    setFormState((current) => ({
                      ...current,
                      email: eventField.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ticket-phone">Phone</Label>
                <Input
                  id="ticket-phone"
                  className="h-12 rounded-2xl"
                  value={formState.phone}
                  onChange={(eventField) =>
                    setFormState((current) => ({
                      ...current,
                      phone: eventField.target.value,
                    }))
                  }
                  required
                />
              </div>

              {buyerType === "corporate" ? (
                <div className="grid gap-2">
                  <Label htmlFor="ticket-org-name">Organization name</Label>
                  <Input
                    id="ticket-org-name"
                    className="h-12 rounded-2xl"
                    value={formState.organizationName}
                    onChange={(eventField) =>
                      setFormState((current) => ({
                        ...current,
                        organizationName: eventField.target.value,
                      }))
                    }
                    required
                  />
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label htmlFor="ticket-holder-name">Ticket holder name</Label>
                <Input
                  id="ticket-holder-name"
                  className="h-12 rounded-2xl"
                  value={formState.ticketHolderName}
                  onChange={(eventField) =>
                    setFormState((current) => ({
                      ...current,
                      ticketHolderName: eventField.target.value,
                    }))
                  }
                  placeholder="Optional if the ticket is for someone else"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ticket-quantity">Quantity</Label>
                <Input
                  id="ticket-quantity"
                  type="number"
                  min="1"
                  className="h-12 rounded-2xl"
                  value={quantity}
                  onChange={(eventField) =>
                    setQuantity(Math.max(1, Number(eventField.target.value) || 1))
                  }
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <PaymentDetailsSection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paymentState={paymentState}
                setPaymentState={setPaymentState}
              />
            </div>

            <Button
              type="submit"
              className="mt-8 rounded-full bg-[#c2410c] px-7 text-white hover:bg-[#9a3412]"
            >
              Pay online and continue
            </Button>
          </form>

          <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <div className="flex items-center gap-3">
                <Ticket className="text-[#5eead4]" size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5eead4]">
                  Ticket summary
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold">{event.title}</h2>

              <div className="mt-6 space-y-4 text-sm text-white/75">
                <div className="flex items-center justify-between">
                  <span>Ticket type</span>
                  <span className="font-semibold text-white">
                    {event.standardTicket.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Date</span>
                  <span className="font-semibold text-white">{event.dateLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time</span>
                  <span className="text-right font-semibold text-white">
                    {event.timeLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Venue</span>
                  <span className="max-w-[180px] text-right font-semibold text-white">
                    {event.locationLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unit price</span>
                  <span className="font-semibold text-white">
                    {formatCheckoutFromUsd(event.standardTicket.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment method</span>
                  <span className="font-semibold text-white">
                    {getPaymentMethodLabel(paymentMethod)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quantity</span>
                  <span className="font-semibold text-white">{quantity}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base">
                  <span>Total</span>
                  <span className="font-semibold text-white">
                    {formatStoredAmount(total, currencyCode)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-[#0f766e]" size={18} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                    Digital delivery
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {event.standardTicket.delivery}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    Only a masked payment method reference is retained in this mock
                    checkout after payment submission.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/help/payments"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                    >
                      Payment help
                    </Link>
                    <Link
                      to="/help/event-tickets"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                    >
                      Event tickets
                    </Link>
                    <Link
                      to="/help/refund-policy"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                    >
                      Refund policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <div className="flex items-start gap-3">
                <UserRound className="mt-1 text-[#ea580c]" size={18} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                    Ticket holder rule
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    If the ticket holder name is left blank, the pass will be issued
                    to the buyer name. Quantity above one is still treated as one
                    bundle in this phase.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventCheckoutPage;
