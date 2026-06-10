export type LanguageCode = "fr" | "en" | "de" | "es";

export const localStorageLanguageKey = "bp_language";
export const defaultLanguage: LanguageCode = "fr";

export const languageOptions = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
] as const;

export const currencyOptions = [{ code: "eur", label: "EUR 🇫🇷" }] as const;

export type LegalPageKey = "licences" | "conditions" | "confidentialite" | "cgv";

const drumsPages = {
  fr: {
    eyebrow: "DRUM KITS",
    titlePrefix: "Des kits qui",
    titleHighlight: "frappent fort",
    description:
      "808s, snares, hi-hats, percs — tous les éléments pour construire tes prods trap, drill et cinématiques depuis zéro.",
    comingSoon: "BIENTÔT DISPONIBLE",
    comingSoonDescription: "Les kits arrivent prochainement — reste connecté.",
    productStatus: "BIENTÔT",
    soundCountLabel: "sons",
    disabledCta: "BIENTÔT DISPONIBLE",
    contactPrefix: "Des questions ?",
    kits: [
      { title: "808 Trap Kit Vol.1", tags: ["808s", "Hi-hats", "Percs"], count: "—" },
      { title: "Drill Essentials", tags: ["Snares", "Kicks", "FX"], count: "—" },
      { title: "Cinematic Perc Pack", tags: ["Cinématique", "Percs", "Textures"], count: "—" },
      { title: "Melodic Drum Kit", tags: ["Samples", "Loops", "Drums"], count: "—" },
      { title: "Hard Knock Collection", tags: ["Kicks", "Snares", "Claps"], count: "—" },
      { title: "Trap God Bundle", tags: ["808s", "Trap", "Complet"], count: "—" },
    ],
  },
  en: {
    eyebrow: "DRUM KITS",
    titlePrefix: "Kits that",
    titleHighlight: "hit hard",
    description:
      "808s, snares, hi-hats, percs — every element to build trap, drill, and cinematic productions from scratch.",
    comingSoon: "COMING SOON",
    comingSoonDescription: "The kits are coming soon — stay connected.",
    productStatus: "SOON",
    soundCountLabel: "sounds",
    disabledCta: "COMING SOON",
    contactPrefix: "Questions?",
    kits: [
      { title: "808 Trap Kit Vol.1", tags: ["808s", "Hi-hats", "Percs"], count: "—" },
      { title: "Drill Essentials", tags: ["Snares", "Kicks", "FX"], count: "—" },
      { title: "Cinematic Perc Pack", tags: ["Cinematic", "Percs", "Textures"], count: "—" },
      { title: "Melodic Drum Kit", tags: ["Samples", "Loops", "Drums"], count: "—" },
      { title: "Hard Knock Collection", tags: ["Kicks", "Snares", "Claps"], count: "—" },
      { title: "Trap God Bundle", tags: ["808s", "Trap", "Complete"], count: "—" },
    ],
  },
  de: {
    eyebrow: "DRUM KITS",
    titlePrefix: "Kits, die",
    titleHighlight: "hart treffen",
    description:
      "808s, Snares, Hi-hats, Percs — alles, um Trap-, Drill- und Cinematic-Produktionen von Grund auf zu bauen.",
    comingSoon: "BALD VERFÜGBAR",
    comingSoonDescription: "Die Kits erscheinen bald — bleib verbunden.",
    productStatus: "BALD",
    soundCountLabel: "Sounds",
    disabledCta: "BALD VERFÜGBAR",
    contactPrefix: "Fragen?",
    kits: [
      { title: "808 Trap Kit Vol.1", tags: ["808s", "Hi-hats", "Percs"], count: "—" },
      { title: "Drill Essentials", tags: ["Snares", "Kicks", "FX"], count: "—" },
      { title: "Cinematic Perc Pack", tags: ["Cinematic", "Percs", "Texturen"], count: "—" },
      { title: "Melodic Drum Kit", tags: ["Samples", "Loops", "Drums"], count: "—" },
      { title: "Hard Knock Collection", tags: ["Kicks", "Snares", "Claps"], count: "—" },
      { title: "Trap God Bundle", tags: ["808s", "Trap", "Komplett"], count: "—" },
    ],
  },
  es: {
    eyebrow: "DRUM KITS",
    titlePrefix: "Kits que",
    titleHighlight: "golpean fuerte",
    description:
      "808s, snares, hi-hats, percs — todos los elementos para construir producciones trap, drill y cinematográficas desde cero.",
    comingSoon: "PRÓXIMAMENTE",
    comingSoonDescription: "Los kits llegan pronto — mantente conectado.",
    productStatus: "PRONTO",
    soundCountLabel: "sonidos",
    disabledCta: "PRÓXIMAMENTE",
    contactPrefix: "¿Preguntas?",
    kits: [
      { title: "808 Trap Kit Vol.1", tags: ["808s", "Hi-hats", "Percs"], count: "—" },
      { title: "Drill Essentials", tags: ["Snares", "Kicks", "FX"], count: "—" },
      { title: "Cinematic Perc Pack", tags: ["Cinemático", "Percs", "Texturas"], count: "—" },
      { title: "Melodic Drum Kit", tags: ["Samples", "Loops", "Drums"], count: "—" },
      { title: "Hard Knock Collection", tags: ["Kicks", "Snares", "Claps"], count: "—" },
      { title: "Trap God Bundle", tags: ["808s", "Trap", "Completo"], count: "—" },
    ],
  },
} as const;

const legalPages = {
  fr: {
    back: "← RETOUR",
    eyebrow: "Légal",
    updatedAtLabel: "Dernière mise à jour",
    backToCatalog: "RETOUR AU CATALOGUE",
    pages: {
      licences: {
        title: "Licences",
        description:
          "Base claire pour documenter les licences de beats et les futurs produits numériques de ZewOne Beats.",
        updatedAt: "juin 2026",
        sections: [
          {
            title: "1. Portée des licences",
            paragraphs: [
              "Placeholder : décrire ici les droits accordés selon chaque formule de licence, notamment usage audio, vidéo, plateformes de streaming et diffusion commerciale.",
              "Les plugins VST/AU pourront faire l'objet de conditions spécifiques séparées avant leur lancement.",
            ],
          },
          {
            title: "2. Restrictions",
            paragraphs: [
              "Placeholder : préciser les limites de revente, redistribution, partage de fichiers sources, Content ID et transfert des droits.",
            ],
          },
          {
            title: "3. Mise à jour du contenu",
            paragraphs: [
              "Placeholder : indiquer comment les fichiers, stems, versions WAV ou mises à jour de produits seront mis à disposition après achat.",
            ],
          },
        ],
      },
      conditions: {
        title: "Conditions",
        description:
          "Base pour les conditions générales d'utilisation du site zewonebeats.com.",
        updatedAt: "juin 2026",
        sections: [
          {
            title: "1. Accès au site",
            paragraphs: [
              "Placeholder : définir les règles d'accès au catalogue, aux pages produit, aux liens de téléchargement et aux services associés.",
            ],
          },
          {
            title: "2. Comportements interdits",
            paragraphs: [
              "Placeholder : préciser les usages interdits, notamment tentative de contournement des paiements, extraction automatisée du catalogue ou usage abusif des liens de téléchargement.",
            ],
          },
          {
            title: "3. Évolution du service",
            paragraphs: [
              "Placeholder : indiquer que les contenus, tarifs, pages, plugins et fonctionnalités peuvent évoluer avant ou après lancement.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Confidentialité",
        description:
          "Politique de confidentialité préparée pour les achats, les e-mails transactionnels et la waitlist VST/AU.",
        updatedAt: "juin 2026",
        sections: [
          {
            title: "1. Données collectées",
            paragraphs: [
              "Placeholder : lister les données nécessaires au fonctionnement du site, comme l'adresse e-mail, les informations de commande et les données techniques minimales.",
            ],
          },
          {
            title: "2. Utilisation des données",
            paragraphs: [
              "Placeholder : expliquer les finalités, notamment livraison des achats, support client, prévention des abus et inscription volontaire à la waitlist des plugins.",
            ],
          },
          {
            title: "3. Services tiers",
            paragraphs: [
              "Placeholder : préciser les services utilisés ou envisagés, par exemple Stripe pour les paiements, Resend pour les e-mails et un futur outil de waitlist.",
            ],
          },
        ],
      },
      cgv: {
        title: "Conditions Générales de Vente",
        description:
          "Conditions de vente applicables aux licences de beats numériques achetées sur ZewOne Beats.",
        updatedAt: "mai 2025",
        sections: [
          {
            title: "1. Vendeur",
            paragraphs: [
              "Les présentes CGV régissent les ventes réalisées sur zewonebeats.com, exploité sous le nom commercial ZewOne Beats.",
            ],
          },
          {
            title: "2. Nature des produits",
            paragraphs: [
              "ZewOne Beats commercialise des licences de beats numériques sous différentes formules. Chaque licence confère un droit d'utilisation selon les conditions propres à la formule choisie.",
            ],
          },
          {
            title: "3. Paiement et livraison",
            paragraphs: [
              "Le paiement est sécurisé et traité par Stripe. Après confirmation, les fichiers ou liens de téléchargement sont mis à disposition selon les conditions indiquées au moment de l'achat.",
            ],
          },
          {
            title: "4. Rétractation et remboursement",
            paragraphs: [
              "Conformément aux règles applicables aux contenus numériques, aucun remboursement ne pourra être accordé une fois le contenu téléchargé ou rendu accessible avec l'accord préalable de l'acheteur.",
            ],
          },
          {
            title: "5. Propriété intellectuelle",
            paragraphs: [
              "ZewOne conserve les droits d'auteur sur les beats proposés. L'achat d'une licence ne transfère pas la propriété des fichiers sources ou de la composition.",
            ],
          },
        ],
      },
    },
  },
  en: {
    back: "← BACK",
    eyebrow: "Legal",
    updatedAtLabel: "Last updated",
    backToCatalog: "BACK TO CATALOG",
    pages: {
      licences: {
        title: "Licensing",
        description:
          "A clear base for documenting beat licenses and future digital products from ZewOne Beats.",
        updatedAt: "June 2026",
        sections: [
          {
            title: "1. License scope",
            paragraphs: [
              "Placeholder: describe the rights granted by each license tier, including audio use, video use, streaming platforms, and commercial release.",
              "VST/AU plugins may have separate product terms before launch.",
            ],
          },
          {
            title: "2. Restrictions",
            paragraphs: [
              "Placeholder: define limits around resale, redistribution, source file sharing, Content ID, and transfer of rights.",
            ],
          },
          {
            title: "3. Content updates",
            paragraphs: [
              "Placeholder: explain how files, stems, WAV versions, or product updates are made available after purchase.",
            ],
          },
        ],
      },
      conditions: {
        title: "Terms",
        description: "A base for the general terms of use for zewonebeats.com.",
        updatedAt: "June 2026",
        sections: [
          {
            title: "1. Site access",
            paragraphs: [
              "Placeholder: define access rules for the catalog, product pages, download links, and related services.",
            ],
          },
          {
            title: "2. Prohibited behavior",
            paragraphs: [
              "Placeholder: describe prohibited uses, including payment bypass attempts, automated catalog extraction, or abusive download link usage.",
            ],
          },
          {
            title: "3. Service changes",
            paragraphs: [
              "Placeholder: explain that content, pricing, pages, plugins, and features may evolve before or after launch.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Privacy",
        description:
          "A privacy policy base for purchases, transactional emails, and the VST/AU waitlist.",
        updatedAt: "June 2026",
        sections: [
          {
            title: "1. Data collected",
            paragraphs: [
              "Placeholder: list the data required for the site to operate, such as email address, order information, and minimal technical data.",
            ],
          },
          {
            title: "2. How data is used",
            paragraphs: [
              "Placeholder: explain purposes such as purchase delivery, customer support, abuse prevention, and voluntary plugin waitlist signup.",
            ],
          },
          {
            title: "3. Third-party services",
            paragraphs: [
              "Placeholder: identify current or planned services, such as Stripe for payments, Resend for email, and a future waitlist tool.",
            ],
          },
        ],
      },
      cgv: {
        title: "Terms and Conditions of Sale",
        description:
          "Sales terms for digital beat licenses purchased through ZewOne Beats.",
        updatedAt: "May 2025",
        sections: [
          {
            title: "1. Seller",
            paragraphs: [
              "These sales terms govern purchases made on zewonebeats.com, operated under the ZewOne Beats trade name.",
            ],
          },
          {
            title: "2. Product nature",
            paragraphs: [
              "ZewOne Beats sells digital beat licenses under several tiers. Each license grants usage rights according to the selected tier.",
            ],
          },
          {
            title: "3. Payment and delivery",
            paragraphs: [
              "Payments are secured and processed by Stripe. After confirmation, files or download links are made available under the conditions shown at purchase.",
            ],
          },
          {
            title: "4. Withdrawal and refunds",
            paragraphs: [
              "For digital content, refunds cannot be granted once the content has been downloaded or made accessible with the buyer's prior agreement.",
            ],
          },
          {
            title: "5. Intellectual property",
            paragraphs: [
              "ZewOne keeps the copyright to the beats offered. Buying a license does not transfer ownership of source files or compositions.",
            ],
          },
        ],
      },
    },
  },
  de: {
    back: "← ZURÜCK",
    eyebrow: "Rechtlich",
    updatedAtLabel: "Zuletzt aktualisiert",
    backToCatalog: "ZURÜCK ZUM KATALOG",
    pages: {
      licences: {
        title: "Lizenzierung",
        description:
          "Eine klare Grundlage zur Dokumentation von Beat-Lizenzen und künftigen digitalen Produkten von ZewOne Beats.",
        updatedAt: "Juni 2026",
        sections: [
          {
            title: "1. Lizenzumfang",
            paragraphs: [
              "Platzhalter: Beschreibe die Rechte jeder Lizenzstufe, einschließlich Audio-Nutzung, Video-Nutzung, Streaming-Plattformen und kommerzieller Veröffentlichung.",
              "Für VST/AU-Plugins können vor dem Launch separate Produktbedingungen gelten.",
            ],
          },
          {
            title: "2. Einschränkungen",
            paragraphs: [
              "Platzhalter: Definiere Grenzen für Weiterverkauf, Weitergabe, Teilen von Quelldateien, Content ID und Rechteübertragung.",
            ],
          },
          {
            title: "3. Inhaltsupdates",
            paragraphs: [
              "Platzhalter: Erkläre, wie Dateien, Stems, WAV-Versionen oder Produktupdates nach dem Kauf bereitgestellt werden.",
            ],
          },
        ],
      },
      conditions: {
        title: "Bedingungen",
        description: "Grundlage für die allgemeinen Nutzungsbedingungen von zewonebeats.com.",
        updatedAt: "Juni 2026",
        sections: [
          {
            title: "1. Zugriff auf die Website",
            paragraphs: [
              "Platzhalter: Definiere Zugriffsregeln für Katalog, Produktseiten, Download-Links und verbundene Dienste.",
            ],
          },
          {
            title: "2. Verbotenes Verhalten",
            paragraphs: [
              "Platzhalter: Beschreibe verbotene Nutzungen wie Umgehung von Zahlungen, automatisiertes Auslesen des Katalogs oder missbräuchliche Nutzung von Download-Links.",
            ],
          },
          {
            title: "3. Änderungen am Service",
            paragraphs: [
              "Platzhalter: Erkläre, dass Inhalte, Preise, Seiten, Plugins und Funktionen vor oder nach dem Launch weiterentwickelt werden können.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Datenschutz",
        description:
          "Grundlage für die Datenschutzerklärung zu Käufen, Transaktions-E-Mails und der VST/AU-Waitlist.",
        updatedAt: "Juni 2026",
        sections: [
          {
            title: "1. Erhobene Daten",
            paragraphs: [
              "Platzhalter: Liste die für den Betrieb der Website erforderlichen Daten auf, etwa E-Mail-Adresse, Bestellinformationen und minimale technische Daten.",
            ],
          },
          {
            title: "2. Nutzung der Daten",
            paragraphs: [
              "Platzhalter: Erkläre Zwecke wie Kaufzustellung, Kundensupport, Missbrauchsprävention und freiwillige Anmeldung zur Plugin-Waitlist.",
            ],
          },
          {
            title: "3. Drittanbieter",
            paragraphs: [
              "Platzhalter: Nenne aktuelle oder geplante Dienste, etwa Stripe für Zahlungen, Resend für E-Mails und ein zukünftiges Waitlist-Tool.",
            ],
          },
        ],
      },
      cgv: {
        title: "Allgemeine Verkaufsbedingungen",
        description:
          "Verkaufsbedingungen für digitale Beat-Lizenzen, die über ZewOne Beats gekauft werden.",
        updatedAt: "Mai 2025",
        sections: [
          {
            title: "1. Verkäufer",
            paragraphs: [
              "Diese Verkaufsbedingungen regeln Käufe auf zewonebeats.com, betrieben unter dem Handelsnamen ZewOne Beats.",
            ],
          },
          {
            title: "2. Art der Produkte",
            paragraphs: [
              "ZewOne Beats verkauft digitale Beat-Lizenzen in mehreren Stufen. Jede Lizenz gewährt Nutzungsrechte gemäß der ausgewählten Stufe.",
            ],
          },
          {
            title: "3. Zahlung und Lieferung",
            paragraphs: [
              "Zahlungen werden sicher über Stripe verarbeitet. Nach Bestätigung werden Dateien oder Download-Links gemäß den beim Kauf angezeigten Bedingungen bereitgestellt.",
            ],
          },
          {
            title: "4. Widerruf und Rückerstattung",
            paragraphs: [
              "Bei digitalen Inhalten können keine Rückerstattungen gewährt werden, sobald der Inhalt mit vorheriger Zustimmung des Käufers heruntergeladen oder zugänglich gemacht wurde.",
            ],
          },
          {
            title: "5. Geistiges Eigentum",
            paragraphs: [
              "ZewOne behält die Urheberrechte an den angebotenen Beats. Der Kauf einer Lizenz überträgt kein Eigentum an Quelldateien oder Kompositionen.",
            ],
          },
        ],
      },
    },
  },
  es: {
    back: "← VOLVER",
    eyebrow: "Legal",
    updatedAtLabel: "Última actualización",
    backToCatalog: "VOLVER AL CATÁLOGO",
    pages: {
      licences: {
        title: "Licencias",
        description:
          "Una base clara para documentar las licencias de beats y futuros productos digitales de ZewOne Beats.",
        updatedAt: "junio de 2026",
        sections: [
          {
            title: "1. Alcance de las licencias",
            paragraphs: [
              "Placeholder: describe los derechos concedidos por cada tipo de licencia, incluyendo uso de audio, video, plataformas de streaming y lanzamiento comercial.",
              "Los plugins VST/AU podrán tener condiciones de producto separadas antes del lanzamiento.",
            ],
          },
          {
            title: "2. Restricciones",
            paragraphs: [
              "Placeholder: define límites sobre reventa, redistribución, compartir archivos fuente, Content ID y transferencia de derechos.",
            ],
          },
          {
            title: "3. Actualizaciones de contenido",
            paragraphs: [
              "Placeholder: explica cómo se entregarán archivos, stems, versiones WAV o actualizaciones de producto después de la compra.",
            ],
          },
        ],
      },
      conditions: {
        title: "Términos",
        description: "Base para los términos generales de uso de zewonebeats.com.",
        updatedAt: "junio de 2026",
        sections: [
          {
            title: "1. Acceso al sitio",
            paragraphs: [
              "Placeholder: define las reglas de acceso al catálogo, páginas de producto, enlaces de descarga y servicios relacionados.",
            ],
          },
          {
            title: "2. Conductas prohibidas",
            paragraphs: [
              "Placeholder: describe usos prohibidos, como intentos de saltarse pagos, extracción automatizada del catálogo o abuso de enlaces de descarga.",
            ],
          },
          {
            title: "3. Cambios del servicio",
            paragraphs: [
              "Placeholder: indica que contenidos, precios, páginas, plugins y funciones pueden evolucionar antes o después del lanzamiento.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Privacidad",
        description:
          "Base de política de privacidad para compras, emails transaccionales y la waitlist VST/AU.",
        updatedAt: "junio de 2026",
        sections: [
          {
            title: "1. Datos recopilados",
            paragraphs: [
              "Placeholder: enumera los datos necesarios para operar el sitio, como email, información de pedido y datos técnicos mínimos.",
            ],
          },
          {
            title: "2. Uso de datos",
            paragraphs: [
              "Placeholder: explica finalidades como entrega de compras, soporte al cliente, prevención de abusos e inscripción voluntaria en la waitlist de plugins.",
            ],
          },
          {
            title: "3. Servicios terceros",
            paragraphs: [
              "Placeholder: identifica servicios actuales o previstos, como Stripe para pagos, Resend para emails y una futura herramienta de waitlist.",
            ],
          },
        ],
      },
      cgv: {
        title: "Términos y Condiciones de Venta",
        description:
          "Condiciones de venta para licencias digitales de beats compradas en ZewOne Beats.",
        updatedAt: "mayo de 2025",
        sections: [
          {
            title: "1. Vendedor",
            paragraphs: [
              "Estas condiciones de venta rigen las compras realizadas en zewonebeats.com, operado bajo el nombre comercial ZewOne Beats.",
            ],
          },
          {
            title: "2. Naturaleza de los productos",
            paragraphs: [
              "ZewOne Beats vende licencias digitales de beats en varios niveles. Cada licencia concede derechos de uso según el nivel elegido.",
            ],
          },
          {
            title: "3. Pago y entrega",
            paragraphs: [
              "Los pagos son seguros y procesados por Stripe. Tras la confirmación, los archivos o enlaces de descarga se entregan según las condiciones mostradas en la compra.",
            ],
          },
          {
            title: "4. Desistimiento y reembolsos",
            paragraphs: [
              "Para contenido digital, no se podrán conceder reembolsos una vez que el contenido haya sido descargado o puesto a disposición con el acuerdo previo del comprador.",
            ],
          },
          {
            title: "5. Propiedad intelectual",
            paragraphs: [
              "ZewOne conserva los derechos de autor sobre los beats ofrecidos. Comprar una licencia no transfiere la propiedad de archivos fuente ni composiciones.",
            ],
          },
        ],
      },
    },
  },
} as const;

export const translations = {
  fr: {
    header: {
      nav: {
        featured: "À la une",
        trending: "Tendances",
        catalog: "Catalogue",
        analytics: "Analytique",
        collabs: "Placements",
        drums: "Drums",
        vst: "VST",
      },
      shopNow: "ACHETER",
    },
    hero: {
      tagline: "Premium Beat Marketplace",
      titleLine1: "Créé pour les artistes",
      titleLine2: "qui mènent",
      titleLine3: "la culture.",
      description:
        "Instrumentaux trap & cinématiques exclusifs. Qualité studio. Licence instantanée pour artistes bâtissant des empires.",
      exploreCollection: "ÉCOUTER LES BEATS",
      viewPlacements: "VOIR LES PLACEMENTS",
      playingNow: "Aperçu en cours",
      newDrop: "Nouveauté",
      placementProof: "Productions et placements pour",
    },
    featured: {
      label: "Sélection exclusive",
      title: "Beats",
      titleHighlight: "vedettes",
      description: "Exclusivités triées sur le volet. Licences limitées disponibles.",
      preview: "APERÇU",
      pause: "PAUSE",
    },
    trending: {
      label: "Tendances maintenant",
      title: "Top",
      titleHighlight: "écoutes",
    },
    catalog: {
      label: "Catalogue complet",
      title: "Tous les",
      titleHighlight: "beats",
      description: "Instrumentaux trap avec aperçus complets. Livraison instantanée. Stems sur demande.",
    },
    analytics: {
      label: "Pour les producteurs",
      title: "Analytique",
      titleHighlight: "temps réel",
      description: "Suivez les lectures, les revenus et les conversions avec un tableau de bord conçu pour les créateurs sérieux.",
      performanceOverview: "Aperçu des performances",
      playsLastWeeks: "Lectures — 12 dernières semaines",
      stats: [
        { label: "Lectures totales", value: "2,4M", change: "+24%" },
        { label: "Revenu", value: "48,2K€", change: "+18%" },
        { label: "Licences vendues", value: "1 247", change: "+31%" },
        { label: "Conversion", value: "8,4%", change: "+5%" },
      ],
      thisMonth: "ce mois-ci",
      topBeatThisWeek: "Beat préféré cette semaine",
      peakPlays: "Lectures maximales",
    },
    testimonials: {
      label: "Confiance mondiale",
      title: "Adoré par",
      titleHighlight: "les créateurs",
      rating: "4.9",
      ratingLabel: "Note moyenne",
      reviewCount: "3 avis",
      beatLabel: "Beat acheté",
      items: [
        {
          quote: "Qualité studio immédiate. J'ai posé dessus en 10 min.",
          name: "Marcus V.",
          role: "Artiste Platine",
          avatar: "MV",
          beat: "AMA",
        },
        {
          quote: "Le tableau de bord change tout pour les producteurs sérieux.",
          name: "Lena K.",
          role: "Productrice",
          avatar: "LK",
          beat: "DGRT",
        },
        {
          quote: "Chaque beat semble mixé pour une major.",
          name: "Jay R.",
          role: "Directeur A&R",
          avatar: "JR",
          beat: "DOPE MACHINE",
        },
      ],
    },
    beatCard: {
      preview: "APERÇU",
      pause: "PAUSE",
      buy: "ACHETER",
      buyNow: "ACHETER",
      from: "à partir de",
    },
    beatTags: { HOT: "POPULAIRE", NEW: "NOUVEAU", TRENDING: "TENDANCE" } as Record<string, string>,
    licenseModal: {
      select: "Choisir une licence",
      close: "Fermer",
      secure: "Paiement sécurisé par Stripe",
      redirecting: "REDIRECTION VERS STRIPE...",
      checkout: "PAYER — {price}",
      refundNotice: "Je comprends que ce contenu numérique (instrumental) n'est pas remboursable une fois téléchargé, conformément à l'article L221-28 du Code de la consommation.",
      cgvLink: "Voir les CGV",
    },
    collabs: {
      label: "CRÉDITS SÉLECTIONNÉS",
      title: "Place",
      titleHighlight: "ments",
      description:
        "Une sélection de morceaux produits ou co-produits par ZewOne. Les liens d'écoute seront ajoutés après validation des URLs officielles.",
      itemLabel: "Placement",
      listen: "Écouter",
    },
    vstPage: {
      eyebrow: "PLUGINS VST / AU",
      titlePrefix: "Des outils qui",
      titleHighlight: "définissent le son",
      description:
        "Synthés, effets et samplers conçus pour la production trap, drill et cinématique. Compatible macOS uniquement — VST3, AU.",
      comingSoon: "BIENTÔT DISPONIBLE",
      comingSoonDescription: "Les plugins arrivent prochainement — reste connecté.",
      productStatus: "BIENTÔT",
      productTitle: "TRAFIK Synth",
      productType: "VST3 / AU",
      visualAlt: "Aperçu placeholder de l'interface du synthétiseur TRAFIK Synth",
      visualLabel: "Interface TRAFIK Synth",
      visualPlaceholder: "Visuel de l'interface à venir",
      productDescription: [
        "TRAFIK Synth est un placeholder produit pour présenter un futur synthétiseur orienté trap, drill et ambiances cinématiques.",
        "Le texte final pourra détailler les oscillateurs, presets, macros et textures sonores quand le plugin sera prêt.",
        "La première version sera pensée pour macOS avec formats VST3 et AU.",
      ],
      notifyCta: "Me prévenir au lancement",
      waitlistTitle: "Être prévenu en premier",
      waitlistEyebrow: "WAITLIST",
      waitlistDescription:
        "Laisse ton email pour recevoir une notification quand TRAFIK Synth sera disponible.",
      emailLabel: "Adresse email",
      emailPlaceholder: "ton@email.com",
      submit: "Rejoindre la waitlist",
      submitting: "Inscription...",
      success: "C'est noté. Nous te préviendrons dès que le lancement sera prêt.",
      errorRequired: "Entre une adresse email.",
      errorInvalid: "Adresse email invalide.",
      errorGeneric: "Impossible d'inscrire cet email pour le moment. Réessaie plus tard.",
      privacyNote: "Ton email est envoyé via une requête sécurisée, jamais dans l'URL.",
      contactPrefix: "Des questions ?",
    },
    drumsPage: drumsPages.fr,
    legalPages: legalPages.fr,
    footer: {
      description: "La place de marché premium pour les beats trap, drill et cinématiques. Conçu pour les artistes qui exigent l'excellence.",
      platform: "Plateforme",
      legal: "Légal",
      contact: "Contact",
      contactDescription: "Pour les demandes commerciales, beats personnalisés et licences :",
      featured: "À la une",
      catalog: "Catalogue",
      analytics: "Analytique",
      placements: "Placements",
      licensing: "Licences",
      terms: "Conditions",
      cgv: "CGV",
      privacy: "Confidentialité",
      copyright: "© {year} ZewOne Beats",
      crafted: "Conçu avec précision.",
    },
    checkout: {
      success: "Paiement réussi",
      heading: "Tout est prêt",
      yourPurchase: "Votre achat",
      license: "Licence",
      expiry: "Les liens de téléchargement expirent dans 24 h",
      summary: "Vos fichiers de licence seront envoyés par e-mail sous peu.",
      backToMarketplace: "RETOUR AU MARCHÉ",
      cancelled: "Paiement annulé",
      noCharge: "Aucun paiement effectué",
      cancelHelp: "Votre paiement n'a pas été complété. Vous pouvez revenir et réessayer à tout moment.",
      returnToMarketplace: "RETOUR AU MARCHÉ",
      loading: "Chargement...",
    },
  },

  en: {
    header: {
      nav: {
        featured: "Featured",
        trending: "Trending",
        catalog: "Catalog",
        analytics: "Analytics",
        collabs: "Placements",
        drums: "Drums",
        vst: "VST",
      },
      shopNow: "SHOP NOW",
    },
    hero: {
      tagline: "Premium Beat Marketplace",
      titleLine1: "Built for artists",
      titleLine2: "who lead the",
      titleLine3: "culture.",
      description: "Exclusive trap & cinematic instrumentals. Studio-grade quality. Instant licensing for artists building empires.",
      exploreCollection: "LISTEN TO THE BEATS",
      viewPlacements: "VIEW PLACEMENTS",
      playingNow: "Now playing preview",
      newDrop: "New drop",
      placementProof: "Produced and placed with",
    },
    featured: {
      label: "Curated selection",
      title: "Featured",
      titleHighlight: "beats",
      description: "Hand-picked exclusives from top producers. Limited licenses available.",
      preview: "PREVIEW",
      pause: "PAUSE",
    },
    trending: {
      label: "Trending now",
      title: "Chart",
      titleHighlight: "breakers",
    },
    catalog: {
      label: "Full catalog",
      title: "All",
      titleHighlight: "beats",
      description: "Trap instrumentals with full previews. Instant delivery. Stems on request.",
    },
    analytics: {
      label: "For producers",
      title: "Real-time",
      titleHighlight: "analytics",
      description: "Track plays, revenue, and conversions with a dashboard built for serious creators.",
      performanceOverview: "Performance overview",
      playsLastWeeks: "Plays — last 12 weeks",
      stats: [
        { label: "Total plays", value: "2.4M", change: "+24%" },
        { label: "Revenue", value: "$48.2K", change: "+18%" },
        { label: "Licenses sold", value: "1,247", change: "+31%" },
        { label: "Conversion", value: "8.4%", change: "+5%" },
      ],
      thisMonth: "this month",
      topBeatThisWeek: "Top beat this week",
      peakPlays: "Peak plays",
    },
    testimonials: {
      label: "Trusted worldwide",
      title: "Loved by",
      titleHighlight: "creators",
      rating: "4.9",
      ratingLabel: "Average rating",
      reviewCount: "3 reviews",
      beatLabel: "Beat purchased",
      items: [
        {
          quote: "Instant studio quality. I laid vocals in 10 minutes.",
          name: "Marcus V.",
          role: "Platinum Artist",
          avatar: "MV",
          beat: "AMA",
        },
        {
          quote: "The analytics dashboard is a game changer for serious producers.",
          name: "Lena K.",
          role: "Producer",
          avatar: "LK",
          beat: "DGRT",
        },
        {
          quote: "Every beat feels like it was mixed for a major label.",
          name: "Jay R.",
          role: "A&R Director",
          avatar: "JR",
          beat: "DOPE MACHINE",
        },
      ],
    },
    beatCard: {
      preview: "PREVIEW",
      pause: "PAUSE",
      buy: "BUY NOW",
      buyNow: "BUY NOW",
      from: "from",
    },
    beatTags: { HOT: "HOT", NEW: "NEW", TRENDING: "TRENDING" } as Record<string, string>,
    licenseModal: {
      select: "Select license",
      close: "Close",
      secure: "Secure payment powered by Stripe",
      redirecting: "REDIRECTING TO STRIPE...",
      checkout: "CHECKOUT — {price}",
      refundNotice: "I understand that this digital content (instrumental) is non-refundable once downloaded, in accordance with Article L221-28 of the French Consumer Code.",
      cgvLink: "View T&Cs",
    },
    collabs: {
      label: "SELECTED CREDITS",
      title: "Place",
      titleHighlight: "ments",
      description:
        "A selection of tracks produced or co-produced by ZewOne. Official listening links will be added once validated.",
      itemLabel: "Placement",
      listen: "Listen",
    },
    vstPage: {
      eyebrow: "VST / AU PLUGINS",
      titlePrefix: "Tools that",
      titleHighlight: "shape the sound",
      description:
        "Synths, effects, and samplers built for trap, drill, and cinematic production. macOS only — VST3, AU.",
      comingSoon: "COMING SOON",
      comingSoonDescription: "Plugins are coming soon — stay connected.",
      productStatus: "SOON",
      productTitle: "TRAFIK Synth",
      productType: "VST3 / AU",
      visualAlt: "Placeholder preview of the TRAFIK Synth interface",
      visualLabel: "TRAFIK Synth interface",
      visualPlaceholder: "Interface visual coming soon",
      productDescription: [
        "TRAFIK Synth is placeholder product copy for a future synth focused on trap, drill, and cinematic atmospheres.",
        "The final copy can describe oscillators, presets, macros, and sound textures once the plugin is ready.",
        "The first version is planned for macOS with VST3 and AU formats.",
      ],
      notifyCta: "Notify me at launch",
      waitlistTitle: "Be first to know",
      waitlistEyebrow: "WAITLIST",
      waitlistDescription:
        "Leave your email to get notified when TRAFIK Synth becomes available.",
      emailLabel: "Email address",
      emailPlaceholder: "you@email.com",
      submit: "Join the waitlist",
      submitting: "Joining...",
      success: "You're on the list. We'll notify you when launch is ready.",
      errorRequired: "Enter an email address.",
      errorInvalid: "Enter a valid email address.",
      errorGeneric: "Unable to join the waitlist right now. Try again later.",
      privacyNote: "Your email is sent with a secure request, never in the URL.",
      contactPrefix: "Questions?",
    },
    drumsPage: drumsPages.en,
    legalPages: legalPages.en,
    footer: {
      description: "The premium marketplace for trap, drill & cinematic instrumentals. Built for artists who demand excellence.",
      platform: "Platform",
      legal: "Legal",
      contact: "Contact",
      contactDescription: "For business inquiries, custom beats & licensing:",
      featured: "Featured",
      catalog: "Catalog",
      analytics: "Analytics",
      placements: "Placements",
      licensing: "Licensing",
      terms: "Terms",
      cgv: "T&Cs",
      privacy: "Privacy",
      copyright: "© {year} ZewOne Beats",
      crafted: "Crafted with precision.",
    },
    checkout: {
      success: "Payment successful",
      heading: "You're all set",
      yourPurchase: "Your purchase",
      license: "License",
      expiry: "Download links expire in 24 hours",
      summary: "Your license files will be delivered to your email shortly.",
      backToMarketplace: "BACK TO MARKETPLACE",
      cancelled: "Payment cancelled",
      noCharge: "No charge made",
      cancelHelp: "Your payment was not completed. You can return and try again anytime.",
      returnToMarketplace: "RETURN TO MARKETPLACE",
      loading: "Loading...",
    },
  },

  de: {
    header: {
      nav: {
        featured: "Highlights",
        trending: "Trends",
        catalog: "Katalog",
        analytics: "Analytics",
        collabs: "Placements",
        drums: "Drums",
        vst: "VST",
      },
      shopNow: "JETZT KAUFEN",
    },
    hero: {
      tagline: "Premium Beat Marketplace",
      titleLine1: "Für Künstler gebaut",
      titleLine2: "die die Kultur",
      titleLine3: "führen.",
      description: "Exklusive Trap- & Cinematic-Instrumentals. Studioqualität. Sofortige Lizenzierung für Künstler, die Imperien aufbauen.",
      exploreCollection: "BEATS ANHÖREN",
      viewPlacements: "PLACEMENTS ANSEHEN",
      playingNow: "Jetzt vorgespielt",
      newDrop: "Neuheit",
      placementProof: "Produktionen und Placements für",
    },
    featured: {
      label: "Kuratierte Auswahl",
      title: "Highlights",
      titleHighlight: "Beats",
      description: "Handverlesene Exklusivitäten von Top-Produzenten. Begrenzte Lizenzen verfügbar.",
      preview: "VORSCHAU",
      pause: "PAUSE",
    },
    trending: {
      label: "Gerade angesagt",
      title: "Charts",
      titleHighlight: "Breaker",
    },
    catalog: {
      label: "Vollständiger Katalog",
      title: "Alle",
      titleHighlight: "Beats",
      description: "Trap-Instrumentals mit vollständigen Vorschauen. Sofortige Lieferung. Stems auf Anfrage.",
    },
    analytics: {
      label: "Für Produzenten",
      title: "Echtzeit",
      titleHighlight: "Analytics",
      description: "Verfolgen Sie Plays, Umsätze und Conversions mit einem Dashboard für ernsthafte Creator.",
      performanceOverview: "Leistungsübersicht",
      playsLastWeeks: "Plays — letzte 12 Wochen",
      stats: [
        { label: "Gesamte Plays", value: "2,4M", change: "+24%" },
        { label: "Umsatz", value: "48,2K€", change: "+18%" },
        { label: "Lizenzen verkauft", value: "1.247", change: "+31%" },
        { label: "Konversion", value: "8,4%", change: "+5%" },
      ],
      thisMonth: "diesen Monat",
      topBeatThisWeek: "Top-Beat diese Woche",
      peakPlays: "Spitzenwert Plays",
    },
    testimonials: {
      label: "Weltweit vertraut",
      title: "Geliebt von",
      titleHighlight: "Creatoren",
      rating: "4.9",
      ratingLabel: "Durchschnittsnote",
      reviewCount: "3 Bewertungen",
      beatLabel: "Gekaufter Beat",
      items: [
        {
          quote: "Sofortige Studioqualität. Ich habe in 10 Minuten Vocals aufgenommen.",
          name: "Marcus V.",
          role: "Platin-Künstler",
          avatar: "MV",
          beat: "AMA",
        },
        {
          quote: "Das Analytics-Dashboard ist ein Game Changer für ernsthafte Produzenten.",
          name: "Lena K.",
          role: "Produzentin",
          avatar: "LK",
          beat: "DGRT",
        },
        {
          quote: "Jeder Beat klingt, als wäre er für ein Major-Label gemischt worden.",
          name: "Jay R.",
          role: "A&R Direktor",
          avatar: "JR",
          beat: "DOPE MACHINE",
        },
      ],
    },
    beatCard: {
      preview: "VORSCHAU",
      pause: "PAUSE",
      buy: "KAUFEN",
      buyNow: "KAUFEN",
      from: "von",
    },
    beatTags: { HOT: "BELIEBT", NEW: "NEU", TRENDING: "TRENDING" } as Record<string, string>,
    licenseModal: {
      select: "Lizenz auswählen",
      close: "Schließen",
      secure: "Sichere Zahlung über Stripe",
      redirecting: "WEITERLEITUNG ZU STRIPE...",
      checkout: "KAUFEN — {price}",
      refundNotice: "Ich verstehe, dass dieser digitale Inhalt (Instrumental) nach dem Herunterladen nicht erstattungsfähig ist, gemäß Artikel L221-28 des französischen Verbraucherrechts.",
      cgvLink: "AGB ansehen",
    },
    collabs: {
      label: "AUSGEWÄHLTE CREDITS",
      title: "Place",
      titleHighlight: "ments",
      description:
        "Eine Auswahl von Tracks, die ZewOne produziert oder co-produziert hat. Offizielle Hörlinks werden nach der Prüfung ergänzt.",
      itemLabel: "Placement",
      listen: "Anhören",
    },
    vstPage: {
      eyebrow: "VST / AU PLUGINS",
      titlePrefix: "Tools, die",
      titleHighlight: "den Sound prägen",
      description:
        "Synths, Effekte und Sampler für Trap-, Drill- und Cinematic-Produktionen. Nur macOS — VST3, AU.",
      comingSoon: "BALD VERFÜGBAR",
      comingSoonDescription: "Die Plugins erscheinen bald — bleib verbunden.",
      productStatus: "BALD",
      productTitle: "TRAFIK Synth",
      productType: "VST3 / AU",
      visualAlt: "Platzhalter-Vorschau der TRAFIK Synth Oberfläche",
      visualLabel: "TRAFIK Synth Oberfläche",
      visualPlaceholder: "Interface-Visual folgt bald",
      productDescription: [
        "TRAFIK Synth ist Platzhaltertext für einen kommenden Synth mit Fokus auf Trap, Drill und cinematische Atmosphären.",
        "Der finale Text kann Oszillatoren, Presets, Makros und Klangtexturen beschreiben, sobald der Plugin-Stand feststeht.",
        "Die erste Version ist für macOS mit VST3- und AU-Formaten geplant.",
      ],
      notifyCta: "Zum Launch benachrichtigen",
      waitlistTitle: "Als Erste informiert sein",
      waitlistEyebrow: "WAITLIST",
      waitlistDescription:
        "Hinterlasse deine E-Mail, um benachrichtigt zu werden, wenn TRAFIK Synth verfügbar ist.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "du@email.com",
      submit: "Waitlist beitreten",
      submitting: "Wird gesendet...",
      success: "Du bist auf der Liste. Wir informieren dich, sobald der Launch bereit ist.",
      errorRequired: "Gib eine E-Mail-Adresse ein.",
      errorInvalid: "Gib eine gültige E-Mail-Adresse ein.",
      errorGeneric: "Der Eintrag ist gerade nicht möglich. Versuch es später erneut.",
      privacyNote: "Deine E-Mail wird sicher gesendet, niemals in der URL.",
      contactPrefix: "Fragen?",
    },
    drumsPage: drumsPages.de,
    legalPages: legalPages.de,
    footer: {
      description: "Der Premium-Marktplatz für Trap-, Drill- und Cinematic-Instrumentals. Gebaut für Künstler, die Exzellenz fordern.",
      platform: "Plattform",
      legal: "Rechtlich",
      contact: "Kontakt",
      contactDescription: "Für geschäftliche Anfragen, Custom-Beats und Lizenzierung:",
      featured: "Highlights",
      catalog: "Katalog",
      analytics: "Analytics",
      placements: "Placements",
      licensing: "Lizenzierung",
      terms: "Bedingungen",
      cgv: "AGB",
      privacy: "Datenschutz",
      copyright: "© {year} ZewOne Beats",
      crafted: "Mit Präzision entwickelt.",
    },
    checkout: {
      success: "Zahlung erfolgreich",
      heading: "Alles bereit",
      yourPurchase: "Ihr Kauf",
      license: "Lizenz",
      expiry: "Download-Links laufen in 24 Stunden ab",
      summary: "Ihre Lizenzdateien werden in Kürze per E-Mail zugestellt.",
      backToMarketplace: "ZURÜCK ZUM MARKT",
      cancelled: "Zahlung abgebrochen",
      noCharge: "Keine Zahlung erfolgt",
      cancelHelp: "Ihre Zahlung wurde nicht abgeschlossen. Sie können zurückkehren und es jederzeit erneut versuchen.",
      returnToMarketplace: "ZURÜCK ZUM MARKT",
      loading: "Wird geladen...",
    },
  },

  es: {
    header: {
      nav: {
        featured: "Destacados",
        trending: "Tendencias",
        catalog: "Catálogo",
        analytics: "Analítica",
        collabs: "Placements",
        drums: "Drums",
        vst: "VST",
      },
      shopNow: "COMPRAR AHORA",
    },
    hero: {
      tagline: "Premium Beat Marketplace",
      titleLine1: "Construido para artistas",
      titleLine2: "que lideran la",
      titleLine3: "cultura.",
      description: "Instrumentales trap y cinematográficos exclusivos. Calidad de estudio. Licencias instantáneas para artistas construyendo imperios.",
      exploreCollection: "ESCUCHAR LOS BEATS",
      viewPlacements: "VER PLACEMENTS",
      playingNow: "Vista previa en reproducción",
      newDrop: "Nuevo lanzamiento",
      placementProof: "Producciones y placements para",
    },
    featured: {
      label: "Selección curada",
      title: "Beats",
      titleHighlight: "destacados",
      description: "Exclusivas seleccionadas a mano. Licencias limitadas disponibles.",
      preview: "VISTA PREVIA",
      pause: "PAUSAR",
    },
    trending: {
      label: "Tendencia ahora",
      title: "Rompe",
      titleHighlight: "tablas",
    },
    catalog: {
      label: "Catálogo completo",
      title: "Todos los",
      titleHighlight: "beats",
      description: "Instrumentales trap con vistas previas completas. Entrega instantánea. Stems a pedido.",
    },
    analytics: {
      label: "Para productores",
      title: "Analítica en",
      titleHighlight: "tiempo real",
      description: "Rastrea reproducciones, ingresos y conversiones con un panel construido para creadores serios.",
      performanceOverview: "Resumen de rendimiento",
      playsLastWeeks: "Reproducciones — últimas 12 semanas",
      stats: [
        { label: "Reproducciones totales", value: "2,4M", change: "+24%" },
        { label: "Ingresos", value: "48,2K€", change: "+18%" },
        { label: "Licencias vendidas", value: "1.247", change: "+31%" },
        { label: "Conversión", value: "8,4%", change: "+5%" },
      ],
      thisMonth: "este mes",
      topBeatThisWeek: "Beat principal esta semana",
      peakPlays: "Reproducciones máximas",
    },
    testimonials: {
      label: "Confianza mundial",
      title: "Amado por",
      titleHighlight: "creadores",
      rating: "4.9",
      ratingLabel: "Nota media",
      reviewCount: "3 reseñas",
      beatLabel: "Beat comprado",
      items: [
        {
          quote: "Calidad de estudio inmediata. Grabé encima en 10 minutos.",
          name: "Marcus V.",
          role: "Artista Platino",
          avatar: "MV",
          beat: "AMA",
        },
        {
          quote: "El panel de analítica lo cambia todo para productores serios.",
          name: "Lena K.",
          role: "Productora",
          avatar: "LK",
          beat: "DGRT",
        },
        {
          quote: "Cada beat parece mezclado para un sello discográfico mayor.",
          name: "Jay R.",
          role: "Director A&R",
          avatar: "JR",
          beat: "DOPE MACHINE",
        },
      ],
    },
    beatCard: {
      preview: "VISTA PREVIA",
      pause: "PAUSAR",
      buy: "COMPRAR",
      buyNow: "COMPRAR",
      from: "desde",
    },
    beatTags: { HOT: "POPULAR", NEW: "NUEVO", TRENDING: "TENDENCIA" } as Record<string, string>,
    licenseModal: {
      select: "Seleccionar licencia",
      close: "Cerrar",
      secure: "Pago seguro con Stripe",
      redirecting: "REDIRIGIENDO A STRIPE...",
      checkout: "PAGO — {price}",
      refundNotice: "Entiendo que este contenido digital (instrumental) no es reembolsable una vez descargado, de conformidad con el artículo L221-28 del Código de Consumo francés.",
      cgvLink: "Ver T&C",
    },
    collabs: {
      label: "CRÉDITOS SELECCIONADOS",
      title: "Place",
      titleHighlight: "ments",
      description:
        "Una selección de temas producidos o coproducidos por ZewOne. Los enlaces oficiales se añadirán después de validarlos.",
      itemLabel: "Placement",
      listen: "Escuchar",
    },
    vstPage: {
      eyebrow: "PLUGINS VST / AU",
      titlePrefix: "Herramientas que",
      titleHighlight: "definen el sonido",
      description:
        "Synths, efectos y samplers para producción trap, drill y cinematográfica. Solo macOS — VST3, AU.",
      comingSoon: "PRÓXIMAMENTE",
      comingSoonDescription: "Los plugins llegan pronto — mantente conectado.",
      productStatus: "PRONTO",
      productTitle: "TRAFIK Synth",
      productType: "VST3 / AU",
      visualAlt: "Vista previa placeholder de la interfaz de TRAFIK Synth",
      visualLabel: "Interfaz TRAFIK Synth",
      visualPlaceholder: "Visual de interfaz próximamente",
      productDescription: [
        "TRAFIK Synth es texto placeholder para un futuro synth enfocado en trap, drill y atmósferas cinematográficas.",
        "El texto final podrá detallar osciladores, presets, macros y texturas sonoras cuando el plugin esté listo.",
        "La primera versión está pensada para macOS con formatos VST3 y AU.",
      ],
      notifyCta: "Avisarme en el lanzamiento",
      waitlistTitle: "Recibir aviso primero",
      waitlistEyebrow: "WAITLIST",
      waitlistDescription:
        "Deja tu email para recibir una notificación cuando TRAFIK Synth esté disponible.",
      emailLabel: "Email",
      emailPlaceholder: "tu@email.com",
      submit: "Unirme a la waitlist",
      submitting: "Enviando...",
      success: "Listo. Te avisaremos cuando el lanzamiento esté preparado.",
      errorRequired: "Introduce un email.",
      errorInvalid: "Introduce un email válido.",
      errorGeneric: "No se puede unir a la waitlist ahora. Inténtalo más tarde.",
      privacyNote: "Tu email se envía con una solicitud segura, nunca en la URL.",
      contactPrefix: "¿Preguntas?",
    },
    drumsPage: drumsPages.es,
    legalPages: legalPages.es,
    footer: {
      description: "La plaza de mercado premium para instrumentales trap, drill y cinematográficos. Construido para artistas que exigen excelencia.",
      platform: "Plataforma",
      legal: "Legal",
      contact: "Contacto",
      contactDescription: "Para consultas comerciales, beats personalizados y licencias:",
      featured: "Destacados",
      catalog: "Catálogo",
      analytics: "Analítica",
      placements: "Placements",
      licensing: "Licencias",
      terms: "Términos",
      cgv: "T&C",
      privacy: "Privacidad",
      copyright: "© {year} ZewOne Beats",
      crafted: "Hecho con precisión.",
    },
    checkout: {
      success: "Pago exitoso",
      heading: "Todo listo",
      yourPurchase: "Tu compra",
      license: "Licencia",
      expiry: "Los enlaces de descarga vencen en 24 horas",
      summary: "Tus archivos de licencia se enviarán por correo electrónico en breve.",
      backToMarketplace: "VOLVER AL MERCADO",
      cancelled: "Pago cancelado",
      noCharge: "No se realizó ningún cargo",
      cancelHelp: "Su pago no se completó. Puede regresar y volver a intentarlo en cualquier momento.",
      returnToMarketplace: "VOLVER AL MERCADO",
      loading: "Cargando...",
    },
  },
} as const;

export type Translations = (typeof translations)[LanguageCode];
