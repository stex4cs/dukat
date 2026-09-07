import type { Dictionary } from './en';

/**
 * Srpski (latinica).
 *
 * Written as a Serbian desk would write it, not translated word for word:
 *  - no "Vi" before verbs — Serbian drops the pronoun ("Šaljete", not
 *    "Vi šaljete");
 *  - "digitalna imovina" is the term used by the Zakon o digitalnoj imovini,
 *    so it is used consistently instead of "kripto";
 *  - settlement is "realizacija" / "isplata", the words actually used for
 *    closing a deal, rather than the literal "izmirenje";
 *  - "kurs", not "cena", for an exchange rate.
 *
 * Bracketed [... TO BE PROVIDED] placeholders stay in English in every
 * locale: they are notes for DUKAT, not visitor copy.
 */
const sr: Dictionary = {
  meta: {
    title: 'DUKAT — Privatni desk',
    description:
      'DUKAT je privatni desk za velike transakcije digitalnom imovinom. Zamena USDT, EUR i USD uz jasan kurs i realizaciju koju vodi čovek.',
    ogAlt: 'DUKAT — Privatni desk',
  },

  common: {
    descriptor: 'Privatni desk',
    requestQuote: 'Zatražite ponudu',
    contactDesk: 'Javite se desku',
    skipToContent: 'Pređite na sadržaj',
    language: 'Jezik',
    openMenu: 'Otvorite meni',
    closeMenu: 'Zatvorite meni',
    menu: 'Meni',
    close: 'Zatvorite',
    optional: 'Nije obavezno',
  },

  nav: {
    aria: 'Glavna',
    labels: ['Privatni desk', 'Kako radi', 'Kursevi', 'O nama', 'Pitanja'],
  },

  hero: {
    eyebrow: 'Privatni desk za digitalnu imovinu',
    headline: ['Privatna likvidnost.', 'Lično izvršenje.'],
    lede: 'Privatni desk za velike transakcije digitalnom imovinom.',
    body:
      'Menjajte USDT, EUR i USD preko posvećenog deska — uz jasan kurs i realizaciju koju vodi čovek.',
    ctaPrimary: 'Zatražite ponudu',
    ctaSecondary: 'Kako radi',
    assetsAria: 'Valute sa kojima desk radi',
    scrollHint: 'Niže',
  },

  calculator: {
    title: 'Privatna ponuda',
    youSend: 'Šaljete',
    youReceive: 'Dobijate',
    swap: 'Zamenite valutama mesta',
    selectCurrency: 'Izaberite valutu',
    amountAria: 'Iznos koji šaljete',
    receiveAria: 'Indikativni iznos koji dobijate',
    indicativeRate: 'Indikativni kurs',
    note:
      'Kurs je isključivo indikativan. Konačan kurs desk potvrđuje pre realizacije.',
    cta: 'Zatražite ovu ponudu',
    minHint: 'Unesite iznos da biste videli indikativnu ponudu.',
  },

  trust: {
    aria: 'Kako desk radi',
    items: [
      'Privatna realizacija',
      'Direktan kontakt',
      'Jasan kurs',
      'Veliki iznosi',
    ],
  },

  privateDesk: {
    eyebrow: 'Privatni desk',
    headline: ['Za transakcije', 'kojima berza', 'nije dovoljna.'],
    body:
      'DUKAT radi po ponudi, ne po nalogu. Nema knjige naloga, javne platforme za trgovanje ni samostalnog izvršavanja. Svaki zahtev se gleda pojedinačno, a kurs daje predstavnik deska koji vodi transakciju od prve poruke do realizacije.',
    cards: [
      {
        title: 'Lična usluga',
        body: 'Direktan kontakt sa predstavnikom deska koji vodi vaš slučaj.',
      },
      {
        title: 'Jasan kurs',
        body: 'Znate tačan iznos pre nego što potvrdite.',
      },
      {
        title: 'Veliki iznosi',
        body: 'Usluga skrojena za transakcije koje se dogovaraju pojedinačno.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'Kako radi',
    headline: ['Od ponude', 'do realizacije.'],
    aria: 'Tok transakcije, četiri koraka',
    steps: [
      {
        title: 'Zahtev',
        body: 'Izaberite valute, iznos i valutu u kojoj želite isplatu.',
      },
      {
        title: 'Ponuda',
        body: 'Dobijate indikativnu ili potvrđenu ponudu od deska.',
      },
      {
        title: 'Potvrda',
        body: 'Proverite kurs i detalje pre nego što nastavite.',
      },
      {
        title: 'Realizacija',
        body: 'Transakcija se sprovodi po dogovorenim instrukcijama.',
      },
    ],
  },

  assets: {
    eyebrow: 'Valute i kursevi',
    headline: ['Jedan desk.', 'Tri valute.'],
    body:
      'Desk radi sa malim brojem valuta umesto sa dugom listom. USDT se kotira i prema evru i prema dolaru.',
    flowAria: 'Evro, Tether i dolar kotiraju se jedan prema drugom',
    cards: [
      { code: 'USDT', name: 'Tether', note: 'Digitalno sredstvo' },
      { code: 'EUR', name: 'Evro', note: 'Fiat valuta' },
      { code: 'USD', name: 'Američki dolar', note: 'Fiat valuta' },
    ],
    board: {
      title: 'Indikativni kursevi',
      pair: 'Par',
      rate: 'Kurs',
      note:
        'Referentne vrednosti, za orijentaciju. Nisu ponuda i ne obavezuju dok ih desk ne potvrdi za konkretnu transakciju.',
    },
  },

  quoteForm: {
    eyebrow: 'Privatna ponuda',
    headline: ['Vaša transakcija.', 'Vaš kurs.'],
    body:
      'Recite nam šta menjate i u kom iznosu. Desk pregleda zahtev i javlja vam kurs i sledeće korake.',
    fields: {
      have: 'Imam',
      want: 'Želim',
      size: 'Iznos transakcije',
      name: 'Ime i prezime',
      method: 'Način kontakta',
      contact: 'Kontakt',
      message: 'Poruka',
    },
    placeholders: {
      size: '100.000',
      name: 'Ime i prezime',
      telegram: '@korisnicko_ime',
      whatsapp: '+381 00 000 0000',
      email: 'ime@kompanija.com',
      message: 'Sve što je desku korisno da zna unapred.',
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
    submitting: 'Šalje se',
    errors: {
      title: 'Proverite označena polja.',
      samePair: 'Izaberite dve različite valute.',
      size: 'Unesite iznos koji menjate.',
      name: 'Unesite ime kojim da vam se obratimo.',
      contact: 'Unesite kontakt za izabrani način.',
      email: 'Unesite ispravnu imejl adresu.',
      consent: 'Potvrdite saglasnost pre slanja.',
      failed:
        'Slanje zahteva nije uspelo. Pokušajte ponovo ili se javite desku direktno.',
    },
    success: {
      title: 'Zahtev je stigao.',
      body:
        'Predstavnik deska pregleda zahtev i javlja vam se na izabrani kontakt.',
      summary: 'Vaš zahtev',
      again: 'Pošaljite novi zahtev',
    },
    notice:
      'Ovaj obrazac šalje upit desku. Ne otvara transakciju, ne fiksira kurs i ništa ne izvršava.',
  },

  about: {
    eyebrow: 'O nama',
    lead:
      'DUKAT spaja staro shvatanje vrednosti, diskrecije i ličnog odnosa sa savremenim poslovanjem digitalnom imovinom.',
    body: [
      'Dukat je vekovima bio novčić kojem se verovalo i preko granice — držao se zbog pouzdanosti, a ne zbog priče oko njega. Desk stoji na istom principu: mali broj valuta, pažljivo vođen posao i klijenti kojima je razgovor draži od interfejsa.',
      'Iza svakog zahteva stoji čovek. Kurs se daje, proverava i potvrđuje pre nego što se bilo šta pomeri, a isti predstavnik vodi transakciju od prve poruke do realizacije.',
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
        a: 'DUKAT je privatni, vanberzanski (OTC) desk za zamenu između digitalne imovine i fiat valuta. Svaki zahtev vodi predstavnik deska, a ne javna platforma za trgovanje — nema knjige naloga ni trgovanja preko ekrana.',
      },
      {
        q: 'Koje valute radite?',
        a: 'Desk radi sa USDT, EUR i USD; osnovni parovi su USDT ↔ EUR i USDT ↔ USD. Zahteve sa drugim valutama gledamo od slučaja do slučaja. [ADDITIONAL SUPPORTED ASSETS TO BE PROVIDED]',
      },
      {
        q: 'Kako se traži ponuda?',
        a: 'Popunite obrazac za privatnu ponudu: valute, iznos i način na koji želite da vas kontaktiramo. Predstavnik deska pregleda zahtev i javlja vam kurs i sledeće korake.',
      },
      {
        q: 'Da li je prikazani kurs konačan?',
        a: 'Nije. Kursevi na sajtu su indikativni i služe za orijentaciju. Kurs važi tek kada ga desk izričito potvrdi za konkretnu transakciju.',
      },
      {
        q: 'Koje iznose radite?',
        a: 'Desk je namenjen velikim transakcijama koje se dogovaraju pojedinačno, a ne sitnim iznosima. [MINIMUM AND MAXIMUM TRANSACTION SIZES TO BE PROVIDED]',
      },
      {
        q: 'Kako teče realizacija?',
        a: 'Detalji — prihvaćene mreže, način plaćanja i rokovi — dogovaraju se sa deskom za svaku transakciju pre nego što krene. [SETTLEMENT PROCEDURE TO BE PROVIDED]',
      },
      {
        q: 'Šta je potrebno pre transakcije?',
        a: 'Šta je potrebno za otvaranje odnosa i proveru, desk vam kaže tokom dogovaranja ponude. Nemojte preko sajta slati lična dokumenta ni podatke o računima. [COMPLIANCE POLICY TO BE PROVIDED] [KYC REQUIREMENTS TO BE PROVIDED]',
      },
    ],
  },

  finalCta: {
    headline: ['Pokrenite kapital.', 'Diskretno.'],
    body: 'Razgovarajte direktno sa DUKAT privatnim deskom.',
    primary: 'Zatražite ponudu',
    secondary: 'Javite se desku',
  },

  footer: {
    navHeading: 'Navigacija',
    legalHeading: 'Dokumenti',
    contactHeading: 'Kontakt',
    languageHeading: 'Jezik',
    navLabels: ['Privatni desk', 'Kursevi', 'Kako radi', 'Pitanja', 'Kontakt'],
    legalLabels: ['Uslovi', 'Privatnost', 'Usklađenost'],
    telegram: 'Telegram',
    email: 'Imejl',
    rights: 'Sva prava zadržana.',
    disclaimer:
      'Transakcije digitalnom imovinom nose rizik. Kursevi na ovom sajtu su indikativni, osim kada ih desk izričito potvrdi. Usluge zavise od uslova podobnosti, važećih propisa i zahteva DUKAT-a za otvaranje odnosa i usklađenost.',
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
