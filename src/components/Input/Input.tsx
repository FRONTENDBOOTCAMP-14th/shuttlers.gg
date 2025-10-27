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
  type?:
    | 'text'
    | 'search'
    | 'email'
    | 'password'
    | 'calendar'
    | 'time'
    | 'date';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  onSearchClick?: () => void;
  onCalendarClick?: () => void; // date picker 오픈
  onTimeClick?: () => void; // time picker 오픈
  register?: UseFormRegisterReturn;
  variant?: 'primary' | 'secondary';
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  inputMode?: string;
  readOnly?: boolean;
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
    onCalendarClick,
    onTimeClick,
    register,
    variant = 'primary',
    onKeyDown,
    required,
    inputMode,
    readOnly,
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

  let inputType = type;
  if (type === 'password') {
    inputType = showPassword ? 'text' : 'password';
  } else if (type === 'calendar') {
    inputType = 'text';
  }

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
          name={name}
          ref={register ? undefined : ref}
          className={clsx(
            type === 'search'
              ? variant === 'secondary'
                ? styles.inputSecondary
                : styles.input
              : styles.input
          )}
          type={
            type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : type === 'calendar'
                ? 'text'
                : type
          }
          placeholder={placeholder}
          value={register ? undefined : value}
          onChange={register ? undefined : onChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          aria-invalid={error}
          disabled={disabled}
          onKeyDown={onKeyDown}
          required={required}
          inputMode={inputMode}
          readOnly={readOnly}
          {...((register as any) ?? {})}
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
            onClick={onSearchClick}
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

        {type === 'time' && (
          <button
            type="button"
            onClick={onTimeClick}
            onFocus={() => setIsInputFocused(false)}
            aria-label="시간 선택"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          ></button>
        )}
      </div>
    </div>
  );
});

export default Input;
