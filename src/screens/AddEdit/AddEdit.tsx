import React from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, Avatar, IconButton, Snackbar, Menu, Divider } from 'react-native-paper';
import { icons, formLabels, modes, contactLabels } from '../StringsHelper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { contactT, emailsT, navigationT, numbersT, snackbarT } from '../CustomTypes';

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
    menu: {
        paddingLeft: Dimensions.get('window').width / 2 - 20,
        paddingTop: 50,
        justifyContent: 'center',
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
        alignSelf: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    snackbar: {
        position: 'absolute',
        bottom: 0,
    },
    dropdown: {
        width: '45%',
    },
});

interface Props {
    mode: string;
    numbers: numbersT;
    emails: emailsT;
    navigation: navigationT;
    contact: contactT;
    image: string;
    isMenuVisible: boolean;
    pickImage: () => void;
    setImage: (string) => void;
    setIsMenuVisible: (boolean) => void;
    snackbar: snackbarT;
    onGroups: (id: number) => void;
    onChangeName: (name: string) => void;
    onChangeSecondName: (secondName: string) => void;
    onChangeLastName: (lastName: string) => void;
    onSaveContact: () => void;
    onChangeTextInput: (label: string, test: string, index: number) => void;
    onDeleteTextInput: (label: string, index: number) => void;
    addInputField: (label: string) => void;
    onChangeDropdown: (label: string, test: string, index: number) => void;
    onDismissSnackbar: () => void;
    onUndoPressed: (label: string) => void;
    useCamera: () => void;
}

const AddEdit = (props: Props): JSX.Element => {
    const {
        mode,
        numbers,
        emails,
        navigation,
        contact,
        image,
        isMenuVisible,
        pickImage,
        setImage,
        setIsMenuVisible,
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
        useCamera,
    } = props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: mode === modes.edit ? 'Edit contact' : 'Create contact',
            headerRight: (): JSX.Element => (
                <IconButton icon='check' size={40} color={'white'} onPress={(): void => onSaveContact()} />
            ),
        });
    }, [navigation, onSaveContact, contact.id, mode]);

    const showIconOrEmptySpace = (condition: boolean, icon: string): JSX.Element => (
        <View style={styles.iconContainer}>
            {condition && <MaterialCommunityIcons size={50} name={icon} style={styles.icon} />}
        </View>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRow = (label: string, method: any, value: string): JSX.Element => (
        //TODO: zrobić typ dla metod
        <View style={styles.row}>
            <View style={styles.iconContainer}>{showIconOrEmptySpace(label === formLabels.name, icons.user)}</View>
            <TextInput
                label={label}
                value={value}
                style={styles.inputText}
                onChangeText={(text): void => method(text)}
            />
        </View>
    );

    const mapHelper = (
        phoneOrEmail: string,
        category: string,
        index: number,
        icon: string,
        label: string,
        listLength: number,
    ): JSX.Element => (
        <View key={index}>
            <View style={styles.row}>
                {showIconOrEmptySpace(index === 0, icon)}
                <TextInput
                    label={label}
                    value={phoneOrEmail}
                    style={styles.inputText}
                    onChangeText={(text): void => onChangeTextInput(label, text, index)}
                />
                <View style={styles.iconContainer}>
                    {listLength > 1 && (
                        <IconButton
                            icon='trash-can-outline'
                            size={30}
                            onPress={(): void => onDeleteTextInput(label, index)}
                        />
                    )}
                </View>
            </View>
            <View style={styles.row}>
                {showIconOrEmptySpace(false, 'none')}
                <View style={styles.dropdown}>
                    <RNPickerSelect
                        value={category}
                        onValueChange={(value): void => onChangeDropdown(label, value, index)}
                        items={contactLabels}
                    />
                </View>
            </View>
        </View>
    );

    const mapPhoneNumbers = (value): numbersT =>
        value.map((row, index) => {
            return mapHelper(
                value[index].number,
                value[index].category,
                index,
                icons.phone,
                formLabels.number,
                value.length,
            );
        });

    const mapEmails = (value): emailsT =>
        value.map((row, index) => {
            return mapHelper(
                value[index].email,
                value[index].category,
                index,
                icons.email,
                formLabels.email,
                value.length,
            );
        });

    const plusButton = (label: string): JSX.Element => (
        <View style={styles.icon}>
            <IconButton icon='plus' onPress={(): void => addInputField(label)} size={30} />
        </View>
    );

    const showSnackbar = (): JSX.Element =>
        snackbar.isActionVisible ? (
            <Snackbar
                visible={snackbar.isVisible}
                style={styles.snackbar}
                onDismiss={onDismissSnackbar}
                action={{
                    label: 'Undo',
                    onPress: (): void => onUndoPressed(snackbar.label),
                }}
            >
                {snackbar.message}
            </Snackbar>
        ) : (
            <Snackbar visible={snackbar.isVisible} style={styles.snackbar} onDismiss={onDismissSnackbar}>
                {snackbar.message}
            </Snackbar>
        );

    const groupsButton = (): JSX.Element => <Button title={'Grupy'} onPress={(): void => onGroups(4)} />;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Menu
                        style={styles.menu}
                        visible={isMenuVisible}
                        onDismiss={(): void => setIsMenuVisible(false)}
                        anchor={
                            <TouchableOpacity
                                style={styles.avatarContainer}
                                onPress={(): void => setIsMenuVisible(true)}
                            >
                                {image ? (
                                    <Avatar.Image size={120} source={{ uri: image }} />
                                ) : (
                                    <Avatar.Text size={120} label='XD' />
                                )}
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={useCamera} title='Take Photo' />
                        <Menu.Item onPress={pickImage} title='Choose Image' />
                        <Divider />
                        <Menu.Item
                            onPress={(): void => {
                                setIsMenuVisible(false);
                            }}
                            title='Cancel'
                        />
                    </Menu>
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

                    {groupsButton()}
                </View>
            </ScrollView>
            {showSnackbar()}
        </View>
    );
};

export default AddEdit;
