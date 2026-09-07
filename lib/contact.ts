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
  telegram: { label: 't.me/dukat787', href: 'https://t.me/dukat787' },
  email: { label: '[CONTACT EMAIL]', href: null },
};

/** Year shown in the footer copyright line. */
export const COPYRIGHT_YEAR = 2026;
