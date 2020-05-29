import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

export interface ToastT {
    message: string;
    type: string | null;
    visible: boolean;
    isActionVisible: boolean;
}

const initialToast: ToastT = {
    message: '',
    type: null,
    visible: false,
    isActionVisible: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function
export const SnackbarContext = createContext({ hide: () => {}, show: (args: any) => {}, toast: initialToast});

export const SnackbarProvider = ({ children }) => {
    const [toast, setToast] = useState(initialToast);
    const timeout = useRef<number>();

    const show = useCallback((args) => {
        setToast({ ...initialToast, visible: true, ...args });
    }, []);

    const hide = useCallback(() => {
        setToast({ ...toast, visible: false });
    }, [toast]);

    useEffect(() => {
        if (toast.visible) {
            timeout.current = setTimeout(hide, 2500);
            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [hide, toast]);

    return (
        <SnackbarContext.Provider
            value={{
                hide,
                show,
                toast,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    );
};
