import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { TouchableRipple } from 'react-native-paper';

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
        justifyContent: 'center',
        height: 60,
        marginBottom: 10,
    },
    text: {
        paddingHorizontal: 20,
        fontSize: 20,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
});

const GroupsList = (props: Props): JSX.Element => {
    const { groups, onPress } = props;

    const listElement = (row: Group, index: number): JSX.Element => (
        <TouchableRipple style={styles.listElementContainer} key={index} onPress={onPress}>
            <View style={styles.row}>
                <Text style={styles.text}>{row.name + ' (' + row.contactsIds.length + ')'}</Text>
                <MaterialCommunityIcons size={30} name={'greater-than'} />
            </View>
        </TouchableRipple>
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
