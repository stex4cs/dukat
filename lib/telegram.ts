/**
 * Telegram is the desk.
 *
 * Every primary action on the site opens this chat. `t.me/<username>?text=`
 * is Telegram's documented deep link: the text is pre-entered into the input
 * bar and the visitor still presses send themselves.
 *
 * https://core.telegram.org/api/links
 */
export const TELEGRAM_USERNAME = 'dukatdesk';

export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;

/** Opens the chat, optionally with a draft already typed. */
export function telegramLink(draft?: string): string {
  if (!draft) return TELEGRAM_URL;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(draft)}`;
}
