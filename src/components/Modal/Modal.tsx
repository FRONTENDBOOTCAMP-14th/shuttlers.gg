import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import * as styles from './Modal.css';

type ModalProps = {
  title: string;
  children: ReactNode;
  variant?: 'alert' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  visible: boolean;
};

export default function Modal({
  title = '제목',
  children,
  variant = 'alert',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  visible = false,
}: ModalProps) {
  return (
    <dialog className={styles.modal({ variant, visible })} open>
      <button className={styles.closeModal}>
        <XMarkIcon width={24} />
      </button>
      <section className={styles.modalContent}>
        <h2>{title}</h2>
        <div>{children}</div>
      </section>
      <div className={styles.modalButtons({ variant })}>
        {variant === 'confirm' && (
          <Button text={cancelText} variant="dark" onClick={onCancel} />
        )}
        <Button text={confirmText} variant="primary" onClick={onConfirm} />
      </div>
    </dialog>
  );
}
