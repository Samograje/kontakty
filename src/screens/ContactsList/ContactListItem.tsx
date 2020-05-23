import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';
import { colors, fonts, margin, padding } from '../../styles/common';

interface Props {
    item: Contact;
    onClick: (contact: Contact) => void;
}

const styles = StyleSheet.create({
    ripple: {
        padding: padding.sm,
        paddingLeft: padding.md,
    },
    container: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: margin.md,
        height: '100%',
        fontSize: fonts.md,
        textAlignVertical: 'center',
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl } = props.item;

    const onPress = (): void => props.onClick(props.item);

    return (
        <TouchableRipple style={styles.ripple} onPress={onPress} rippleColor={colors.secondaryDark}>
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
