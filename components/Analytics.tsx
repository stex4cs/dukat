'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GA_ID, META_PIXEL_ID } from '@/lib/consent';
import { useConsent } from '@/providers/consent';
import { useTrack } from '@/lib/use-track';

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
 *
 * The inline init does not call fbq('track','PageView') either. That copy
 * would carry no event_id, so Meta could not match it to the one the
 * Conversions API sends and would count the same view twice. PageView is
 * fired from the effect below instead, with an id.
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
  const track = useTrack();
  const [pixelReady, setPixelReady] = useState(false);
  const lastPath = useRef<string | null>(null);

  /*
   * The App Router navigates without a reload, so each tracker has to be told
   * about the new page. Two orderings matter here:
   *
   * - fbq does not exist until the Pixel script has run. Firing before that
   *   silently did nothing, so PageView reached the Conversions API but never
   *   the browser. Hence the wait on pixelReady.
   * - gtag's own init already reports the first page. Reporting it again here
   *   would double-count it, so GA is only told about later navigations.
   */
  useEffect(() => {
    if (!allowed) return;
    if (META_PIXEL_ID && !pixelReady) return;
    if (lastPath.current === pathname) return;

    const isFirstPage = lastPath.current === null;
    lastPath.current = pathname;

    if (GA_ID && !isFirstPage) {
      window.gtag?.('event', 'page_view', { page_path: pathname });
    }
    track('PageView');
  }, [allowed, pathname, pixelReady, track]);

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
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          onReady={() => setPixelReady(true)}
        >
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');`}
        </Script>
      )}
    </>
  );
}
