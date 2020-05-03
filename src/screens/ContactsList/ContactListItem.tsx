import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface Props {
    item: Contact;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        margin: 10,
        marginLeft: 20,
    },
});

const ContactListItem = (props: Props): Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, photoUrl } = props.item;

    return (
        <Text style={styles.container}>
            {firstName} {lastName}
        </Text>
    );
};

export default ContactListItem;
