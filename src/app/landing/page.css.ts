import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const mainSection = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 56px)',

  '@media': {
    'screen and (min-width: 768px)': {
      height: 'calc(100vh - 72px)',
    },
  },
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '18px',
});

export const mainTitle = style({
  color: tokens.color.text.body,
  ...textStyle.subtitle.semibold,
  textAlign: 'center',
  maxWidth: '800px',
  marginBottom: '60px',
});
