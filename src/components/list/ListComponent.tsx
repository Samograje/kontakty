import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
    onDetails: (id: number) => {},
    onCreate: () => {},
    onEdit: (id: number) => {},
}

const ListComponent = (props: Props) => {
    const {
        onDetails,
        onCreate,
        onEdit,
    } = props;

    return (
        <View>
            <Text>Tutaj będzie lista kontaktów</Text>
            <Button title={"Szczegóły kontaktu o id 4"}
                    onPress={() => onDetails(4)} />
            <Button title={"FAB dodaj nowy kontakt"}
                    onPress={() => onCreate()} />
            <Button title={"Przejście do edycji kontaktu z poziomu listy"}
                    onPress={() => onEdit(4)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ListComponent;