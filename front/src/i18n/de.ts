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
        id: "default",
        title: "Übersicht",
        description: "Die ikonische G-Klasse Silhouette mit AMG-Styling. Mutiges Design trifft auf modernen Luxus.",
        position: [2, 0.5, 1],
        cameraPosition: [8, 3, 8],
        specs: [
          "Leistung: bis zu 800–900+ PS",
          "Motor: V8 Biturbo",
          "Beschleunigung 0–100 km/h: ~3,7–4,1 s",
          "Höchstgeschwindigkeit: bis zu 240–280 km/h",
          "Antrieb: Allrad (AWD)",
          "Drehmoment: bis zu ~1000–1250 Nm"
        ]
      },
      {
        id: "wheels",
        title: "AMG-Räder",
        description: "22-Zoll-AMG-Vielspeichenräder mit Hochleistungsreifen für optimalen Grip auf jedem Untergrund.",
        position: [1.2, -0.5, 1.5],
        cameraPosition: [2.5, 0, 4],
        specs: [
          "Geschmiedete BRABUS Monoblock Felgen",
          "Größe: in der Regel 22–24 Zoll",
          "Breites Profil für Stabilität",
          "Hochleistungsreifen"
        ]
      },
      {
        id: "salon",
        title: "Innenraum",
        description: "Handgefertigter AMG-Innenraum mit Nappaleder, Carbonfaser-Verkleidung und digitalem Cockpit.",
        position: [0.5, 0.5, 1.5],
        cameraPosition: [0.5, 1, 4.5],
        specs: [
          "Vollleder-Innenausstattung in Premiumqualität",
          "Zierleisten aus Carbon oder Aluminium",
          "Individuelle Ambientebeleuchtung",
          "BRABUS Sportlenkrad",
          "Erweiterte Multimediaanlage"
        ]
      },
      {
        id: "rear",
        title: "Heckansicht",
        description: "Markante Reserveradhalterung und vier AMG-Auspuffrohre für eine kraftvolle Heckpartie.",
        position: [-2.5, 0.5, 0],
        cameraPosition: [-5, 2, 5],
        specs: [
          "Markante BRABUS Reserveradabdeckung",
          "Sportabgasanlage",
          "Heckdiffusor aus Carbon",
          "Getönte Rückleuchten",
          "Verbreiterte Radläufe"
        ]
      },
      {
        id: "headlights",
        title: "LED-Scheinwerfer",
        description: "Hochleistungs-AMG-LED-Scheinwerfer mit DRL-Signatur für maximale Sichtbarkeit und unverwechselbaren Stil.",
        position: [2.8, 0.3, 1.2],
        cameraPosition: [5, 1.5, 4],
        specs: [
          "LED- oder MULTIBEAM LED-Scheinwerfer",
          "Schwarze Designelemente",
          "Verbesserte Helligkeit und Reichweite",
          "Markante BRABUS Akzente"
        ]
      }
    ]
  }
} as const;

export default de;
