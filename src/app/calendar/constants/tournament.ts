import { StatusCode } from '../types/tournament';

export const UPCOMING_DAYS_BEFORE = 7;

export const STATUS_LABELS: Record<StatusCode, string> = {
  receiving: '접수중',
  upcoming: '접수예정',
  ongoing: '진행 중',
  closed: '종료',
};
