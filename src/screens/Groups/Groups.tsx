import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Data} from "./index";
import GroupListItem from "./GroupListItem";
import EmptyListComponent from "./EmptyListComponent";
import {FAB} from "react-native-paper";

interface Props {
    data: Data[],
}

const Groups = (props: Props) => {
    const {data} = props;

    const renderItem = useCallback(
        ({item}) => (
            <GroupListItem
                item={item}
            />
        ),
        []);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={1}
                contentContainerStyle={styles.listContentContainer}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<EmptyListComponent/>}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {
                }}
            />
        </View>
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
