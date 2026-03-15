// Mock data for Zangi website

export const heroData = {
  title: "Meet Zangi",
  subtitle: "The Brave Explorer",
  tagline: "An Epic African Adventure Awaits",
  description: "Join Zangi on a magical journey through breathtaking African landscapes, where courage, culture, and wonder come alive.",
  ctaText: "Begin the Adventure",
  ctaLink: "/books",
  backgroundImage: "https://images.unsplash.com/photo-1636871694216-d04517e0d1c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxBZnJpY2FuJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzUzMTUyOXww&ixlib=rb-4.1.0&q=85",
  characterImage: "https://customer-assets.emergentagent.com/job_zangi-journey/artifacts/at0yxmwm_The%20flag%20of%20kindness%20%282%29.png"
};

export const zangiCharacter = {
  name: "Zangi",
  tagline: "Kindness can lighten a darkening heart",
  description: "A brave young explorer with an adventurous spirit and a heart full of courage. Zangi embarks on extraordinary journeys across African lands, discovering ancient wisdom, making lifelong friends, and learning what it truly means to be brave.",
  characterImage: "https://customer-assets.emergentagent.com/job_zangi-journey/artifacts/at0yxmwm_The%20flag%20of%20kindness%20%282%29.png",
  traits: [
    { name: "Courageous", description: "Faces challenges with bravery and determination" },
    { name: "Curious", description: "Always eager to learn and explore new territories" },
    { name: "Kind-hearted", description: "Cares deeply for friends, family, and all creatures" },
    { name: "Resourceful", description: "Finds creative solutions to the toughest problems" }
  ],
  age: "A young adventurer",
  homeland: "The vibrant lands of Africa",
  symbolism: {
    lion: "Strength, courage, and leadership",
    leopardPrint: "Royalty, power, and status",
    colors: "Blue for sky and spirituality, gold for prosperity and the sun"
  }
};

export const storyWorld = {
  title: "A World of Wonder",
  description: "Explore breathtaking African landscapes filled with magic, mystery, and adventure. From golden savannas to ancient forests, every corner of Zangi's world holds a new discovery.",
  locations: [
    {
      name: "The Golden Savanna",
      description: "Vast plains where the sun paints the sky in brilliant colors",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxBZnJpY2FuJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzUzMTUyOXww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "The Whispering Mountains",
      description: "Majestic peaks where ancient stories echo through the clouds",
      image: "https://images.unsplash.com/photo-1578952258885-6ee0651294e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzM1MzE1NjJ8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "The Sacred Baobab Grove",
      description: "Mystical trees that hold the wisdom of generations",
      image: "https://images.unsplash.com/photo-1622322789114-475a83808d89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxhY2FjaWElMjB0cmVlfGVufDB8fHx8MTc3MzUzMTU1Nnww&ixlib=rb-4.1.0&q=85"
    }
  ]
};

export const books = [
  {
    id: 1,
    title: "Zangi: The Great Adventure",
    type: "Story Book",
    price: 24.99,
    description: "Follow Zangi on an epic journey across African landscapes, where bravery, friendship, and ancient wisdom come together in a tale that will captivate young readers aged 5-17.",
    features: [
      "Full-color illustrations",
      "120+ pages of adventure",
      "Ages 5-17",
      "Hardcover edition",
      "Cultural storytelling"
    ],
    image: "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzUzMTUyOXww&ixlib=rb-4.1.0&q=85",
    inStock: true
  },
  {
    id: 2,
    title: "Zangi Activity Books",
    type: "Activity Collection",
    price: 16.99,
    description: "Extend the adventure with engaging activities! Puzzles, coloring pages, writing prompts, and creative challenges inspired by Zangi's world.",
    features: [
      "50+ activities",
      "Creativity & learning",
      "Ages 5-12",
      "Educational fun",
      "Story-based activities"
    ],
    image: "https://images.unsplash.com/photo-1535940360221-641a69c43bac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxBZnJpY2FuJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3MzUzMTUyOXww&ixlib=rb-4.1.0&q=85",
    inStock: true
  }
];

export const parentBenefits = [
  {
    icon: "BookOpen",
    title: "Cultural Representation",
    description: "Beautiful African storytelling that celebrates heritage and diversity"
  },
  {
    icon: "Heart",
    title: "Character Building",
    description: "Teaches courage, kindness, and problem-solving through adventure"
  },
  {
    icon: "GraduationCap",
    title: "Educational Value",
    description: "Enriches vocabulary, geography knowledge, and cultural understanding"
  },
  {
    icon: "Users",
    title: "Ages 5-17",
    description: "Appeals to both younger children and older kids, just like Moana"
  }
];

export const testimonials = [
  {
    name: "Amara Thompson",
    role: "Parent of two",
    quote: "Finally, a story that reflects our heritage with the quality and magic my kids deserve. They can't put it down!",
    rating: 5
  },
  {
    name: "David Okonkwo",
    role: "Elementary School Teacher",
    quote: "Zangi has become a classroom favorite. The adventure captivates students while teaching valuable lessons about courage and culture.",
    rating: 5
  },
  {
    name: "Sarah Mitchell",
    role: "Mother of three",
    quote: "My children ages 6, 10, and 14 all love Zangi. It's rare to find a story that appeals to such a wide age range!",
    rating: 5
  }
];

export const faqData = [
  {
    question: "What age is Zangi suitable for?",
    answer: "Zangi is designed for children ages 5-17. Like Moana, it appeals to younger children through adventure and visual storytelling, while also engaging older kids with deeper themes of courage, culture, and self-discovery."
  },
  {
    question: "What makes Zangi different from other children's books?",
    answer: "Zangi combines premium, cinematic storytelling with authentic African cultural representation. It's not a toy-store book—it's a serious, beautifully crafted story universe that both children and parents can appreciate."
  },
  {
    question: "Is the book educational?",
    answer: "Absolutely! Zangi enriches vocabulary, introduces African geography and culture, teaches problem-solving, and builds character through themes of courage, friendship, and perseverance."
  },
  {
    question: "Can I order in bulk for schools?",
    answer: "Yes! We welcome bulk orders from schools and educators. Please contact us through our contact page for special educational pricing."
  }
];

export const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  youtube: "#"
};

export const navigationItems = [
  { name: "Home", path: "/" },
  { name: "The Story", path: "/story" },
  { name: "Books", path: "/books" },
  { name: "For Parents", path: "/parents" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];
