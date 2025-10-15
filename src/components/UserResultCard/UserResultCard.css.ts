import { style } from '@vanilla-extract/css';
import { colors } from '../../styles/colorPalette.css';

export const userResultCard = style({
  width: '710px',
  height: '70px',
  background: colors.white,
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
});
