import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Data} from "./index";
import GroupListItem from "./GroupListItem";
import EmptyListComponent from "./EmptyListComponent";

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
});

export default Groups;
