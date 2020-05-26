import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, TouchableRipple } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';
import GestureRecognizer from 'react-native-swipe-gestures';

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
    selected: {
        flexDirection: 'row',
        color: Colors.red500,
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
            <TouchableRipple style={styles.ripple} onPress={onPress} onLongPress={onLongPress}>
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
