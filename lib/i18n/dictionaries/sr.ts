import type { Dictionary } from './en';

/**
 * Srpski (latinica).
 *
 * Bracketed [... TO BE PROVIDED] placeholders are intentionally left in
 * English across every locale: they are notes for DUKAT, not visitor copy,
 * and staying identical keeps them greppable in one pass.
 */
const sr: Dictionary = {
  meta: {
    title: 'DUKAT — Privatni desk',
    description:
      'DUKAT je privatni desk za velike transakcije digitalnom imovinom. Zamenite USDT, EUR i USD uz transparentne ponude i lično izvršenje.',
    ogAlt: 'DUKAT — Privatni desk',
  },

  common: {
    descriptor: 'Privatni desk',
    requestQuote: 'Zatražite ponudu',
    contactDesk: 'Kontaktirajte desk',
    skipToContent: 'Pređite na sadržaj',
    language: 'Jezik',
    openMenu: 'Otvorite meni',
    closeMenu: 'Zatvorite meni',
    menu: 'Meni',
    close: 'Zatvorite',
    optional: 'Opciono',
  },

  nav: {
    aria: 'Glavna',
    labels: ['Privatni desk', 'Kako funkcioniše', 'Kursevi', 'O nama', 'Pitanja'],
  },

  hero: {
    eyebrow: 'Privatni desk za digitalnu imovinu',
    headline: ['Privatna likvidnost.', 'Lično izvršenje.'],
    lede: 'Privatni desk za velike transakcije digitalnom imovinom.',
    body:
      'Zamenite USDT, EUR i USD preko posvećenog privatnog deska, uz transparentne ponude i lično izvršenje.',
    ctaPrimary: 'Zatražite ponudu',
    ctaSecondary: 'Kako funkcioniše',
    assetsAria: 'Podržana sredstva',
    scrollHint: 'Skrolujte',
  },

  calculator: {
    title: 'Privatna ponuda',
    youSend: 'Vi šaljete',
    youReceive: 'Vi dobijate',
    swap: 'Zamenite valute slanja i prijema',
    selectCurrency: 'Izaberite valutu',
    amountAria: 'Iznos za slanje',
    receiveAria: 'Indikativni iznos koji dobijate',
    indicativeRate: 'Indikativni kurs',
    note:
      'Isključivo indikativna cena. Konačan kurs desk potvrđuje pre izvršenja.',
    cta: 'Zatražite ovu ponudu',
    minHint: 'Unesite iznos da biste videli indikativnu ponudu.',
  },

  trust: {
    aria: 'Kako desk posluje',
    items: [
      'Privatno izvršenje',
      'Direktna komunikacija',
      'Transparentne ponude',
      'Desk za velike iznose',
    ],
  },

  privateDesk: {
    eyebrow: 'Privatni desk',
    headline: ['Stvoren za transakcije', 'kojima je potrebno više', 'od berze.'],
    body:
      'DUKAT posluje kao privatni desk zasnovan na ponudama. Nema knjige naloga, javnog interfejsa za trgovanje ni samouslužnog izvršenja. Svaki zahtev se razmatra pojedinačno, a cenu formira predstavnik deska koji prati transakciju od prve poruke do izmirenja.',
    cards: [
      {
        title: 'Privatna usluga',
        body: 'Direktna komunikacija sa posvećenim predstavnikom deska.',
      },
      {
        title: 'Jasna cena',
        body: 'Znate iznos iz ponude pre nego što nastavite.',
      },
      {
        title: 'Velike transakcije',
        body: 'Usluga osmišljena oko pojedinačno kotiranih transakcija.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'Kako funkcioniše',
    headline: ['Od ponude', 'do izmirenja.'],
    aria: 'Proces transakcije, četiri koraka',
    steps: [
      {
        title: 'Zahtev',
        body: 'Izaberite sredstva, iznos i željenu valutu izmirenja.',
      },
      {
        title: 'Ponuda',
        body: 'Primite indikativnu ili potvrđenu ponudu od privatnog deska.',
      },
      {
        title: 'Potvrda',
        body: 'Pregledajte kurs i detalje transakcije pre nego što nastavite.',
      },
      {
        title: 'Izmirenje',
        body:
          'Sprovedite transakciju u skladu sa dogovorenim instrukcijama za izmirenje.',
      },
    ],
  },

  assets: {
    eyebrow: 'Sredstva i kursevi',
    headline: ['Jedan desk.', 'Tri osnovna sredstva.'],
    body:
      'Desk je usredsređen na mali broj instrumenata umesto na dugu listu. USDT se kotira prema izmirenju u evrima i u američkim dolarima.',
    flowAria: 'Evro, Tether i američki dolar kotiraju se jedan prema drugom',
    cards: [
      { code: 'USDT', name: 'Tether', note: 'Digitalno sredstvo izmirenja' },
      { code: 'EUR', name: 'Evro', note: 'Fiat valuta izmirenja' },
      { code: 'USD', name: 'Američki dolar', note: 'Fiat valuta izmirenja' },
    ],
    board: {
      title: 'Indikativni kursevi',
      pair: 'Par',
      rate: 'Kurs',
      note:
        'Referentne vrednosti radi orijentacije. One nisu ponuda i nisu obavezujuće dok ih desk ne potvrdi za konkretnu transakciju.',
    },
  },

  quoteForm: {
    eyebrow: 'Privatna ponuda',
    headline: ['Vaša transakcija.', 'Vaša ponuda.'],
    body:
      'Recite nam šta želite da zamenite i u kom iznosu. Naš desk će razmotriti zahtev i javiti vam se sa važećom ponudom i sledećim koracima.',
    fields: {
      have: 'Imam',
      want: 'Želim',
      size: 'Veličina transakcije',
      name: 'Ime i prezime',
      method: 'Način kontakta',
      contact: 'Kontakt',
      message: 'Poruka',
    },
    placeholders: {
      size: '100.000',
      name: 'Ime i prezime',
      telegram: '@korisnik',
      whatsapp: '+00 000 000 000',
      email: 'ime@kompanija.com',
      message: 'Sve što desk treba da zna unapred.',
    },
    methods: {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Imejl',
    },
    consent: {
      text:
        'Prihvatam {privacy} i {terms} i pristajem da me kontaktirate povodom ovog zahteva.',
      privacy: 'Politiku privatnosti',
      terms: 'Uslove korišćenja',
    },
    submit: 'Zatražite privatnu ponudu',
    submitting: 'Slanje',
    errors: {
      title: 'Proverite označena polja.',
      samePair: 'Izaberite dve različite valute.',
      size: 'Unesite iznos koji želite da zamenite.',
      name: 'Unesite ime kojim možemo da vam se obratimo.',
      contact: 'Unesite kontakt podatke za izabrani način komunikacije.',
      email: 'Unesite ispravnu imejl adresu.',
      consent: 'Potvrdite pre slanja zahteva.',
      failed:
        'Zahtev nije mogao da bude poslat. Pokušajte ponovo ili kontaktirajte desk direktno.',
    },
    success: {
      title: 'Zahtev je primljen.',
      body:
        'Predstavnik deska će razmotriti vaš zahtev i odgovoriti putem izabranog načina kontakta.',
      summary: 'Vaš zahtev',
      again: 'Pošaljite novi zahtev',
    },
    notice:
      'Ovaj obrazac šalje upit desku. On ne kreira, ne kotira i ne izvršava transakciju.',
  },

  about: {
    eyebrow: 'O nama',
    lead:
      'DUKAT spaja tradicionalno shvatanje vrednosti, diskrecije i lične usluge sa savremenim izmirenjem u digitalnoj imovini.',
    body: [
      'Ime upućuje na istorijski novčić — jedinicu vrednosti prepoznatu preko granica i čuvanu zbog pouzdanosti, a ne zbog buke. Desk je izgrađen na istom principu: mali broj sredstava, pažljivo vođenih, za klijente koji razgovor pretpostavljaju interfejsu.',
      'Svaki zahtev vodi čovek. Cena se kotira, proverava i potvrđuje pre nego što se bilo šta pomeri, a isti predstavnik prati transakciju od prve poruke do izmirenja.',
    ],
    entityLabel: 'Pravno lice',
    jurisdictionLabel: 'Jurisdikcija',
  },

  faq: {
    eyebrow: 'Pitanja',
    headline: ['Pre nego što', 'nam se javite.'],
    items: [
      {
        q: 'Šta je DUKAT Privatni desk?',
        a: 'DUKAT je privatni vanberzanski (OTC) desk za razmenu između digitalne imovine i fiat valuta. Zahtevi se obrađuju pojedinačno, preko predstavnika deska, a ne kroz javnu platformu za trgovanje, i ne postoji knjiga naloga.',
      },
      {
        q: 'Koje valute su podržane?',
        a: 'Desk je fokusiran na USDT, EUR i USD, pri čemu su USDT ↔ EUR i USDT ↔ USD osnovni parovi. Zahtevi koji uključuju druga sredstva ili valute mogu se razmatrati pojedinačno. [ADDITIONAL SUPPORTED ASSETS TO BE PROVIDED]',
      },
      {
        q: 'Kako da zatražim ponudu?',
        a: 'Popunite obrazac za privatnu ponudu sa valutama, iznosom i željenim načinom kontakta. Predstavnik deska razmatra zahtev i odgovara direktno, sa važećom ponudom i sledećim koracima.',
      },
      {
        q: 'Da li je prikazani kurs konačan?',
        a: 'Ne. Kursevi prikazani na ovom sajtu su indikativni i služe isključivo za orijentaciju. Kurs postaje primenjiv tek kada ga desk izričito potvrdi za konkretnu transakciju.',
      },
      {
        q: 'Koje veličine transakcija podržavate?',
        a: 'Desk je osmišljen za velike, pojedinačno kotirane transakcije, a ne za male maloprodajne iznose. [MINIMUM AND MAXIMUM TRANSACTION SIZES TO BE PROVIDED]',
      },
      {
        q: 'Kako izgleda izmirenje?',
        a: 'Detalji izmirenja — uključujući prihvaćene mreže, način plaćanja i rokove — dogovaraju se sa deskom za svaku transakciju pre nego što se ona sprovede. [SETTLEMENT PROCEDURE TO BE PROVIDED]',
      },
      {
        q: 'Koje informacije su potrebne pre transakcije?',
        a: 'Desk vam tokom procesa kotiranja saopštava zahteve za otvaranje odnosa i proveru. Molimo vas da preko ovog sajta ne šaljete identifikacione dokumente niti podatke o računima. [COMPLIANCE POLICY TO BE PROVIDED] [KYC REQUIREMENTS TO BE PROVIDED]',
      },
    ],
  },

  finalCta: {
    headline: ['Prenesite vrednost.', 'Privatno.'],
    body: 'Razgovarajte direktno sa DUKAT privatnim deskom.',
    primary: 'Zatražite ponudu',
    secondary: 'Kontaktirajte desk',
  },

  footer: {
    navHeading: 'Navigacija',
    legalHeading: 'Pravno',
    contactHeading: 'Kontakt',
    languageHeading: 'Jezik',
    navLabels: ['Privatni desk', 'Kursevi', 'Kako funkcioniše', 'Pitanja', 'Kontakt'],
    legalLabels: ['Uslovi', 'Privatnost', 'Usklađenost'],
    telegram: 'Telegram',
    email: 'Imejl',
    rights: 'Sva prava zadržana.',
    disclaimer:
      'Transakcije digitalnom imovinom nose rizik. Kursevi prikazani na ovom sajtu su indikativni, osim ako ih desk izričito ne potvrdi. Usluge podležu uslovima podobnosti, važećim propisima i DUKAT zahtevima za otvaranje odnosa i usklađenost.',
  },

  legal: {
    back: 'Nazad na sajt',
    notice:
      'Ova stranica je rezervisano mesto. Konačan tekst dostavlja DUKAT.',
    docs: {
      terms: { title: 'Uslovi', body: '[TERMS OF SERVICE TO BE PROVIDED]' },
      privacy: { title: 'Privatnost', body: '[PRIVACY POLICY TO BE PROVIDED]' },
      compliance: {
        title: 'Usklađenost',
        body: '[COMPLIANCE POLICY TO BE PROVIDED]',
      },
    },
  },
};

export default sr;
