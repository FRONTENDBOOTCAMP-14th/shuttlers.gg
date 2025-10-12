import { ReactNode } from 'react';
import * as styles from './Button.css';

type ButtonProps = {
  text: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'short' | 'long';
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text = '버튼',
  icon,
  type = 'button',
  variant = 'primary',
  size = 'short',
  rounded = false,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button({ variant, size, rounded, disabled })}
    >
      <div>{text}</div>
    </button>
  );
}
