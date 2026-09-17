/**
 * Search landing pages for the Serbian market, in Serbian and in Russian.
 *
 * They exist because buyers search in plain words — "otkup kripta",
 * "kripto za kes", "продать USDT Белград" — and a single homepage cannot rank
 * for several commercial terms at once. Kept out of the main navigation so the
 * browsing experience stays as it is, but linked from the footer and listed in
 * the sitemap: an orphan page is found late and trusted little, which matters
 * on a domain this new.
 *
 * Russian is here for the same market, not a different one. The Russian
 * community in Serbia searches these services in Russian, and each page is
 * declared as the hreflang alternate of its Serbian counterpart, so the two
 * are read as translations rather than as competing duplicates.
 *
 * Each page describes a genuinely different transaction — one where the client
 * sells, one where they buy. Near-identical pages differing only by a keyword
 * are doorway pages, which Google penalises.
 *
 * These sit outside the four-locale Dictionary: adding one obliges no German
 * or English translation.
 */

/** The two transactions, named from the client's side. */
export const LANDING_KEYS = ['sell', 'buy'] as const;

export type LandingKey = (typeof LANDING_KEYS)[number];

/** Locales that have landing pages. Not every site language needs them. */
export const LANDING_LOCALES = ['sr', 'ru'] as const;

export type LandingLocale = (typeof LANDING_LOCALES)[number];

/**
 * Slugs are written in each language's own search vocabulary, transliterated
 * for Russian — a Cyrillic URL survives percent-encoding badly when someone
 * pastes it into a chat.
 */
export const LANDING_SLUG: Record<LandingLocale, Record<LandingKey, string>> = {
  sr: { sell: 'otkup-kriptovaluta', buy: 'kupovina-kriptovaluta' },
  ru: { sell: 'prodat-usdt', buy: 'kupit-usdt' },
};

export type LandingPage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: Array<{ heading: string; body: string[] }>;
  faq: Array<{ q: string; a: string }>;
};

/** Cities where the desk settles in cash, as shown to each audience. */
export const CASH_CITIES: Record<LandingLocale, string[]> = {
  sr: ['Beograd', 'Novi Sad', 'Niš'],
  ru: ['Белград', 'Нови-Сад', 'Ниш'],
};

/** One spelling for structured data, independent of the page language. */
export const CASH_CITIES_SCHEMA = ['Belgrade', 'Novi Sad', 'Niš'];

export function isLandingLocale(value: string): value is LandingLocale {
  return (LANDING_LOCALES as readonly string[]).includes(value);
}

/** Resolves a URL slug back to the transaction it names, or null. */
export function landingKeyFor(
  locale: LandingLocale,
  slug: string,
): LandingKey | null {
  const entry = LANDING_KEYS.find((key) => LANDING_SLUG[locale][key] === slug);
  return entry ?? null;
}

const SR: Record<LandingKey, LandingPage> = {
  sell: {
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
        heading: 'Prodaja USDT-a',
        body: [
          'Najveći deo posla je prodaja USDT-a za gotovinu. Javite iznos, dobijete kurs za taj iznos, pa dogovaramo termin u Beogradu, Novom Sadu ili Nišu.',
          'Koju mrežu koristimo dogovaramo pre transakcije, zajedno sa ostalim detaljima.',
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
        q: 'Kako da prodam USDT?',
        a: 'Pišite desku na Telegram ili WhatsApp i recite iznos. Dobijate kurs za taj iznos, i ako vam odgovara, dogovaramo termin i mesto — isplata je u gotovini, na licu mesta.',
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

  buy: {
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
          'Uplata u gotovini ide u Beogradu, Novom Sadu ili Nišu, po dogovorenom terminu. Za manje iznose moguć je i bankovni prenos — kripto šaljemo kada je uplata vidljiva.',
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
        heading: 'Koji iznosi i kako se plaća',
        body: [
          'Veći iznosi idu uz isplatu u gotovini i dogovoren termin u jednom od tri grada.',
          'Manji iznosi se rešavaju bankovnim prenosom, bez dolaska. Koji je način pogodniji za vaš iznos, dogovaramo u poruci.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mogu li da kupim USDT za keš?',
        a: 'Da, uz zakazan termin u Beogradu, Novom Sadu ili Nišu. Iznos i kurs se dogovaraju unapred preko Telegrama ili WhatsApp-a.',
      },
      {
        q: 'Mogu li da uplatim na račun umesto u kešu?',
        a: 'Za manje iznose može — uplatite bankovnim prenosom, a kripto šaljemo kada je uplata vidljiva. Veći iznosi idu uz isplatu u gotovini i dogovoren termin.',
      },
      {
        q: 'Da li je kurs isti kao na berzi?',
        a: 'Ne. Desk daje svoj kurs za konkretan iznos i u njemu je sve, bez provizije povrh njega. Kurs sa berze ne uključuje ni isplatu u gotovini ni troškove koji uz nju idu.',
      },
    ],
  },
};

const RU: Record<LandingKey, LandingPage> = {
  sell: {
    title: 'Продать USDT за наличные — Белград, Нови-Сад, Ниш | DUKAT',
    description:
      'Обмен USDT на наличные в Белграде, Нови-Саде и Нише. Курс называем лично под вашу сумму, без комиссии сверху. Деск работает с крупными объёмами.',
    h1: 'Продать USDT за наличные',
    intro:
      'DUKAT выкупает USDT с выдачей наличных в Белграде, Нови-Саде и Нише. Курс согласуется лично под каждую сумму, и в нём уже всё — комиссии сверху нет.',
    sections: [
      {
        heading: 'Как проходит обмен',
        body: [
          'Напишите в Telegram или WhatsApp: какая валюта и какая сумма. Курс под этот объём придёт ответным сообщением.',
          'Если курс устраивает, договариваемся о городе, месте и времени. Наличные выдаются на месте.',
        ],
      },
      {
        heading: 'Где выдаём наличные',
        body: [
          'Белград, Нови-Сад и Ниш. Встреча только по предварительной договорённости через Telegram или WhatsApp — без записи деск не работает.',
        ],
      },
      {
        heading: 'Курс и комиссия',
        body: [
          'Курс на сайте не публикуется: он зависит от суммы и момента. Вы получаете его лично, под свой объём, и он действует после подтверждения деска.',
          'В курсе уже всё. Ни комиссии, ни сетевых или банковских расходов сверху — сколько названо, столько вы и получаете на руки.',
        ],
      },
      {
        heading: 'Продажа USDT',
        body: [
          'Основной объём — продажа USDT за наличные. Назовите сумму, получите курс под неё, дальше согласуем встречу в Белграде, Нови-Саде или Нише.',
          'Сеть, в которой принимаем перевод, согласуем до сделки, вместе с остальными деталями.',
        ],
      },
      {
        heading: 'Какие активы и какие суммы',
        body: [
          'Основное — USDT, с выдачей в евро или долларах. По другим криптовалютам спрашивайте деск: смотрим отдельно.',
          'Деск рассчитан на крупные суммы, которые котируются индивидуально, а не на мелкий обмен.',
        ],
      },
    ],
    faq: [
      {
        q: 'Можно ли продать USDT за наличные в Белграде?',
        a: 'Да. Белград — один из трёх городов, где деск выдаёт наличные, вместе с Нови-Садом и Нишем. Встреча согласуется заранее в Telegram или WhatsApp.',
      },
      {
        q: 'Как продать USDT?',
        a: 'Напишите деску в Telegram или WhatsApp и назовите сумму. Получите курс под неё, и если он устраивает, договариваемся о месте и времени — наличные на месте.',
      },
      {
        q: 'Как формируется курс?',
        a: 'Курс приходит сообщением, под вашу конкретную сумму. На сайте он не публикуется, потому что зависит от объёма и момента, и в нём уже всё — без комиссии сверху.',
      },
      {
        q: 'Какие данные нужны для котировки?',
        a: 'Только валюта, сумма и контакт. Что понадобится до самой сделки, деск скажет в переписке — документы и реквизиты счетов через сайт отправлять не нужно.',
      },
    ],
  },

  buy: {
    title: 'Купить USDT за наличные — Белград, Нови-Сад, Ниш | DUKAT',
    description:
      'Покупка USDT через частный деск в Белграде, Нови-Саде и Нише. Курс под вашу сумму, без комиссии сверху. Небольшие суммы — банковским переводом.',
    h1: 'Купить USDT',
    intro:
      'DUKAT продаёт USDT тем, кто покупает крупные суммы. Курс согласуется лично, и в нём уже всё — комиссии сверху нет.',
    sections: [
      {
        heading: 'Как проходит покупка',
        body: [
          'Напишите в Telegram или WhatsApp сумму, которую хотите купить. Получите курс под неё и согласуем способ оплаты.',
          'Наличными — в Белграде, Нови-Саде или Нише, по назначенной встрече. Небольшие суммы можно оплатить банковским переводом: криптовалюту отправляем по поступлении.',
        ],
      },
      {
        heading: 'Где мы работаем',
        body: [
          'Белград, Нови-Сад и Ниш, всегда по предварительной записи. Договариваемся в Telegram или WhatsApp.',
        ],
      },
      {
        heading: 'Курс и комиссия',
        body: [
          'Курс заранее не публикуется. Вы получаете его под конкретную сумму, и он действует после того, как деск подтвердит его для этой сделки.',
          'Комиссии сверху курса нет, как и сетевых расходов, которые добавляются потом.',
        ],
      },
      {
        heading: 'Какие суммы и как платить',
        body: [
          'Крупные суммы — наличными, по согласованной встрече в одном из трёх городов.',
          'Небольшие — банковским переводом, без встречи. Что удобнее под ваш объём, решим в переписке.',
        ],
      },
    ],
    faq: [
      {
        q: 'Можно ли оплатить переводом вместо наличных?',
        a: 'Для небольших сумм — да. Вы оплачиваете банковским переводом, криптовалюта уходит после поступления. Крупные суммы — наличными по согласованной встрече.',
      },
      {
        q: 'Можно ли купить USDT за наличные в Белграде?',
        a: 'Да, по предварительной записи в Белграде, Нови-Саде или Нише. Сумму и курс согласуем заранее в Telegram или WhatsApp.',
      },
      {
        q: 'Курс такой же, как на бирже?',
        a: 'Нет. Деск называет свой курс под конкретную сумму, и в нём уже всё, без комиссии сверху. Биржевой курс не включает ни выдачу наличных, ни связанные с ней расходы.',
      },
    ],
  },
};

export const LANDING_CONTENT: Record<
  LandingLocale,
  Record<LandingKey, LandingPage>
> = { sr: SR, ru: RU };
