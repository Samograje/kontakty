import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Avatar, IconButton, Snackbar } from 'react-native-paper';
import { icons, formLabels, modes, contactLabels } from "../StringsHelper";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
    mode: string,
    numbers: {
        category: string,
        number: string,
    }[],
    emails: {
        category: string,
        email: string,
    }[],
    navigation: any,
    contact: any,
    snackbar: {
        isVisible: boolean,
        message: string,
        isActionVisible: boolean,
        label: string,
    }
    onGroups: (id: number) => void,
    onChangeName: (name: string) => void,
    onChangeSecondName: (secondName: string) => void,
    onChangeLastName: (lastName: string, index: number) => void,
    onSaveContact: (mode: string, index: number) => void,
    onChangeTextInput: (label: string, test: string, index: number) => void,
    onDeleteTextInput: (label: string, index: number) => void,
    addInputField: (label: string) => void,
    onChangeDropdown: (label: string, test: string, index: number) => void,
    onDismissSnackbar: () => void,
    onUndoPressed: (label: string) => void,
}

const AddEdit = (props: Props) => {
    const {
        mode,
        numbers,
        emails,
        navigation,
        contact,
        snackbar,
        onGroups,
        onChangeName,
        onChangeSecondName,
        onChangeLastName,
        onSaveContact,
        onChangeTextInput,
        onDeleteTextInput,
        addInputField,
        onChangeDropdown,
        onDismissSnackbar,
        onUndoPressed,
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
                    onPress={isEdit ? (() => onSaveContact(modes.edit, contact.id)) : (() => onSaveContact(modes.create, -1))}
                />
            ),
        });
    }, [navigation, onSaveContact]);

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
                mapHelper(numbers[index].number, numbers[index].category, index, icons.phone, formLabels.number, numbers.length)
            )
        })
    );

    const mapEmails = (emails: {category: string, email: string, }[],) => (
        emails.map((row, index) => {
            return(
                mapHelper(emails[index].email, emails[index].category, index, icons.email, formLabels.email, emails.length)
            )
        })
    );

    const mapHelper = (phoneOrEmail: string, category: string, index: number, icon: string, label: string, listLength: number) => (
        <View key={index}>
            <View style={styles.row}>
                {showIconOrEmptySpace(index === 0, icon)}
                <TextInput
                    label={label}
                    value={phoneOrEmail}
                    style={styles.inputText}
                    onChangeText={text => onChangeTextInput(label, text, index)}
                />
                <View style={styles.iconContainer}>
                    {listLength > 1 && (
                        <IconButton
                            icon='trash-can-outline'
                            size={30}
                            onPress={() => onDeleteTextInput(label, index)}
                        />
                    )}
                </View>
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

    const showSnackbar = () => (
        snackbar.isActionVisible ? (
            <Snackbar
                visible={snackbar.isVisible}
                style={styles.snackbar}
                onDismiss={onDismissSnackbar}
                action={{
                    label: 'Undo',
                    onPress: () => onUndoPressed(snackbar.label)
                }}
            >
                {snackbar.message}
            </Snackbar>
        ) : (
            <Snackbar
                visible={snackbar.isVisible}
                style={styles.snackbar}
                onDismiss={onDismissSnackbar}
            >
                {snackbar.message}
            </Snackbar>
            )
    );

    const groupsButton = () => (
        <Button title={"Grupy"}
                onPress={() => onGroups(4)}
        />
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.avatarContainer}>
                        <Avatar.Text size={120} label="XD" />
                    </View>
                    {/* Dane osobowe */}
                    {inputRow('Name', onChangeName, contact.firstName)}
                    {inputRow('Second name', onChangeSecondName, contact.secondName)}
                    {inputRow('Surname', onChangeLastName, contact.lastName)}

                    {/* Numery telefonu */}
                    {mapPhoneNumbers(numbers)}
                    {plusButton(formLabels.number)}

                    {/* Adresy email */}
                    {mapEmails(emails)}
                    {plusButton(formLabels.email)}

                    {groupsButton}
                </View>
            </ScrollView>
            {showSnackbar()}
        </View>
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
    },
    snackbar: {
        position: 'absolute',
        bottom: 0,
    },
});

export default AddEdit;
