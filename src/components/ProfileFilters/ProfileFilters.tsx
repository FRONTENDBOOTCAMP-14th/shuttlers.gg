'use client';

import { Badge } from '@/components/Badge/Badge';
import { useEffect, useId, useRef, useState } from 'react';
import * as styles from './ProfileFilters.css.ts';

type Option<T extends string> = { value: T; label: string };

function FilterBadge<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T | undefined;
  options: Option<T>[];
  onChange: (v: T | undefined) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!btnRef.current?.parentElement?.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const current = options.find((o) => o.value === value);
  const text = current ? `${label}: ${current.label}` : `${label} 전체`;

  const handleSelect = (v: T | undefined) => {
    onChange(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div className={styles.filterItem}>
      <button
        ref={btnRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
      >
        <Badge variant={current ? 'filled' : 'outline'} text={text} />
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} 선택`}
          className={styles.dropdown}
        >
          <li
            role="option"
            aria-selected={value === undefined}
            tabIndex={0}
            className={
              styles.option[value === undefined ? 'selected' : 'default']
            }
            onClick={() => handleSelect(undefined)}
          >
            전체
          </li>
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                tabIndex={0}
                className={styles.option[selected ? 'selected' : 'default']}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
