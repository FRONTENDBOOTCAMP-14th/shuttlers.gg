import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const chartContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px 0',
});

export const chartWrapper = style({
  position: 'relative',
  width: 240,
  height: 240,
});

export const chartCenter = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

export const winRateValue = style([
  textStyle.title.bold,
  {
    color: tokens.color.text.title,
    fontSize: 48,
    display: 'block',
  },
]);

export const winRateLabel = style([
  textStyle.body.regular,
  {
    color: tokens.color.text.caption,
    marginTop: 4,
  },
]);
