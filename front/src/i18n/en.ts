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
        id: "exterior",
        title: "Exterior Design",
        description: "Iconic boxy design with modern AMG styling elements. Aggressive front grille and distinctive LED lights.",
        position: [2, 1, 0]
      },
      {
        id: "wheels",
        title: "AMG Wheels",
        description: "22-inch AMG multi-spoke wheels with high-performance tires for optimal grip.",
        position: [1, -0.5, 1.5]
      },
      {
        id: "rear",
        title: "Rear View",
        description: "Distinctive spare wheel mount and powerful AMG exhaust system.",
        position: [-2, 0.5, 0]
      }
    ]
  }
} as const;

export default en;