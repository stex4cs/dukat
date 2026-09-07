import type { Dictionary } from './en';

/**
 * Deutsch.
 *
 * Bracketed [... TO BE PROVIDED] placeholders stay in English in every
 * locale: they are notes for DUKAT, not visitor copy.
 */
const de: Dictionary = {
  meta: {
    title: 'DUKAT — Private Desk',
    description:
      'DUKAT ist ein privater Desk für große Transaktionen mit digitalen Vermögenswerten. Tauschen Sie USDT, EUR und USD mit transparenten Angeboten und persönlicher Ausführung.',
    ogAlt: 'DUKAT — Private Desk',
  },

  common: {
    descriptor: 'Private Desk',
    requestQuote: 'Angebot anfragen',
    contactDesk: 'Desk kontaktieren',
    skipToContent: 'Zum Inhalt springen',
    language: 'Sprache',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    menu: 'Menü',
    close: 'Schließen',
    optional: 'Optional',
  },

  nav: {
    aria: 'Hauptnavigation',
    labels: ['Private Desk', 'Ablauf', 'Kurse', 'Über uns', 'FAQ'],
  },

  hero: {
    eyebrow: 'Privater Desk für digitale Vermögenswerte',
    headline: ['Private Liquidität.', 'Persönlich ausgeführt.'],
    lede:
      'Ein privater Desk für große Transaktionen mit digitalen Vermögenswerten.',
    body:
      'Tauschen Sie USDT, EUR und USD über einen dedizierten privaten Desk — mit transparenten Angeboten und persönlicher Ausführung.',
    ctaPrimary: 'Angebot anfragen',
    ctaSecondary: 'Ablauf',
    assetsAria: 'Unterstützte Werte',
    scrollHint: 'Scrollen',
  },

  calculator: {
    title: 'Privates Angebot',
    youSend: 'Sie senden',
    youReceive: 'Sie erhalten',
    swap: 'Sende- und Empfangswährung tauschen',
    selectCurrency: 'Währung wählen',
    amountAria: 'Zu sendender Betrag',
    receiveAria: 'Indikativer Empfangsbetrag',
    indicativeRate: 'Indikativer Kurs',
    note:
      'Ausschließlich indikative Preisangabe. Der endgültige Kurs wird vor der Ausführung vom Desk bestätigt.',
    cta: 'Dieses Angebot anfragen',
    minHint: 'Geben Sie einen Betrag ein, um ein indikatives Angebot zu sehen.',
  },

  trust: {
    aria: 'Wie der Desk arbeitet',
    items: [
      'Private Ausführung',
      'Direkte Kommunikation',
      'Transparente Angebote',
      'Desk für große Volumina',
    ],
  },

  privateDesk: {
    eyebrow: 'Der private Desk',
    headline: [
      'Geschaffen für Transaktionen,',
      'die mehr verlangen',
      'als eine Börse.',
    ],
    body:
      'DUKAT arbeitet als angebotsbasierter privater Desk. Es gibt kein Orderbuch, keine öffentliche Handelsoberfläche und keine Selbstausführung. Jede Anfrage wird einzeln geprüft und von einem Desk-Vertreter bepreist, der die Transaktion von der ersten Nachricht bis zur Abwicklung begleitet.',
    cards: [
      {
        title: 'Persönlicher Service',
        body: 'Direkte Kommunikation mit einem festen Ansprechpartner des Desks.',
      },
      {
        title: 'Klare Preise',
        body: 'Sie kennen den angebotenen Betrag, bevor Sie fortfahren.',
      },
      {
        title: 'Große Transaktionen',
        body: 'Ein Service, der auf einzeln bepreiste Transaktionen ausgelegt ist.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'Ablauf',
    headline: ['Vom Angebot', 'zur Abwicklung.'],
    aria: 'Transaktionsablauf, vier Schritte',
    steps: [
      {
        title: 'Anfrage',
        body: 'Wählen Sie Werte, Betrag und gewünschte Abwicklungswährung.',
      },
      {
        title: 'Angebot',
        body:
          'Erhalten Sie ein indikatives oder bestätigtes Angebot vom privaten Desk.',
      },
      {
        title: 'Bestätigung',
        body: 'Prüfen Sie Kurs und Transaktionsdetails, bevor Sie fortfahren.',
      },
      {
        title: 'Abwicklung',
        body:
          'Führen Sie die Transaktion gemäß den vereinbarten Abwicklungsinstruktionen aus.',
      },
    ],
  },

  assets: {
    eyebrow: 'Werte und Kurse',
    headline: ['Ein Desk.', 'Drei Kernwerte.'],
    body:
      'Der Desk konzentriert sich auf wenige Instrumente statt auf ein langes Listing. USDT wird gegen Abwicklung in Euro und in US-Dollar quotiert.',
    flowAria: 'Euro, Tether und US-Dollar werden gegeneinander quotiert',
    cards: [
      { code: 'USDT', name: 'Tether', note: 'Digitaler Abwicklungswert' },
      { code: 'EUR', name: 'Euro', note: 'Fiat-Abwicklungswährung' },
      { code: 'USD', name: 'US-Dollar', note: 'Fiat-Abwicklungswährung' },
    ],
    board: {
      title: 'Indikative Kurse',
      pair: 'Paar',
      rate: 'Kurs',
      note:
        'Referenzwerte zur Orientierung. Sie sind kein Angebot und nicht verbindlich, solange der Desk sie nicht für eine konkrete Transaktion bestätigt.',
    },
  },

  quoteForm: {
    eyebrow: 'Privates Angebot',
    headline: ['Ihre Transaktion.', 'Ihr Angebot.'],
    body:
      'Sagen Sie uns, was Sie tauschen möchten und in welchem Umfang. Unser Desk prüft die Anfrage und meldet sich mit dem geltenden Angebot und den nächsten Schritten.',
    fields: {
      have: 'Ich habe',
      want: 'Ich möchte',
      size: 'Transaktionsgröße',
      name: 'Name',
      method: 'Kontaktweg',
      contact: 'Kontakt',
      message: 'Nachricht',
    },
    placeholders: {
      size: '100.000',
      name: 'Vor- und Nachname',
      telegram: '@handle',
      whatsapp: '+00 000 000 000',
      email: 'name@firma.com',
      message: 'Alles, was der Desk vorab wissen sollte.',
    },
    methods: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
    },
    consent: {
      text:
        'Ich habe die {privacy} und die {terms} gelesen und bin damit einverstanden, zu dieser Anfrage kontaktiert zu werden.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
    },
    submit: 'Privates Angebot anfragen',
    submitting: 'Wird gesendet',
    errors: {
      title: 'Bitte prüfen Sie die markierten Felder.',
      samePair: 'Wählen Sie zwei verschiedene Währungen.',
      size: 'Geben Sie den Betrag an, den Sie tauschen möchten.',
      name: 'Geben Sie einen Namen an, mit dem wir Sie ansprechen können.',
      contact: 'Geben Sie die Kontaktdaten für den gewählten Weg an.',
      email: 'Geben Sie eine gültige E-Mail-Adresse an.',
      consent: 'Bitte bestätigen Sie, bevor Sie die Anfrage senden.',
      failed:
        'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie den Desk direkt.',
    },
    success: {
      title: 'Anfrage eingegangen.',
      body:
        'Ein Desk-Vertreter prüft Ihre Anfrage und antwortet über den von Ihnen gewählten Kontaktweg.',
      summary: 'Ihre Anfrage',
      again: 'Weitere Anfrage senden',
    },
    notice:
      'Dieses Formular sendet eine Anfrage an den Desk. Es erstellt, bepreist oder führt keine Transaktion aus.',
  },

  about: {
    eyebrow: 'Über uns',
    lead:
      'DUKAT verbindet traditionelle Vorstellungen von Wert, Diskretion und persönlichem Service mit moderner Abwicklung digitaler Vermögenswerte.',
    body: [
      'Der Name verweist auf eine historische Münze — eine Werteinheit, die über Grenzen hinweg anerkannt und wegen ihrer Verlässlichkeit gehalten wurde, nicht wegen ihres Lärms. Der Desk folgt demselben Prinzip: wenige Werte, sorgfältig behandelt, für Kunden, die das Gespräch einer Oberfläche vorziehen.',
      'Jede Anfrage bearbeitet ein Mensch. Der Preis wird angeboten, geprüft und bestätigt, bevor etwas bewegt wird, und derselbe Ansprechpartner begleitet die Transaktion von der ersten Nachricht bis zur Abwicklung.',
    ],
    entityLabel: 'Rechtsträger',
    jurisdictionLabel: 'Jurisdiktion',
  },

  faq: {
    eyebrow: 'Fragen',
    headline: ['Bevor Sie', 'uns schreiben.'],
    items: [
      {
        q: 'Was ist DUKAT Private Desk?',
        a: 'DUKAT ist ein privater außerbörslicher (OTC) Desk für den Tausch zwischen digitalen Vermögenswerten und Fiat-Währungen. Anfragen werden einzeln von einem Desk-Vertreter bearbeitet und nicht über eine öffentliche Handelsplattform; ein Orderbuch gibt es nicht.',
      },
      {
        q: 'Welche Währungen werden unterstützt?',
        a: 'Der Desk konzentriert sich auf USDT, EUR und USD; die Hauptpaare sind USDT ↔ EUR und USDT ↔ USD. Anfragen zu anderen Werten oder Währungen können im Einzelfall geprüft werden. [ADDITIONAL SUPPORTED ASSETS TO BE PROVIDED]',
      },
      {
        q: 'Wie fordere ich ein Angebot an?',
        a: 'Füllen Sie das Formular für ein privates Angebot mit Währungen, Betrag und bevorzugtem Kontaktweg aus. Ein Desk-Vertreter prüft die Anfrage und antwortet direkt mit dem geltenden Angebot und den nächsten Schritten.',
      },
      {
        q: 'Ist der angezeigte Kurs endgültig?',
        a: 'Nein. Die auf dieser Website angezeigten Kurse sind indikativ und dienen ausschließlich der Orientierung. Ein Kurs gilt erst, wenn der Desk ihn für eine konkrete Transaktion ausdrücklich bestätigt.',
      },
      {
        q: 'Welche Transaktionsgrößen unterstützen Sie?',
        a: 'Der Desk ist auf große, einzeln bepreiste Transaktionen ausgelegt und nicht auf kleine Retail-Beträge. [MINIMUM AND MAXIMUM TRANSACTION SIZES TO BE PROVIDED]',
      },
      {
        q: 'Wie läuft die Abwicklung ab?',
        a: 'Abwicklungsdetails — einschließlich akzeptierter Netzwerke, Zahlungsmodalitäten und Fristen — werden für jede Transaktion vor der Durchführung mit dem Desk vereinbart. [SETTLEMENT PROCEDURE TO BE PROVIDED]',
      },
      {
        q: 'Welche Informationen werden vor einer Transaktion benötigt?',
        a: 'Anforderungen an Onboarding und Prüfung teilt der Desk im Laufe des Angebotsprozesses mit. Bitte senden Sie keine Ausweisdokumente oder Kontodaten über diese Website. [COMPLIANCE POLICY TO BE PROVIDED] [KYC REQUIREMENTS TO BE PROVIDED]',
      },
    ],
  },

  finalCta: {
    headline: ['Werte bewegen.', 'Privat.'],
    body: 'Sprechen Sie direkt mit dem DUKAT Private Desk.',
    primary: 'Angebot anfragen',
    secondary: 'Desk kontaktieren',
  },

  footer: {
    navHeading: 'Navigation',
    legalHeading: 'Rechtliches',
    contactHeading: 'Kontakt',
    languageHeading: 'Sprache',
    navLabels: ['Private Desk', 'Kurse', 'Ablauf', 'FAQ', 'Kontakt'],
    legalLabels: ['Bedingungen', 'Datenschutz', 'Compliance'],
    telegram: 'Telegram',
    email: 'E-Mail',
    rights: 'Alle Rechte vorbehalten.',
    disclaimer:
      'Transaktionen mit digitalen Vermögenswerten sind mit Risiken verbunden. Auf dieser Website angezeigte Angebote sind indikativ, sofern sie nicht ausdrücklich vom Desk bestätigt werden. Die Leistungen unterliegen der Eignung, dem anwendbaren Recht sowie den Onboarding- und Compliance-Anforderungen von DUKAT.',
  },

  legal: {
    back: 'Zurück zur Website',
    notice:
      'Diese Seite ist ein Platzhalter. Der endgültige Wortlaut wird von DUKAT bereitgestellt.',
    docs: {
      terms: { title: 'Bedingungen', body: '[TERMS OF SERVICE TO BE PROVIDED]' },
      privacy: { title: 'Datenschutz', body: '[PRIVACY POLICY TO BE PROVIDED]' },
      compliance: {
        title: 'Compliance',
        body: '[COMPLIANCE POLICY TO BE PROVIDED]',
      },
    },
  },
};

export default de;
