import clsx from 'clsx';
import { useState } from 'react';
import * as styles from './TextBox.css';

export type TextBoxProps = {
  className?: string;
};

export function TextBox({ className }: TextBoxProps) {
  const [text, setText] = useState<string>('');
  return (
    <textarea
      value={text}
      className={clsx(styles.TextBox, className)}
      onChange={(e) => setText(e.target.value)}
      placeholder="내용 입력"
    />
  );
}
