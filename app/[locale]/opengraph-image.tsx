import { ImageResponse } from 'next/og';

/**
 * Social preview card.
 *
 * Telegram is the desk's main channel, so every shared link renders this.
 * Twitter's summary_large_image was already being declared with no image
 * behind it, which produced a bare text card.
 *
 * The card is deliberately identical in every language and uses Latin
 * characters only: the generator falls back to a default font, and Cyrillic
 * would risk rendering as blank boxes. The mark carries the brand instead of
 * a translated line.
 */
export const alt = 'DUKAT — Private Desk';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MONOGRAM = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
    <path d="M13 7V33" stroke="#B89A5E" stroke-width="1.3"/>
    <path d="M13 7A13 13 0 0 1 13 33" stroke="#B89A5E" stroke-width="1.3"/>
    <path d="M13 12.5A7.5 7.5 0 0 1 13 27.5" stroke="#B89A5E" stroke-width="0.8" opacity="0.45"/>
  </svg>`,
)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A09',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Concentric rules, echoing the hero geometry. */}
        <div
          style={{
            position: 'absolute',
            right: -230,
            top: -120,
            width: 760,
            height: 760,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -50,
            width: 620,
            height: 620,
            borderRadius: '50%',
            border: '1px solid rgba(184,154,94,0.28)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -60,
            top: 60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={MONOGRAM} width={64} height={64} alt="" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 26,
            }}
          >
            <div
              style={{
                fontSize: 46,
                letterSpacing: 10,
                color: '#F1EEE6',
                lineHeight: 1,
              }}
            >
              DUKAT
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: 9,
                color: '#9B988F',
                marginTop: 12,
              }}
            >
              PRIVATE DESK
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 62,
              color: '#F1EEE6',
              lineHeight: 1.12,
              letterSpacing: -1,
              maxWidth: 760,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>PRIVATE LIQUIDITY.</span>
            <span>PERSONALLY EXECUTED.</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: 96,
              height: 1,
              backgroundColor: 'rgba(184,154,94,0.75)',
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              marginTop: 26,
              fontSize: 17,
              letterSpacing: 7,
              color: '#9B988F',
            }}
          >
            USDT · EUR · USD
          </div>
        </div>
      </div>
    ),
    size,
  );
}
