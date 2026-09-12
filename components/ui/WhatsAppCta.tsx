import { whatsappLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

/**
 * The second channel, drawn as the secondary treatment so Telegram stays the
 * leading action. Sizes mirror TelegramCta so the two sit level side by side.
 *
 * The visible label is just "WhatsApp" — a brand name reads the same in all
 * four languages and avoids declining it in Serbian. The accessible name
 * carries the verb.
 */
export function WhatsAppCta({
  ariaLabel,
  draft,
  size = 'default',
  className,
}: {
  ariaLabel: string;
  /** Pre-entered into the WhatsApp chat. The visitor still presses send. */
  draft?: string;
  size?: 'default' | 'large';
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(draft)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'group relative inline-flex items-center justify-center gap-3 border border-line font-sans uppercase tracking-widest2 text-bone transition-colors duration-500 ease-lux hover:border-champagne/55 hover:text-white',
        size === 'large' && 'px-10 py-6 text-xs sm:px-14 sm:py-7 sm:text-sm',
        size === 'default' && 'px-7 py-4 text-[0.6875rem]',
        className,
      )}
    >
      <WhatsAppGlyph className={size === 'large' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      <span>WhatsApp</span>
    </a>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn('shrink-0', className)}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
