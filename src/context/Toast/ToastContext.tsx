/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useCallback } from 'react';

const initialToast = {
  message: '',
  type: null,
  visible: false,
};
type ContextType = {
  hide?: () => void;
  show?: (args: { message: string | undefined }) => void;
  toast?: { message: string; type: null; visible: boolean };
};
export const ToastContext = createContext<ContextType>({
  hide: () => {},
  show: () => {},
  toast: initialToast,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState(initialToast);

  const show = useCallback(args => {
    setToast({ ...initialToast, visible: true, ...args });
  }, []);

  const hide = useCallback(() => {
    setToast({ ...toast, visible: false });
  }, [toast]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (toast.visible) {
      const timeout = setTimeout(hide, 1500);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
