import { contactDetails, faqData } from "@/data/mock";

export const supportSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Core guidance for browsing, ordering, and getting help.",
  },
  {
    id: "orders-payments",
    title: "Orders & Payments",
    description: "How books, checkout, delivery, and tracking work.",
  },
  {
    id: "events",
    title: "Events",
    description: "Digital ticket and event purchase guidance.",
  },
  {
    id: "legal",
    title: "Legal",
    description: "Privacy, refunds, and terms for public website use.",
  },
];

const extendedFaqItems = [
  ...faqData,
  {
    question: "Which currency will I see during checkout?",
    answer:
      "Site pricing is presented in Zambian Kwacha. During checkout, visitors in Zambia pay in Kwacha, while international visitors are guided to pay in USD with the supported card methods shown for that region.",
  },
  {
    question: "Are event tickets physical or digital?",
    answer:
      "Event tickets are digital-only in this version. After purchase they appear in the portal as ticket passes with the event details and pass code.",
  },
];

export const supportArticles = [
  {
    slug: "overview",
    sectionId: "getting-started",
    eyebrow: "Support Center",
    title: "Find policies, order help, and purchase guidance in one place.",
    description:
      "Use the support center for clear answers on payments, refunds, delivery, event tickets, legal policies, and the best way to contact the Zangi team.",
    readingTime: "4 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Start with the FAQ if you need a fast answer before contacting support.",
      "Order and payment articles explain books, formats, delivery, and tracking.",
      "Legal pages are written for public website use and should still be reviewed before production reliance.",
    ],
    content: [
      {
        title: "What this area covers",
        paragraphs: [
          "The support center is a public, no-login space designed to make the operational side of the website easier to understand.",
          "It combines legal pages with practical guidance so parents, schools, and event buyers can move from reading to checkout with fewer questions.",
        ],
        bullets: [
          "Policies for privacy, refunds, and site terms.",
          "Help for digital books, hardcopy delivery, and order tracking.",
          "Event ticket guidance for digital-only purchases.",
        ],
      },
      {
        title: "Best places to start",
        paragraphs: [
          "If you are comparing formats, begin with Payments and Digital Downloads. If you are waiting for a physical order, begin with Shipping & Delivery and Order Tracking. If you are buying for an event, begin with Event Tickets and Refund Policy.",
        ],
      },
    ],
    relatedSlugs: ["faq", "payments", "contact-support"],
  },
  {
    slug: "faq",
    sectionId: "getting-started",
    eyebrow: "Frequently Asked Questions",
    title: "Quick answers for the questions most visitors ask first.",
    description:
      "This page gathers the common questions around age ranges, book formats, portal delivery, hardcopy tracking, checkout currency, and event tickets.",
    readingTime: "5 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Answers are written to match the current public site and checkout flow.",
      "Use this page before sending a support request if you need a fast overview.",
    ],
    content: [
      {
        title: "How to use the FAQ",
        paragraphs: [
          "This page is meant for fast clarification. If your question is policy-related, the Legal section gives the longer-form version. If your question is order-specific, the contact support article will point you to the right next step.",
        ],
      },
    ],
    faqs: extendedFaqItems,
    relatedSlugs: ["overview", "payments", "event-tickets"],
  },
  {
    slug: "payments",
    sectionId: "orders-payments",
    eyebrow: "Payments",
    title: "How pricing, currencies, and payment methods work on Zangi.",
    description:
      "This guide explains the site-wide Kwacha pricing display, the region-aware checkout currency, and the supported payment methods shown at checkout.",
    readingTime: "5 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Site pricing is shown in Zambian Kwacha.",
      "Checkout keeps Zambia in Kwacha and switches international buyers to USD.",
      "Payment methods change based on the buyer's detected region.",
    ],
    content: [
      {
        title: "Pricing display",
        paragraphs: [
          "Public product and event pricing is shown in Zambian Kwacha across the site so the catalog remains consistent.",
          "When you reach checkout, the payment currency is confirmed again so the final order summary matches the region-specific payment flow.",
        ],
      },
      {
        title: "Supported payment methods",
        paragraphs: [
          "The payment options shown at checkout depend on where the buyer appears to be located.",
        ],
        bullets: [
          "Zambia: Mobile Money and ATM Card in ZMW.",
          "Outside Zambia: Visa and Mastercard in USD.",
          "The available method list is shown before submission inside the checkout form itself.",
        ],
      },
      {
        title: "What buyers should prepare",
        paragraphs: [
          "Buyers should be ready to provide the contact details tied to the purchase and the correct payment details for the method shown in checkout.",
        ],
        bullets: [
          "Book checkout supports individual, corporate, and wholesale buyer types.",
          "Event ticket checkout supports individual and corporate buyers.",
          "The checkout summary shows the selected format or ticket type, quantity, and total before submission.",
        ],
        callout: {
          tone: "info",
          title: "Need refund rules too?",
          description:
            "Open Refund Policy for the rules that apply to digital books, hardcopy books, and digital event tickets.",
        },
      },
    ],
    relatedSlugs: ["refund-policy", "digital-downloads", "shipping-delivery"],
  },
  {
    slug: "digital-downloads",
    sectionId: "orders-payments",
    eyebrow: "Digital Orders",
    title: "How digital books become available after purchase.",
    description:
      "Digital book orders are delivered through the portal flow and move through a short status path before the file is ready to access.",
    readingTime: "4 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Digital orders are tied to the buyer email used during checkout.",
      "The portal is the place to watch status updates and access ready items.",
    ],
    content: [
      {
        title: "What happens after checkout",
        paragraphs: [
          "When a digital format is purchased, the order appears in the portal and moves through a short progress flow until the item is ready to download.",
        ],
        bullets: [
          "Received",
          "Confirmed",
          "Preparing",
          "Ready to Download",
        ],
      },
      {
        title: "Where to check status",
        paragraphs: [
          "Use the portal login linked from the public site. Once inside the dashboard, digital items appear under the account that matches the buyer role and email used during checkout.",
        ],
      },
      {
        title: "If access does not look right",
        paragraphs: [
          "First confirm you are using the same email entered during purchase. If the order still does not appear correctly, contact support with the order reference so the team can help reconcile the purchase.",
        ],
      },
    ],
    relatedSlugs: ["order-tracking", "contact-support", "refund-policy"],
  },
  {
    slug: "shipping-delivery",
    sectionId: "orders-payments",
    eyebrow: "Hardcopy Orders",
    title: "Shipping and delivery guidance for printed Zangi books.",
    description:
      "Use this page for the hardcopy purchase flow, fulfillment expectations, and the best next step when a physical order needs attention.",
    readingTime: "5 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Hardcopy books use a tracked fulfillment flow in the portal.",
      "Physical delivery guidance differs from digital books and event tickets.",
    ],
    content: [
      {
        title: "Hardcopy fulfillment flow",
        paragraphs: [
          "Printed books are handled as tracked physical orders rather than instant digital access. Once submitted, the order follows a milestone-based fulfillment path.",
        ],
        bullets: [
          "Received",
          "Confirmed",
          "Processing",
          "Shipped",
          "Delivered",
        ],
      },
      {
        title: "Before shipment",
        paragraphs: [
          "If you need to correct contact details or ask a fulfillment question before shipment, contact support as early as possible and include the order reference.",
        ],
      },
      {
        title: "After delivery",
        paragraphs: [
          "If the delivered order is damaged, incomplete, or incorrect, contact support promptly with the order reference and a clear description of the issue.",
        ],
      },
    ],
    relatedSlugs: ["order-tracking", "refund-policy", "contact-support"],
  },
  {
    slug: "order-tracking",
    sectionId: "orders-payments",
    eyebrow: "Order Tracking",
    title: "Follow physical milestones and digital readiness through the portal.",
    description:
      "Order tracking is designed to keep families, schools, and bulk buyers informed after checkout without requiring repeated support requests.",
    readingTime: "4 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Tracking is role-aware inside the portal dashboard.",
      "Digital and hardcopy orders use different status paths.",
    ],
    content: [
      {
        title: "What the portal shows",
        paragraphs: [
          "The portal dashboard groups orders by role and status so buyers can quickly see what is ready, what is still moving, and what has already completed.",
        ],
        bullets: [
          "Individuals see their own orders and downloads.",
          "Corporate buyers see purchases for the buying account.",
          "Wholesale users see bulk-order progress views.",
        ],
      },
      {
        title: "Tracking by format",
        paragraphs: [
          "Digital books focus on readiness and download access. Hardcopy books focus on physical milestones. Event tickets appear as digital passes rather than shipment records.",
        ],
      },
    ],
    relatedSlugs: ["digital-downloads", "shipping-delivery", "event-tickets"],
  },
  {
    slug: "event-tickets",
    sectionId: "events",
    eyebrow: "Event Tickets",
    title: "What to expect when buying digital tickets for Zangi events.",
    description:
      "Events are sold through a dedicated ticket flow rather than the book shop, and tickets are delivered digitally through the portal experience.",
    readingTime: "4 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Event tickets are digital-only in this release.",
      "Ticket checkout is separate from book checkout.",
      "Tickets appear in the portal as pass cards with the event details.",
    ],
    content: [
      {
        title: "Event purchase flow",
        paragraphs: [
          "Visitors browse the Events page, open a specific event microsite, and continue to the dedicated ticket checkout page for that event.",
        ],
        bullets: [
          "Choose buyer type: individual or corporate.",
          "Enter buyer details, quantity, and optional ticket holder name.",
          "Submit payment details using the methods available for the buyer region.",
        ],
      },
      {
        title: "How tickets are delivered",
        paragraphs: [
          "A successful purchase creates a digital event pass record. Tickets are shown in the portal with the event details, quantity, holder name, and a pass code placeholder.",
        ],
      },
      {
        title: "Important ticket note",
        paragraphs: [
          "If quantity is greater than one, the current version still treats the purchase as a single ticket bundle under the same holder name unless the flow is expanded later.",
        ],
        callout: {
          tone: "warm",
          title: "Refunds for event tickets",
          description:
            "Event ticket refund rules are handled separately inside the Refund Policy article.",
        },
      },
    ],
    relatedSlugs: ["refund-policy", "payments", "contact-support"],
  },
  {
    slug: "privacy-policy",
    sectionId: "legal",
    eyebrow: "Privacy Policy",
    title: "How Zangi handles contact details, order information, and support requests.",
    description:
      "This privacy policy describes the information collected through the website, checkouts, portal access, and support interactions, and how that information is used.",
    readingTime: "7 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "The site collects contact and order information needed to provide products, tickets, and support.",
      "Portal and support interactions are used to help buyers access purchases and resolve issues.",
    ],
    content: [
      {
        title: "Information collected",
        paragraphs: [
          "Zangi may collect the details submitted through forms, checkouts, portal access, and support requests. This can include names, email addresses, phone numbers, organization names, order references, ticket references, and similar operational details.",
          "Depending on the checkout type, the site may also collect information connected to payments, product formats, quantities, delivery preferences, and support history.",
        ],
      },
      {
        title: "How the information is used",
        paragraphs: [
          "Collected information is used to provide the requested products or tickets, manage orders and portal access, respond to support requests, and improve the clarity and operation of the website.",
        ],
        bullets: [
          "Process and confirm purchases.",
          "Display order, delivery, and ticket status in the portal.",
          "Respond to product, billing, or event support questions.",
          "Maintain internal records for service quality and continuity.",
        ],
      },
      {
        title: "Sharing and protection",
        paragraphs: [
          "Zangi does not publish buyer information publicly. Information may be shared with service providers or operational partners only when reasonably necessary to run the website, support purchases, provide delivery, or maintain digital services.",
          "Reasonable administrative and technical steps should be used to protect the information handled through the site, while recognizing that no internet-based service can promise absolute security.",
        ],
      },
      {
        title: "Retention and support requests",
        paragraphs: [
          "Support records, order references, and account-linked purchase information may be retained for operational follow-up, product access, fraud prevention, and service continuity for a reasonable period.",
          "If you have questions about privacy or data handling, use the support contact details provided in this support center.",
        ],
      },
    ],
    relatedSlugs: ["terms-and-conditions", "contact-support", "refund-policy"],
  },
  {
    slug: "refund-policy",
    sectionId: "legal",
    eyebrow: "Refund Policy",
    title: "Refund rules for digital books, hardcopy books, and digital event tickets.",
    description:
      "This policy explains the standard refund position for Zangi purchases and the situations where review, replacement, reschedule handling, or refund may apply.",
    readingTime: "6 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Digital books and digital event tickets follow different rules from hardcopy books.",
      "Order or ticket references should always be included in a refund request.",
    ],
    content: [
      {
        title: "Digital books",
        paragraphs: [
          "A refund request for a digital book should be made before the product becomes available for access or download in the portal.",
          "Once a digital item is ready for download or has already been accessed, refunds are generally not offered except in cases of duplicate purchase, technical failure, or another issue that Zangi confirms should be corrected.",
        ],
      },
      {
        title: "Hardcopy books",
        paragraphs: [
          "A hardcopy order may be reviewed for cancellation or refund before it has moved into shipment.",
          "After delivery, replacement or refund review may be available for orders that arrive damaged, incomplete, or materially incorrect, provided support is contacted promptly with the order reference and issue details.",
        ],
      },
      {
        title: "Digital event tickets",
        paragraphs: [
          "Digital event ticket purchases are generally non-refundable once issued, because access is tied to the event reservation itself.",
          "If an event is canceled, materially rescheduled, or a payment issue such as a duplicate charge is confirmed, Zangi may review the ticket purchase for replacement, transfer guidance, credit, or refund as appropriate to the situation.",
        ],
      },
      {
        title: "How to request review",
        paragraphs: [
          "Refund or replacement review requests should be submitted through the support contact route as soon as possible.",
        ],
        bullets: [
          "Include the order or ticket reference.",
          "Include the buyer email used at checkout.",
          "Describe the issue clearly and attach any supporting details if relevant.",
        ],
        callout: {
          tone: "danger",
          title: "Policy note",
          description:
            "Approval is not automatic. Requests are reviewed against the product type, fulfillment stage, and the circumstances described by the buyer.",
        },
      },
    ],
    relatedSlugs: ["payments", "shipping-delivery", "event-tickets"],
  },
  {
    slug: "terms-and-conditions",
    sectionId: "legal",
    eyebrow: "Terms & Conditions",
    title: "The terms that apply to browsing, purchasing, and using the Zangi website.",
    description:
      "These terms outline the basic rules for using the public website, completing purchases, accessing portal-linked products, and interacting with Zangi event and support flows.",
    readingTime: "7 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Using the website or completing a purchase means the visitor accepts the site terms and related policies.",
      "Product, ticket, and support experiences should be used lawfully and in good faith.",
    ],
    content: [
      {
        title: "Website use",
        paragraphs: [
          "By browsing the website, submitting information, or completing a purchase, the visitor agrees to use the site lawfully and in a way that does not interfere with the operation, security, or integrity of the experience.",
          "Zangi may update site content, pricing display, support materials, and product availability over time as the public experience evolves.",
        ],
      },
      {
        title: "Orders, tickets, and availability",
        paragraphs: [
          "Products and events are subject to availability, format support, and the specific flow shown on the relevant route at the time of checkout.",
          "Book purchases and event ticket purchases use separate checkout paths. Digital and hardcopy book formats may have different fulfillment timelines and policy outcomes.",
        ],
      },
      {
        title: "Portal-linked services",
        paragraphs: [
          "Where a purchase leads into the portal experience, the buyer is responsible for using accurate contact details so the correct role, purchase record, or ticket reference can be matched to the intended account view.",
        ],
      },
      {
        title: "Intellectual property and content",
        paragraphs: [
          "The Zangi name, story world, artwork, written content, and related creative materials remain protected brand and creative assets. Public site use does not transfer ownership of those materials.",
        ],
      },
      {
        title: "Policy updates and contact",
        paragraphs: [
          "Privacy, refund, and support policies should be read together with these terms. If a question is not resolved by those articles, contact support through the public contact channel.",
        ],
      },
    ],
    relatedSlugs: ["privacy-policy", "refund-policy", "contact-support"],
  },
  {
    slug: "contact-support",
    sectionId: "getting-started",
    eyebrow: "Contact Support",
    title: "When self-serve guidance is not enough, here is the best way to reach the team.",
    description:
      "Use this article when you need help with a purchase, portal access, delivery issue, event ticket question, or a policy clarification that is specific to your case.",
    readingTime: "3 min read",
    updatedLabel: "Updated March 2026",
    highlights: [
      "Support requests are easiest to resolve when they include the correct order or ticket reference.",
      "The contact page remains the main public form for direct outreach.",
    ],
    content: [
      {
        title: "Before you contact support",
        paragraphs: [
          "Check the article that matches your issue first. The support center is designed to answer the most common questions around payment methods, portal delivery, physical fulfillment, and digital event tickets.",
        ],
        bullets: [
          "Use FAQ for quick clarifications.",
          "Use Order Tracking for portal status questions.",
          "Use Refund Policy before requesting a refund review.",
        ],
      },
      {
        title: "What to include in your message",
        paragraphs: [
          "Clear support requests move faster. Include the buyer email, the order or ticket reference if one exists, and a short description of the issue you want resolved.",
        ],
      },
    ],
    resources: [
      {
        label: "Email",
        value: contactDetails.email,
        href: `mailto:${contactDetails.email}`,
        description: "Best for purchase and policy questions.",
      },
      {
        label: "Phone",
        value: contactDetails.phone,
        href: `tel:${contactDetails.phone.replace(/\s+/g, "")}`,
        description: "Useful when the matter is time-sensitive.",
      },
      {
        label: "Response time",
        value: contactDetails.responseTime,
        description: "Support replies are usually handled during business days.",
      },
    ],
    cta: {
      label: "Open the contact page",
      to: "/contact",
    },
    relatedSlugs: ["overview", "faq", "refund-policy"],
  },
];

export const supportFooterLinks = [
  { label: "Help Center", to: "/help/overview" },
  { label: "Privacy Policy", to: "/help/privacy-policy" },
  { label: "Refund Policy", to: "/help/refund-policy" },
  { label: "Terms & Conditions", to: "/help/terms-and-conditions" },
];

export function getSupportArticle(slug) {
  return supportArticles.find((article) => article.slug === slug);
}
