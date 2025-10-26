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
  remainingTime?: number;
  buttonType?: 'send' | 'verify';
  buttonAction?: () => void;
};

const formatRemainingTime = (time: number) => {
  if (time <= 0) return '만료됨';

  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const sec = (time % 60).toString().padStart(2, '0');

  return `${min}:${sec}`;
};

export default function CheckInput({
  name = '',
  type = 'text',
  label,
  placeholder,
  value,
  register,
  status = 'idle',
  remainingTime = 300,
  buttonType = 'send',
  buttonAction,
}: CheckInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonText =
    buttonType === 'send'
      ? status === 'pending'
        ? formatRemainingTime(remainingTime)
        : status === 'resolved'
          ? '완료'
          : '인증 요청'
      : status === 'pending'
        ? '인증확인'
        : status === 'resolved'
          ? '완료'
          : '인증확인';

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
          variant={buttonType === 'send' ? 'secondary' : 'primary'}
          disabled={
            status === 'resolved' ||
            (buttonType === 'send' && status === 'pending')
          }
          size="long"
          onClick={buttonAction}
        />
      </div>
    </div>
  );
}
