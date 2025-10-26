export const STATUS_LABELS = {
  receiving: '접수중',
  upcoming: '접수예정',
  ongoing: '진행 중',
  closed: '종료',
} as const;

export type StatusCode = keyof typeof STATUS_LABELS;

export type StatusLabel = (typeof STATUS_LABELS)[StatusCode];

export type TournamentStatus = {
  code: StatusCode;
  label: StatusLabel;
};
