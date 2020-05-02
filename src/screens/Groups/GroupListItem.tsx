import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';

interface Props {
    item: {
        id: string,
        name: string,
        contactsIds: [],
        isChecked: boolean,
    },
}

const GroupListItem = (props: Props) => {
    const {item} = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                }}
                style={styles.rowContainer}
            >
                <RadioButton value={item.id} status={item.isChecked ? 'checked' : 'unchecked'}/>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default GroupListItem;
