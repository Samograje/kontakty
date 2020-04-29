import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
    addContact: () => void,
    onDetails: (id: number) => void,
    onCreate: () => void,
    onEdit: (id: number) => void,
    value: number,
}

const ContactsList = (props: Props) => {
    const {
        addContact,
        onDetails,
        onCreate,
        onEdit,
        value,
    } = props;

    return (
        <View>
            <Text>Wyświetlam sobie ilość kontaktów: {value}</Text>
            <Button title={"Dodaj kontakt"}
                    onPress={addContact} />
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

export default ContactsList;
