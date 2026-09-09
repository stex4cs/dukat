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
    labels: ['Private Desk', 'How It Works', 'Currencies', 'FAQ'],
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
      'The desk prices each transaction individually and the rate is all-in. Send your pair and amount, and a price comes back in chat.',
    draft: 'DUKAT quote request',
    alt: 'Or send a written request',
  },

  pricing: {
    eyebrow: 'Pricing',
    headline: ['The best fee', 'on the market.'],
    body:
      'Everything is in the rate. Nothing is added afterwards — the amount you are quoted is the amount you receive.',
    items: ['No commission', 'No network fees', 'No bank charges'],
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
      city: 'City',
      country: 'Country',
      method: 'Contact method',
      contact: 'Contact',
      message: 'Message',
    },
    placeholders: {
      size: '100,000',
      name: 'Full name',
      city: 'Belgrade',
      telegram: '@handle',
      whatsapp: '+00 000 000 000',
      email: 'name@company.com',
      message: 'Anything the desk should know in advance.',
    },
    countries: {
      RS: 'Serbia',
      HR: 'Croatia',
      ME: 'Montenegro',
      BA: 'Bosnia and Herzegovina',
      AE: 'Dubai',
      IT: 'Italy',
      ES: 'Spain',
      DE: 'Germany',
      AT: 'Austria',
      CN: 'China',
      OTHER: 'Other',
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
      city: 'Enter the city you are based in.',
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
        a: 'The desk works with USDT, EUR and USD, with USDT ↔ EUR and USDT ↔ USD as the primary pairs. Requests involving other assets or currencies are considered individually.',
      },
      {
        q: 'What do you charge?',
        a: 'Everything is in the rate. There is no commission, and no network or banking costs are added afterwards — the amount quoted to you is the amount you receive.',
      },
      {
        q: 'How is the rate agreed?',
        a: 'No rates are published on this website. The desk quotes a price for your specific pair and amount, and that price applies only once the desk confirms it for that transaction.',
      },
      {
        q: 'How does settlement work?',
        a: 'Settlement details — accepted networks, payment arrangements and timing — are agreed with the desk for each transaction before it proceeds.',
      },
      {
        q: 'What information is required before a transaction?',
        a: 'Onboarding and verification requirements are communicated by the desk during the quote process. Please do not send identity documents or account details through this website.',
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
    /*
     * The place name is written into each translation rather than substituted
     * in: Serbian and Russian put it in the genitive ("iz Dubaija", "из
     * Дубая"), which no template can produce from a bare noun.
     */
    basedIn: 'DUKAT Private Desk is based in Dubai.',
    docs: {
      terms: {
        title: 'Terms',
        intro:
          'These terms govern the use of this website. They are not a contract for any transaction — a transaction is agreed separately with the desk.',
        sections: [
          {
            heading: 'What this website is',
            body: [
              'This website describes the services of DUKAT Private Desk. It is informational. Nothing published here is an offer, a solicitation, or investment, legal or tax advice.',
            ],
          },
          {
            heading: 'No published pricing',
            body: [
              'No exchange rates are published on this website. A price applies only once the desk confirms it for a specific transaction, and only for the period stated in that confirmation.',
            ],
          },
          {
            heading: 'Enquiries',
            body: [
              'Sending the quote form or writing to the desk on Telegram is an enquiry. It does not create a contract, reserve a price, or oblige DUKAT to enter into any transaction.',
              'DUKAT may decline an enquiry without giving reasons.',
            ],
          },
          {
            heading: 'Eligibility',
            body: [
              'You are responsible for ensuring that using the desk is lawful for you where you are. Services are subject to eligibility, onboarding checks and applicable law.',
            ],
          },
          {
            heading: 'Risk',
            body: [
              'Transactions involving digital assets carry risk, including price movement between enquiry and settlement, and the fact that a transfer once made cannot be reversed. You act on your own judgement.',
            ],
          },
          {
            heading: 'Liability and changes',
            body: [
              'This website is provided as it stands. To the extent permitted by law, DUKAT is not liable for loss arising from reliance on information published here.',
              'These terms may change. The version published at the time of your enquiry is the one that applies to it.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Privacy',
        intro:
          'What happens to the information you give us through this website, described as plainly as we can put it.',
        sections: [
          {
            heading: 'What we collect',
            body: [
              'Only what you enter in the quote form: the currencies and the amount, your name, your city and country, your preferred contact method and the contact details for it, and any message you add.',
              'That is everything. There is no account, and nothing is collected in the background.',
            ],
          },
          {
            heading: 'What we do not collect',
            body: [
              'This website does not ask for identity documents, account numbers, wallet addresses or payment credentials, and you should not send them through it. Anything of that kind belongs in the onboarding process, directly with the desk.',
              'There is no analytics, advertising or tracking on this site, and no third party is measuring your visit.',
            ],
          },
          {
            heading: 'Cookies',
            body: [
              'One cookie is used, and only if you choose a language: it remembers that choice so you are not sent to the wrong version on your next visit. Nothing else is stored in your browser.',
            ],
          },
          {
            heading: 'How your enquiry is handled',
            body: [
              'Your enquiry is delivered to the desk so that a representative can reply with a quote and the next steps. It also appears in the server log of our hosting provider, which is how a delivery failure would be noticed.',
              'It is not sold, rented or shared for marketing, and it is not used to build a profile of you.',
            ],
          },
          {
            heading: 'Who else is involved',
            body: [
              'The website is hosted by Vercel Inc. Enquiries are delivered to the desk through the Telegram Bot API, operated by Telegram. Email you send to the desk is handled by our email provider. Each of them processes only what is needed to carry your message.',
            ],
          },
          {
            heading: 'How long, and your rights',
            body: [
              'Enquiries are kept for as long as is needed to respond to them and to meet record-keeping obligations, and are deleted after that.',
              'You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted, by writing to the address below.',
            ],
          },
        ],
      },
      compliance: {
        title: 'Compliance',
        intro:
          'The desk carries out checks before a transaction proceeds. This page explains when that happens and what it means for you.',
        sections: [
          {
            heading: 'Onboarding checks',
            body: [
              'Before a transaction proceeds, DUKAT carries out the checks required by applicable law and by its own policies. What is needed in your case is communicated by the desk during the quote process, before you are asked for anything.',
            ],
          },
          {
            heading: 'Do not send documents through this website',
            body: [
              'The quote form is not a channel for identity documents, account details or payment credentials, and they are not requested there. Anything of that kind is handled directly with the desk once a transaction is being arranged.',
            ],
          },
          {
            heading: 'Declining a relationship',
            body: [
              'DUKAT may decline an enquiry, or discontinue a relationship, without giving reasons.',
            ],
          },
        ],
      },
    },
  },
};

export type Dictionary = typeof en;

export default en;
