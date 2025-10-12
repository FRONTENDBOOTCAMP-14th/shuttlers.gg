import { createGlobalTheme } from '@vanilla-extract/css';

export const typography = createGlobalTheme(':root', {
  font: {
    family: {
      base: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    letterSpacing: {
      tight: '-0.025em',
    },
    lineHeight: {
      133: '133.4%',
      136: '136.4%',
      140: '140%',
      150: '150%',
    },
    size: {
      headline: '48px',
      title: '36px',
      subtitle: '28px',
      heading: '22px',
      body: '16px',
      caption: '12px',
    },
  },

  textStyle: {
    headline: {
      semibold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-headline)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      bold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-headline)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },

    title: {
      bold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-title)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      semibold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-title)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },

    subtitle: {
      bold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-subtitle)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      semibold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-subtitle)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--font-lineHeight-133)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },

    heading: {
      bold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-heading)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--font-lineHeight-136)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      semibold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-heading)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--font-lineHeight-136)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      medium: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-heading)',
        fontWeight: 'var(--font-weight-medium)',
        lineHeight: 'var(--font-lineHeight-136)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },

    body: {
      bold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-body)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--font-lineHeight-150)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      semibold: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-body)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--font-lineHeight-150)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
      regular: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-body)',
        fontWeight: 'var(--font-weight-regular)',
        lineHeight: 'var(--font-lineHeight-150)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },

    caption: {
      regular: {
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-caption)',
        fontWeight: 'var(--font-weight-regular)',
        lineHeight: 'var(--font-lineHeight-140)',
        letterSpacing: 'var(--font-letterSpacing-tight)',
      },
    },
  },
});
