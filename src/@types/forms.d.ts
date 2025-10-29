export type Profile = {
  email: string;
  name: string;
  gender: 'male' | 'female';
  national_grade: '초심' | 'D' | 'C' | 'B' | 'A';
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = Profile & {
  password: string;
  password_check: string;
};
