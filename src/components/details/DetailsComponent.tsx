import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
    id: number,
    onEdit: (id: number) => {},
}

const DetailsComponent = (props: Props) => {
    const {
        id,
        onEdit,
    } = props;

    return (
        <View>
            <Text>Tutaj będą szczegóły kontaktu + id: {id}</Text>
            <Button title={"Przejście do edycji kontaktu"}
                    onPress={() => onEdit(id)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default DetailsComponent;