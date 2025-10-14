import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const scoreResultCard = style({
  background: tokens.color.surface.muted,
  borderRadius: '8px',
  padding: '24px',
  width: '1000px',
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
  ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
});

export const titleRightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const matchType = style({
  color: tokens.color.text.body,
  ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
});

export const resultBadgeVariants = styleVariants({
  win: {
    background: tokens.color.surface.brand,
    color: tokens.color.badge.filled.text.brand,
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
  },
  lose: {
    background: tokens.color.surface.brand,
    color: tokens.color.action.bg.primary,
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
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
  ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
});

export const scoreMainContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '600px',
});

export const leftTeamArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '20px',
  flex: '1',
  minWidth: '0',
});

export const rightTeamArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '20px',
  flex: '1',
  minWidth: '0',
});

export const teamName = style({
  color: tokens.color.text.body,
  whiteSpace: 'nowrap',
  overflow: 'visible',
  ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
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

export const vsText = style({
  color: tokens.color.text.body,
  margin: '0 30.5px',
  flexShrink: 0,
  ...textStyle.heading.bold, // 타이포그래피 스타일 스프레드
});

export const cardBackgroundVariants = styleVariants({
  win: {
    backgroundColor: tokens.color.surface.brand,
  },
  lose: {
    backgroundColor: tokens.color.surface.muted,
  },
});
