import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

export interface ToastT {
    message: string;
    visible: boolean;
}

const initialToast: ToastT = {
    message: '',
    visible: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function
export const SnackbarContext = createContext({ hide: () => {}, show: (args: any) => {}, snackbar: initialToast });

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState(initialToast);
    const timeout = useRef<number>();

    const show = useCallback((args) => {
        setSnackbar({ ...initialToast, visible: true, ...args });
    }, []);

    const hide = useCallback(() => {
        setSnackbar({ ...snackbar, visible: false });
    }, [snackbar]);

    useEffect(() => {
        if (snackbar.visible) {
            timeout.current = setTimeout(hide, 2500);
            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [hide, snackbar]);

    return (
        <SnackbarContext.Provider
            value={{
                hide,
                show,
                snackbar,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    );
};
