import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#dcedc8',
        marginBottom: 10,
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
    },
    text: {
        width: '80%',
        alignSelf: 'center',
        fontSize: 15,
        paddingLeft: 15,
    },
});

interface Props {
    onGroups: (id: number | null) => void;
    groups: Group[];
    userGroups: Group[];
    id: number | null;
}

const GroupButton = (props: Props): JSX.Element => {
    const { onGroups, groups, userGroups, id } = props;
    console.log(userGroups);
    let groupString = '';
    if (groups.length === 0) {
        groupString = 'Click to add contact to groups!';
    } else {
        groups.map((row, index) => {
            if (index === groups.length - 1) {
                groupString += row.name;
            } else {
                groupString += row.name + ', ';
            }
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={(): void => onGroups(id)}>
                <View style={styles.row}>
                    <Text style={styles.text}>{groupString}</Text>
                    <MaterialCommunityIcons size={30} name={'greater-than'} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GroupButton;
