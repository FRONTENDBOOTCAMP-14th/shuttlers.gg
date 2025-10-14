'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { FocusTrap } from 'focus-trap-react';
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [trapActive, setTrapActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!mounted || !dialog) return;

    if (visible) {
      dialog.showModal();
    } else {
      setTimeout(() => dialog.close(), 200);
    }
  }, [mounted, visible]);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setTrapActive(true), 0);
      return () => clearTimeout(t);
    } else {
      setTrapActive(false);
    }
  }, [visible]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <FocusTrap active={trapActive}>
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
              <Button
                text={cancelText}
                variant="dark"
                size="long"
                onClick={onCancel}
              />
            )}
            <Button
              text={confirmText}
              variant="primary"
              size="long"
              onClick={onConfirm}
            />
          </div>
        </section>
      </dialog>
    </FocusTrap>,
    modalRoot
  );
}
