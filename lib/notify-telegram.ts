import { COUNTRY_NAMES_EN } from './countries';
import type { QuoteRequest } from './quote';

/**
 * Delivers a written quote request to the desk over the Telegram Bot API.
 *
 * A bot is the only way a server can send a Telegram message — a personal
 * account cannot be used for this. Setup is in the README.
 *
 * Both variables are server-side only. Do not prefix them with NEXT_PUBLIC:
 * that would ship the bot token to the browser, and anyone could then post
 * as the desk.
 */
const API_TIMEOUT_MS = 8000;

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Telegram's HTML parse mode needs these escaped, or a name breaks the message. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Grouped with commas regardless of the visitor's locale, so the desk reads one format. */
function formatAmount(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

/**
 * A tappable link for the chosen contact method, so the desk can reply in one
 * tap. Returns null when the value cannot be turned into a safe URL.
 */
function contactLink(request: QuoteRequest): string | null {
  const value = request.contact.trim();

  if (request.method === 'email') {
    return `mailto:${encodeURIComponent(value)}`;
  }
  if (request.method === 'telegram') {
    const handle = value.replace(/^@/, '');
    return /^[A-Za-z0-9_]{4,32}$/.test(handle) ? `https://t.me/${handle}` : null;
  }
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 ? `https://wa.me/${digits}` : null;
}

export function formatQuoteMessage(request: QuoteRequest): string {
  const link = contactLink(request);
  const contact = escapeHtml(request.contact);

  const lines = [
    '<b>DUKAT — new quote request</b>',
    '',
    `<b>${formatAmount(request.amount)} ${request.have}</b> → <b>${request.want}</b>`,
    '',
    `Name: ${escapeHtml(request.name)}`,
    `Based in: ${escapeHtml(request.city)}, ${COUNTRY_NAMES_EN[request.country]}`,
    `Via: ${request.method} — ${link ? `<a href="${link}">${contact}</a>` : contact}`,
    `Language: ${escapeHtml(request.locale)}`,
  ];

  if (request.message) {
    lines.push('', `<i>${escapeHtml(request.message)}</i>`);
  }

  return lines.join('\n');
}

/** Returns true when the desk has the message. */
export async function notifyTelegram(request: QuoteRequest): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: AbortSignal.timeout(API_TIMEOUT_MS),
        body: JSON.stringify({
          chat_id: chatId,
          text: formatQuoteMessage(request),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      // The body carries Telegram's own reason — worth logging verbatim,
      // "chat not found" and "bot was blocked" are the usual setup mistakes.
      console.error(
        '[dukat] telegram sendMessage failed',
        response.status,
        await response.text().catch(() => ''),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('[dukat] telegram sendMessage threw', error);
    return false;
  }
}
