import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const profile = style({
  maxWidth: 1080,
  margin: 'auto',
  paddingBlock: 80,

  '@media': {
    'screen and (max-width: 768px)': {
      paddingInline: 20,
      paddingBlock: 40,
    },
  },
});

export const section = recipe({
  base: {
    marginTop: 40,
    padding: 40,
    borderRadius: 20,
    background: tokens.color.surface.base,
    boxShadow: tokens.elevation.shadow.primary,

    '@media': {
      'screen and (max-width: 768px)': {
        padding: 24,
        marginTop: 24,
      },
    },
  },
  variants: {
    tone: {
      base: {
        background: tokens.color.surface.base,
      },
      muted: {
        background: tokens.color.surface.muted,
      },
    },
  },
  defaultVariants: {
    tone: 'base',
  },
});

export const sectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
  gap: 16,
  flexWrap: 'wrap',
});

export const sectionTitle = style([
  textStyle.subtitle.bold,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
]);

export const sectionTitleIcon = style({
  width: 24,
  height: 24,
});

export const errorMessage = style([
  textStyle.body.regular,
  {
    color: tokens.color.text.caption,
    textAlign: 'center',
    padding: 40,
  },
]);
