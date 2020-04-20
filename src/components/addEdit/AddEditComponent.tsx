import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
    id: number,
    mode: string,
    onGroups: (id: number) => {},
}

const AddEditComponent = (props: Props) => {
    const {
        id,
        mode,
        onGroups,
    } = props;

    return (
        <View>
            <Text>Tutaj będzie formularz dodawania/edycji kontaktu mode:{mode} id:{id}</Text>
            <Button title={"Grupy"}
                    onPress={() => onGroups(4)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AddEditComponent;