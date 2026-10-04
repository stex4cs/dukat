import { META_PIXEL_ID } from './consent';

/**
 * Meta Conversions API — the same events, sent from the server.
 *
 * The browser Pixel loses events to ad blockers and to Safari's tracking
 * prevention. Sending from here recovers them. Every event carries an
 * event_id that the browser also sends, which is how Meta recognises the two
 * as one event instead of counting it twice.
 *
 * It is gated by the same consent as the Pixel. Sending server-side while the
 * browser tag is blocked would make the consent banner theatre — the data
 * would reach Meta either way, just less visibly.
 *
 * What is deliberately NOT sent: anything the visitor typed. No name, no
 * email, no phone, no amount. Hashed contact details would raise match
 * quality, but the privacy page says enquiry details go to the desk, and a
 * discreet desk sending its clients' contacts to an ad platform is the wrong
 * trade whatever it does for attribution.
 */
const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? 'v23.0';

export type MetaEvent = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
};

export type MetaContext = {
  clientIp: string | null;
  userAgent: string | null;
  /** Browser cookies the Pixel sets; they tie the two sides together. */
  fbp: string | null;
  fbc: string | null;
};

export function isCapiConfigured(): boolean {
  return Boolean(process.env.META_CAPI_TOKEN && META_PIXEL_ID);
}

export async function sendMetaEvent(
  event: MetaEvent,
  context: MetaContext,
): Promise<boolean> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !META_PIXEL_ID) return false;

  const userData: Record<string, string> = {};
  if (context.clientIp) userData.client_ip_address = context.clientIp;
  if (context.userAgent) userData.client_user_agent = context.userAgent;
  if (context.fbp) userData.fbp = context.fbp;
  if (context.fbc) userData.fbc = context.fbc;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify({
          access_token: token,
          data: [
            {
              event_name: event.eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: event.eventId,
              event_source_url: event.eventSourceUrl,
              action_source: 'website',
              user_data: userData,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.error(
        '[dukat] meta capi rejected',
        response.status,
        await response.text().catch(() => ''),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('[dukat] meta capi threw', error);
    return false;
  }
}
