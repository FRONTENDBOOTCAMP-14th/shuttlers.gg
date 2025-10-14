import { tokens } from '@/styles/tokens.css';
import { style, styleVariants } from '@vanilla-extract/css';
import { textStyle } from '../../styles/typography.css';

export const scoreResultCard = style({
  background: tokens.color.surface.muted,
  borderRadius: '8px',
  padding: '24px',
  width: '100%',
  maxWidth: '1000px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const titleArea = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  color: tokens.color.text.body,
  ...textStyle.heading.semibold,
});

export const titleRightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const matchType = style({
  color: tokens.color.text.body,
  ...textStyle.heading.semibold,
});

export const resultBadgeVariants = styleVariants({
  win: {
    background: tokens.color.badge.outline.text.brand,
    color: tokens.color.badge.filled.text.brand,
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...textStyle.body.bold,
  },
  lose: {
    background: tokens.color.field.border.error,
    color: tokens.color.badge.filled.text.brand,
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...textStyle.body.bold,
  },
});

export const scoreArea = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const scoreContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const roundText = style({
  color: tokens.color.text.caption,
  ...textStyle.body.regular,
});

export const scoreMainContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  justifyItems: 'center',
  gap: 20,
  maxWidth: '100%',
  overflow: 'hidden',
});

export const leftTeamArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  justifySelf: 'flex-end',
  gap: '20px',
  flex: '1',
  minWidth: '0',
});

export const rightTeamArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  justifySelf: 'flex-start',
  gap: '20px',
  flex: '1',
  minWidth: '0',
});

export const teamName = style({
  color: tokens.color.text.body,
  whiteSpace: 'nowrap',
  ...textStyle.body.semibold,
});

export const teamNameLeft = style([
  teamName,
  {
    textAlign: 'right',
  },
]);

export const teamNameRight = style([
  teamName,
  {
    textAlign: 'left',
  },
]);

export const scoreText = style({
  color: tokens.color.text.body,
  textAlign: 'center',
  ...textStyle.heading.bold,
});

// The margin value '30.5px' is chosen to precisely align the 'vs' text between score columns as per design requirements.
export const vsText = style({
  color: tokens.color.text.body,
  margin: '0 30.5px',
  flexShrink: 0,
  ...textStyle.body.semibold,
});

export const cardBackgroundVariants = styleVariants({
  win: {
    backgroundColor: tokens.color.surface.brand,
  },
  lose: {
    backgroundColor: tokens.color.surface.muted,
  },
});
