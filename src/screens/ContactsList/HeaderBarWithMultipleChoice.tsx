import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, padding } from '../../styles/common';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    elementsCount: number;
    onClearSelection: () => void;
    onDeleteContacts: () => void;
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: colors.primaryDark,
        padding: 5,
        paddingHorizontal: padding.md,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        paddingHorizontal: padding.md,
        textAlignVertical: 'center',
        fontSize: fonts.md,
    },
});

const HeaderBarWithMultipleChoice = (props: Props): ReactElement => {
    const { elementsCount, onClearSelection, onDeleteContacts } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onClearSelection}>
                <Icon name='md-close' size={25} />
            </TouchableOpacity>
            <Text style={styles.text}>{elementsCount} item(s) selected</Text>
            <TouchableOpacity style={styles.button} onPress={onDeleteContacts}>
                <Icon name='md-trash' size={25} />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderBarWithMultipleChoice;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
