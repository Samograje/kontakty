import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Avatar, IconButton } from 'react-native-paper';
import { icons, formLabels, modes, contactLabels } from "../StringsHelper";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
    mode: string,
    onGroups: (id: number) => void,
    onChangeName: (name: string) => void,
    onChangeSecondName: (secondName: string) => void,
    onChangeSurname: (surname: string, index: number) => void,
    onSaveContact: (mode: string, index: number) => void,
    numbers: {
        category: string,
        number: string,
    }[],
    emails: {
        category: string,
        email: string,
    }[],
    onChangeInputField: (label: string, test: string, index: number) => void,
    onDeleteTextInput: (label: string, index: number) => void,
    addInputField: (label: string) => void,
    navigation: any,
    contact: any,
    onChangeDropdown: (label: string, test: string, index: number) => void,
}

const AddEdit = (props: Props) => {
    const {
        mode,
        onGroups,
        onChangeName,
        onChangeSecondName,
        onChangeSurname,
        onSaveContact,
        numbers,
        emails,
        navigation,
        onChangeInputField,
        onDeleteTextInput,
        addInputField,
        contact,
        onChangeDropdown,
    } = props;

    React.useLayoutEffect(() => {
        let isEdit = mode === modes.edit;
        navigation.setOptions({
            title: isEdit ? 'Edit contact' : 'Create contact',
            headerRight: () => (
                <IconButton
                    icon="check"
                    size={40}
                    color={'white'}
                    //TODO: zamienić identyfikator do edycji
                    onPress={isEdit ? (() => onSaveContact(modes.edit, -1)) : (() => onSaveContact(modes.create, 0))}
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

    const inputRow = (label: string, method: any, value: string) => (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                {showIconOrEmptySpace(label === formLabels.name, icons.user)}
            </View>
            <TextInput
                label={label}
                value={value}
                style={styles.inputText}
                onChangeText={text => method(text)}
            />
        </View>
    );

    const mapPhoneNumbers = (numbers: { category: string, number: string }[]) => (
        numbers.map((row, index) => {
            return(
                mapHelper(numbers[index].number, numbers[index].category, index, icons.phone, formLabels.number)
            )
        })
    );

    const mapEmails = (emails: {category: string, email: string, }[],) => (
        emails.map((row, index) => {
            return(
                mapHelper(emails[index].email, emails[index].category, index, icons.email, formLabels.email)
            )
        })
    );

    const mapHelper = (phoneOrEmail: string, category: string, index: number, icon: string, label: string) => (
        <View key={index}>
            <View style={styles.row}>
                {showIconOrEmptySpace(index === 0, icon)}
                <TextInput
                    label={label}
                    value={phoneOrEmail}
                    style={styles.inputText}
                    onChangeText={text => onChangeInputField(label, text, index)}
                />
                <IconButton
                    icon='trash-can-outline'
                    size={30}
                    onPress={() => onDeleteTextInput(label, index)}
                />
            </View>
            <View style={styles.row}>
                {showIconOrEmptySpace(false, 'none')}
                <View style={{width: '45%'}}>
                    <RNPickerSelect
                        value={category}
                        onValueChange={(value) => onChangeDropdown(label, value, index)}
                        items={contactLabels}
                    />
                </View>
            </View>
        </View>
    );

    const plusButton = (label: string) => (
        <View style={{...styles.icon, alignSelf: "center"}}>
            <IconButton
                icon='plus'
                onPress={() => addInputField(label)}
                size={30}
            />
        </View>
    );


    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.avatarContainer}>
                    <Avatar.Text size={120} label="XD" />
                </View>
                {/* Dane osobowe */}
                {inputRow('Name', onChangeName, contact.firstName)}
                {inputRow('Second name', onChangeSecondName, contact.secondName)}
                {inputRow('Surname', onChangeSurname, contact.surname)}

                {/* Numery telefonu */}
                {mapPhoneNumbers(numbers)}
                {plusButton(formLabels.number)}

                {/* Adresy email */}
                {mapEmails(emails)}
                {plusButton(formLabels.email)}

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
