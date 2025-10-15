import { ReactNode } from 'react';
import * as styles from './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'dark';

type ButtonProps = {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: ButtonVariant;
  size?: 'short' | 'long';
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  type = 'button',
  icon = undefined,
  iconPosition,
  variant,
  size,
  rounded,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={icon && !text ? '버튼' : undefined}
      className={styles.button({ variant, size, rounded, disabled })}
    >
      <div className={styles.buttonContent({ icon: !!icon, iconPosition })}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        {text && <span>{text}</span>}
      </div>
    </button>
  );
}
