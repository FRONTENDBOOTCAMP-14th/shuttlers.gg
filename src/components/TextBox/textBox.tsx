'use client';

import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import * as styles from './TextBox.css';

export type TextBoxProps = {
  placeholder?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  autoResize?: boolean;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  style?: CSSProperties;
};

export function TextBox({
  placeholder = '내용 입력',
  value,
  maxLength = 500,
  onChange,
  autoResize = true,
  disabled = false,
  minHeight = 120,
  maxHeight,
  className,
  style,
}: TextBoxProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string>(value ?? '');
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isControlled) setInner(value as string);
  }, [isControlled, value]);

  useEffect(() => {
    if (!autoResize || !ref.current) return;
    const el = ref.current;
    el.style.height = 'auto';
    const contentHeight = el.scrollHeight;
    const lower = Math.max(minHeight, 0);
    const upper =
      typeof maxHeight === 'number' && maxHeight > 0
        ? maxHeight
        : Number.POSITIVE_INFINITY;
    const next = Math.min(Math.max(contentHeight, lower), upper);
    el.style.height = `${next}px`;
    el.style.overflowY = contentHeight > upper ? 'auto' : 'hidden';
  }, [autoResize, inner, minHeight, maxHeight]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInner(e.target.value);
    onChange?.(e);
  };

  return (
    <textarea
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      value={isControlled ? value : inner}
      onChange={handleChange}
      className={[styles.textBox, className].filter(Boolean).join(' ')}
      style={{ minHeight, ...style }}
      aria-disabled={disabled || undefined}
      spellCheck={false}
      rows={1}
    />
  );
}
