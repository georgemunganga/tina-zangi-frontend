const PAYMENT_METHOD_CONFIG = {
  "mobile-money": {
    value: "mobile-money",
    label: "Mobile Money",
    kind: "online",
    description: "Pay securely in the Lenco mobile money window.",
    channels: ["mobile-money"],
  },
  card: {
    value: "card",
    label: "Card",
    kind: "online",
    description: "Pay securely in the Lenco card window.",
    channels: ["card"],
  },
  "cash-on-delivery": {
    value: "cash-on-delivery",
    label: "Payment on Delivery",
    kind: "offline",
    description: "Place the hardcopy order now and pay when it is delivered.",
    channels: [],
  },
};

function getPaymentMethodConfig(method) {
  return PAYMENT_METHOD_CONFIG[method];
}

function createPaymentReference(prefix = "PAY") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function getPaymentOptionsByCountry({ isZambian, purchaseType, formatType }) {
  const options = [];

  if (isZambian) {
    options.push(PAYMENT_METHOD_CONFIG["mobile-money"], PAYMENT_METHOD_CONFIG.card);
  } else {
    options.push(PAYMENT_METHOD_CONFIG.card);
  }

  if (
    isZambian &&
    purchaseType === "book-order" &&
    formatType === "hardcopy"
  ) {
    options.push(PAYMENT_METHOD_CONFIG["cash-on-delivery"]);
  }

  return options;
}

export function getPaymentMethodLabel(value) {
  return PAYMENT_METHOD_CONFIG[value]?.label || "Payment";
}

export function isCardPaymentMethod(value) {
  return value === "card";
}

export function isCashOnDeliveryMethod(value) {
  return value === "cash-on-delivery";
}

export function isOnlinePaymentMethod(value) {
  return getPaymentMethodConfig(value)?.kind === "online";
}

export function getLencoChannelsForMethod(value) {
  return getPaymentMethodConfig(value)?.channels || [];
}

export function createCashOnDeliveryRecord(options = {}) {
  return {
    method: "cash-on-delivery",
    methodLabel: getPaymentMethodLabel("cash-on-delivery"),
    reference: createPaymentReference("COD"),
    currencyCode: options.currencyCode || "ZMW",
    status: "Pending on Delivery",
  };
}

export function buildVerifiedPaymentRecord(paymentMethod, verification = {}) {
  return {
    method: paymentMethod,
    methodLabel:
      verification.methodLabel || getPaymentMethodLabel(paymentMethod),
    provider: verification.provider || "",
    accountName: verification.accountName || "",
    maskedAccount: verification.maskedAccount || "",
    reference: verification.reference || createPaymentReference("LEN"),
    currencyCode: verification.currency || verification.currencyCode || "ZMW",
    status: verification.paid ? "Paid" : verification.pending ? "Pending" : "Failed",
    gateway: "lenco",
    verifiedAt: verification.verifiedAt || null,
    lencoResponse: verification.lencoResponse || {},
  };
}
