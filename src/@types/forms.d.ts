export type Profile = {
  email: string;
  name: string;
  gender: 'male' | 'female';
  national_grade: '초심' | 'D' | 'C' | 'B' | 'A';
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = Profile & { password: string };

