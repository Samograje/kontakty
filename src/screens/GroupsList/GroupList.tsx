import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

interface Props {
    groups: Group[];
    onPress: () => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
    listElementContainer: {
        backgroundColor: '#dcedc8',
        justifyContent: 'center',
        height: 60,
        marginBottom: 5,
    },
    text: {
        paddingHorizontal: 20,
        fontSize: 20,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const GroupsList = (props: Props): JSX.Element => {
    const { groups, onPress } = props;

    const listElement = (row: Group, index: number): JSX.Element => (
        <TouchableOpacity style={styles.listElementContainer} key={index} onPress={onPress}>
            <View style={styles.row}>
                <Text style={styles.text}>{row.name + ' (' + row.contactsIds.length + ')'}</Text>
                <MaterialCommunityIcons size={50} name={'greater-than'} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {groups.map(
                (row, index): JSX.Element => {
                    return listElement(row, index);
                },
            )}
        </View>
    );
};

export default GroupsList;
