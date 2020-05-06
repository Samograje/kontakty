import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 2,
        fontSize: 16,
        textAlign: 'center',
    },
});

const ContactsListEmptyBanner = (): ReactElement => {
    return <Text style={styles.container}>No contacts to display</Text>;
};

export default ContactsListEmptyBanner;
