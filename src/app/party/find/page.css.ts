import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '100%',
  margin: '80px auto 0 auto',
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    '(min-width: 768px)': {
      maxWidth: '720px',
    },
    '(min-width: 1024px)': {
      maxWidth: '1080px',
    },
  },
});

export const titleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});
export const title = style({
  ...textStyle.title.bold,
  color: tokens.color.text.title,
});

export const topSection = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignSelf: 'center',
  gap: '50px',
});

export const createButton = style({
  width: 'fit-content',
});

export const divider = style({
  width: '100%',
  height: '1px',
  background: tokens.color.action.bg.dark,
  border: 'none',
  marginBottom: '50px',
});

export const filterSection = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '60px',
  backgroundColor: tokens.color.surface.muted,
  padding: '40px',
  borderRadius: '20px',
  marginBottom: '80px',

  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      gap: '40px',
    },
  },
});

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px',
});

export const filterLabel = style({
  ...textStyle.heading.semibold,
  display: 'flex',
  justifyContent: 'flex-start',
});

export const badgeGroup = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

export const filterBadge = style({
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
  selectors: {
    '&[data-active="true"]': {
      background: tokens.color.badge.filled.bg.brand,
      color: tokens.color.text.inverse,
    },
  },
});

export const partyListSection = style({
  width: '100%',
});

export const partyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',

  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '40px',
    },
  },
});

export const emptyText = style({
  textAlign: 'center',
  color: '#aaa',
  fontSize: '1.1rem',
  margin: '40px 0',
});

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '20px',
  marginBottom: '30px',
});

export const modalTitle = style({
  ...textStyle.heading.semibold,
  color: tokens.color.text.title,
});

export const modalPartyContent = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
});

export const scheduleDatetime = style({
  ...textStyle.body.regular,
  color: tokens.color.text.body,
});

export const modalConditionWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '6px',
});

export const conditionText = style({
  ...textStyle.body.semibold,
  color: tokens.color.text.body,
});

export const modalSchedule = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const modalCondition = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const modalBadgeList = style({
  display: 'flex',
  columnGap: '4px',
});

export const modalInfo = style({
  display: 'flex',
  flexDirection: 'column',
  columnGap: '4px',
});
export const modalLabel = style({
  ...textStyle.body.semibold,
  color: tokens.color.text.body,
});

export const participantsList = style({
  marginTop: '20px',
  marginBottom: '4px',
});
export const participantsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '200px',
});

export const badgeWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
});

export const participantsItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: 'auto',
  alignContent: 'center',
  padding: '19px 0',
  borderBottom: `1px solid ${tokens.color.surface.brand}`,
});
export const nameContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
