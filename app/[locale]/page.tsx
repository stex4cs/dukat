import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PrivateDesk } from '@/components/PrivateDesk';
import { HowItWorks } from '@/components/HowItWorks';
import { Currencies } from '@/components/Currencies';
import { QuoteForm } from '@/components/QuoteForm';
import { About } from '@/components/About';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

/**
 * The DUKAT homepage.
 *
 * Every primary action opens the Telegram chat — that is where the desk
 * quotes and where a transaction is actually arranged. The written form is
 * kept as an alternative for people who would rather not use Telegram.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <PrivateDesk />
        <HowItWorks />
        <Currencies />
        <QuoteForm />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
