import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors } from '../../styles/colorPalette.css';
import { tokens } from '../../styles/tokens.css';
import { textStyle } from '../../styles/typography.css';

export const tournament = style({ maxWidth: 1080, margin: 'auto', marginTop: 80 });

export const tournamentHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const tournamentHeaderTitle = style([textStyle.title.bold]);

export const tournamentTitle = style(textStyle.subtitle.bold);

export const tournamentInfoHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const tournamentInfoTag = style({ display: 'flex', gap: 6 });

export const tournamentInfoDate = style(textStyle.body.semibold);

export const tournamentInfoPlace = style(textStyle.body.regular);

export const posterImg = style({ width: '100%', marginTop: 40 });

export const infoSection = recipe({
  base: {
    marginTop: 40,
    padding: 40,
    borderRadius: 20,
    boxShadow: tokens.elevation.shadow.primary,
  },
  variants: {
    tone: {
      brand: {
        background: colors.brand.main,
        color: tokens.color.text.inverse,
      },
      base: {
        background: tokens.color.surface.base,
        color: tokens.color.text.title,
      },
      muted: {
        background: tokens.color.surface.brand,
        color: tokens.color.text.title,
      },
    },
    elevated: {
      true: { boxShadow: tokens.elevation.shadow.primary },
      false: { boxShadow: 'none' },
    },
    gap: {
      none: {},
      md: { display: 'flex', flexDirection: 'column', gap: 16 },
    },
  },
  defaultVariants: {
    tone: 'base',
    elevated: true,
    gap: 'none',
  },
});

export const infoTitle = style([
  textStyle.subtitle.bold,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
]);

export const infoTitleIcon = style({
  width: 28,
  height: 28,
  color: colors.brand.main,
});

export const infoList = recipe({
  base: {
    marginTop: 24,
    borderRadius: 12,
    padding: '24px 40px',
  },
  variants: {
    tone: {
      muted: { background: tokens.color.surface.brand },
      transparent: { background: 'transparent' },
    },
  },
  defaultVariants: { tone: 'muted' },
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'flex-start',
});

export const infoLabel = style([
  textStyle.heading.medium,
  {
    display: 'inline-flex',
    alignItems: 'baseline',
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: '"tnum" 1, "lnum" 1',
    selectors: {
      '&::after': {
        content: '"|"',
        marginLeft: 8,
        marginRight: 12,
        color: tokens.color.text.caption,
      },
    },
  },
]);

export const infoValue = style([textStyle.heading.semibold]);
