import en from './dictionaries/en';
import sr from './dictionaries/sr';
import ru from './dictionaries/ru';
import de from './dictionaries/de';
import type { Locale } from './config';
import type { Dictionary } from './dictionaries/en';

/**
 * Dictionaries are resolved on the server and handed to the client tree as a
 * single prop, so only the active language crosses the network boundary.
 * Never import this module from a client component.
 */
const dictionaries: Record<Locale, Dictionary> = { en, sr, ru, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
