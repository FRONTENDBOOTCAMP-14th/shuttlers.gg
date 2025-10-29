import { tokens } from '@/styles/tokens.css';
import { textStyle } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const matchList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const matchCard = recipe({
  base: {
    padding: 24,
    borderRadius: 12,
    border: '1px solid transparent',
    transition: 'all 0.2s ease',
  },
  variants: {
    result: {
      win: {
        background: 'rgba(74, 144, 226, 0.05)',
        borderColor: 'rgba(74, 144, 226, 0.2)',
      },
      loss: {
        background: tokens.color.surface.muted,
        borderColor: 'transparent',
      },
    },
  },
});

export const matchHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 16,
  gap: 12,
  flexWrap: 'wrap',
});

export const matchTitle = style([
  textStyle.body.bold,
  {
    color: tokens.color.text.title,
    flex: 1,
  },
]);

export const matchDate = style([
  textStyle.caption.regular,
  {
    color: tokens.color.text.caption,
  },
]);

export const matchDetails = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
});

export const matchTeams = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flex: 1,
});

export const teamInfo = style([
  textStyle.body.semibold,
  {
    color: tokens.color.text.body,
    fontVariantNumeric: 'tabular-nums',
  },
]);

export const versus = style([
  textStyle.body.regular,
  {
    color: tokens.color.text.caption,
  },
]);

export const matchScore = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const roundInfo = style([
  textStyle.caption.regular,
  {
    color: tokens.color.text.caption,
  },
]);

export const scoreText = style([
  textStyle.heading.bold,
  {
    color: tokens.color.text.title,
    fontSize: 20,
    fontVariantNumeric: 'tabular-nums',
  },
]);

export const resultBadge = recipe({
  base: {
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  variants: {
    result: {
      win: {
        background: '#4A90E2',
        color: '#fff',
      },
      loss: {
        background: '#E74C3C',
        color: '#fff',
      },
    },
  },
});

export const emptyMessage = style([
  textStyle.body.regular,
  {
    textAlign: 'center',
    padding: '40px 0',
    color: tokens.color.text.caption,
  },
]);
