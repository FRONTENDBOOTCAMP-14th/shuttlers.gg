'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (visible) {
      dialog.showModal();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dialog.classList.add('modal-open');
        });
      });
    } else {
      setTimeout(() => dialog.close(), 200);
    }
  }, [mounted, visible]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal({ visible })}
      onCancel={onCancel}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <button
        className={styles.closeModal}
        onClick={onCancel}
        aria-label="모달창 닫기"
      >
        <XMarkIcon width={24} />
      </button>

      <section className={styles.modalContent}>
        <h2 id="modal-title">{title}</h2>
        <div>{children}</div>

        <div className={styles.modalButtons({ variant })}>
          {variant === 'confirm' && (
            <Button text={cancelText} variant="dark" onClick={onCancel} />
          )}
          <Button text={confirmText} variant="primary" onClick={onConfirm} />
        </div>
      </section>
    </dialog>,
    modalRoot
  );
}
