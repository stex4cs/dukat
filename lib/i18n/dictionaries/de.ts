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
    telegram: 'Über Telegram anfragen',
    optional: 'Optional',
  },

  nav: {
    aria: 'Hauptnavigation',
    labels: ['Private Desk', 'Ablauf', 'Währungen', 'FAQ'],
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
  },

  panel: {
    title: 'Privates Angebot',
    have: 'Ich habe',
    want: 'Ich möchte',
    amount: 'Betrag',
    swap: 'Die beiden Währungen tauschen',
    selectCurrency: 'Währung wählen',
    note:
      'Der Desk bepreist jede Transaktion einzeln, und der Kurs ist final — ohne Zusätze. Senden Sie Paar und Betrag, den Preis erhalten Sie im Chat.',
    draft: 'DUKAT — Angebotsanfrage',
    alt: 'Oder schriftlich anfragen',
  },

  pricing: {
    eyebrow: 'Preis',
    headline: ['Eng kalkuliert.', 'Alles im Kurs.'],
    body:
      'Der Kurs enthält alles. Nachträglich kommt nichts hinzu — der angebotene Betrag ist der Betrag, den Sie erhalten.',
    items: ['Keine Provision', 'Keine Netzwerkkosten', 'Keine Bankgebühren'],
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
    eyebrow: 'Währungen',
    headline: ['Ein Desk.', 'Drei Kernwerte.'],
    flowAria: 'Euro, Tether und US-Dollar werden gegeneinander quotiert',
    cards: [
      { code: 'USDT', name: 'Tether', note: 'Digitaler Abwicklungswert' },
      { code: 'EUR', name: 'Euro', note: 'Fiat-Abwicklungswährung' },
      { code: 'USD', name: 'US-Dollar', note: 'Fiat-Abwicklungswährung' },
    ],
  },

  quoteForm: {
    eyebrow: 'Privates Angebot',
    headline: ['Ihre Transaktion.', 'Ihr Angebot.'],
    body:
      'Sagen Sie uns, was Sie tauschen möchten und in welchem Umfang. Unser Desk prüft die Anfrage und meldet sich mit dem geltenden Angebot und den nächsten Schritten.',
    telegramLead:
      'Am schnellsten geht es über Telegram. Das Formular ist da, wenn Sie lieber schreiben.',
    fields: {
      have: 'Ich habe',
      want: 'Ich möchte',
      size: 'Transaktionsgröße',
      name: 'Name',
      city: 'Stadt',
      country: 'Land',
      method: 'Kontaktweg',
      contact: 'Kontakt',
      message: 'Nachricht',
    },
    placeholders: {
      size: '100.000',
      name: 'Vor- und Nachname',
      city: 'Wien',
      telegram: '@handle',
      whatsapp: '+00 000 000 000',
      email: 'name@firma.com',
      message: 'Alles, was der Desk vorab wissen sollte.',
    },
    countries: {
      RS: 'Serbien',
      HR: 'Kroatien',
      ME: 'Montenegro',
      BA: 'Bosnien und Herzegowina',
      AE: 'Dubai',
      IT: 'Italien',
      ES: 'Spanien',
      DE: 'Deutschland',
      AT: 'Österreich',
      CN: 'China',
      OTHER: 'Anderes',
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
      city: 'Geben Sie Ihre Stadt an.',
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
        a: 'Der Desk arbeitet mit USDT, EUR und USD; die Hauptpaare sind USDT ↔ EUR und USDT ↔ USD. Anfragen zu anderen Werten oder Währungen werden im Einzelfall geprüft.',
      },
      {
        q: 'Was berechnen Sie?',
        a: 'Alles ist im Kurs enthalten. Es gibt keine Provision, und es kommen keine Netzwerk- oder Bankkosten hinzu — der angebotene Betrag ist der Betrag, den Sie erhalten.',
      },
      {
        q: 'Wie kommt der Kurs zustande?',
        a: 'Auf dieser Website werden keine Kurse veröffentlicht. Der Desk nennt einen Preis für Ihr Paar und Ihren Betrag, und dieser gilt erst, wenn der Desk ihn für diese Transaktion bestätigt.',
      },
      {
        q: 'Wie läuft die Abwicklung ab?',
        a: 'Abwicklungsdetails — akzeptierte Netzwerke, Zahlungsmodalitäten und Fristen — werden für jede Transaktion vor der Durchführung mit dem Desk vereinbart.',
      },
      {
        q: 'Welche Informationen werden vor einer Transaktion benötigt?',
        a: 'Anforderungen an Onboarding und Prüfung teilt der Desk im Laufe des Angebotsprozesses mit. Bitte senden Sie keine Ausweisdokumente oder Kontodaten über diese Website.',
      },
    ],
  },

  finalCta: {
    headline: ['Werte bewegen.', 'Privat.'],
    body: 'Sprechen Sie direkt mit dem DUKAT Private Desk.',
    secondary: 'Schriftlich anfragen',
  },

  footer: {
    navHeading: 'Navigation',
    legalHeading: 'Rechtliches',
    contactHeading: 'Kontakt',
    languageHeading: 'Sprache',
    navLabels: ['Private Desk', 'Währungen', 'Ablauf', 'FAQ', 'Kontakt'],
    legalLabels: ['Bedingungen', 'Datenschutz', 'Compliance'],
    telegram: 'Telegram',
    email: 'E-Mail',
    rights: 'Alle Rechte vorbehalten.',
    disclaimer:
      'Transaktionen mit digitalen Vermögenswerten sind mit Risiken verbunden. Hier werden keine Kurse veröffentlicht: den Preis nennt der Desk, und er gilt nur, wenn er für eine konkrete Transaktion ausdrücklich bestätigt wird. Die Leistungen unterliegen der Eignung, dem anwendbaren Recht sowie den Onboarding- und Compliance-Anforderungen von DUKAT.',
  },

  legal: {
    back: 'Zurück zur Website',
    basedIn: 'DUKAT Private Desk ist in Dubai ansässig.',
    docs: {
      terms: {
        title: 'Bedingungen',
        intro:
          'Diese Bedingungen gelten für die Nutzung dieser Website. Sie sind kein Vertrag über eine Transaktion — diese wird gesondert mit dem Desk vereinbart.',
        sections: [
          {
            heading: 'Was diese Website ist',
            body: [
              'Diese Website beschreibt die Leistungen von DUKAT Private Desk und dient der Information. Nichts hier Veröffentlichte ist ein Angebot, eine Aufforderung zur Abgabe eines Angebots oder eine Anlage-, Rechts- oder Steuerberatung.',
            ],
          },
          {
            heading: 'Keine veröffentlichten Kurse',
            body: [
              'Auf dieser Website werden keine Kurse veröffentlicht. Ein Kurs gilt erst, wenn der Desk ihn für eine konkrete Transaktion bestätigt, und nur für den in der Bestätigung genannten Zeitraum.',
            ],
          },
          {
            heading: 'Anfragen',
            body: [
              'Das Absenden des Formulars oder eine Nachricht an den Desk über Telegram ist eine Anfrage. Dadurch kommt kein Vertrag zustande, wird kein Kurs reserviert und ist DUKAT zu keiner Transaktion verpflichtet.',
              'DUKAT kann eine Anfrage ohne Angabe von Gründen ablehnen.',
            ],
          },
          {
            heading: 'Eignung',
            body: [
              'Sie sind dafür verantwortlich, dass die Nutzung des Desks an Ihrem Aufenthaltsort für Sie rechtmäßig ist. Die Leistungen unterliegen Eignungskriterien, Prüfungen beim Onboarding und dem anwendbaren Recht.',
            ],
          },
          {
            heading: 'Risiko',
            body: [
              'Transaktionen mit digitalen Vermögenswerten sind mit Risiken verbunden, darunter Preisbewegungen zwischen Anfrage und Abwicklung sowie der Umstand, dass eine ausgeführte Übertragung nicht rückgängig gemacht werden kann. Sie entscheiden nach eigenem Ermessen.',
            ],
          },
          {
            heading: 'Haftung und Änderungen',
            body: [
              'Diese Website wird im vorliegenden Zustand bereitgestellt. Soweit gesetzlich zulässig, haftet DUKAT nicht für Schäden, die aus dem Vertrauen auf die hier veröffentlichten Informationen entstehen.',
              'Diese Bedingungen können sich ändern. Für Ihre Anfrage gilt die zum Zeitpunkt der Absendung veröffentlichte Fassung.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Datenschutz',
        intro:
          'Was mit den Angaben geschieht, die Sie uns über diese Website machen — so einfach formuliert, wie es geht.',
        sections: [
          {
            heading: 'Was wir erheben',
            body: [
              'Nur das, was Sie in das Formular eintragen: Währungen und Betrag, Ihren Namen, Stadt und Land, den gewünschten Kontaktweg samt Kontaktdaten sowie eine Nachricht, falls Sie eine hinzufügen.',
              'Das ist alles. Es gibt kein Konto, und im Hintergrund wird nichts erhoben.',
            ],
          },
          {
            heading: 'Was wir nicht erheben',
            body: [
              'Diese Website fragt keine Ausweisdokumente, Kontonummern, Wallet-Adressen oder Zahlungsdaten ab, und Sie sollten sie nicht darüber senden. All das gehört in das Onboarding, direkt mit dem Desk.',
              'Auf dieser Website gibt es keine Analyse, keine Werbung und kein Tracking, und kein Dritter misst Ihren Besuch.',
            ],
          },
          {
            heading: 'Cookies',
            body: [
              'Es wird ein Cookie verwendet, und nur wenn Sie eine Sprache wählen: Es merkt sich diese Wahl, damit Sie beim nächsten Besuch nicht auf einer anderen Fassung landen. Sonst wird nichts in Ihrem Browser gespeichert.',
            ],
          },
          {
            heading: 'Wie Ihre Anfrage bearbeitet wird',
            body: [
              'Ihre Anfrage wird an den Desk übermittelt, damit ein Vertreter Ihnen mit einem Angebot und den nächsten Schritten antworten kann. Sie erscheint zudem im Server-Log unseres Hosting-Anbieters, woran ein Zustellfehler erkennbar wäre.',
              'Sie wird nicht verkauft, vermietet oder zu Marketingzwecken weitergegeben, und es wird kein Profil von Ihnen erstellt.',
            ],
          },
          {
            heading: 'Wer sonst beteiligt ist',
            body: [
              'Die Website wird von Vercel Inc. gehostet. Anfragen werden über die Telegram Bot API zugestellt, betrieben von Telegram. E-Mails an den Desk verarbeitet unser E-Mail-Anbieter. Jeder von ihnen verarbeitet nur, was zur Übermittlung Ihrer Nachricht nötig ist.',
            ],
          },
          {
            heading: 'Speicherdauer und Ihre Rechte',
            body: [
              'Anfragen werden so lange aufbewahrt, wie es zur Beantwortung und zur Erfüllung von Aufbewahrungspflichten erforderlich ist, und danach gelöscht.',
              'Sie können Auskunft darüber verlangen, welche Daten wir zu Ihnen haben, sowie deren Berichtigung oder Löschung — schreiben Sie an die unten genannte Adresse.',
            ],
          },
        ],
      },
      compliance: {
        title: 'Compliance',
        intro:
          'Vor der Durchführung einer Transaktion führt der Desk Prüfungen durch. Diese Seite erklärt, wann das geschieht und was es für Sie bedeutet.',
        sections: [
          {
            heading: 'Prüfungen beim Onboarding',
            body: [
              'Vor der Durchführung einer Transaktion führt DUKAT die nach anwendbarem Recht und nach eigenen Richtlinien erforderlichen Prüfungen durch. Was in Ihrem Fall nötig ist, teilt der Desk im Laufe des Angebotsprozesses mit, bevor etwas angefordert wird.',
            ],
          },
          {
            heading: 'Senden Sie keine Dokumente über diese Website',
            body: [
              'Das Anfrageformular ist kein Kanal für Ausweisdokumente, Kontodaten oder Zahlungsdaten, und dort wird auch nicht danach gefragt. All das wird direkt mit dem Desk geklärt, sobald eine Transaktion vereinbart wird.',
            ],
          },
          {
            heading: 'Ablehnung einer Geschäftsbeziehung',
            body: [
              'DUKAT kann eine Anfrage ablehnen oder eine Geschäftsbeziehung ohne Angabe von Gründen beenden.',
            ],
          },
        ],
      },
    },
  },
};

export default de;
