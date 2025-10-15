import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { colors } from '../../styles/colorPalette.css';
import { tokens } from '../../styles/tokens.css';

export const calendar = style({
  width: '1080px',
  margin: 'auto',
  marginTop: '80px',
});
export const calendarHeader = style({
  borderBottom: `1px solid ${colors.gray[600]}`,
  marginBottom: '80px',
});
export const calendarHeaderTitle = style([
  textStyle.title.bold,
  {
    color: tokens.color.text.title,
    marginBottom: '20px',
  },
]);
export const calendarHeaderSubTitle = style([
  textStyle.subtitle.semibold,
  {
    color: tokens.color.text.body,
    marginBottom: '50px',
  },
]);

export const calendarMain = style({
  //   height: '716px',
  background: tokens.color.surface.muted,
  marginBottom: '40px',
  borderRadius: '20px',
});

export const calendarListSection = style({
  height: '677px',
  background: tokens.color.surface.muted,
  borderRadius: '20px',
  padding: '40px',
});

export const listHeader = style([
  textStyle.subtitle.bold,
  {
    marginBottom: '40px',
  },
]);

export const eventList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
