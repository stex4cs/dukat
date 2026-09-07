import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { PrivateDesk } from '@/components/PrivateDesk';
import { HowItWorks } from '@/components/HowItWorks';
import { Assets } from '@/components/Assets';
import { QuoteForm } from '@/components/QuoteForm';
import { About } from '@/components/About';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

/**
 * The DUKAT homepage.
 *
 * Section order follows the reading order a visitor needs: what the desk is,
 * what an amount comes to, how it works, what is traded, how to ask, who is
 * behind it, and what is still open.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <PrivateDesk />
        <HowItWorks />
        <Assets />
        <QuoteForm />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
