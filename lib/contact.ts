import { TELEGRAM_URL, TELEGRAM_USERNAME } from './telegram';

/**
 * Desk contact details.
 *
 * Everything here is a placeholder. Replace the label with the real value and
 * set `href` to make it a live link — components render a non-linked value
 * whenever `href` is null, so the site never ships a dead anchor.
 */
export type ContactPoint = {
  label: string;
  href: string | null;
};

export const CONTACT: {
  telegram: ContactPoint;
  email: ContactPoint;
} = {
  telegram: { label: `t.me/${TELEGRAM_USERNAME}`, href: TELEGRAM_URL },
  email: { label: 'office@dukatdesk.com', href: 'mailto:office@dukatdesk.com' },
};

/** Year shown in the footer copyright line. */
export const COPYRIGHT_YEAR = 2026;
