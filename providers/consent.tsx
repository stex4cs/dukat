'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearConsent,
  mayLoadTrackers,
  readConsent,
  writeConsent,
  type ConsentState,
} from '@/lib/consent';

type ConsentContextValue = {
  consent: ConsentState | null;
  /** True where the law requires asking before anything loads. */
  required: boolean;
  /** False until both the cookie and the region are known. */
  ready: boolean;
  /** Whether the analytics and advertising scripts may run. */
  allowed: boolean;
  decide: (state: ConsentState) => void;
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

const REGION_KEY = 'dukat_consent_region';

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [required, setRequired] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);

    // An explicit answer settles it; the region no longer matters.
    if (stored) {
      setReady(true);
      return;
    }

    // Cached per session so the lookup happens once, not on every page.
    let cached: string | null = null;
    try {
      cached = sessionStorage.getItem(REGION_KEY);
    } catch {
      cached = null;
    }

    if (cached !== null) {
      setRequired(cached === '1');
      setReady(true);
      return;
    }

    let active = true;
    fetch('/api/geo')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { consentRequired?: boolean } | null) => {
        if (!active) return;
        const needed = Boolean(data?.consentRequired);
        setRequired(needed);
        try {
          sessionStorage.setItem(REGION_KEY, needed ? '1' : '0');
        } catch {
          // Private browsing: just ask again next page. Harmless.
        }
      })
      // If the lookup fails, assume consent is required. Erring the other way
      // would load trackers on someone the law protects.
      .catch(() => {
        if (active) setRequired(true);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const decide = useCallback((state: ConsentState) => {
    writeConsent(state);
    setConsent(state);
  }, []);

  const reopen = useCallback(() => {
    clearConsent();
    setConsent(null);
    setRequired(true);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      required,
      ready,
      allowed: ready && mayLoadTrackers(consent, required),
      decide,
      reopen,
    }),
    [consent, required, ready, decide, reopen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error('useConsent must be used within <ConsentProvider>');
  return context;
}
