/**
 * WhatsApp — the desk's second channel, beside Telegram.
 *
 * `wa.me/<number>?text=` is WhatsApp's documented click-to-chat link: the
 * number in international format with no plus sign, spaces or dashes, and the
 * text pre-entered into the chat. As with Telegram, the visitor presses send.
 *
 * https://faq.whatsapp.com/5913398998672934
 */
export const WHATSAPP_NUMBER = '381658588936';

/** How the number is shown to people: grouped, with the country code. */
export const WHATSAPP_DISPLAY = '+381 65 858 8936';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Opens a chat with the desk, optionally with a draft already typed. */
export function whatsappLink(draft?: string): string {
  if (!draft) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(draft)}`;
}
