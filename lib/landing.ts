/**
 * Serbian search landing pages.
 *
 * These exist because Serbian buyers search in plain words — "otkup kripta",
 * "kripto za kes", "prodaja USDT" — and a single homepage cannot rank for
 * several commercial terms at once. They are kept out of the main navigation
 * so the browsing experience stays as it is, but they are linked from the
 * footer and listed in the sitemap: an orphan page is one Google finds late
 * and trusts little, which matters on a domain this new.
 *
 * Each page describes a genuinely different transaction — one where the
 * client sells, one where the client buys. Near-identical pages that differ
 * only by a keyword are doorway pages, which Google penalises.
 *
 * Serbian only. They are not part of the four-locale Dictionary, so adding
 * one here does not oblige a translation into German or Russian.
 */

export const LANDING_SLUGS = ['otkup-kriptovaluta', 'kupovina-kriptovaluta'] as const;

export type LandingSlug = (typeof LANDING_SLUGS)[number];

export type LandingPage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: Array<{ heading: string; body: string[] }>;
  faq: Array<{ q: string; a: string }>;
};

/** Cities where the desk settles in cash. Also used for areaServed markup. */
export const CASH_CITIES = ['Beograd', 'Novi Sad', 'Niš'] as const;

export function isLandingSlug(value: string): value is LandingSlug {
  return (LANDING_SLUGS as readonly string[]).includes(value);
}

export const LANDING_SR: Record<LandingSlug, LandingPage> = {
  'otkup-kriptovaluta': {
    title: 'Otkup kriptovaluta za keš — Beograd, Novi Sad, Niš | DUKAT',
    description:
      'Otkup USDT uz isplatu u kešu — Beograd, Novi Sad i Niš. Kurs dogovaramo lično za svaki iznos, bez provizije povrh kursa. Desk radi sa većim iznosima.',
    h1: 'Otkup kriptovaluta za keš',
    intro:
      'DUKAT otkupljuje USDT uz isplatu u gotovini u Beogradu, Novom Sadu i Nišu. Kurs se dogovara lično za svaki iznos, a u njemu je sve — nema provizije povrh kursa.',
    sections: [
      {
        heading: 'Kako izgleda otkup',
        body: [
          'Javite se na Telegram ili WhatsApp i recite koju valutu prodajete i u kom iznosu. Dobijate kurs za taj konkretan iznos, u poruci.',
          'Ako vam kurs odgovara, dogovaramo grad, mesto i vreme. Isplata je u gotovini, na licu mesta.',
        ],
      },
      {
        heading: 'Gde radimo isplatu',
        body: [
          'Beograd, Novi Sad i Niš. Termin se dogovara unapred, preko Telegrama ili WhatsApp-a — desk ne radi bez najave.',
        ],
      },
      {
        heading: 'Kurs i provizija',
        body: [
          'Kurs ne objavljujemo na sajtu jer zavisi od iznosa i trenutka. Dobijate ga direktno, za vaš iznos, i važi tek kada ga desk potvrdi.',
          'U kursu je sve. Nema provizije, mrežnih ni bankarskih troškova povrh njega — iznos iz ponude je iznos koji dobijate na ruke.',
        ],
      },
      {
        heading: 'Koje kriptovalute i koji iznosi',
        body: [
          'Osnovno je USDT, uz isplatu u evrima ili dolarima. Za druge kriptovalute pitajte desk — gledamo od slučaja do slučaja.',
          'Desk je namenjen većim iznosima koji se kotiraju pojedinačno, a ne sitnim menjačkim transakcijama.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mogu li da prodam USDT za keš u Beogradu?',
        a: 'Da. Beograd je jedan od tri grada u kojima desk radi isplatu u gotovini, uz Novi Sad i Niš. Termin se dogovara unapred preko Telegrama ili WhatsApp-a.',
      },
      {
        q: 'Kako se određuje kurs?',
        a: 'Kurs dobijate u poruci, za vaš konkretan iznos. Ne objavljujemo ga na sajtu jer zavisi od iznosa i trenutka, a u njemu je sve — bez provizije povrh kursa.',
      },
      {
        q: 'Koje podatke treba da ostavim za ponudu?',
        a: 'Samo valutu, iznos i kontakt. Šta je potrebno pre same transakcije, desk vam kaže tokom dogovaranja — dokumenta i podatke o računima nemojte slati preko sajta.',
      },
    ],
  },

  'kupovina-kriptovaluta': {
    title: 'Kupovina kriptovaluta — Beograd, Novi Sad, Niš | DUKAT',
    description:
      'Kupovina USDT preko privatnog deska — Beograd, Novi Sad i Niš. Kurs dogovaramo lično za svaki iznos, bez provizije povrh kursa. Za veće iznose.',
    h1: 'Kupovina kriptovaluta',
    intro:
      'DUKAT prodaje USDT klijentima koji kupuju veće iznose. Kurs se dogovara lično, a u njemu je sve — nema provizije povrh kursa.',
    sections: [
      {
        heading: 'Kako izgleda kupovina',
        body: [
          'Javite se na Telegram ili WhatsApp sa iznosom koji želite da kupite. Dobijate kurs za taj iznos i dogovaramo način uplate.',
          'Uplata u gotovini ide u Beogradu, Novom Sadu ili Nišu, po dogovorenom terminu. Drugi načini se dogovaraju sa deskom pojedinačno.',
        ],
      },
      {
        heading: 'Gde se nalazimo',
        body: [
          'Beograd, Novi Sad i Niš, uvek uz zakazan termin. Dogovor ide preko Telegrama ili WhatsApp-a.',
        ],
      },
      {
        heading: 'Kurs i provizija',
        body: [
          'Kurs se ne objavljuje unapred. Dobijate ga za konkretan iznos i on važi tek kada ga desk potvrdi za tu transakciju.',
          'Nema provizije povrh kursa, ni mrežnih troškova koji se dodaju posle.',
        ],
      },
      {
        heading: 'Koji iznosi',
        body: [
          'Desk radi sa većim iznosima koji se dogovaraju pojedinačno. Za male iznose postoje menjačnice i to je brže i vama i nama.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mogu li da kupim USDT za keš?',
        a: 'Da, uz zakazan termin u Beogradu, Novom Sadu ili Nišu. Iznos i kurs se dogovaraju unapred preko Telegrama ili WhatsApp-a.',
      },
      {
        q: 'Da li je kurs isti kao na berzi?',
        a: 'Ne. Desk daje svoj kurs za konkretan iznos i u njemu je sve, bez provizije povrh njega. Kurs sa berze ne uključuje ni isplatu u gotovini ni troškove koji uz nju idu.',
      },
    ],
  },
};
