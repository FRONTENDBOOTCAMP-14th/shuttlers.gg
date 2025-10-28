import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const meetup = style({
  borderRadius: '0px 20px 20px 20px',
  background: tokens.color.surface.raised,
  maxWidth: 1080,
  padding: 80,
  display: 'flex',
  flexDirection: 'column',
  gap: 50,
});

export const meetupTitle = style([textStyle.subtitle.bold, {}]);
export const meetupList = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '320px',
  gap: 20,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const meetupItem = style({
  width: 320,
  scrollSnapAlign: 'start',
});

export const meetupListEmpty = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  overflow: 'hidden',
  padding: 0,
});

export const meetupListNull = style([
  textStyle.title.semibold,
  {
    color: tokens.color.text.body,
    textAlign: 'center',
    minHeight: 200,
    width: '100%',
    display: 'grid',
    placeItems: 'center',
  },
]);
