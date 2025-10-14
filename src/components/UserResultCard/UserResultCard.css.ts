import { colors } from '@/styles/colorPalette.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const userResultCard = style({
  width: '710px',
  height: '70px',
  background: colors.white,
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
});

export const userResultCardUserName = style([textStyle.heading.medium, {}]);
