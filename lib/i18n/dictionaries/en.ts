/**
 * English — the master dictionary.
 *
 * Every other locale is typed against `typeof en`, so a missing or renamed
 * key is a compile error rather than a silent English fallback at runtime.
 *
 * Copy rules applied throughout this project:
 *  - No regulatory, licensing, banking, custody, anonymity, security or
 *    guaranteed-settlement claims.
 *  - No invented statistics, client counts, volumes, partners or reviews.
 *  - Business facts only DUKAT can supply are left as bracketed placeholders
 *    of the form [SOMETHING TO BE PROVIDED], so they are easy to grep.
 */
const en = {
  meta: {
    title: 'DUKAT — Private Desk',
    description:
      'DUKAT is a private desk for large digital asset transactions. Exchange USDT, EUR and USD with transparent quotes and personal execution.',
    ogAlt: 'DUKAT — Private Desk',
  },

  common: {
    descriptor: 'Private Desk',
    requestQuote: 'Request a quote',
    contactDesk: 'Contact the desk',
    skipToContent: 'Skip to content',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    close: 'Close',
    telegram: 'Request on Telegram',
    optional: 'Optional',
  },

  nav: {
    aria: 'Primary',
    // Order matches NAV_TARGETS in lib/sections.ts.
    labels: ['Private Desk', 'How It Works', 'Currencies', 'About', 'FAQ'],
  },

  hero: {
    eyebrow: 'Private digital asset desk',
    headline: ['Private liquidity.', 'Personally executed.'],
    lede: 'A private desk for large digital asset transactions.',
    body:
      'Exchange USDT, EUR and USD through a dedicated private desk with transparent quotes and personal execution.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'How it works',
    assetsAria: 'Supported assets',
  },

  panel: {
    title: 'Private quote',
    have: 'I have',
    want: 'I want',
    amount: 'Amount',
    swap: 'Swap the two currencies',
    selectCurrency: 'Select currency',
    note:
      'The desk prices each transaction individually. Send your pair and amount, and a price comes back in chat.',
    draft: 'DUKAT quote request',
    alt: 'Or send a written request',
  },

  privateDesk: {
    eyebrow: 'The private desk',
    headline: ['Built for transactions', 'that require more than', 'an exchange.'],
    body:
      'DUKAT operates as a quote-based private desk. There is no order book, no public trading interface and no self-service execution. Each request is reviewed individually and priced by a desk representative who stays with the transaction from the first message through to settlement.',
    cards: [
      {
        title: 'Private service',
        body: 'Direct communication with a dedicated desk representative.',
      },
      {
        title: 'Clear pricing',
        body: 'Know the quoted amount before proceeding.',
      },
      {
        title: 'Large transactions',
        body: 'A service designed around individually quoted transactions.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'How it works',
    headline: ['From quote', 'to settlement.'],
    aria: 'Transaction process, four steps',
    steps: [
      {
        title: 'Request',
        body: 'Select your assets, amount and preferred settlement currency.',
      },
      {
        title: 'Quote',
        body: 'Receive an indicative or confirmed quote from the private desk.',
      },
      {
        title: 'Confirm',
        body: 'Review the rate and transaction details before proceeding.',
      },
      {
        title: 'Settle',
        body:
          'Complete the transaction according to the agreed settlement instructions.',
      },
    ],
  },

  assets: {
    eyebrow: 'Currencies',
    headline: ['One desk.', 'Three core assets.'],
    flowAria: 'Euro, Tether and US dollar are quoted against one another',
    cards: [
      { code: 'USDT', name: 'Tether', note: 'Digital settlement asset' },
      { code: 'EUR', name: 'Euro', note: 'Fiat settlement currency' },
      { code: 'USD', name: 'US Dollar', note: 'Fiat settlement currency' },
    ],
  },

  quoteForm: {
    eyebrow: 'Private quote',
    headline: ['Your transaction.', 'Your quote.'],
    body:
      'Tell us what you want to exchange and the amount. Our desk will review the request and contact you with the applicable quote and next steps.',
    telegramLead:
      'The fastest route is Telegram. The form is here if you would rather write.',
    fields: {
      have: 'I have',
      want: 'I want',
      size: 'Transaction size',
      name: 'Name',
      method: 'Contact method',
      contact: 'Contact',
      message: 'Message',
    },
    placeholders: {
      size: '100,000',
      name: 'Full name',
      telegram: '@handle',
      whatsapp: '+00 000 000 000',
      email: 'name@company.com',
      message: 'Anything the desk should know in advance.',
    },
    methods: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    consent: {
      // {privacy} and {terms} are replaced with links at render time.
      text:
        'I have read the {privacy} and the {terms}, and I agree to be contacted about this request.',
      privacy: 'Privacy Policy',
      terms: 'Terms',
    },
    submit: 'Request private quote',
    submitting: 'Sending',
    errors: {
      title: 'Please review the highlighted fields.',
      samePair: 'Choose two different currencies.',
      size: 'Enter the amount you intend to exchange.',
      name: 'Enter a name we can address you by.',
      contact: 'Enter the contact details for your chosen method.',
      email: 'Enter a valid email address.',
      consent: 'Please confirm before sending the request.',
      failed:
        'The request could not be sent. Please try again, or contact the desk directly.',
    },
    success: {
      title: 'Request received.',
      body:
        'A desk representative will review your request and respond through the contact method you selected.',
      summary: 'Your request',
      again: 'Send another request',
    },
    notice:
      'This form sends an enquiry to the desk. It does not create, price or execute a transaction.',
  },

  about: {
    eyebrow: 'About',
    lead:
      'DUKAT combines traditional ideas of value, discretion and personal service with modern digital asset settlement.',
    body: [
      'The name refers to a historical coin — a unit of value recognised across borders and held for its reliability rather than its noise. The desk is built on the same principle: a small number of assets, handled carefully, for clients who prefer a conversation to an interface.',
    ],
    entityLabel: 'Legal entity',
    jurisdictionLabel: 'Jurisdiction',
  },

  faq: {
    eyebrow: 'Questions',
    headline: ['Before you', 'get in touch.'],
    items: [
      {
        q: 'What is DUKAT Private Desk?',
        a: 'DUKAT is a private over-the-counter desk for exchanging between digital assets and fiat currencies. Requests are handled individually by a desk representative rather than through a public trading platform, and there is no order book to trade against.',
      },
      {
        q: 'Which currencies are supported?',
        a: 'The desk works with USDT, EUR and USD, with USDT ↔ EUR and USDT ↔ USD as the primary pairs. Requests involving other assets or currencies are considered individually. [ADDITIONAL SUPPORTED ASSETS TO BE PROVIDED]',
      },
      {
        q: 'How is the rate agreed?',
        a: 'No rates are published on this website. The desk quotes a price for your specific pair and amount, and that price applies only once the desk confirms it for that transaction.',
      },
      {
        q: 'How does settlement work?',
        a: 'Settlement details — accepted networks, payment arrangements and timing — are agreed with the desk for each transaction before it proceeds. [SETTLEMENT PROCEDURE TO BE PROVIDED]',
      },
      {
        q: 'What information is required before a transaction?',
        a: 'Onboarding and verification requirements are communicated by the desk during the quote process. Please do not send identity documents or account details through this website. [COMPLIANCE POLICY TO BE PROVIDED] [KYC REQUIREMENTS TO BE PROVIDED]',
      },
    ],
  },

  finalCta: {
    headline: ['Move value.', 'Privately.'],
    body: 'Speak directly with the DUKAT Private Desk.',
    secondary: 'Send a written request',
  },

  footer: {
    navHeading: 'Navigate',
    legalHeading: 'Legal',
    contactHeading: 'Contact',
    languageHeading: 'Language',
    // Order matches FOOTER_NAV_TARGETS in lib/sections.ts.
    navLabels: ['Private Desk', 'Currencies', 'How It Works', 'FAQ', 'Contact'],
    // Order matches LEGAL_DOCS in lib/sections.ts.
    legalLabels: ['Terms', 'Privacy', 'Compliance'],
    telegram: 'Telegram',
    email: 'Email',
    rights: 'All rights reserved.',
    disclaimer:
      'Digital asset transactions involve risk. No rates are published here: a price is quoted by the desk and applies only when expressly confirmed for a specific transaction. Services are subject to eligibility, applicable law and DUKAT’s onboarding and compliance requirements.',
  },

  legal: {
    back: 'Back to site',
    notice: 'This page is a placeholder. Final wording is to be supplied by DUKAT.',
    docs: {
      terms: { title: 'Terms', body: '[TERMS OF SERVICE TO BE PROVIDED]' },
      privacy: { title: 'Privacy', body: '[PRIVACY POLICY TO BE PROVIDED]' },
      compliance: {
        title: 'Compliance',
        body: '[COMPLIANCE POLICY TO BE PROVIDED]',
      },
    },
  },
};

export type Dictionary = typeof en;

export default en;
