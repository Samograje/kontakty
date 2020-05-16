import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';

interface Props {
    item: Contact;
    onClick: (contact: Contact) => void;
}

const styles = StyleSheet.create({
    ripple: {
        padding: 10,
        paddingLeft: 20,
    },
    container: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 20,
        height: '100%',
        fontSize: 20,
        textAlignVertical: 'center',
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl } = props.item;

    const onPress = (): void => props.onClick(props.item);

    return (
        <TouchableRipple style={styles.ripple} onPress={onPress}>
            <View style={styles.container}>
                <ProperAvatar path={photoUrl} firstName={firstName} lastName={lastName} size={40} />
                <Text style={styles.text}>
                    {firstName} {lastName}
                </Text>
            </View>
        </TouchableRipple>
    );
};

export default ContactListItem;
