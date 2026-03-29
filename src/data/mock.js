export const navigationItems = [
  { name: "Home", path: "/" },
  // { name: "The Story", path: "/story" },
  // { name: "Books", path: "/books" },
  { name: "Events", path: "/events" },
  { name: "Parents", path: "/parents" },
  { name: "Contact", path: "/contact" },
];

export const footerNavigation = [
  { name: "Activities", path: "/activities" },
  { name: "About the Author", path: "/about-author" },
  { name: "Help Center", path: "/help/overview" },
  { name: "Portal Login", path: "/portal/login" },
];

export const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  youtube: "#",
};

export const heroData = {
  subtitle: "The Flag of Kindness",
  tagline: "Join Zangi on a african adventure for brave, curious readers.",
  description:"Meet Zangi through storybooks, activity books, and a world built to spark courage, culture, and imagination.",
  characterImage: "/images/herocharacter.png",
  primaryCtaText: "Explore the Story",
  primaryCtaLink: "/story",
  secondaryCtaText: "Shop the Books",
  secondaryCtaLink: "/shop",
};

export const zangiCharacter = {
  name: "Zangi",
  tagline: "Kindness can lighten a darkening heart.",
  description:
    "Zangi is a young explorer whose courage is matched by compassion. Every journey introduces children to culture-rich places, meaningful choices, and the kind of bravery that grows from empathy.",
  age: "A young explorer readers can grow with",
  homeland: "Inspired by the landscapes, colors, and stories of Africa",
  traits: [
    {
      name: "Courageous",
      description: "Faces difficult moments with calm resolve and heart.",
    },
    {
      name: "Curious",
      description: "Invites readers to ask questions and discover more.",
    },
    {
      name: "Kind-hearted",
      description: "Shows that kindness can be an active form of strength.",
    },
    {
      name: "Resourceful",
      description: "Finds creative solutions instead of giving up.",
    },
  ],
};

export const storyWorld = {
  title: "A World of Wonder",
  description:
    "From glowing savannas to sacred groves, Zangi's story world combines cinematic landscapes with emotional storytelling and values children can carry into real life.",
  locations: [
    {
      name: "The Golden Savanna",
      description:
        "Wide horizons, shifting skies, and the first steps of every great quest.",
      image:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxBZnJpY2FuJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzUzMTUyOXww&ixlib=rb-4.1.0&q=85",
    },
    {
      name: "The Whispering Mountains",
      description:
        "Ancient heights where echoes carry old wisdom and new courage.",
      image:
        "https://images.unsplash.com/photo-1578952258885-6ee0651294e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzM1MzE1NjJ8MA&ixlib=rb-4.1.0&q=85",
    },
    {
      name: "The Sacred Baobab Grove",
      description:
        "A quiet place where memory, community, and imagination meet.",
      image:
        "https://images.unsplash.com/photo-1622322789114-475a83808d89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxhY2FjaWElMjB0cmVlfGVufDB8fHx8MTc3MzUzMTU1Nnww&ixlib=rb-4.1.0&q=85",
    },
  ],
  themes: [
    "Courage anchored in kindness",
    "Cultural richness without stereotypes",
    "Adventure that feels premium and timeless",
  ],
};

export const books = [
  {
    id: "story-book",
    slug: "zangi-flag-of-kindness",
    title: "Zangi: The Flag of Kindness",
    shortTitle: "Flag of Kindness",
    type: "Story Book",
    category: "Core title",
    ageRange: "Ages 6-14",
    audience: "Independent readers, family reading time, classroom story circles",
    description:
      "The signature Zangi storybook, designed to balance emotional depth, adventure, and visually rich worldbuilding.",
    longDescription:
      "Follow Zangi through a story about courage, friendship, and the quiet power of choosing kindness when it matters most. The book is built for readers who want more than a simple bedtime story: it is warm, visually ambitious, and grounded in values that stay with children after the last page.",
    image: "/images/zangibook.png",
    gallery: ["/images/zangibook.png"],
    features: [
      "Story-led reading experience with premium visual direction",
      "Character arc rooted in empathy, courage, and cultural pride",
      "Ideal for home libraries, classrooms, and gifting",
    ],
    benefits: [
      "Builds emotional literacy through meaningful choices",
      "Introduces readers to African-inspired landscapes and values",
      "Supports independent reading and guided discussion",
    ],
    spotlight: "Best for readers discovering Zangi for the first time",
    formats: [
      {
        type: "digital",
        label: "Digital",
        price: 10.7,
        description: "Instant reading access inside the Zangi portal once processed.",
        fulfillment: "Delivery is sent your email or can be Pdf Downloaded on the portal",
      },
      {
        type: "hardcopy",
        label: "Hardcopy",
        price: 12.8,
        description: "Premium printed edition for gifting, family reading, and shelves.",
        fulfillment: "Physical order tracked through portal milestones",
      },
    ],
    defaultFormat: "hardcopy",
  },
  {
    id: "activity-book",
    slug: "zangi-adventure-activity-book",
    title: "Zangi Adventure Activity Book",
    shortTitle: "Adventure Activity Book",
    type: "Activity Book",
    category: "Companion title",
    ageRange: "Ages 5-12",
    audience: "Families, educators, after-school groups, and creative learners",
    description:
      "A hands-on companion that turns the Zangi story world into creative prompts, puzzles, and learning moments.",
    longDescription:
      "The activity book extends the story world through drawing prompts, reflection pages, map play, and guided creative exercises. It is designed for children who want to stay in the world longer and for adults who want practical ways to keep reading active, thoughtful, and fun.",
    image: "/images/flag.png",
    gallery: ["/images/flag.png"],
    features: [
      "Prompt-based activities connected to the Zangi universe",
      "Creative exercises for reading development and imagination",
      "Useful for family time, classrooms, and enrichment sessions",
    ],
    benefits: [
      "Turns story engagement into active learning",
      "Supports creativity, reflection, and confident expression",
      "Gives parents and teachers structured follow-up activities",
    ],
    spotlight: "Best for readers who want to keep exploring after the story",
    formats: [
      {
        type: "digital",
        label: "Digital",
        price: 9.99,
        description: "A portal-ready edition for screen-based or printable use.",
        fulfillment: "Portal delivery with download-ready status updates",
      },
      {
        type: "hardcopy",
        label: "Hardcopy",
        price: 18.99,
        description: "Printed activity edition designed for repeated hands-on use.",
        fulfillment: "Physical order tracked through portal milestones",
      },
    ],
    defaultFormat: "digital",
  },
];

export const events = [
  {
    id: "NIPA-book-launch",
    slug: "zangi-book-launch-mulungushi-lusaka",
    legacySlugs: ["zangi-book-launch-NIPA-lusaka"],
    title: "Zangi's Flag Book Launch",
    subtitle:
      "A live family book launch at NIPA in Lusaka with storytelling, launch moments, and warm community energy.",
    excerpt:
      "Right now the Zangi events section is focused on one physical launch in Lusaka for children, parents, schools, and invited community guests.",
    description:
      "This launch event introduces the world of Zangi in person through a live reading, a formal book reveal, family-friendly reflection moments, and a closing atmosphere built around books, culture, and imagination. It is designed to feel more like a real launch experience than a simple reading session.",
    startDate: "2026-05-24",
    startsAt: "2026-05-24T14:00:00+02:00",
    countdownStartsAt: "2026-03-25T00:00:00+02:00",
    liveWindowHours: 5,
    dateLabel: "May 24, 2026",
    timeLabel: "14:00 PM - 16:30 PM",
    locationLabel: "NIPA  Conference Hall, Lusaka",
    mode: "in-person",
    image: "/images/banner bg (1).png",
    teaserImage: "/images/Save the date  23rd December (10) (1).png",
    heroTheme: {
      primary: "rgba(124,45,18,0.88)",
      secondary: "rgba(15,118,110,0.72)",
      accent: "#fde68a",
      surface: "#fff7ed",
    },
    audienceLabel: "Families + schools + community",
    audience:
      "Parents, children, teachers, school leaders, media guests, and community supporters joining the first live Zangi's Flag Book Launch in Lusaka.",
    highlights: [
      "A live Zangi reading and launch reveal on stage",
      "A family-friendly launch atmosphere with story and reflection",
      "A closing moment for photos, conversation, and book excitement",
    ],
    familyExperience: [
      {
        title: "A real launch atmosphere",
        description:
          "Families arrive to a launch setting that feels special, warm, and event-led rather than like a classroom stop or a simple promo table.",
      },
      {
        title: "Storytelling that holds children's attention",
        description:
          "The book launch includes a live Zangi reading moment designed to keep children engaged while giving parents a clear sense of the story world.",
      },
      {
        title: "A memorable family outing",
        description:
          "The event closes with space for conversation, photos, and the excitement that should come with seeing a children's book launch live.",
      },
    ],
    whoItsFor: [
      "Parents looking for a meaningful family outing in Lusaka",
      "Children excited by live storytelling and new story worlds",
      "Schools, educators, and community partners supporting reading culture",
    ],
    scheduleItems: [
      {
        label: "Arrival and welcome",
        detail:
          "Guests arrive, check in with their digital passes, and settle into the launch atmosphere before the program begins.",
      },
      {
        label: "Book launch opening",
        detail:
          "The stage program opens with a welcome, framing the meaning of the launch and introducing the Zangi world to the room.",
      },
      {
        label: "Live reading and reveal",
        detail:
          "A featured live reading and launch reveal bring the book to life for children, parents, and invited supporters.",
      },
      {
        label: "Closing connection time",
        detail:
          "The event closes with time for photos, conversation, and a gentle finish that keeps the story energy going beyond the venue.",
      },
    ],
    logistics: [
      {
        label: "Arrival window",
        value:
          "Please arrive at least 20-30 minutes before the program begins so entry and seating stay smooth.",
      },
      {
        label: "Age guidance",
        value: "Best for children roughly ages 5-12, with parents or guardians attending alongside them.",
      },
      {
        label: "Access note",
        value:
          "The event is physical, but tickets remain digital-only and stay tied to the buyer account in the portal.",
      },
    ],
    ctaLabel: "Get your ticket",
    availabilityNote:
      "Standard tickets open on March 25, 2026 and move through Early Bird, Standard, and Last Tickets pricing before the May 24 launch.",
    ticketSales: {
      timezone: "Africa/Lusaka",
      opensAt: "2026-03-25T00:00:00+02:00",
      closesAt: "2026-05-24T23:59:59+02:00",
      salesOpenLabel: "March 25, 2026",
      rounds: [
        {
          key: "early_bird",
          label: "Early Bird",
          publicLabel: "Early Bird",
          startsOn: "2026-03-25",
          endsOn: "2026-04-14",
          priceZmw: 250,
        },
        {
          key: "standard",
          label: "Standard",
          publicLabel: "Standard",
          startsOn: "2026-04-15",
          endsOn: "2026-05-04",
          priceZmw: 300,
        },
        {
          key: "late",
          label: "Late",
          publicLabel: "Last Tickets",
          startsOn: "2026-05-05",
          endsOn: "2026-05-24",
          priceZmw: 350,
        },
      ],
    },
    defaultTicketType: "standard",
    ticketTypes: [
      {
        id: "standard",
        label: "Standard",
        priceStrategy: "rounds",
        delivery:
          "Digital event pass delivered instantly to the portal after checkout, with a QR placeholder for venue entry.",
      },
      {
        id: "vip",
        label: "VIP",
        priceZmw: 500,
        delivery:
          "VIP digital event pass delivered instantly to the portal after checkout, with a QR placeholder for venue entry.",
      },
    ],
    standardTicket: {
      label: "Standard",
      priceStrategy: "rounds",
      delivery:
        "Digital event pass delivered instantly to the portal after checkout, with a QR placeholder for venue entry.",
    },
    status: "upcoming",
  },
];

export const activityHighlights = [
  {
    title: "Reading quests",
    description:
      "Story prompts and guided questions that help children reflect on what Zangi sees, learns, and chooses.",
  },
  {
    title: "Creative making",
    description:
      "Drawing, writing, and imagination-led tasks that turn reading into making and discovery.",
  },
  {
    title: "Culture-rich learning",
    description:
      "Activities inspired by place, symbolism, and storytelling traditions rather than generic worksheet tasks.",
  },
];

export const parentBenefits = [
  {
    icon: "BookOpen",
    title: "Learning Through Adventure",
    description:
      "Children stay engaged because the learning is wrapped in story, movement, and discovery.",
  },
  {
    icon: "Heart",
    title: "Cultural Education",
    description:
      "The world of Zangi introduces culture with care, dignity, and curiosity.",
  },
  {
    icon: "GraduationCap",
    title: "Reading Development",
    description:
      "Story, discussion, and activity formats support comprehension and vocabulary growth.",
  },
  {
    icon: "Users",
    title: "Creativity and Imagination",
    description:
      "Children are invited to respond, create, and think beyond the page.",
  },
];

export const parentPageSections = [
  {
    title: "Learning through adventure",
    description:
      "Adventure keeps attention high while emotional and educational themes stay grounded and memorable.",
  },
  {
    title: "Cultural education",
    description:
      "Zangi gives families and classrooms a richer story world rooted in African-inspired beauty and values.",
  },
  {
    title: "Reading development",
    description:
      "Children meet layered language, strong narrative structure, and opportunities to discuss what they read.",
  },
  {
    title: "Creativity and imagination",
    description:
      "The storybook and activity book work together to turn reading into reflection, drawing, and storytelling.",
  },
  {
    title: "Why parents trust Zangi",
    description:
      "The brand is designed to feel thoughtful, premium, and age-aware rather than noisy or disposable.",
  },
];

export const testimonials = [
  {
    name: "Amara Thompson",
    role: "Parent of two",
    quote:
      "Zangi feels beautifully made. My children stay for the adventure, and I stay for the values in the story.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Primary school teacher",
    quote:
      "It gives us a reading experience that sparks discussion instead of ending when the page turns.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Family learning coordinator",
    quote:
      "The storybook and activity book work especially well together. It feels premium and practical at the same time.",
    rating: 5,
  },
];

export const faqData = [
  {
    question: "What ages are the books designed for?",
    answer:
      "The current titles are designed for broad family and classroom use, with the core story book working well for readers around ages 6 to 14 and the activity book supporting readers around ages 5 to 12.",
  },
  {
    question: "Do both books come in digital and hardcopy formats?",
    answer:
      "Yes. Every product supports a format choice before checkout so readers can choose the experience that fits them best.",
  },
  {
    question: "How does portal delivery work for digital orders?",
    answer:
      "Digital orders appear in the portal and move through a short status flow until they are ready to download.",
  },
  {
    question: "How are physical orders tracked?",
    answer:
      "Hardcopy orders appear in the portal with milestone tracking so customers can follow progress from received to delivered.",
  },
];

export const authorProfile = {
  name: "The Zangi Creative Studio",
  title: "Building story worlds with courage, warmth, and cultural richness",
  bio:
    "Zangi is created as a long-term story world rather than a one-off title. The goal is to give children premium adventures that celebrate empathy, imagination, and African-inspired beauty without flattening the culture into background decoration.",
  principles: [
    "Make story and design feel premium from the first interaction.",
    "Give parents and educators a clear reason to trust the brand.",
    "Treat culture as a living source of meaning, not a visual shortcut.",
  ],
  portrait:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd3JpdGVyfGVufDB8fHx8MTc5NDY5MzY0MXww&ixlib=rb-4.1.0&q=85",
};

export const contactDetails = {
  email: "hello@zangisworld.com",
  phone: "+26 0972827372",
  address: "Zangi Creative Studio, Lusaka, Zambia",
  responseTime: "We aim to respond within 2 business days.",
};

export const portalPersonas = [
  {
    role: "individual",
    label: "Individual Reader",
    summary: "For families and single readers tracking orders, downloads, and digital event tickets.",
    accent: "from-[#fb923c] to-[#f97316]",
  },
  {
    role: "corporate",
    label: "Corporate / School Buyer",
    summary: "For organizations managing book orders and digital event ticket purchases from one portal.",
    accent: "from-[#0f766e] to-[#14b8a6]",
  },
  {
    role: "wholesale",
    label: "Wholesale Partner",
    summary: "For resellers and bulk partners following inventory-style order flows.",
    accent: "from-[#1d4ed8] to-[#6366f1]",
  },
];

export const portalUsers = [
  {
    id: "portal-individual",
    role: "individual",
    name: "Nia Mokoena",
    email: "nia@example.com",
    organizationName: "",
    headline: "Your family reading hub",
    notes: [
      "Digital titles become available in your portal once their status is ready.",
      "Hardcopy milestones update here and by email.",
      "Digital event tickets appear as portal-ready passes with a QR placeholder.",
    ],
    orders: [
      {
        id: "ZG-1042",
        productSlug: "zangi-flag-of-kindness",
        productTitle: "Zangi: The Flag of Kindness",
        format: "digital",
        quantity: 1,
        buyerType: "individual",
        status: "Ready to Download",
        createdAt: "2026-03-05",
        total: 14.99,
        timeline: ["Received", "Confirmed", "Preparing", "Ready to Download"],
        currentStep: 3,
      },
      {
        id: "ZG-1046",
        productSlug: "zangi-adventure-activity-book",
        productTitle: "Zangi Adventure Activity Book",
        format: "hardcopy",
        quantity: 1,
        buyerType: "individual",
        status: "Shipped",
        createdAt: "2026-03-10",
        total: 18.99,
        timeline: ["Received", "Confirmed", "Processing", "Shipped", "Delivered"],
        currentStep: 3,
      },
    ],
    tickets: [
      {
        id: "ZT-4021",
        purchaseType: "event-ticket",
        eventSlug: "zangi-book-launch-mulungushi-lusaka",
        eventTitle: "Zangi's Flag Book Launch",
        startDate: "2026-05-24",
        dateLabel: "May 24, 2026",
        timeLabel: "14:00 PM - 16:30 PM",
        locationLabel: "NIPA  Conference Hall, Lusaka",
        buyerType: "individual",
        buyerName: "Nia Mokoena",
        email: "nia@example.com",
        phone: "+27 82 111 1100",
        organizationName: "",
        ticketHolderName: "Nia Mokoena",
        quantity: 1,
        unitPrice: 300,
        total: 300,
        status: "Ticket Ready",
        ticketCode: "PASS-94NKQ3",
        createdAt: "2026-04-18",
      },
    ],
  },
  {
    id: "portal-corporate",
    role: "corporate",
    name: "Lebo Naidoo",
    email: "library@learningbridge.org",
    organizationName: "Learning Bridge Academy",
    headline: "Organization orders and class planning",
    notes: [
      "Corporate orders include organization details and quantity tracking.",
      "Use the dashboard to review team-ready order batches and status notes.",
      "Event ticket purchases stay attached to the buying account inside the portal.",
    ],
    orders: [
      {
        id: "ZG-2104",
        productSlug: "zangi-flag-of-kindness",
        productTitle: "Zangi: The Flag of Kindness",
        format: "hardcopy",
        quantity: 24,
        buyerType: "corporate",
        status: "Processing",
        createdAt: "2026-03-08",
        total: 599.76,
        timeline: ["Received", "Confirmed", "Processing", "Shipped", "Delivered"],
        currentStep: 2,
      },
      {
        id: "ZG-2107",
        productSlug: "zangi-adventure-activity-book",
        productTitle: "Zangi Adventure Activity Book",
        format: "digital",
        quantity: 12,
        buyerType: "corporate",
        status: "Preparing",
        createdAt: "2026-03-12",
        total: 119.88,
        timeline: ["Received", "Confirmed", "Preparing", "Ready to Download"],
        currentStep: 2,
      },
    ],
    tickets: [
      {
        id: "ZT-5178",
        purchaseType: "event-ticket",
        eventSlug: "zangi-book-launch-mulungushi-lusaka",
        eventTitle: "Zangi's Flag Book Launch",
        startDate: "2026-05-24",
        dateLabel: "May 24, 2026",
        timeLabel: "14:00 PM - 16:30 PM",
        locationLabel: "NIPA Conference Hall, Lusaka",
        buyerType: "corporate",
        buyerName: "Lebo Naidoo",
        email: "library@learningbridge.org",
        phone: "+27 83 222 2200",
        organizationName: "Learning Bridge Academy",
        ticketHolderName: "Learning Bridge Academy",
        quantity: 8,
        unitPrice: 500,
        total: 4000,
        status: "Ticket Ready",
        ticketCode: "PASS-7Q2MVD",
        createdAt: "2026-05-10",
      },
    ],
  },
  {
    id: "portal-wholesale",
    role: "wholesale",
    name: "Tariq Bello",
    email: "partner@suntraildistribution.com",
    organizationName: "Suntrail Distribution",
    headline: "Bulk fulfillment and partner visibility",
    notes: [
      "Wholesale orders emphasize quantity, shipment waves, and fulfillment readiness.",
      "The dashboard keeps partner orders separate from family and school activity.",
    ],
    orders: [
      {
        id: "ZG-3301",
        productSlug: "zangi-flag-of-kindness",
        productTitle: "Zangi: The Flag of Kindness",
        format: "hardcopy",
        quantity: 120,
        buyerType: "wholesale",
        status: "Confirmed",
        createdAt: "2026-03-02",
        total: 2998.8,
        timeline: ["Received", "Confirmed", "Processing", "Shipped", "Delivered"],
        currentStep: 1,
      },
      {
        id: "ZG-3304",
        productSlug: "zangi-adventure-activity-book",
        productTitle: "Zangi Adventure Activity Book",
        format: "hardcopy",
        quantity: 200,
        buyerType: "wholesale",
        status: "Processing",
        createdAt: "2026-03-11",
        total: 3798,
        timeline: ["Received", "Confirmed", "Processing", "Shipped", "Delivered"],
        currentStep: 2,
      },
    ],
    tickets: [],
  },
];
