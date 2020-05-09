import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    touchableOpacity: {
        backgroundColor: 'blue',
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    arrowContainer: {
        backgroundColor: 'red',
        padding: 0,
        margin: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        backgroundColor: 'yellow',
    },
    icon: {
        alignSelf: 'flex-end',
        backgroundColor: 'green',
    },
});

interface Props {
    onGroups: (id: number) => void;
    groups: Group[];
}

const GroupButton = (props: Props): JSX.Element => {
    const { onGroups, groups } = props;
    let groupString = '';
    groups.map((row, index) => {
        if (index === groups.length - 1) {
            groupString += row.name;
        } else {
            groupString += row.name + ', ';
        }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={(): void => onGroups(4)} style={styles.touchableOpacity}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{groupString}</Text>
                    </View>
                    <MaterialCommunityIcons size={50} name={'greater-than'} style={styles.icon} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GroupButton;
