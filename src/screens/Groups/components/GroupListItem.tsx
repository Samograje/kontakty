import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { DataWithIsChecked } from '../index';

interface Props {
    onGroupPress: (groupId: number, isIncluded: boolean) => void;
    onLongGroupPress: (groupId: number, groupName: string) => void;
    item: DataWithIsChecked;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 5,
        margin: 10,
        height: 20,
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
        fontSize: 18,
    },
});

const GroupListItem = (props: Props) => {
    const { item, onGroupPress, onLongGroupPress } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={(): void => {
                    onGroupPress(item.id, item.isChecked);
                }}
                onLongPress={(): void => {
                    onLongGroupPress(item.id, item.name);
                }}
                style={styles.rowContainer}
            >
                <RadioButton
                    value={item.id.toString()}
                    status={item.isChecked ? 'checked' : 'unchecked'}
                    color={'#0d8b0c'}
                    onPress={(): void => {
                        onGroupPress(item.id, item.isChecked);
                    }}
                />
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GroupListItem;
