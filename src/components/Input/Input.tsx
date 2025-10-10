// src/components/Input/Input.tsx
import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import * as styles from './Input.css';

interface InputProps {
  type?: 'text' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = 'placeholder',
  value,
  onChange,
  error = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const toggleShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className={styles.inputWrapper}>
      <input
        type={inputType}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error}
        spellCheck={false}
      />
      {/* password 타입 눈 아이콘 */}
      {type === 'password' && (
        <button
          type="button"
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          className={styles.iconButton}
          onClick={toggleShowPassword}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      )}
      {/* search 타입 돋보기 아이콘 */}
      {type === 'search' && (
        <div className={styles.icon}>
          <MagnifyingGlassIcon />
        </div>
      )}
    </div>
  );
};

export default Input;
