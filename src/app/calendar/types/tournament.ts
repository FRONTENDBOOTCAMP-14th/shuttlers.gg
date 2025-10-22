export type StatusCode = 'receiving' | 'upcoming' | 'ongoing' | 'closed';

export interface TournamentStatus {
  code: StatusCode;
  label: string;
}

export interface Tournament {
  tnmt_id: string;
  title: string;
  start_date: string;
  end_date: string;
  apply_period?: string | null;
  region?: string | null;
}
