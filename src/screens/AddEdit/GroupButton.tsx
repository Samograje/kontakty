import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { colors, fonts, margin, padding, radius } from '../../styles/common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryDark,
        marginBottom: margin.sm,
        borderRadius: radius.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: padding.sm,
        paddingBottom: padding.sm,
        paddingRight: padding.sm,
    },
    text: {
        width: '80%',
        alignSelf: 'center',
        fontSize: fonts.md,
        paddingLeft: padding.sm,
    },
});

interface Props {
    onGroups: (id: number | null) => void;
    groups: Group[];
    userGroups: number[];
    id: number | null;
}

const GroupButton = (props: Props): JSX.Element => {
    const { onGroups, groups, id } = props;
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
