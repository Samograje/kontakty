import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#dcedc8',
        marginBottom: 10,
    },
    touchableOpacity: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        width: '80%',
        alignSelf: 'center',
        fontSize: 15,
    },
});

interface Props {
    onGroups: (id: number) => void;
    groups: Group[];
}

const GroupButton = (props: Props): JSX.Element => {
    const { onGroups, groups } = props;
    let groupString = '';
    if(groups.length === 0) {
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
            <TouchableOpacity onPress={(): void => onGroups(4)} style={styles.touchableOpacity}>
                <View style={styles.row}>
                    <Text style={styles.text}>{groupString}</Text>
                    <MaterialCommunityIcons size={50} name={'greater-than'} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GroupButton;
