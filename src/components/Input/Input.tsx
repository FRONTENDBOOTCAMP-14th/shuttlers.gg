'use client';

import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import * as styles from './Input.css';

type InputProps = {
  name: string;
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  onSearchClick?: () => void;
};

export default function Input({
  name = '',
  type = 'text',
  placeholder = 'placeholder',
  value,
  onChange,
  error = false,
  disabled = false,
  onSearchClick,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const handleTogglePassword = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const currentCursorPosition = inputRef.current?.selectionStart || 0;
    const wasKeyboardActivated = e.type === 'keydown' || e.detail === 0;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (wasKeyboardActivated && iconButtonRef.current) {
        iconButtonRef.current.focus();
      } else if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(
          currentCursorPosition,
          currentCursorPosition
        );
      }
    }, 0);
  };

  const handleSearchClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const wasKeyboardActivated = e.type === 'keydown' || e.detail === 0;

    if (onSearchClick) {
      onSearchClick();
    } else {
      if (inputRef.current) {
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        });
        inputRef.current.dispatchEvent(enterEvent);
      }
    }

    setTimeout(() => {
      if (wasKeyboardActivated && searchButtonRef.current) {
        searchButtonRef.current.focus();
      } else if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    callback: (e: React.KeyboardEvent<HTMLButtonElement>) => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  };

  return (
    <div className={styles.inputWrapper} data-error={error}>
      <input
        id={name}
        name={name}
        ref={inputRef}
        className={styles.input}
        type={getInputType()}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error}
        disabled={disabled}
      />

      {type === 'password' && (
        <button
          ref={iconButtonRef}
          type="button"
          className={styles.iconButton}
          onClick={handleTogglePassword}
          onKeyDown={(e) => handleKeyDown(e, handleTogglePassword)}
          onMouseDown={handleMouseDown}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
        >
          {showPassword ? (
            <EyeSlashIcon style={{ width: '24px', height: '24px' }} />
          ) : (
            <EyeIcon style={{ width: '24px', height: '24px' }} />
          )}
        </button>
      )}

      {type === 'search' && (
        <button
          ref={searchButtonRef}
          type="button"
          className={styles.searchIcon}
          onClick={handleSearchClick}
          onKeyDown={(e) => handleKeyDown(e, handleSearchClick)}
          onMouseDown={handleMouseDown}
          aria-label="검색"
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
        >
          <MagnifyingGlassIcon style={{ width: '20px', height: '20px' }} />
        </button>
      )}
    </div>
  );
}
