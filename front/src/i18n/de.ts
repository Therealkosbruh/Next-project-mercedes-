const de = {
  homePage: {
    metaTitle: "Mercedes Benz | Offizielle Website",
    metaDescription: "Entdecken Sie die Welt von Mercedes Benz - Luxusfahrzeuge, Innovation und Leistung",
    introMainTitle: "Mercedes Benz",
    introShortCast: "Scrollen Sie für mehr"
  },
  g63: {
    title: "G63 AMG",
    annotations: [
      {
        id: "exterior",
        title: "Außendesign",
        description: "Ikonisches kastenförmiges Design mit modernen AMG-Stylingelementen. Aggressiver Kühlergrill und markante LED-Leuchten.",
        position: [2, 1, 0]
      },
      {
        id: "wheels",
        title: "AMG-Räder",
        description: "22-Zoll-AMG-Vielspeichenräder mit Hochleistungsreifen für optimalen Grip.",
        position: [1, -0.5, 1.5]
      },
      {
        id: "rear",
        title: "Heckansicht",
        description: "Markante Reserveradhalterung und leistungsstarkes AMG-Abgassystem.",
        position: [-2, 0.5, 0]
      }
    ]
  }
} as const;

export default de;