const en = {
  homePage: {
    metaTitle: "Mercedes Benz | Official Website",
    metaDescription:
      "Explore the world of Mercedes Benz - luxury vehicles, innovation and performance",
    introMainTitle: "Mercedes Benz",
    introShortCast: "Scroll to get more",
  },
  g63: {
    title: "G63 AMG",
    heroTitle: "G63 AMG Brabus",
    description:
      "The G63 AMG BRABUS is an ultra-premium interpretation of the iconic off-road SUV, blending aggressive styling with extreme performance. Based on the Mercedes-AMG G63 and refined by Brabus, it delivers luxury, power, and exclusivity in a single machine.",
    moreModels: "More Models",
    annotations: [
      {
        id: "default",
        title: "Overview",
        description:
          "The iconic G-Class silhouette with AMG styling. Bold design meets modern luxury in its purest form.",
        position: [2, 0.5, 1],
        cameraPosition: [8, 3, 8],
        specs: [
          "Power: up to 800–900+ hp",
          "Engine: V8 Biturbo",
          "0–100 km/h: ~3.7–4.1 s",
          "Top speed: up to 240–280 km/h",
          "Drivetrain: all-wheel drive (AWD)",
          "Torque: up to ~1000–1250 Nm",
        ],
      },
      {
        id: "wheels",
        title: "AMG Wheels",
        description:
          "22-inch AMG cross-spoke wheels with high-performance tires for optimal grip on any terrain.",
        position: [1.2, -0.5, 1.5],
        cameraPosition: [2.5, 0, 4],
        specs: [
          "Forged BRABUS Monoblock wheels",
          "Size: typically 22–24 inches",
          "Wide profile for stability",
          "High-performance tires",
        ],
      },
      {
        id: "salon",
        title: "Interior",
        description:
          "Hand-crafted AMG interior with Nappa leather, carbon fiber trim and a fully digital cockpit.",
        position: [0.5, 0.5, 1.5],
        cameraPosition: [0.5, 1, 4.5],
        specs: [
          "Full premium leather interior",
          "Carbon or aluminum trim elements",
          "Custom ambient lighting",
          "BRABUS sport steering wheel",
          "Advanced multimedia system",
        ],
      },
      {
        id: "rear",
        title: "Rear View",
        description:
          "Distinctive spare wheel mount and quad AMG exhaust pipes for an unmistakable powerful stance.",
        position: [-2.5, 0.5, 0],
        cameraPosition: [-5, 2, 5],
        specs: [
          "Signature BRABUS spare wheel cover",
          "Sport exhaust system",
          "Carbon rear diffuser",
          "Tinted rear lights",
          "Extended wheel arches",
        ],
      },
      {
        id: "headlights",
        title: "LED Headlights",
        description:
          "High-performance AMG LED headlights with DRL signature for maximum visibility and unmistakable style.",
        position: [2.8, 0.3, 1.2],
        cameraPosition: [5, 1.5, 4],
        specs: [
          "LED or MULTIBEAM LED headlights",
          "Black design elements",
          "Enhanced brightness and range",
          "Distinctive BRABUS accents",
        ],
      },
    ],
  },
  faq: {
    title: "Questions & Answers",
    items: [
      {
        question: "How do I get in touch about placing an order?",
        answer:
          "Fill in the contact form on the page of the model you are interested in. Our sales consultant will reach out within 24 hours to walk you through every detail of your configuration.",
      },
      {
        question: "What warranty coverage does a BRABUS vehicle come with?",
        answer:
          "Every BRABUS vehicle is backed by a 2-year manufacturer warranty. Extended coverage programmes are available through your authorised Mercedes-Benz dealer.",
      },
      {
        question: "Is a test drive available?",
        answer:
          "Yes. Contact your nearest authorised dealer or request an appointment directly through the vehicle detail page. We will arrange a drive at a time convenient for you.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Lead times vary by model and configuration — typically between 4 and 12 weeks. Your sales consultant will provide a precise estimate once your order is confirmed.",
      },
      {
        question: "What payment and financing options are available?",
        answer:
          "We accept bank transfer as well as manufacturer-backed financing and leasing programmes with competitive rates. Speak with a consultant for a personalised quote.",
      },
    ],
  },
  advantages: {
    learnMore: "Learn more",
    items: [
      {
        category: "Vehicles",
        title: "The new GLE. Power meets elegance.",
        href: "/cars",
        image: "/images/advantages/gle.png",
      },
      {
        category: "Luxury",
        title: "Maybach. The pinnacle of refinement.",
        href: "/cars",
        image: "/images/advantages/mayback.png",
      },
      {
        category: "Flagship",
        title: "The S-Class. The best or nothing.",
        href: "/cars",
        image: "/images/advantages/s-class.png",
      },
    ],
  },
  catalog: {
    metaTitle: "All Models | Mercedes-Benz",
    metaDescription:
      "Browse the full Mercedes-Benz lineup. Filter by body type, fuel, performance and more.",
    heading: "The Full Lineup",
    subtitle:
      "From compact to full-size, electric to AMG — find the Mercedes-Benz made for you.",
    searchPlaceholder: "Search models, e.g. GLE, EQS, SUV…",
    filtersBtn: "Filters",
    applied: "Applied",
    clearAll: "Clear all",
    sortBy: "Sort by",
    showing: "Showing",
    of: "of",
    vehicles: "vehicles",
    vehicle: "vehicle",
    priceLabel: "Starting MSRP",
    explore: "Explore",
    emptyTitle: "No vehicles match your filters",
    emptyBody:
      "Try removing a filter or clearing everything to explore the full lineup.",
    emptyReset: "Reset all filters",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't load the lineup right now. Please try again.",
    errorRetry: "Reload page",
    sort: {
      featured: "Featured",
      priceAsc: "Price · low to high",
      priceDesc: "Price · high to low",
      powerDesc: "Power · most HP",
      az: "Model · A to Z",
    },
    chips: {
      all: "All",
      amg: "AMG",
      eq: "EQ Electric",
      suv: "SUV",
      sedan: "Sedan",
      coupe: "Coupe",
      hatchback: "Hatchback",
    },
    sidebar: {
      bodyType: "Body type",
      fuel: "Fuel",
      transmission: "Transmission",
      drive: "Drive",
      power: "Power · HP",
      seats: "Seats",
      collections: "Collections",
      amgOnly: "AMG only",
      amgDesc: "Mercedes-AMG performance line",
      eqOnly: "Electric only",
      eqDesc: "Fully electric vehicles",
      reset: "Reset",
      showResults: "Show results",
    },
  },
} as const;

export default en;
