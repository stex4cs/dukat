'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_RATES, fetchRates, type RateTable } from './rates';

/**
 * Serves the static table immediately so the widget renders a sensible quote
 * during server render and first paint, then upgrades to desk pricing if an
 * endpoint is configured. Failures keep the fallback rather than blanking
 * the UI.
 */
export function useRates(): RateTable {
  const [rates, setRates] = useState<RateTable>(FALLBACK_RATES);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RATES_ENDPOINT) return;

    const controller = new AbortController();
    let active = true;

    fetchRates(controller.signal).then((next) => {
      if (active) setRates(next);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return rates;
}
