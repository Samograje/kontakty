import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    item: {
        id: string,
        name: string,
        contactsIds: [],
        isChecked: boolean,
    },
}

const GroupListItem = (props : Props) => {
    const { item } = props;

    return (
        <View style={styles.listItem}>

        </View>
);
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        marginBottom: 3,
        margin: 5
    },
});

export default GroupListItem;
