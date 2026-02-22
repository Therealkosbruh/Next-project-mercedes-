const en = {
  homePage: {
    metaTitle: "Mercedes Benz | Official Website",
    metaDescription: "Explore the world of Mercedes Benz - luxury vehicles, innovation and performance",
    introMainTitle: "Mercedes Benz",
    introShortCast: "Scroll to get more"
  },
  g63: {
    title: "G63 AMG",
    annotations: [
      {
        id: "default",
        title: "Overview",
        description: "The iconic G-Class silhouette with AMG styling. Bold design meets modern luxury in its purest form.",
        position: [2, 0.5, 1],
        cameraPosition: [8, 3, 8],
        specs: [
          "Power: up to 800–900+ hp",
          "Engine: V8 Biturbo",
          "0–100 km/h: ~3.7–4.1 s",
          "Top speed: up to 240–280 km/h",
          "Drivetrain: all-wheel drive (AWD)",
          "Torque: up to ~1000–1250 Nm"
        ]
      },
      {
        id: "wheels",
        title: "AMG Wheels",
        description: "22-inch AMG cross-spoke wheels with high-performance tires for optimal grip on any terrain.",
        position: [1.2, -0.5, 1.5],
        cameraPosition: [2.5, 0, 4],
        specs: [
          "Forged BRABUS Monoblock wheels",
          "Size: typically 22–24 inches",
          "Wide profile for stability",
          "High-performance tires"
        ]
      },
      {
        id: "salon",
        title: "Interior",
        description: "Hand-crafted AMG interior with Nappa leather, carbon fiber trim and a fully digital cockpit.",
        position: [0.5, 0.5, 1.5],
        cameraPosition: [0.5, 1, 4.5],
        specs: [
          "Full premium leather interior",
          "Carbon or aluminum trim elements",
          "Custom ambient lighting",
          "BRABUS sport steering wheel",
          "Advanced multimedia system"
        ]
      },
      {
        id: "rear",
        title: "Rear View",
        description: "Distinctive spare wheel mount and quad AMG exhaust pipes for an unmistakable powerful stance.",
        position: [-2.5, 0.5, 0],
        cameraPosition: [-5, 2, 5],
        specs: [
          "Signature BRABUS spare wheel cover",
          "Sport exhaust system",
          "Carbon rear diffuser",
          "Tinted rear lights",
          "Extended wheel arches"
        ]
      },
      {
        id: "headlights",
        title: "LED Headlights",
        description: "High-performance AMG LED headlights with DRL signature for maximum visibility and unmistakable style.",
        position: [2.8, 0.3, 1.2],
        cameraPosition: [5, 1.5, 4],
        specs: [
          "LED or MULTIBEAM LED headlights",
          "Black design elements",
          "Enhanced brightness and range",
          "Distinctive BRABUS accents"
        ]
      }
    ]
  }
} as const;

export default en;
