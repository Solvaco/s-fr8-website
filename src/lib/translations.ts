export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      carrier: "Devenir Carrier",
      tracking: "Suivi de charge",
      contact: "Contact",
      cta: "Obtenir une soumission",
    },
    hero: {
      title: "Votre Fret,",
      titleHighlight: "Livré Sans Compromis",
      subtitle:
        "Dry van, reefer, flatbed et cross-border CA/US — Solvaco Freight connecte shippers et carriers avec réactivité et fiabilité.",
      ctaQuote: "Demander une soumission",
      ctaCarrier: "Devenir Carrier",
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
          desc: "Expertise douanière et réseau de carriers des deux côtés de la frontière.",
        },
      ],
      teaserCta: "Voir tous les services",
    },
    differentiator: {
      title: "Pourquoi Solvaco Freight",
      body: "Réactivité et couverture Canada–USA : un réseau de carriers et une expertise douanière des deux côtés de la frontière, pour répondre plus vite qu'un courtier régional.",
      points: [
        {
          title: "Réactif",
          desc: "Réponse rapide à chaque demande de soumission ou candidature carrier.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Réseau de carriers et connaissance douanière des deux côtés de la frontière.",
        },
        {
          title: "Famille Solvaco",
          desc: "Même rigueur et souci du service que la division construction, établie de longue date.",
        },
      ],
      cta: "Demander une soumission",
    },
    about: {
      title: "À propos de Solvaco Freight",
      body: "Solvaco Freight est la division logistique de la famille Solvaco. Nous mettons en relation shippers et carriers avec la même rigueur et le même souci du service qui font la réputation de Solvaco depuis ses débuts.",
      valuesTitle: "Comment on travaille",
      values: [
        {
          title: "Contact direct",
          desc: "Vous parlez à une vraie personne par courriel ou téléphone, pas à un centre d'appels.",
        },
        {
          title: "Réactivité",
          desc: "On répond rapidement à chaque demande de soumission, candidature carrier ou suivi de charge.",
        },
        {
          title: "Couverture CA/US",
          desc: "Réseau de carriers et expertise douanière des deux côtés de la frontière, pour du dry van, reefer et flatbed.",
        },
      ],
      closing: "Une question avant de soumettre une demande? Écrivez-nous à info@solvaco.com ou appelez au 514-922-7848.",
    },
    carrier: {
      title: "Devenir Carrier",
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
        freightType: "Type de charge",
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
        "Dry van, reefer, flatbed and CA/US cross-border — Solvaco Freight connects shippers and carriers with responsiveness and reliability.",
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
      ],
      teaserCta: "View all services",
    },
    differentiator: {
      title: "Why Solvaco Freight",
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
      title: "About Solvaco Freight",
      body: "Solvaco Freight is the logistics division of the Solvaco family. We connect shippers and carriers with the same rigor and commitment to service that Solvaco has been known for since day one.",
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
      closing: "Question before you submit a request? Email us at info@solvaco.com or call 514-922-7848.",
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
        freightType: "Freight Type",
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
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;
