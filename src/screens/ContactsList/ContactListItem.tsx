import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, TouchableRipple } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';
import GestureRecognizer from 'react-native-swipe-gestures';
import { colors, fonts, margin } from '../../styles/common';

interface Props {
    item: Contact;
    onClick: (contact: Contact) => void;
    onLongPress: () => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    isSelected: boolean;
}

const styles = StyleSheet.create({
    ripple: {},
    unselected: {
        flexDirection: 'row',
        padding: 0,
        margin: margin.sm,
        marginLeft: margin.md,
        marginRight: margin.md,
    },
    text: {
        marginLeft: margin.md,
        height: '100%',
        fontSize: fonts.md,
        textAlignVertical: 'center',
    },
    selected: {
        flexDirection: 'row',
        backgroundColor: Colors.grey500,
        borderRadius: 20,
        padding: margin.sm / 2,
        paddingLeft: margin.md / 2,
        paddingRight: margin.md / 2,
        margin: margin.sm / 2,
        marginLeft: margin.md / 2,
        marginRight: margin.md / 2,
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl } = props.item;
    const { onClick, onLongPress, onSwipeLeft, onSwipeRight, isSelected } = props;

    const onPress = (): void => onClick(props.item);

    return (
        <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
            <TouchableRipple
                style={styles.ripple}
                onPress={onPress}
                onLongPress={onLongPress}
                rippleColor={colors.secondaryDark}
            >
                <View style={[isSelected ? styles.selected : styles.unselected]}>
                    <ProperAvatar path={photoUrl} firstName={firstName} lastName={lastName} size={40} />
                    <Text style={styles.text}>
                        {firstName} {lastName}
                    </Text>
                </View>
            </TouchableRipple>
        </GestureRecognizer>
    );
};

export default ContactListItem;
