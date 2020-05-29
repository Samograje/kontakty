import React, { useContext } from 'react';
import { SnackbarContext } from './ToastContent';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { colors } from '../styles/common';

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        backgroundColor: colors.primaryDark,
        bottom: 0,
    },
});

export const SnackbarCustom = (): JSX.Element => {
    const { toast, hide } = useContext(SnackbarContext);

    return toast.isActionVisible ? (
        <Snackbar
            visible={toast.visible}
            style={styles.snackbar}
            onDismiss={(): void => hide()}
            theme={{ colors: { accent: colors.textWhite } }}
            action={{
                label: 'Undo',
                onPress: (): void => console.log('UNDO'),
            }}
        >
            {toast.message}
        </Snackbar>
    ) : (
        <Snackbar
            visible={toast.visible}
            style={styles.snackbar}
            onDismiss={(): void => hide()}
            theme={{ colors: { accent: colors.textWhite } }}
        >
            {toast.message}
        </Snackbar>
    );
};

export default SnackbarCustom;
