import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens.css';

export const userResultCard = style({
  width: '710px',
  height: '70px',
  background: tokens.color.surface.base,
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:hover': {
      background: tokens.color.surface.raised,
    },
  },
});

export const userResultCardUserName = style([textStyle.heading.medium, {}]);

export const badgeGroup = style({
  marginLeft: 'auto',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});
