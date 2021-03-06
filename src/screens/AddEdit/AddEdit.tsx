import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, IconButton, Snackbar, Menu, Divider } from 'react-native-paper';
import { icons, formLabels, modes, contactLabels } from '../StringsHelper';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { navigationT, snackbarT } from '../CustomTypes';
import GroupButton from './GroupButton';
import { Group } from '../../redux/reducers/GroupsReducer';
import ProperAvatar from '../ProperAvatar';
import { Contact, ContactEmail, ContactNumber } from '../../redux/reducers/ContactsReducer';
import { colors, dimensions, fonts, margin, padding } from '../../styles/common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        marginTop: margin.md,
        alignItems: 'center',
    },
    headerText: {
        fontSize: fonts.lg,
    },
    inputText: {
        flex: 2,
        backgroundColor: colors.background,
    },
    menu: {
        paddingLeft: dimensions.fullWidth / 2 - 20,
        paddingTop: padding.xl,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    snackbar: {
        position: 'absolute',
        backgroundColor: colors.primaryDark,
        bottom: 0,
    },
    iconContainer: {
        width: 60,
        alignItems: 'center',
    },
    icon: {
        alignSelf: 'center',
        paddingLeft: padding.sm,
        color: colors.icon,
    },
    dropdown: {
        width: '45%',
    },
});

interface Props {
    mode: string;
    numbers: ContactNumber[];
    emails: ContactEmail[];
    navigation: navigationT;
    contact: Contact;
    groups: Group[];
    image: string;
    isMenuVisible: boolean;
    pickImage: () => void;
    setImage: (string) => void;
    setIsMenuVisible: (boolean) => void;
    snackbar: snackbarT;
    onGroups: (id: number | null) => void;
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
    isSubmiting: boolean;
}

const AddEdit = (props: Props): JSX.Element => {
    const {
        mode,
        numbers,
        emails,
        navigation,
        contact,
        groups,
        image,
        isMenuVisible,
        pickImage,
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
        isSubmiting,
    } = props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: mode === modes.edit ? 'Edit contact' : 'Create contact',
            headerRight: (): JSX.Element => (
                <IconButton
                    icon='check'
                    size={40}
                    color={'white'}
                    onPress={(): void => onSaveContact()}
                    disabled={isSubmiting}
                />
            ),
        });
    }, [navigation, onSaveContact, contact.id, mode, isSubmiting]);

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
                theme={{ colors: { primary: colors.primaryDark } }}
                accessibilityIgnoresInvertColors={true}
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
        isNumeric: boolean,
    ): JSX.Element => (
        <View key={index}>
            <View style={styles.row}>
                {showIconOrEmptySpace(index === 0, icon)}
                <TextInput
                    label={label}
                    value={phoneOrEmail}
                    style={styles.inputText}
                    theme={{ colors: { primary: colors.primaryDark } }}
                    onChangeText={(text): void => onChangeTextInput(label, text, index)}
                    keyboardType={isNumeric ? 'numeric' : 'email-address'}
                />
                <View style={styles.iconContainer}>
                    {listLength > 1 && (
                        <IconButton
                            icon='trash-can-outline'
                            size={30}
                            color={colors.icon}
                            rippleColor={colors.secondaryDark}
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

    const mapPhoneNumbers = (value): ContactNumber[] =>
        value.map((row, index) => {
            return mapHelper(
                value[index].number,
                value[index].category,
                index,
                icons.phone,
                formLabels.number,
                value.length,
                true,
            );
        });

    const mapEmails = (value): ContactEmail[] =>
        value.map((row, index) => {
            return mapHelper(
                value[index].email,
                value[index].category,
                index,
                icons.email,
                formLabels.email,
                value.length,
                false,
            );
        });

    const plusButton = (label: string): JSX.Element => (
        <View style={styles.icon}>
            <IconButton
                icon='plus'
                onPress={(): void => addInputField(label)}
                size={30}
                color={colors.icon}
                rippleColor={colors.secondaryDark}
            />
        </View>
    );

    const showSnackbar = (): JSX.Element =>
        snackbar.isValidationMsg && snackbar.isActionVisible ? (
            <Snackbar
                visible={snackbar.isVisible}
                style={styles.snackbar}
                onDismiss={onDismissSnackbar}
                theme={{ colors: { accent: colors.textWhite } }}
                action={{
                    label: 'Undo',
                    onPress: (): void => onUndoPressed(snackbar.message.split(' ')[0]),
                }}
            >
                {snackbar.message}
            </Snackbar>
        ) : (
            <Snackbar
                visible={snackbar.isVisible}
                style={styles.snackbar}
                onDismiss={onDismissSnackbar}
                theme={{ colors: { accent: colors.textWhite } }}
            >
                {snackbar.message}
            </Snackbar>
        );

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
                                <ProperAvatar
                                    path={image}
                                    firstName={contact.firstName}
                                    lastName={contact.lastName}
                                    size={120}
                                />
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

                    <GroupButton onGroups={onGroups} groups={groups} id={contact.id} />
                </View>
            </ScrollView>
            {showSnackbar()}
        </View>
    );
};

export default AddEdit;
