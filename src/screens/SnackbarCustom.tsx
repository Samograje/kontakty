import React, { useContext } from 'react';
import { SnackbarContext } from './SnackbarContent';
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

    return (
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
