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
        flex: 1,
        padding: 10,
        paddingLeft: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        marginLeft: 20,
        height: '100%',
        fontSize: 20,
        textAlignVertical: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl } = props.item;

    const onPress = (): void => props.onClick(props.item);

    return (
        <TouchableRipple style={styles.ripple} onPress={onPress}>
            <View style={styles.container}>
                <ProperAvatar path={photoUrl} name={firstName} size={40} />
                {/*<Image source={{ uri: photoUrl }} style={styles.avatar} />*/}
                <Text style={styles.text}>
                    {firstName} {lastName}
                </Text>
            </View>
        </TouchableRipple>
    );
};

export default ContactListItem;
