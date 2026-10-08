import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Defining colors here (not in `extend`) removes Tailwind's defaults
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      background: 'var(--background)',
      foreground: 'var(--foreground)',

      white: '#FFFFFF',

      beige: {
        500: '#98908B',
        100: '#F8F4F0',
      },

      grey: {
        900: '#201F24',
        500: '#696868',
        300: '#B3B3B3',
        100: '#F2F2F2',
      },

      // Secondary colors
      green: '#277C78',
      yellow: '#F2CDAC',
      cyan: '#82C9D7',
      navy: '#626070',
      red: '#C94736',
      purple: '#826CB0',

      // Other colors
      'purple-light': '#AF81BA',
      turquoise: '#597C7C',
      brown: '#93674F',
      magenta: '#934F6F',
      blue: '#3F82B2',
      'navy-grey': '#97A0AC',
      'army-green': '#7F9161',
      gold: '#CAB361',
      orange: '#BE6C49',
    },

    fontFamily: {
      sans: [
        'var(--font-public-sans)',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
      ],
    },

    // Text presets
    fontSize: {
      'preset-1': [
        '2rem', // 32px
        { lineHeight: '120%', letterSpacing: '0px', fontWeight: '700' },
      ],
      'preset-2': [
        '1.25rem', // 20px
        { lineHeight: '120%', letterSpacing: '0px', fontWeight: '700' },
      ],
      'preset-3': [
        '1rem', // 16px
        { lineHeight: '150%', letterSpacing: '0px', fontWeight: '700' },
      ],
      'preset-4': [
        '0.875rem', // 14px
        { lineHeight: '150%', letterSpacing: '0px', fontWeight: '400' },
      ],
      'preset-4-bold': [
        '0.875rem', // 14px
        { lineHeight: '150%', letterSpacing: '0px', fontWeight: '700' },
      ],
      'preset-5': [
        '0.75rem', // 12px
        { lineHeight: '150%', letterSpacing: '0px', fontWeight: '400' },
      ],
      'preset-5-bold': [
        '0.75rem', // 12px
        { lineHeight: '150%', letterSpacing: '0px', fontWeight: '700' },
      ],
    },

    extend: {
      // Spacing scale (rem values based on a 16px root)
      spacing: {
        0: '0px',
        px: '1px',
        50: '0.25rem', // 4px
        100: '0.5rem', // 8px
        150: '0.75rem', // 12px
        200: '1rem', // 16px
        250: '1.25rem', // 20px
        300: '1.5rem', // 24px
        400: '2rem', // 32px
        500: '2.5rem', // 40px
      },
    },
  },
  plugins: [],
};
export default config;
