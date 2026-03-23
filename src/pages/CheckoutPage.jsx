import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { books } from "@/data/mock";
import {
  createCashOnDeliveryBookOrder,
  createLencoPaymentIntent,
  pollLencoPaymentVerification,
  verifyLencoPayment,
} from "@/lib/api";
import { openLencoPaymentWidget } from "@/lib/lenco";
import {
  getPaymentMethodLabel,
  isCashOnDeliveryMethod,
} from "@/lib/payment";
import { getRequestHint, getRequestMessage } from "@/lib/network";

const CheckoutPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const formatType = searchParams.get("format");
  const requestedQuantity = Number(searchParams.get("quantity"));
  const requestedCurrencyCode = searchParams.get("currency")?.toUpperCase();
  const paymentReference = searchParams.get("reference");
  const {
    currencyCode,
    convertFromUsdToCurrency,
    formatFromUsdToCurrency,
    formatStoredAmount,
    getCheckoutPaymentOptions,
    siteCurrencyCode,
  } = useCommerce();

  const product = useMemo(() => books.find((item) => item.slug === slug), [slug]);
  const selectedFormat = useMemo(
    () => product?.formats.find((item) => item.type === formatType),
    [formatType, product],
  );
  const effectiveCurrencyCode =
    requestedCurrencyCode === siteCurrencyCode || requestedCurrencyCode === "USD"
      ? requestedCurrencyCode
      : currencyCode;
  const isCheckoutInZambia = effectiveCurrencyCode === siteCurrencyCode;
  const paymentOptions = useMemo(
    () =>
      getCheckoutPaymentOptions({
        purchaseType: "book-order",
        formatType: selectedFormat?.type,
        currencyCode: effectiveCurrencyCode,
      }),
    [effectiveCurrencyCode, getCheckoutPaymentOptions, selectedFormat?.type],
  );
  const defaultPaymentMethod = paymentOptions[0]?.value || "mobile-money";
  const initialQuantity =
    Number.isFinite(requestedQuantity) && requestedQuantity > 0
      ? Math.floor(requestedQuantity)
      : 1;
  const processingReferencesRef = useRef(new Set());
  const handledRedirectReferenceRef = useRef("");

  const [buyerType, setBuyerType] = useState("individual");
  const [quantity, setQuantity] = useState(initialQuantity);
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

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity, slug, formatType]);

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

  const completeVerifiedOrder = useCallback(
    async (reference, { shouldPoll = false } = {}) => {
      if (!reference || processingReferencesRef.current.has(reference)) {
        return;
      }

      processingReferencesRef.current.add(reference);
      setIsPaymentBusy(true);
      setPaymentError("");
      setPaymentStatusTone("loading");
      setPaymentStatusTitle(
        shouldPoll ? "Confirming your payment" : "Verifying your payment",
      );
      setPaymentFeedback(
        shouldPoll
          ? "Confirming your payment with Lenco..."
          : "Verifying your payment...",
      );
      setPaymentStatusHint("Please keep this page open while the response comes back.");

      try {
        const verification = shouldPoll
          ? await pollLencoPaymentVerification(reference)
          : await verifyLencoPayment(reference);

        if (!verification?.paid) {
          setPaymentError(
            verification?.status === "failed"
              ? "The payment was not approved. No order was created."
              : "We could not confirm the payment yet. If you were charged, try again shortly.",
          );
          setPaymentStatusTone("error");
          setPaymentStatusTitle("Payment not confirmed");
          setPaymentStatusHint(
            verification?.status === "failed"
              ? "You can choose a different payment method and try again."
              : "If the charge already happened, wait a moment and retry verification.",
          );
          toast.error("Payment verification did not complete.");
          clearReferenceFromUrl();
          return;
        }

        setPaymentStatusTone("success");
        setPaymentStatusTitle("Payment confirmed");
        setPaymentFeedback("Your order has been linked to the portal.");
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
    completeVerifiedOrder(paymentReference, { shouldPoll: true });
  }, [completeVerifiedOrder, paymentReference]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  if (!selectedFormat) {
    return <Navigate to={`/shop/${product.slug}`} replace />;
  }

  const unitPrice = convertFromUsdToCurrency(
    selectedFormat.price,
    effectiveCurrencyCode,
  );
  const total = Number((unitPrice * quantity).toFixed(2));
  const paymentNotice = isCashOnDeliveryMethod(paymentMethod)
    ? "This order is placed now and stays unpaid until delivery."
    : isCheckoutInZambia
      ? "Online payments for Zambia open in the Lenco window."
      : "International checkout uses secure card payment in the Lenco window.";

  const buildReturnPath = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("reference");
    params.set("format", selectedFormat.type);
    params.set("quantity", String(quantity));
    params.set("currency", effectiveCurrencyCode);
    const nextSearch = params.toString();
    return `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentError("");

    if (!paymentOptions.some((option) => option.value === paymentMethod)) {
      toast.error("Choose a valid payment method to continue.");
      return;
    }

    if (isCashOnDeliveryMethod(paymentMethod)) {
      try {
        const result = await createCashOnDeliveryBookOrder({
          productSlug: product.slug,
          formatType: selectedFormat.type,
          quantity,
          buyerType,
          email: formState.email,
          phone: formState.phone,
          organizationName:
            buyerType === "individual" ? "" : formState.organizationName,
          currency: effectiveCurrencyCode,
        });

        toast.success("Order placed. Payment will be collected on delivery.");
        setPaymentStatusTone("success");
        setPaymentStatusTitle("Order placed");
        setPaymentFeedback("Your hardcopy order is now in the system.");
        setPaymentStatusHint("Opening the linked portal account now...");
        navigate(
          result.portalRedirect ||
            `/portal/login?role=${buyerType}&email=${encodeURIComponent(formState.email)}`,
        );
        return;
      } catch (error) {
        const message = getRequestMessage(
          error,
          "We could not place the COD order.",
        );
        setPaymentError(message);
        setPaymentStatusTone(
          error?.code === "NETWORK_ERROR" || error?.status === 0 ? "network" : "error",
        );
        setPaymentStatusTitle("Order not placed");
        setPaymentStatusHint(getRequestHint(error));
        toast.error(message);
        return;
      }
    }

    setIsPaymentBusy(true);
    setPaymentStatusTone("loading");
    setPaymentStatusTitle("Preparing secure payment");
    setPaymentFeedback("Preparing secure payment...");
    setPaymentStatusHint("We are connecting to Lenco now.");

    try {
      const intent = await createLencoPaymentIntent({
        purchaseType: "book-order",
        buyerType,
        email: formState.email,
        customerName: formState.email,
        phone: formState.phone,
        channel: paymentMethod,
        currency: effectiveCurrencyCode,
        amount: total,
        returnPath: buildReturnPath(),
        metadata: {
          productSlug: product.slug,
          productTitle: product.title,
          formatType: selectedFormat.type,
          quantity,
          unitPrice,
          organizationName:
            buyerType === "individual" ? "" : formState.organizationName,
        },
      });

      setPaymentFeedback("Opening the secure payment window...");
      setPaymentStatusTitle("Opening secure payment");
      setPaymentStatusHint("Finish the payment in the Lenco window to continue.");

      await openLencoPaymentWidget({
        publicKey: intent.publicKey,
        reference: intent.reference,
        email: formState.email,
        amount: intent.amount,
        currency: intent.currency,
        channels: intent.channels,
        redirectUrl: intent.redirectUrl,
        onSuccess: () => {
          completeVerifiedOrder(intent.reference);
        },
        onConfirmationPending: () => {
          completeVerifiedOrder(intent.reference, { shouldPoll: true });
        },
        onClose: () => {
          if (processingReferencesRef.current.has(intent.reference)) {
            return;
          }

          setIsPaymentBusy(false);
          setPaymentFeedback("");
          setPaymentStatusHint("");
          toast.message("Payment window closed. No order was created.");
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
    <section className="bg-[linear-gradient(160deg,#fff7ed_0%,#ffffff_55%,#f8fafc_100%)] py-28">
      <div className="site-shell">
        <Button asChild variant="brandSoft" size="pillSm">
          <Link to={`/shop/${product.slug}`}>
            <ArrowLeft size={16} />
            <span>Back to product</span>
          </Link>
        </Button>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Checkout
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#7c2d12]">
              Complete your order
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              You are ordering the <strong>{selectedFormat.label}</strong>{" "}
              edition of <strong>{product.title}</strong>.
            </p>

            <div className="mt-8 grid gap-5">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input
                    id="checkout-email"
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
                  <Label htmlFor="checkout-phone">Phone</Label>
                  <Input
                    id="checkout-phone"
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
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="checkout-quantity">Quantity</Label>
                  <Input
                    id="checkout-quantity"
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

              {buyerType !== "individual" ? (
                <div className="grid gap-2">
                  <Label htmlFor="checkout-org">Organization name</Label>
                  <Input
                    id="checkout-org"
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
              {isCashOnDeliveryMethod(paymentMethod)
                ? "Confirm pay on delivery"
                : isPaymentBusy
                  ? "Processing..."
                  : "Continue to secure payment"}
            </Button>

            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem
                value="checkout-help"
                className="rounded-[1.5rem] border border-slate-200 px-5"
              >
                <AccordionTrigger className="text-sm font-semibold text-slate-700 hover:no-underline">
                  Need help?
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-slate-600">
                  <p>{selectedFormat.fulfillment}</p>
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
                      <Link
                        to={
                          selectedFormat.type === "digital"
                            ? "/help/digital-downloads"
                            : "/help/shipping-delivery"
                        }
                      >
                        {selectedFormat.type === "digital"
                          ? "Digital delivery"
                          : "Shipping guide"}
                      </Link>
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
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                Order summary
              </p>
              <h2 className="mt-4 text-3xl font-semibold">{product.title}</h2>
              <div className="mt-6 space-y-4 text-sm text-white/75">
                <div className="flex items-center justify-between">
                  <span>Format</span>
                  <span className="font-semibold text-white">
                    {selectedFormat.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unit price</span>
                  <span className="font-semibold text-white">
                    {formatFromUsdToCurrency(
                      selectedFormat.price,
                      effectiveCurrencyCode,
                    )}
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
                {selectedFormat.fulfillment}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
