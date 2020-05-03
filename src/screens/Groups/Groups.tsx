import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DataWithIsChecked} from "./index";
import GroupListItem from "./GroupListItem";
import EmptyListComponent from "./EmptyListComponent";
import {FAB} from "react-native-paper";
import AddGroupModal from "./AddGroupModal";

interface Props {
    data: DataWithIsChecked[],
    onGroupPress: (groupId: number, isIncluded: boolean) => void,
    onLongGroupPress: (groupId: number) => void,
    addGroup: (name: string) => void,
}

const Groups = (props: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {data, onGroupPress, addGroup, onLongGroupPress} = props;

    const renderItem = useCallback(
        ({item}) => (
            <GroupListItem
                item={item}
                onGroupPress={onGroupPress}
                onLongGroupPress={onLongGroupPress}
            />
        ),
        []);

    return (
        <>
            <AddGroupModal modalVisible={modalVisible} setModalVisible={setModalVisible} addGroup={addGroup}/>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    numColumns={1}
                    contentContainerStyle={styles.listContentContainer}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<EmptyListComponent/>}
                />
                <FAB
                    visible={!modalVisible}
                    style={styles.fab}
                    icon="plus"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                />

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContentContainer: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
    },
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 35,
        zIndex: 200,
    },
});

export default Groups;
