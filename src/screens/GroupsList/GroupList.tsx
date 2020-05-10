import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { TouchableRipple, FAB } from 'react-native-paper';
import EmptyListComponent from '../Groups/components/EmptyListComponent';
import AddGroupModal from '../Groups/components/AddGroupModal';

interface Props {
    groups: Group[];
    onPress: () => void;
    addGroup: (name: string) => void;
    onLongGroupPress: (groupId: number | null, groupName: string) => void;
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
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 35,
        zIndex: 200,
        backgroundColor: 'darkgreen',
    },
});

const GroupsList = (props: Props): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    const { groups, onPress, addGroup, onLongGroupPress } = props;

    const listElement = (row: Group, index: number): JSX.Element => (
        <TouchableRipple
            style={styles.listElementContainer}
            key={index}
            onPress={onPress}
            onLongPress={(): void => {
                onLongGroupPress(row.id, row.name);
            }}
        >
            <View style={styles.row}>
                <Text style={styles.text}>{row.name + ' (' + row.contactsIds.length + ')'}</Text>
                <MaterialCommunityIcons size={30} name={'greater-than'} />
            </View>
        </TouchableRipple>
    );

    return (
        <View style={styles.container}>
            <AddGroupModal modalVisible={modalVisible} setModalVisible={setModalVisible} addGroup={addGroup} />
            {groups.length === 0 ? (
                <EmptyListComponent />
            ) : (
                <>
                    {groups.map(
                        (row, index): JSX.Element => {
                            return listElement(row, index);
                        },
                    )}
                </>
            )}
            <FAB
                style={styles.fab}
                icon='plus'
                onPress={(): void => {
                    setModalVisible(true);
                }}
            />
        </View>
    );
};

export default GroupsList;
