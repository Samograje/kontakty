import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, TouchableRipple } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';
import GestureRecognizer from 'react-native-swipe-gestures';
import { colors, fonts, margin, padding } from '../../styles/common';

interface Props {
    item: Contact;
    onClick: (contact: Contact) => void;
    onLongPress: () => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    isSelected: boolean;
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
    selected: {
        flexDirection: 'row',
        backgroundColor: Colors.red300,
        borderRadius: 20,
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl } = props.item;

    const onPress = (): void => props.onClick(props.item);
    const onLongPress = (): void => props.onLongPress();
    const onSwipeLeft = (): void => props.onSwipeLeft();
    const onSwipeRight = (): void => props.onSwipeRight();
    const isSelected = props.isSelected;

    return (
        <GestureRecognizer onSwipeLeft={(): void => onSwipeLeft()} onSwipeRight={(): void => onSwipeRight()}>
            <TouchableRipple
                style={styles.ripple}
                onPress={onPress}
                onLongPress={onLongPress}
                rippleColor={colors.secondaryDark}
            >
                <View style={[isSelected ? styles.selected : styles.container]}>
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
