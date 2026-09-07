import type { Config } from 'tailwindcss';

/**
 * DUKAT design tokens.
 *
 * The palette is deliberately narrow: three near-black surfaces, two text
 * tones and a single muted champagne accent. Gold is an accent, never a
 * surface — it is reserved for hairlines, indices, focus and micro-detail.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A09',
        surface: {
          DEFAULT: '#11110F',
          raised: '#161613',
        },
        bone: '#F1EEE6',
        ash: '#9B988F',
        champagne: {
          DEFAULT: '#B89A5E',
          soft: '#C9AE78',
          deep: '#8E7442',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
          faint: 'rgba(255,255,255,0.045)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          'var(--font-sans)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        micro: ['0.625rem', { lineHeight: '1.1', letterSpacing: '0.22em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.3em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        wider2: '0.14em',
        widest2: '0.24em',
        widest3: '0.42em',
      },
      maxWidth: {
        shell: '1440px',
        measure: '38ch',
        prose2: '62ch',
      },
      borderRadius: {
        card: '2px',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.045) inset, 0 24px 60px -30px rgba(0,0,0,0.9)',
        lifted: '0 1px 0 0 rgba(255,255,255,0.07) inset, 0 40px 90px -40px rgba(0,0,0,1)',
      },
      keyframes: {
        'gold-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'gold-sweep': 'gold-sweep 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-dot': 'pulse-dot 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
