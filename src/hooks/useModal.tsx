import { useState } from 'react';

/**
 * 모달 열림/닫힘 상태를 제어하는 커스텀 훅입니다.
 *
 * @example
 * // 기본 사용법
 * const modal = useModal();
 * // 열기
 * modal.open();
 * // 닫기
 * modal.close();
 * // 상태값
 * modal.isOpen // true | false
 *
 * @param {boolean} [initialState=false] - 모달 열림 상태
 * @returns {{
 *   isOpen: boolean;
 *   open: () => void;
 *   close: () => void;
 * }}
 */
export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}
