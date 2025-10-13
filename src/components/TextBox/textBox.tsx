import clsx from 'clsx';
import React from 'react';
import * as style from './textBox.css.js';

export type TextBoxProps = {
  text: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const TextBox: React.FC<TextBoxProps> = ({
  text,
  onChange,
  className,
}) => {
  return (
    <textarea
      value={text}
      onChange={(e) => onChange?.(e.target.value)}
      className={clsx(style.root, className)}
      placeholder="내용 입력"
    />
  );
};
