import { colors } from '@/styles/colorPalette.css';
import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const calendar = style({
  width: 1080,
  margin: 'auto',
  padding: '80px 0',
});

export const calendarHeader = style({
  borderBottom: `1px solid ${colors.gray[600]}`,
  marginBottom: 80,
});

export const calendarHeaderTitle = style([
  textStyle.title.bold,
  {
    color: tokens.color.text.title,
    marginBottom: 20,
  },
]);

export const calendarHeaderSubTitle = style([
  textStyle.subtitle.semibold,
  {
    color: tokens.color.text.body,
    marginBottom: 50,
  },
]);

export const calendarMain = style({
  background: tokens.color.surface.muted,
  marginBottom: 40,
  borderRadius: 20,
});

export const calendarListSection = style({
  height: 680,
  display: 'flex',
  flexDirection: 'column',
  background: tokens.color.surface.muted,
  borderRadius: 20,
  padding: 40,
});

export const listHeader = style([
  textStyle.subtitle.bold,
  {
    marginBottom: 40,
  },
]);

export const eventList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  overflow: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});
