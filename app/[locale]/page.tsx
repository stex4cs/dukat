import { getDictionary } from '@/lib/i18n';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { faqSchema, jsonLd } from '@/lib/structured-data';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import { PrivateDesk } from '@/components/PrivateDesk';
import { HowItWorks } from '@/components/HowItWorks';
import { Currencies } from '@/components/Currencies';
import { QuoteForm } from '@/components/QuoteForm';
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
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getDictionary(
    (isLocale(locale) ? locale : defaultLocale) as Locale,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(dictionary)) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Pricing />
        <PrivateDesk />
        <HowItWorks />
        <Currencies />
        <QuoteForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
