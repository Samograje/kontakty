import React from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import { TextInput, Avatar, IconButton, Text } from 'react-native-paper';
import {labels, modes} from "./AddEditHelper";
import { MaterialCommunityIcons } from 'react-native-vector-icons';

interface Props {
    mode: string,
    onGroups: (id: number) => void,
    onChangeName: (name: string) => void,
    onChangeSecondName: (secondName: string) => void,
    onChangeSurname: (surname: string) => void,
    createContact: () => void,
    numbers: {
        category: string,
        number: string,
    }[],
    emails: {
        category: string,
        email: string,
    }[],
    onChangeInputField: (test: string, index: number) => void,
    onDeleteTextInput: (index: number) => void,
    addInputField: () => void,
    navigation: any,
}

const AddEdit = (props: Props) => {
    const {
        mode,
        onGroups,
        onChangeName,
        onChangeSecondName,
        onChangeSurname,
        createContact,
        numbers,
        emails,
        navigation,
        onChangeInputField,
        onDeleteTextInput,
        addInputField,
    } = props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: mode === modes.create ? 'Create contact' : 'Edit contact',
            headerRight: () => (
                <IconButton
                    icon="check"
                    size={40}
                    color={'white'}
                    onPress={createContact}
                />
            ),
        });
    }, [navigation]);

    const showIconOrEmptySpace = (condition: boolean, icon: string) => (
        <View style={styles.iconContainer}>
            {condition && (
                <MaterialCommunityIcons
                    size={50}
                    name={icon}
                    style={styles.icon}
                />
            )}
        </View>
    );

    const inputRow = (label: string, method) => (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                {showIconOrEmptySpace(label === labels.name, 'account')}
            </View>
            <TextInput
                label={label}
                style={styles.inputText}
                onChangeText={text => method(text)}
            />
        </View>
    );

    //TODO: połączyc mapPhoneNumbers i mapEmails
    const mapPhoneNumbers = () => (
        numbers.map((row, index) => {
            return(
                <View key={index}>
                    <View style={styles.row}>
                        {showIconOrEmptySpace(index === 0, 'phone')}
                        <TextInput
                            label={'Number'}
                            value={row.number}
                            style={styles.inputText}
                            onChangeText={text => onChangeInputField(text, index)}
                        />
                        <IconButton
                            icon='trash-can-outline'
                            size={30}
                            onPress={() => onDeleteTextInput(index)}
                        />
                    </View>
                    <Text>{row.category}</Text>
                </View>
            )
        })
    );

    const mapEmails = () => (
        emails.map((row, index) => {
            return(
                <View key={index}>
                    <View style={styles.row}>
                        {showIconOrEmptySpace(index === 0, 'email')}
                        <TextInput
                            label={'Number'}
                            value={row.email}
                            style={styles.inputText}
                            onChangeText={text => onChangeInputField(text, index)}
                        />
                        <IconButton
                            icon='trash-can-outline'
                            size={30}
                            onPress={() => onDeleteTextInput(index)}
                        />
                    </View>
                    <Text>{row.category}</Text>
                </View>
            )
        })
    );

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.avatarContainer}>
                    <Avatar.Text size={120} label="XD" />
                </View>
                {/* Dane osobowe */}
                {inputRow('Name', onChangeName)}
                {inputRow('Second name', onChangeSecondName)}
                {inputRow('Surname', onChangeSurname)}

                {/* Numery telefonu */}
                {mapPhoneNumbers()}
                <View style={{...styles.icon, alignSelf: "center"}}>
                    <IconButton
                        icon='plus'
                        onPress={addInputField}
                        size={30}
                    />
                </View>
                {/* Adresy email */}
                {/*{mapEmails()}*/}
                <Button title={"Create"}
                        onPress={createContact}
                />
                <Button title={"Grupy"}
                        onPress={() => onGroups(4)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatarContainer: {
        marginTop: 25,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
    },
    inputText: {
        backgroundColor: 'white',
        flex: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    iconContainer: {
        width: 60,
        alignItems: 'center',
    },
    icon: {
        paddingLeft: 5,
        paddingRight: 5,
    }
});

export default AddEdit;
