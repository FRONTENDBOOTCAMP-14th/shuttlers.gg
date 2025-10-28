import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '1080px',
  margin: '80px auto 0px auto',
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  ...textStyle.title.bold,
  color: tokens.color.text.title,
  marginBottom: '50px',
});

export const divider = style({
  width: '100%',
  height: 1,
  background: tokens.color.action.bg.dark,
  border: 'none',
  marginBottom: '80px',
});

export const gridForm = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
    },
  },
});

export const filterRow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  gap: '12px',
  marginTop: '40px',
});

export const filterLabel = style({
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '8px',
  width: '100%',
  '@media': {
    'screen and (max-width: 767px)': {
      flexWrap: 'wrap',
    },
  },
});

export const textboxSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '40px',
  resize: 'vertical',
});

export const textboxLabel = style({
  ...textStyle.heading.semibold,
  color: tokens.color.text.body,
  minWidth: '120px',
});

export const checkboxRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '40px',
  marginBottom: '20px',
});

export const checkboxLabel = style({
  ...textStyle.caption.regular,
  color: tokens.color.text.body,

  '@media': {
    'screen and (min-width: 768px)': {
      ...textStyle.heading.medium,
    },
  },
});

export const createButton = style({
  marginTop: '32px',
  width: 'fit-content',
  alignSelf: 'right',
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
});
