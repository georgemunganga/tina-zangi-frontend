import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import RequestStatusNotice from "@/components/ui/request-status-notice";
import PaymentDetailsSection from "@/components/PaymentDetailsSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  createLencoPaymentIntent,
  pollLencoPaymentVerification,
  verifyLencoPayment,
} from "@/lib/api";
import { openLencoPaymentWidget } from "@/lib/lenco";
import { getPaymentMethodLabel } from "@/lib/payment";
import { getRequestHint, getRequestMessage } from "@/lib/network";
import {
  getEventTicketDisplayLabel,
  resolveEventTicketSales,
} from "@/lib/event-ticket-pricing";

const defaultTheme = {
  primary: "rgba(124,45,18,0.84)",
  secondary: "rgba(15,118,110,0.72)",
  accent: "#fde68a",
};

const EventCheckoutPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = useMemo(() => events.find((item) => item.slug === slug), [slug]);
  const salesState = useMemo(() => resolveEventTicketSales(event), [event]);
  const {
    formatStoredAmount,
    getCheckoutPaymentOptions,
    siteCurrencyCode,
  } = useCommerce();
  const selectedTicketId = searchParams.get("ticket");
  const paymentReference = searchParams.get("reference");
  const processingReferencesRef = useRef(new Set());
  const handledRedirectReferenceRef = useRef("");

  const ticketOptions = salesState.ticketOptions;
  const selectedTicket =
    ticketOptions.find((item) => item.id === selectedTicketId) ||
    ticketOptions.find((item) => item.id === event?.defaultTicketType) ||
    ticketOptions[0];
  const effectiveCurrencyCode = siteCurrencyCode;
  const paymentOptions = useMemo(
    () =>
      getCheckoutPaymentOptions({
        purchaseType: "event-ticket",
        currencyCode: effectiveCurrencyCode,
      }),
    [effectiveCurrencyCode, getCheckoutPaymentOptions],
  );
  const defaultPaymentMethod = paymentOptions[0]?.value || "mobile-money";

  const [buyerType, setBuyerType] = useState("individual");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [formState, setFormState] = useState({
    email: "",
    phone: "",
    organizationName: "",
  });
  const [isPaymentBusy, setIsPaymentBusy] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentFeedback, setPaymentFeedback] = useState("");
  const [paymentStatusTitle, setPaymentStatusTitle] = useState("");
  const [paymentStatusHint, setPaymentStatusHint] = useState("");
  const [paymentStatusTone, setPaymentStatusTone] = useState("loading");

  useEffect(() => {
    if (!paymentOptions.some((option) => option.value === paymentMethod)) {
      setPaymentMethod(defaultPaymentMethod);
    }
  }, [defaultPaymentMethod, paymentMethod, paymentOptions]);

  const clearReferenceFromUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("reference");
    const nextSearch = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true },
    );
  }, [location.pathname, navigate, searchParams]);

  const completeVerifiedTicketPurchase = useCallback(
    async (reference, { shouldPoll = false } = {}) => {
      if (!reference || processingReferencesRef.current.has(reference)) {
        return;
      }

      processingReferencesRef.current.add(reference);
      setIsPaymentBusy(true);
      setPaymentError("");
      setPaymentStatusTone("loading");
      setPaymentStatusTitle(
        shouldPoll
          ? "Confirming your ticket payment"
          : "Verifying your ticket payment",
      );
      setPaymentFeedback(
        shouldPoll
          ? "Confirming your ticket payment with Lenco..."
          : "Verifying your ticket payment...",
      );
      setPaymentStatusHint("Please keep this page open while the verification finishes.");

      try {
        const verification = shouldPoll
          ? await pollLencoPaymentVerification(reference)
          : await verifyLencoPayment(reference);

        if (!verification?.paid) {
          setPaymentError(
            verification?.status === "failed"
              ? "The payment was not approved. No ticket was created."
              : "We could not confirm the payment yet. If you were charged, try again shortly.",
          );
          setPaymentStatusTone("error");
          setPaymentStatusTitle("Ticket payment not confirmed");
          setPaymentStatusHint(
            verification?.status === "failed"
              ? "You can try the payment again from this page."
              : "If the charge already happened, wait a moment and retry verification.",
          );
          toast.error("Ticket payment verification did not complete.");
          clearReferenceFromUrl();
          return;
        }

        setPaymentStatusTone("success");
        setPaymentStatusTitle("Ticket payment confirmed");
        setPaymentFeedback("Your ticket has been linked to the portal.");
        setPaymentStatusHint("Opening the portal now...");
        toast.success("Payment verified. Continue in the portal.");
        navigate(
          verification?.portalRedirect ||
            `/portal/login?role=${buyerType}&email=${encodeURIComponent(formState.email)}`,
        );
      } catch (error) {
        const message = getRequestMessage(
          error,
          "We could not confirm the payment. Please try again.",
        );
        setPaymentError(message);
        setPaymentStatusTone(
          error?.code === "NETWORK_ERROR" || error?.status === 0 ? "network" : "error",
        );
        setPaymentStatusTitle("We could not verify your payment");
        setPaymentStatusHint(getRequestHint(error));
        toast.error(message);
        clearReferenceFromUrl();
      } finally {
        processingReferencesRef.current.delete(reference);
        setIsPaymentBusy(false);
        setPaymentFeedback("");
      }
    },
    [buyerType, clearReferenceFromUrl, formState.email, navigate],
  );

  useEffect(() => {
    if (
      !paymentReference ||
      handledRedirectReferenceRef.current === paymentReference
    ) {
      return;
    }

    handledRedirectReferenceRef.current = paymentReference;
    completeVerifiedTicketPurchase(paymentReference, { shouldPoll: true });
  }, [completeVerifiedTicketPurchase, paymentReference]);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  if (event.status === "sold-out") {
    return <Navigate to={`/events/${event.slug}`} replace />;
  }

  if (!salesState.isSalesOpen) {
    return <Navigate to={`/events/${event.slug}`} replace />;
  }

  const theme = { ...defaultTheme, ...(event.heroTheme || {}) };
  const unitPrice = Number(selectedTicket?.priceZmw || 0);
  const total = Number((unitPrice * quantity).toFixed(2));
  const bannerStyle = {
    backgroundImage: `
      linear-gradient(120deg, rgba(15,23,42,0.74) 0%, rgba(15,23,42,0.3) 38%, rgba(15,23,42,0.84) 100%),
      radial-gradient(circle at top left, ${theme.primary} 0%, transparent 38%),
      radial-gradient(circle at bottom right, ${theme.secondary} 0%, transparent 42%),
      url("${event.image}")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const paymentNotice =
    "Online ticket payments are completed in the secure Lenco window in Zambian Kwacha.";

  const buildReturnPath = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("reference");
    params.set("ticket", selectedTicket.id);
    params.set("currency", effectiveCurrencyCode);
    const nextSearch = params.toString();
    return `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}`;
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setPaymentError("");

    if (!paymentOptions.some((option) => option.value === paymentMethod)) {
      toast.error("Choose a valid payment method to continue.");
      return;
    }

    setIsPaymentBusy(true);
    setPaymentStatusTone("loading");
    setPaymentStatusTitle("Preparing secure payment");
    setPaymentFeedback("Preparing secure payment...");
    setPaymentStatusHint("We are connecting to Lenco now.");

    try {
      const intent = await createLencoPaymentIntent({
        purchaseType: "event-ticket",
        buyerType,
        email: formState.email,
        customerName: formState.email,
        phone: formState.phone,
        channel: paymentMethod,
        currency: effectiveCurrencyCode,
        amount: total,
        returnPath: buildReturnPath(),
        metadata: {
          eventSlug: event.slug,
          eventTitle: event.title,
          startDate: event.startDate,
          dateLabel: event.dateLabel,
          timeLabel: event.timeLabel,
          locationLabel: event.locationLabel,
          ticketTypeId: selectedTicket.id,
          ticketTypeLabel: selectedTicket.label,
          quantity,
          unitPrice,
          pricingRoundKey: selectedTicket.roundKey,
          pricingRoundLabel: selectedTicket.roundLabel,
          organizationName:
            buyerType === "corporate" ? formState.organizationName : "",
        },
      });

      setPaymentFeedback("Opening the secure payment window...");
      setPaymentStatusTitle("Opening secure payment");
      setPaymentStatusHint("Finish the ticket payment in the Lenco window to continue.");

      await openLencoPaymentWidget({
        publicKey: intent.publicKey,
        reference: intent.reference,
        email: formState.email,
        amount: intent.amount,
        currency: intent.currency,
        channels: intent.channels,
        redirectUrl: intent.redirectUrl,
        onSuccess: () => {
          completeVerifiedTicketPurchase(intent.reference);
        },
        onConfirmationPending: () => {
          completeVerifiedTicketPurchase(intent.reference, { shouldPoll: true });
        },
        onClose: () => {
          if (processingReferencesRef.current.has(intent.reference)) {
            return;
          }

          setIsPaymentBusy(false);
          setPaymentFeedback("");
          setPaymentStatusHint("");
          toast.message("Payment window closed. No ticket was created.");
        },
      });
    } catch (error) {
      setIsPaymentBusy(false);
      setPaymentFeedback("");
      const message = getRequestMessage(
        error,
        "We could not start secure checkout.",
      );
      setPaymentError(message);
      setPaymentStatusTone(
        error?.code === "NETWORK_ERROR" || error?.status === 0 ? "network" : "error",
      );
      setPaymentStatusTitle("Secure payment could not start");
      setPaymentStatusHint(getRequestHint(error));
      toast.error(message);
    }
  };

  return (
    <div className="bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_36%,#f8fafc_100%)] py-24 sm:py-28">
      <div className="site-shell">
        <section className="relative overflow-hidden rounded-[2.75rem] text-white shadow-[0_32px_110px_rgba(15,23,42,0.18)]">
          <div className="absolute inset-0" style={bannerStyle} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12)_0%,transparent_24%)]" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <Button asChild variant="brandGhost" size="pillSm">
              <Link to={`/events/${event.slug}?ticket=${selectedTicket.id}`}>
                <ArrowLeft size={16} />
                <span>Back to event</span>
              </Link>
            </Button>
          </div>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Ticket details
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12]">
              Enter your details and pay
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Add your contact details, quantity, and payment method for this event.
            </p>

            <div className="mt-10 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
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
              </div>

              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px]">
                <div className="grid gap-2">
                  <Label>Buying as</Label>
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
            </div>

            <div className="mt-8">
              <PaymentDetailsSection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paymentOptions={paymentOptions}
                notice={paymentNotice}
              />
            </div>

            {paymentError ? (
              <RequestStatusNotice
                tone={paymentStatusTone}
                title={paymentStatusTitle || "Payment issue"}
                message={paymentError}
                hint={paymentStatusHint}
                className="mt-6"
              />
            ) : null}

            {!paymentError && paymentFeedback ? (
              <RequestStatusNotice
                tone={paymentStatusTone}
                title={paymentStatusTitle || "Payment update"}
                message={paymentFeedback}
                hint={paymentStatusHint}
                className="mt-6"
              />
            ) : null}

            <Button
              type="submit"
              variant="brand"
              size="pillLg"
              className="mt-8"
              disabled={isPaymentBusy}
            >
              {isPaymentBusy ? "Processing..." : "Continue to secure payment"}
            </Button>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem
                value="event-help"
                className="rounded-[1.5rem] border border-slate-200 px-5"
              >
                <AccordionTrigger className="text-sm font-semibold text-slate-700 hover:no-underline">
                  Need help?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-slate-600">
                  <p>{selectedTicket.delivery}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      asChild
                      variant="brandSecondary"
                      size="pillSm"
                      className="text-xs uppercase tracking-[0.08em] text-slate-600"
                    >
                      <Link to="/help/payments">Payment help</Link>
                    </Button>
                    <Button
                      asChild
                      variant="brandSecondary"
                      size="pillSm"
                      className="text-xs uppercase tracking-[0.08em] text-slate-600"
                    >
                      <Link to="/help/event-tickets">Event tickets</Link>
                    </Button>
                    <Button
                      asChild
                      variant="brandSecondary"
                      size="pillSm"
                      className="text-xs uppercase tracking-[0.08em] text-slate-600"
                    >
                      <Link to="/help/refund-policy">Refund policy</Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[2rem] bg-black p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <div className="flex items-center gap-3">
                <Ticket className="text-[#5eead4]" size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                  Ticket summary
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h2 className="text-3xl font-semibold">{event.title}</h2>
                {event.teaserImage ? (
                  <img
                    src={event.teaserImage}
                    alt={`${event.title} teaser art`}
                    className="h-[6rem] w-auto flex-shrink-0 rounded-[1rem] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              <div className="mt-6 space-y-4 text-sm text-white/75">
                <div className="flex items-center justify-between">
                  <span>Ticket type</span>
                  <span className="font-semibold text-white">
                    {getEventTicketDisplayLabel(selectedTicket)}
                  </span>
                </div>
                {selectedTicket.id === "standard" && selectedTicket.publicRoundLabel ? (
                  <div className="flex items-center justify-between">
                    <span>Pricing round</span>
                    <span className="font-semibold text-white">
                      {selectedTicket.publicRoundLabel}
                    </span>
                  </div>
                ) : null}
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
                    {formatStoredAmount(unitPrice, effectiveCurrencyCode)}
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
                    {formatStoredAmount(total, effectiveCurrencyCode)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-white/5 p-5 text-sm leading-7 text-white/75">
                <p>{selectedTicket.delivery}</p>
                <p className="mt-3">
                  {getEventTicketDisplayLabel(selectedTicket)} linked to{" "}
                  <span className="font-semibold text-white">
                    {formState.email || "your buyer email"}
                  </span>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventCheckoutPage;
