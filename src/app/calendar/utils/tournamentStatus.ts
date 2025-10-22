import { STATUS_LABELS, UPCOMING_DAYS_BEFORE } from '../constants/tournament';
import { TournamentStatus } from '../types/tournament.ts';
import {
  addDays,
  endOfDay,
  parseApplicationDateRange,
  parseDate,
} from './dateUtils.ts';

export function getTournamentStatus(
  startDate: string,
  endDate: string,
  applyPeriod: string | null | undefined
): TournamentStatus {
  const today = new Date();

  const eventStart = parseDate(startDate);
  const eventEnd = parseDate(endDate);

  if (!eventStart || !eventEnd) {
    return { code: 'closed', label: STATUS_LABELS.closed };
  }

  const eventEndOfDay = endOfDay(eventEnd);

  const [applyStart, applyEndRaw] = parseApplicationDateRange(applyPeriod);
  const applyEnd = applyEndRaw ? endOfDay(applyEndRaw) : null;

  if (today > eventEndOfDay) {
    return { code: 'closed', label: STATUS_LABELS.closed };
  }

  if (applyStart && applyEnd) {
    const upcomingFrom = addDays(applyStart, -UPCOMING_DAYS_BEFORE);

    if (today >= upcomingFrom && today < applyStart) {
      return { code: 'upcoming', label: STATUS_LABELS.upcoming };
    }

    if (today >= applyStart && today <= applyEnd) {
      return { code: 'receiving', label: STATUS_LABELS.receiving };
    }

    if (today > applyEnd && today <= eventEndOfDay) {
      return { code: 'ongoing', label: STATUS_LABELS.ongoing };
    }
  }

  if (today <= eventEndOfDay) {
    return { code: 'ongoing', label: STATUS_LABELS.ongoing };
  }

  return { code: 'closed', label: STATUS_LABELS.closed };
}
