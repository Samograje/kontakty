import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts, margin } from '../../styles/common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: margin.md,
        fontSize: fonts.md,
        textAlign: 'center',
    },
});

const ContactsListEmptyBanner = (): ReactElement => {
    return <Text style={styles.container}>No contacts to display</Text>;
};

export default ContactsListEmptyBanner;
