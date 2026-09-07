'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CurrencyCode } from '@/lib/currencies';

export type QuoteDraft = {
  have: CurrencyCode;
  want: CurrencyCode;
  amount: number;
};

type QuoteDraftContextValue = {
  draft: QuoteDraft;
  /**
   * Increments only on an explicit hand-off from the calculator. The form
   * watches it so that typing in the widget does not overwrite what someone
   * has already entered in the form.
   */
  revision: number;
  handOff: (draft: QuoteDraft) => void;
};

const DEFAULT_DRAFT: QuoteDraft = { have: 'USDT', want: 'USD', amount: 100000 };

const QuoteDraftContext = createContext<QuoteDraftContextValue | null>(null);

/**
 * Connects the hero quote widget to the private quote form: pressing
 * "request this quote" carries the currencies and amount down the page
 * instead of asking for them a second time.
 */
export function QuoteDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<QuoteDraft>(DEFAULT_DRAFT);
  const [revision, setRevision] = useState(0);

  const handOff = useCallback((next: QuoteDraft) => {
    setDraft(next);
    setRevision((value) => value + 1);
  }, []);

  const value = useMemo(
    () => ({ draft, revision, handOff }),
    [draft, revision, handOff],
  );

  return (
    <QuoteDraftContext.Provider value={value}>
      {children}
    </QuoteDraftContext.Provider>
  );
}

export function useQuoteDraft(): QuoteDraftContextValue {
  const context = useContext(QuoteDraftContext);
  if (!context) {
    throw new Error('useQuoteDraft must be used within <QuoteDraftProvider>');
  }
  return context;
}

export { DEFAULT_DRAFT };
