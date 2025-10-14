import { colors } from '@/styles/colorPalette.css';
import { textStyle } from '@/styles/typography.css';
import { style, styleVariants } from '@vanilla-extract/css';

const PRIMARY_SOLID = colors.brand.main;
const PRIMARY_GRADIENT = colors.brand.linear;
const DARK = colors.gray[700];
const WHITE = colors.white;

export const badgeBase = style([
  textStyle.body.bold,
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: '32px',
    padding: '6px 16px',
    borderRadius: 9999,
    border: '1px solid transparent',
    userSelect: 'none',
    marginRight: '6px',
    backgroundColor: 'transparent',
  },
]);

export const gradientText = style({
  backgroundImage: PRIMARY_GRADIENT,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
});

export const iconStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const filled = styleVariants({
  primary: {
    background: PRIMARY_GRADIENT,
    color: WHITE,
  },
  dark: {
    background: DARK,
    color: WHITE,
  },
  white: {
    background: WHITE,
    color: PRIMARY_SOLID,
  },
});

export const outline = styleVariants({
  primary: {
    background: `linear-gradient(white, white) padding-box, ${PRIMARY_GRADIENT} border-box`,
    backgroundOrigin: 'border-box',
    color: 'inherit',
  },
  dark: {
    background: `linear-gradient(white, white) padding-box, linear-gradient(${DARK}, ${DARK}) border-box`,
    backgroundOrigin: 'border-box',
    color: DARK,
  },
  white: {
    background: `linear-gradient(transparent, transparent) padding-box, linear-gradient(${WHITE}, ${WHITE}) border-box`,
    backgroundOrigin: 'border-box',
    color: WHITE,
  },
});

export const activeStyle = style({
  transform: 'translateY(-1px)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
});
