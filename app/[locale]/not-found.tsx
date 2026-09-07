import Link from 'next/link';
import { Monogram } from '@/components/Logo';

/**
 * Language-neutral 404: the wordmark, the code, and a way back. It cannot
 * read the locale segment, so it avoids copy that would need translating.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="shell flex min-h-[100svh] flex-col items-center justify-center text-center"
    >
      <Monogram className="h-12 w-12 text-champagne/50" />
      <p className="display mt-12 text-[clamp(3rem,12vw,8rem)] leading-none text-bone">
        404
      </p>
      <Link
        href="/"
        className="link-underline mt-12 font-sans text-micro uppercase text-ash transition-colors duration-500 hover:text-bone"
      >
        DUKAT — Private Desk
      </Link>
    </main>
  );
}
