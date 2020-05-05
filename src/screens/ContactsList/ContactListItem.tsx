import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';
import { TouchableRipple } from 'react-native-paper';

interface Props {
    item: Contact;
    onClick: (contact: Contact) => void,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingLeft: 20,
    },
    text: {
        fontSize: 20,
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const {
        firstName,
        lastName,
        photoUrl,
    } = props.item;

    const onPress = () => props.onClick(props.item);

    return (
        <TouchableRipple style={styles.container} onPress={onPress}>
            <Text style={styles.text}>
                {firstName} {lastName}
            </Text>
        </TouchableRipple>
    );
};

export default ContactListItem;
