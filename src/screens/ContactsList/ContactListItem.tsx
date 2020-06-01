import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, TouchableRipple } from 'react-native-paper';
import ProperAvatar from '../ProperAvatar';
import { colors, fonts, margin } from '../../styles/common';

interface Props {
    firstName: string;
    lastName: string;
    photoUrl: string;
    onPress: () => void;
    onLongPress: () => void;
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
    text: {
        marginLeft: margin.md,
        height: '100%',
        fontSize: fonts.md,
        textAlignVertical: 'center',
    },
});

const ContactListItem = (props: Props): ReactElement => {
    const { firstName, lastName, photoUrl, onPress, onLongPress, isSelected } = props;

    return (
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
    );
};

export default ContactListItem;
