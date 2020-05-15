import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
});

const ContactsListEmptyBanner = (): ReactElement => {
    return <Text style={styles.container}>No contacts to display</Text>;
};

export default ContactsListEmptyBanner;
