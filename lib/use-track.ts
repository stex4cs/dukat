'use client';

import { useCallback } from 'react';
import { useConsent } from '@/providers/consent';

/**
 * Fires one event to both halves of Meta's tracking.
 *
 * The same event_id goes to the browser Pixel and to the Conversions API, so
 * Meta treats the two reports as one event. Without it the same click is
 * counted twice, which inflates the numbers and misleads ad optimisation.
 *
 * Nothing fires unless consent allows it.
 */
export type TrackableEvent = 'PageView' | 'Lead' | 'Contact';

export function useTrack() {
  const { allowed } = useConsent();

  return useCallback(
    (
      eventName: TrackableEvent,
      options: {
        /** Skip the relay when another server route already reports this event. */
        serverSide?: boolean;
      } = {},
    ): string | null => {
      if (!allowed || typeof window === 'undefined') return null;

      const eventId =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      window.fbq?.('track', eventName, {}, { eventID: eventId });

      // The quote route sends this event itself, with the hashed location
      // attached. Relaying it here as well would be a second, poorer copy.
      if (options.serverSide === false) return eventId;

      const payload = JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
      });

      // sendBeacon survives the page being left — these fire on links that
      // open Telegram or WhatsApp, where a normal fetch can be cut short.
      try {
        const blob = new Blob([payload], { type: 'application/json' });
        if (navigator.sendBeacon?.('/api/meta', blob)) return eventId;
      } catch {
        // Fall through to fetch.
      }

      void fetch('/api/meta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});

      return eventId;
    },
    [allowed],
  );
}
