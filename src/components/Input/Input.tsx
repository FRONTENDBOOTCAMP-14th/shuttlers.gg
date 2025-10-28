'use client';

import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { forwardRef, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as styles from './Input.css';

type InputProps = {
  name: string;
  type?: 'text' | 'email' | 'password' | 'search';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  onSearchClick?: () => void;
  register?: UseFormRegisterReturn;
  variant?: 'primary' | 'secondary';
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name = '',
    type = 'text',
    label,
    placeholder = 'placeholder',
    value,
    onChange,
    error = false,
    disabled = false,
    onSearchClick,
    register,
    variant = 'primary',
    onKeyDown,
  },
  ref
) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const handleTogglePassword = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const wasKeyboardActivated = e.type === 'keydown' || e.detail === 0;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (wasKeyboardActivated && iconButtonRef.current) {
        iconButtonRef.current.focus();
      } else if (ref && typeof ref !== 'function' && ref?.current) {
        ref.current.focus();
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
      if (ref && typeof ref !== 'function' && ref?.current) {
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        });
        ref.current.dispatchEvent(enterEvent);
      }
    }

    setTimeout(() => {
      if (wasKeyboardActivated && searchButtonRef.current) {
        searchButtonRef.current.focus();
      } else if (ref && typeof ref !== 'function' && ref?.current) {
        ref.current.focus();
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
    <div className={styles.inputField}>
      {label && <label htmlFor={name}>{label}</label>}

      <div
        className={clsx(styles.inputWrapper)}
        data-error={error}
        data-input-focused={isInputFocused}
        data-variant={variant}
      >
        <input
          id={name}
          className={clsx(
            type === 'search'
              ? variant === 'secondary'
                ? styles.inputSecondary
                : styles.input
              : styles.input
          )}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          placeholder={placeholder}
          value={register ? undefined : value}
          onFocus={() => setIsInputFocused(true)}
          aria-invalid={error}
          disabled={disabled}
          onKeyDown={onKeyDown}
          {...(register ?? {
            ref,
            name,
            onChange,
            onBlur: () => setIsInputFocused(false),
          })}
        />

        {type === 'password' && (
          <button
            ref={iconButtonRef}
            type="button"
            className={styles.iconButton}
            onClick={handleTogglePassword}
            onFocus={() => setIsInputFocused(false)}
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
            type="button"
            className={styles.searchIcon}
            onClick={handleSearchClick}
            onFocus={() => setIsInputFocused(false)}
            onKeyDown={(e) => handleKeyDown(e, handleSearchClick)}
            onMouseDown={handleMouseDown}
            aria-label="검색"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <MagnifyingGlassIcon style={{ width: 20, height: 20 }} />
          </button>
        )}
      </div>
    </div>
  );
});

export default Input;
