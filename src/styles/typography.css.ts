import { createGlobalTheme, style } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
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
    semibold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.headline,
      fontWeight: vars.font.weight.semibold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    bold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.headline,
      fontWeight: vars.font.weight.bold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
  title: {
    bold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.title,
      fontWeight: vars.font.weight.bold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    semibold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.title,
      fontWeight: vars.font.weight.semibold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
  subtitle: {
    bold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.subtitle,
      fontWeight: vars.font.weight.bold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    semibold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.subtitle,
      fontWeight: vars.font.weight.semibold,
      lineHeight: vars.font.lineHeight['133'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
  heading: {
    bold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.heading,
      fontWeight: vars.font.weight.bold,
      lineHeight: vars.font.lineHeight['136'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    semibold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.heading,
      fontWeight: vars.font.weight.semibold,
      lineHeight: vars.font.lineHeight['136'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    medium: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.heading,
      fontWeight: vars.font.weight.medium,
      lineHeight: vars.font.lineHeight['136'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
  body: {
    bold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.body,
      fontWeight: vars.font.weight.bold,
      lineHeight: vars.font.lineHeight['150'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    semibold: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.body,
      fontWeight: vars.font.weight.semibold,
      lineHeight: vars.font.lineHeight['150'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
    regular: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.body,
      fontWeight: vars.font.weight.regular,
      lineHeight: vars.font.lineHeight['150'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
  caption: {
    regular: style({
      fontFamily: vars.font.family.base,
      fontSize: vars.font.size.caption,
      fontWeight: vars.font.weight.regular,
      lineHeight: vars.font.lineHeight['140'],
      letterSpacing: vars.font.letterSpacing.tight,
    }),
  },
};
