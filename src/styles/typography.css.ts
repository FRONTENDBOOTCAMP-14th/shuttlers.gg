import { createGlobalTheme } from '@vanilla-extract/css';

export const typography = createGlobalTheme(':root', {
  font: {
    family: {
      base: 'var(--font-pretendard), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
});

export const textStyle = {
  headline: {
    semibold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.headline,
      fontWeight: typography.font.weight.semibold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    bold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.headline,
      fontWeight: typography.font.weight.bold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },

  title: {
    bold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.title,
      fontWeight: typography.font.weight.bold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    semibold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.title,
      fontWeight: typography.font.weight.semibold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },

  subtitle: {
    bold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.subtitle,
      fontWeight: typography.font.weight.bold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    semibold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.subtitle,
      fontWeight: typography.font.weight.semibold,
      lineHeight: typography.font.lineHeight[133],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },

  heading: {
    bold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.heading,
      fontWeight: typography.font.weight.bold,
      lineHeight: typography.font.lineHeight[136],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    semibold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.heading,
      fontWeight: typography.font.weight.semibold,
      lineHeight: typography.font.lineHeight[136],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    medium: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.heading,
      fontWeight: typography.font.weight.medium,
      lineHeight: typography.font.lineHeight[136],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },

  body: {
    bold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.body,
      fontWeight: typography.font.weight.bold,
      lineHeight: typography.font.lineHeight[150],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    semibold: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.body,
      fontWeight: typography.font.weight.semibold,
      lineHeight: typography.font.lineHeight[150],
      letterSpacing: typography.font.letterSpacing.tight,
    },
    regular: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.body,
      fontWeight: typography.font.weight.regular,
      lineHeight: typography.font.lineHeight[150],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },

  caption: {
    regular: {
      fontFamily: typography.font.family.base,
      fontSize: typography.font.size.caption,
      fontWeight: typography.font.weight.regular,
      lineHeight: typography.font.lineHeight[140],
      letterSpacing: typography.font.letterSpacing.tight,
    },
  },
};
