import clsx from 'clsx';
import * as style from './TextBox.css.js';

export type TextBoxProps = {
  text: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function TextBox({ text, onChange, className }: TextBoxProps) {
  return (
    <textarea
      value={text}
      onChange={(e) => onChange?.(e.target.value)}
      className={clsx(style.root, className)}
      placeholder="내용 입력"
    />
  );
}
