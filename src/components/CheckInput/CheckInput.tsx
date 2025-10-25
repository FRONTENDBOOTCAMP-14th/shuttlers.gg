'use client';

import { Status } from '@/@types/global';
import Button from '@/components/Button/Button';
import { HTMLInputTypeAttribute, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as styles from './CheckInput.css';

type CheckInputProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  status?: Status;
  buttonAction?: () => void;
};

export default function CheckInput({
  name = '',
  type = 'text',
  label,
  placeholder,
  value,
  register,
  status = 'idle',
  buttonAction,
}: CheckInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonText =
    status === 'idle'
      ? '인증 요청'
      : status === 'pending'
        ? '재인증'
        : '인증 완료';

  return (
    <div className={styles.inputField}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={styles.checkInput}>
        <div className={styles.inputWrapper}>
          <input
            id={name}
            name={name}
            ref={register ? undefined : inputRef}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={register ? undefined : value}
            disabled={status === 'resolved'}
            {...((register as any) ?? {})}
          />
        </div>
        <Button
          text={buttonText}
          variant="secondary"
          disabled={status === 'resolved'}
          size="long"
          onClick={buttonAction}
        />
      </div>
    </div>
  );
}
