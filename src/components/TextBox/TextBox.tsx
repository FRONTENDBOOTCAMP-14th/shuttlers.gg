import * as styles from '@/components/TextBox/TextBox.css';
import clsx from 'clsx';

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
      className={clsx(styles.root, className)}
      placeholder="내용 입력"
    />
  );
}
