import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { DataWithIsChecked } from '../index';
import { colors, fonts, margin, padding } from '../../../styles/common';

interface Props {
    onGroupPress: (groupId: number, isIncluded: boolean) => void;
    onLongGroupPress: (groupId: number, groupName: string) => void;
    item: DataWithIsChecked;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: margin.sm,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: padding.sm,
        margin: margin.sm,
        height: 25,
        alignItems: 'center',
    },
    text: {
        marginLeft: margin.sm,
        fontSize: fonts.md,
    },
});

const GroupListItem = (props: Props) => {
    const { item, onGroupPress, onLongGroupPress } = props;

    return (
        <View style={styles.container}>
            <TouchableRipple
                onPress={(): void => {
                    onGroupPress(item.id, item.isChecked);
                }}
                onLongPress={(): void => {
                    onLongGroupPress(item.id, item.name);
                }}
                rippleColor={colors.secondaryDark}
            >
                <View style={styles.rowContainer}>
                    <RadioButton
                        value={item.id.toString()}
                        status={item.isChecked ? 'checked' : 'unchecked'}
                        color={colors.primaryDark}
                        uncheckedColor={colors.primaryDark}
                        onPress={(): void => {
                            onGroupPress(item.id, item.isChecked);
                        }}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            </TouchableRipple>
        </View>
    );
};

export default GroupListItem;
