export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      carrier: "Devenir Transporteur",
      tracking: "Suivi de charge",
      contact: "Contact",
      cta: "Obtenir une soumission",
    },
    hero: {
      title: "Votre Fret,",
      titleHighlight: "Livré Sans Compromis",
      subtitle:
        "Dry van, reefer, flatbed et cross-border CA/US — S-FR8 connecte shippers et transporteurs avec réactivité et fiabilité.",
      ctaQuote: "Demander une soumission",
      ctaCarrier: "Devenir Transporteur",
      ctaTracking: "Suivre une charge",
    },
    services: {
      title: "Nos Services",
      subtitle: "Une couverture complète pour vos besoins de transport.",
      items: [
        {
          title: "Dry Van",
          desc: "Transport de marchandises générales en remorque fermée, partout au Canada et aux États-Unis.",
        },
        {
          title: "Reefer",
          desc: "Transport réfrigéré pour marchandises périssables, température contrôlée de bout en bout.",
        },
        {
          title: "Flatbed",
          desc: "Charges hors-gabarit, matériaux de construction et machinerie sur plateforme ouverte.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Expertise douanière et réseau de transporteurs des deux côtés de la frontière.",
        },
        {
          title: "LTL",
          desc: "Chargement partiel groupé avec d'autres charges, facturé selon l'espace et le poids réels.",
        },
        {
          title: "Service spécialisé",
          desc: "Charges hors-normes, projets industriels et besoins de manutention particuliers, gérés sur mesure.",
        },
      ],
      teaserCta: "Voir tous les services",
    },
    differentiator: {
      title: "Pourquoi S-FR8",
      body: "Réactivité et couverture Canada–USA : un réseau de transporteurs et une expertise douanière des deux côtés de la frontière, pour répondre plus vite qu'un courtier régional.",
      points: [
        {
          title: "Réactif",
          desc: "Réponse rapide à chaque demande de soumission ou candidature transporteur.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Réseau de transporteurs et connaissance douanière des deux côtés de la frontière.",
        },
        {
          title: "Famille Solvaco",
          desc: "Même rigueur et souci du service que la division construction, établie de longue date.",
        },
      ],
      cta: "Demander une soumission",
    },
    about: {
      title: "À propos de S-FR8",
      body: "S-FR8 est la division logistique de la famille Solvaco. Nous mettons en relation shippers et transporteurs avec la même rigueur et le même souci du service qui font la réputation de Solvaco depuis ses débuts.",
      valuesTitle: "Comment on travaille",
      values: [
        {
          title: "Contact direct",
          desc: "Vous parlez à une vraie personne par courriel ou téléphone, pas à un centre d'appels.",
        },
        {
          title: "Réactivité",
          desc: "On répond rapidement à chaque demande de soumission, candidature transporteur ou suivi de charge.",
        },
        {
          title: "Couverture CA/US",
          desc: "Réseau de transporteurs et expertise douanière des deux côtés de la frontière, pour du dry van, reefer et flatbed.",
        },
      ],
      closing: "Une question avant de soumettre une demande? Écrivez-nous à info@s-fr8.com ou appelez au 514-475-8557.",
    },
    carrier: {
      title: "Devenir Transporteur",
      subtitle: "Roulez avec un partenaire fiable. Remplissez le formulaire pour être contacté.",
      form: {
        name: "Nom / Compagnie",
        equipment: "Type d'équipement",
        zone: "Zone desservie",
        email: "Courriel",
        phone: "Téléphone",
        submit: "Envoyer ma candidature",
        sending: "Envoi en cours...",
      },
    },
    tracking: {
      title: "Suivi de charge",
      subtitle: "Entrez votre numéro de charge, notre équipe vous répond par courriel avec le statut.",
      form: {
        loadNumber: "Numéro de charge",
        email: "Courriel",
        submit: "Demander le statut",
        sending: "Envoi en cours...",
      },
    },
    contact: {
      title: "Demander une soumission",
      subtitle: "Décrivez votre charge, on vous répond rapidement.",
      form: {
        name: "Nom",
        email: "Courriel",
        phone: "Téléphone",
        origin: "Origine",
        destination: "Destination",
        city: "Ville",
        province: "Province",
        postalCode: "Code postal",
        country: "Pays",
        freightType: "Type de charge",
        freightTypePlaceholder: "Sélectionnez...",
        freightTypeOther: "Autre",
        loadType: "Type de chargement",
        loadTypePlaceholder: "Sélectionnez...",
        loadTypeFtl: "FTL — Chargement complet",
        loadTypeLtl: "LTL — Chargement partiel",
        dimensionsTitle: "Dimensions (po)",
        dimensionsLength: "L",
        dimensionsWidth: "l",
        dimensionsHeight: "H",
        materialType: "Type de matériel",
        palletCount: "Nombre de palettes",
        weight: "Poids (lbs)",
        date: "Date souhaitée",
        submit: "Envoyer la demande",
        sending: "Envoi en cours...",
      },
      info: {
        phone: "Téléphone",
        email: "Courriel",
      },
    },
    formStatus: {
      success: "Votre demande a été envoyée avec succès.",
      errorConfig: "Le formulaire n'est pas encore configuré. Ajoutez les clés EmailJS dans .env.local.",
      errorSend: "L'envoi a échoué. Réessayez ou appelez-nous directement.",
      validationError: "Veuillez remplir tous les champs requis correctement.",
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Quels types de chargement offrez-vous?",
          a: "Dry van, reefer, flatbed, cross-border CA/US, LTL et service spécialisé pour les charges hors-normes ou projets industriels.",
        },
        {
          q: "Quelle est la différence entre FTL et LTL?",
          a: "FTL (chargement complet) réserve un camion entier pour votre charge. LTL (chargement partiel) consolide votre charge avec d'autres, facturé selon l'espace et le poids réels — généralement plus économique pour les petits volumes.",
        },
        {
          q: "Dans quelles régions opérez-vous?",
          a: "Partout au Canada et aux États-Unis, incluant le passage transfrontalier CA/US avec expertise douanière.",
        },
        {
          q: "Comment obtenir une soumission?",
          a: "Remplissez le formulaire de demande de soumission avec les détails de votre charge (origine, destination, type, poids). Notre équipe répond rapidement.",
        },
        {
          q: "Comment devenir transporteur partenaire?",
          a: "Remplissez le formulaire \"Devenir Transporteur\" avec votre type d'équipement et votre zone desservie pour être contacté.",
        },
        {
          q: "Comment suivre ma charge?",
          a: "Entrez votre numéro de charge dans la page Suivi de charge. Notre équipe répond par courriel avec le statut.",
        },
      ],
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      carrier: "Become a Carrier",
      tracking: "Track a Load",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      title: "Your Freight,",
      titleHighlight: "Delivered Without Compromise",
      subtitle:
        "Dry van, reefer, flatbed and CA/US cross-border — S-FR8 connects shippers and carriers with responsiveness and reliability.",
      ctaQuote: "Request a Quote",
      ctaCarrier: "Become a Carrier",
      ctaTracking: "Track a Load",
    },
    services: {
      title: "Our Services",
      subtitle: "Complete coverage for your transportation needs.",
      items: [
        {
          title: "Dry Van",
          desc: "General freight transport in enclosed trailers, across Canada and the United States.",
        },
        {
          title: "Reefer",
          desc: "Refrigerated transport for perishable goods, temperature-controlled end to end.",
        },
        {
          title: "Flatbed",
          desc: "Oversized loads, construction materials and machinery on open platforms.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Customs expertise and a carrier network on both sides of the border.",
        },
        {
          title: "LTL",
          desc: "Partial loads consolidated with other freight, billed by actual space and weight.",
        },
        {
          title: "Specialized Service",
          desc: "Oversized loads, industrial projects, and custom handling needs, managed on a case-by-case basis.",
        },
      ],
      teaserCta: "View all services",
    },
    differentiator: {
      title: "Why S-FR8",
      body: "Responsiveness and Canada–USA coverage: a carrier network and customs expertise on both sides of the border, so we respond faster than a regional-only broker.",
      points: [
        {
          title: "Responsive",
          desc: "Fast reply to every quote request or carrier application.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Carrier network and customs know-how on both sides of the border.",
        },
        {
          title: "Solvaco family",
          desc: "Same rigor and commitment to service as the long-established construction division.",
        },
      ],
      cta: "Request a Quote",
    },
    about: {
      title: "About S-FR8",
      body: "S-FR8 is the logistics division of the Solvaco family. We connect shippers and carriers with the same rigor and commitment to service that Solvaco has been known for since day one.",
      valuesTitle: "How we work",
      values: [
        {
          title: "Direct contact",
          desc: "You talk to a real person by email or phone, not a call center.",
        },
        {
          title: "Responsiveness",
          desc: "We reply quickly to every quote request, carrier application, or tracking request.",
        },
        {
          title: "CA/US coverage",
          desc: "Carrier network and customs expertise on both sides of the border, for dry van, reefer, and flatbed.",
        },
      ],
      closing: "Question before you submit a request? Email us at info@s-fr8.com or call 514-475-8557.",
    },
    carrier: {
      title: "Become a Carrier",
      subtitle: "Drive with a reliable partner. Fill out the form to get contacted.",
      form: {
        name: "Name / Company",
        equipment: "Equipment Type",
        zone: "Service Area",
        email: "Email",
        phone: "Phone",
        submit: "Submit My Application",
        sending: "Sending...",
      },
    },
    tracking: {
      title: "Track a Load",
      subtitle: "Enter your load number, our team will reply by email with the status.",
      form: {
        loadNumber: "Load Number",
        email: "Email",
        submit: "Request Status",
        sending: "Sending...",
      },
    },
    contact: {
      title: "Request a Quote",
      subtitle: "Describe your load, we'll get back to you quickly.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        origin: "Origin",
        destination: "Destination",
        city: "City",
        province: "Province/State",
        postalCode: "Postal/Zip Code",
        country: "Country",
        freightType: "Freight Type",
        freightTypePlaceholder: "Select...",
        freightTypeOther: "Other",
        loadType: "Load Type",
        loadTypePlaceholder: "Select...",
        loadTypeFtl: "FTL — Full Truckload",
        loadTypeLtl: "LTL — Less Than Truckload",
        dimensionsTitle: "Dimensions (in)",
        dimensionsLength: "L",
        dimensionsWidth: "W",
        dimensionsHeight: "H",
        materialType: "Material Type",
        palletCount: "Number of Pallets",
        weight: "Weight (lbs)",
        date: "Desired Date",
        submit: "Send Request",
        sending: "Sending...",
      },
      info: {
        phone: "Phone",
        email: "Email",
      },
    },
    formStatus: {
      success: "Your request was sent successfully.",
      errorConfig: "The form isn't configured yet. Add the EmailJS keys to .env.local.",
      errorSend: "Delivery failed. Please try again or call us directly.",
      validationError: "Please fill in all required fields correctly.",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What load types do you handle?",
          a: "Dry van, reefer, flatbed, CA/US cross-border, LTL, and specialized service for oversized or industrial project loads.",
        },
        {
          q: "What's the difference between FTL and LTL?",
          a: "FTL (full truckload) reserves an entire truck for your load. LTL (less than truckload) consolidates your load with others, billed by actual space and weight — usually more economical for smaller volumes.",
        },
        {
          q: "What areas do you serve?",
          a: "All of Canada and the United States, including CA/US cross-border with customs expertise.",
        },
        {
          q: "How do I get a quote?",
          a: "Fill out the quote request form with your shipment details (origin, destination, type, weight). Our team replies quickly.",
        },
        {
          q: "How do I become a carrier partner?",
          a: "Fill out the \"Become a Carrier\" form with your equipment type and service area to get contacted.",
        },
        {
          q: "How do I track my load?",
          a: "Enter your load number on the Track a Load page. Our team replies by email with the status.",
        },
      ],
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;
