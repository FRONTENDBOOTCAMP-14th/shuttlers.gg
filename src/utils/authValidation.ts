export const emailRules = {
  required: '이메일을 입력해주세요.',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '이메일이 유효하지 않습니다.',
  },
};

export const passwordRules = {
  required: '비밀번호를 입력해주세요.',
  minLength: {
    value: 8,
    message: '비밀번호는 8자 이상 12자 이하로 입력해주세요.',
  },
  maxLength: {
    value: 12,
    message: '비밀번호는 8자 이상 12자 이하로 입력해주세요.',
  },
};

export const passwordCheck = (pw: string, pwChk: string) => ({
  validate: (value: string) => pw === pwChk || '비밀번호가 일치하지 않습니다.',
});

export const nameRules = {
  required: '이름을 입력해주세요.',
  minLength: {
    value: 2,
    message: '이름은 2자 이상 입력해주세요.',
  },
};
