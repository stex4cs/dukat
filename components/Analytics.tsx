'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GA_ID, META_PIXEL_ID } from '@/lib/consent';
import { useConsent } from '@/providers/consent';

/**
 * Google Analytics and the Meta Pixel, loaded only once they are allowed.
 *
 * Nothing is requested from Google or Meta until then — the <Script> tags
 * simply are not rendered, so no connection is opened and no cookie is set.
 * A tag that loads and then "waits" for consent has already done the thing
 * consent was meant to permit.
 *
 * The Pixel's <noscript> fallback image is deliberately omitted: it fires on
 * load with no way to respect a choice, which is exactly the pattern that
 * gets enforced in the EU, and it reports almost nothing in return.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
  }
}

export function Analytics() {
  const { allowed } = useConsent();
  const pathname = usePathname();

  // The App Router navigates without a reload, so each tracker needs telling
  // about the new page itself.
  useEffect(() => {
    if (!allowed) return;
    if (GA_ID) window.gtag?.('config', GA_ID, { page_path: pathname });
    window.fbq?.('track', 'PageView');
  }, [allowed, pathname]);

  if (!allowed) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
