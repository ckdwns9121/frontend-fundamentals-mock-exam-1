import { Toast } from 'tosslib';
import { createRoot } from 'react-dom/client';
import React from 'react';

/**
 * 토스트 메시지를 표시하는 함수
 * @param message 표시할 메시지
 * @param type 토스트 타입 ('success' | 'warn')
 */
export function showToast(message: string, type: 'success' | 'warn' = 'warn') {
  // 토스트를 표시할 컨테이너 생성
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  let isOpen = true;

  const close = () => {
    isOpen = false;
    root.unmount();
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  };

  root.render(
    React.createElement(Toast, {
      isOpen: isOpen,
      close: close,
      message: message,
      type: type,
      delay: 3000,
    })
  );

  // 3초 후 자동으로 닫기
  setTimeout(() => {
    if (isOpen) {
      close();
    }
  }, 3000);
}
