export type Profile = {
  email: string;
  name: string;
  gender: string;
  national_grade: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = Profile & { password: string };
