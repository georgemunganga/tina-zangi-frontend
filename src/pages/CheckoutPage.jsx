import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { books } from "@/data/mock";
import { addStoredOrder, createMockOrder } from "@/lib/portal-store";
import {
  buildPaymentRecord,
  getPaymentMethodLabel,
  validatePaymentDetails,
} from "@/lib/payment";

const CheckoutPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formatType = searchParams.get("format");
  const {
    checkoutNotice,
    convertFromUsd,
    currencyCode,
    formatCheckoutFromUsd,
    formatStoredAmount,
    paymentOptions,
  } = useCommerce();

  const product = useMemo(() => books.find((item) => item.slug === slug), [slug]);
  const selectedFormat = useMemo(
    () => product?.formats.find((item) => item.type === formatType),
    [formatType, product],
  );
  const defaultPaymentMethod = paymentOptions[0]?.value || "mobile-money";

  const [buyerType, setBuyerType] = useState("individual");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    organizationName: "",
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

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  if (!selectedFormat) {
    return <Navigate to={`/shop/${product.slug}`} replace />;
  }

  const unitPrice = convertFromUsd(selectedFormat.price);
  const total = Number((unitPrice * quantity).toFixed(2));

  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentError = validatePaymentDetails(paymentMethod, paymentState);

    if (paymentError) {
      toast.error(paymentError);
      return;
    }

    const payment = buildPaymentRecord(paymentMethod, paymentState, {
      currencyCode,
    });

    const order = createMockOrder({
      productSlug: product.slug,
      productTitle: product.title,
      format: selectedFormat.type,
      currency: currencyCode,
      unitPrice,
      quantity,
      buyerType,
      customerName: formState.name,
      email: formState.email,
      phone: formState.phone,
      organizationName:
        buyerType === "individual" ? "" : formState.organizationName,
      total,
      payment,
    });

    addStoredOrder(order);
    toast.success(`Payment ${payment.reference} captured. Continue in the portal.`);
    navigate(
      `/portal/login?role=${buyerType}&order=${order.id}&email=${encodeURIComponent(
        formState.email,
      )}`,
    );
  };

  return (
    <section className="bg-[linear-gradient(160deg,#fff7ed_0%,#ffffff_55%,#f8fafc_100%)] py-28">
      <div className="site-shell">
        <Link
          to={`/shop/${product.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-[#9a3412] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          <span>Back to product</span>
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Checkout
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#7c2d12]">
              Complete your order details
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              You have selected the <strong>{selectedFormat.label}</strong> format
              for <strong>{product.title}</strong>.
            </p>
            <p className="mt-4 rounded-[1.5rem] bg-[#fff7ed] px-5 py-4 text-sm leading-7 text-[#9a3412]">
              {checkoutNotice}
            </p>

            <div className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <Label>Buyer type</Label>
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
                <Label htmlFor="checkout-name">Name</Label>
                <Input
                  id="checkout-name"
                  className="h-12 rounded-2xl"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    className="h-12 rounded-2xl"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        email: event.target.value,
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
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
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
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        organizationName: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label htmlFor="checkout-quantity">Quantity</Label>
                <Input
                  id="checkout-quantity"
                  type="number"
                  min="1"
                  className="h-12 rounded-2xl"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
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

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5eead4]">
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
                    {formatCheckoutFromUsd(selectedFormat.price)}
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

            <div className="rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                Fulfillment note
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {selectedFormat.fulfillment}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Online payments are mocked in this phase. Orders appear in the
                portal with only masked payment metadata after submission.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/help/payments"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                >
                  Payment help
                </Link>
                <Link
                  to={
                    selectedFormat.type === "digital"
                      ? "/help/digital-downloads"
                      : "/help/shipping-delivery"
                  }
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                >
                  {selectedFormat.type === "digital"
                    ? "Digital delivery"
                    : "Shipping guide"}
                </Link>
                <Link
                  to="/help/refund-policy"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                >
                  Refund policy
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
