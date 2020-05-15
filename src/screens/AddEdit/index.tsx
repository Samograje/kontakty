/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import AddEdit from './AddEdit';
import { getContacts, getGroups } from '../../redux/selectors/Selectors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { defaultCathegory, formLabels, modes } from '../StringsHelper';
import { validationT } from '../CustomTypes';
import { Alert } from 'react-native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { createContact, updateContact } from '../../redux/actions/ActionCreators';
import { Contact, ContactEmail, ContactNumber } from '../../redux/reducers/ContactsReducer';

const showDeclinedPermissionAlert = (): void => {
    Alert.alert(
        'Permissions',
        'We need camera and camera roll permissions in order to change avatar.',
        [
            { text: 'OK' },
        ],
        { cancelable: true },
    );
};

const AddEditScreen = ({ route, navigation }): JSX.Element => {
    //wartości początkowe
    const { navigate } = useNavigation();
    const { id, mode } = route.params;
    const contacts = useSelector(getContacts);
    const groups = useSelector(getGroups);
    const isEdit = mode === modes.edit;
    let contact;
    if(isEdit){
        contacts.forEach((row) => {
            if(row.id === id){
                contact = row;
            }
        })
    }
    const dispatch = useDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [image, setImage] = useState(isEdit ? contact.photoUrl : '');
    const [firstName, setFirstName] = useState(isEdit ? contact.firstName : '');
    const [secondName, setSecondName] = useState(isEdit ? contact.secondName : '');
    const [lastName, setSurname] = useState(isEdit ? contact.lastName : '');
    const [numbers, setNumbers] = useState(isEdit ? (contact.telNumbers) : ([{
        number: '',
        category: defaultCathegory
    }]));
    const [deletedNumber, setDeletedNumber] = useState({ index: -1, delNumber: { number: '', category: '' } });
    const [emails, setEmails] = useState(isEdit ? (contact.emails != null ? (contact.emails) : ([{
        email: '',
        category: defaultCathegory
    }])) : ([{
        email: '',
        category: defaultCathegory
    }]));
    const [deletedEmail, setDeletedEmail] = useState({ index: -1, delEmail: { email: '', category: '' } });
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', isActionVisible: false, label: '' });
    const [isDeleteClicked, setIsDeleteClicked] = useState(false); //Logika pomagająca przy procesie usuwania/cofania usunięcia,
    const [dataValid, setDataValid] = useState({
        nameOrOneNumberEmpty: true,
        oneOfNumbersEmpty: true,
        oneOfEmailsEmpty: true
    });


    const filterGroupsForContact = (): Group[] => {
        return groups.filter((row) => {
            return row.contactsIds.indexOf(id) >= 0;
        })
    };

    const filteredGroups = filterGroupsForContact();

    const buildContactObject = (): Contact => {
        return {
            id: null,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            photoUrl: image,
            telNumbers: numbers,
            emails:  emails.length === 1 && emails[0].email === '' ? null : emails,
        };
    };
    if(!isEdit){
        contact = buildContactObject();
    }
    const onGroups = (): void => {
        navigate('Groups', { id: id });
    };
    const onChangeName = (value: string): void => {
        setFirstName(value);
    };
    const onChangeSecondName = (value: string): void => {
        setSecondName(value);
    };
    const onChangeLastName = (value: string): void => {
        setSurname(value);
    };
    const onDismissSnackbar = (): void => {
        setSnackbar({ isVisible: false, message: '', isActionVisible: false, label: '' });
    };
    const onShowSnackbar = (isVisible: true, message: string, isActionVisible: boolean, label: string): void => {
        setSnackbar({ isVisible: true, message: message, isActionVisible: isActionVisible, label: label });
    };

    const checkDataValidation = (): validationT => {
        //Sprawdza czy jest imie i co najmniej jeden numer telefonu
        const nameAndOneNumberEmpty: boolean = !(!firstName || firstName.length === 0) && !(!numbers[0].number || numbers[0].number.length === 0) && !(!numbers[0].category || numbers[0].category.length === 0);
        //Sprawdza czy wszystkie dodane pola tekstowe dla numerów telefonów i adresów email mają wartości
        const tmpNumbers: ContactNumber[] = [...numbers];
        let numbersEmpty = true;
        const tmpEmails: ContactEmail[] = [...emails];
        let emailsEmpty = true;
        tmpNumbers.forEach((row) => {
            if (!(!row.number || row.number.length === 0) && !(!row.category || row.category.length === 0)) {
                numbersEmpty = false;
            } else {
                numbersEmpty = true;
            }
        });

        if (tmpEmails.length > 1) {
            tmpEmails.forEach((row) => {
                if (!(!row.email || row.email.length === 0) && !(!row.category || row.category.length === 0)) {
                    emailsEmpty = false;
                } else {
                    emailsEmpty = true;
                }
            });
        } else {
            emailsEmpty = false;
        }
        return {nameOrOneNumberEmpty: !nameAndOneNumberEmpty, oneOfNumbersEmpty: numbersEmpty, oneOfEmailsEmpty: emailsEmpty};
    };

    //Nie mogę przekazać w deeps nazwy metody, bo robi się nieskończona pętla
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setDataValid(checkDataValidation()), [firstName, emails, numbers]);

    //metody
    const addInputField = (label: string): void => {
        if (label === formLabels.number) {
            setNumbers([...numbers, { number: '', category: defaultCathegory }]);
        } else if (label === formLabels.email) {
            setEmails([...emails, { email: '', category: defaultCathegory }]);
        } else {
            onShowSnackbar(true, 'Something went wrong.', false, '');
            console.log('Błąd podczas dodawania nowego pola, nieznana etykieta.');
        }
    };

    const onChangeTextInput = (label: string, value: string, index: number): void => {
        onDismissSnackbar();
        let tmpData;
        if (label === formLabels.number) {
            tmpData = [...numbers];
            tmpData[index].number = value;
            setNumbers(tmpData);
            setDeletedNumber({ index, delNumber: tmpData[index] });
        } else if (label === formLabels.email) {
            tmpData = [...emails];
            tmpData[index].email = value;
            setEmails(tmpData);
            setDeletedEmail({ index, delEmail: tmpData[index] });
        } else {
            onShowSnackbar(true, 'Something went wrong.', false, '');
            console.log('Błąd pdczas zmiany danych w polu tekstowym, nieznana etykieta.');
        }
    };

    const onChangeDropdown = (label: string, value: string, index: number): void => {
        if (!isDeleteClicked) {
            onDismissSnackbar();
            let tmpData;
            if (label === formLabels.number) {
                tmpData = [...numbers];
                tmpData[index].category = value;
                setNumbers(tmpData);
                setDeletedNumber({ index, delNumber: tmpData[index] });
            } else if (label === formLabels.email) {
                tmpData = [...emails];
                tmpData[index].category = value;
                setEmails(tmpData);
                setDeletedEmail({ index, delEmail: tmpData[index] });
            } else {
                onShowSnackbar(true, 'Something went wrong.', false, '');
                console.log('Błąd podczas zmiany danych w rozwijanym menu, nieznana etykieta.');
            }
        }
        setIsDeleteClicked(false)
    };

    const onDeleteTextInput = (label: string, index: number): void => {
        setIsDeleteClicked(true);
        let tmpData;
        if (label === formLabels.number) {
            setDeletedNumber({ index, delNumber: numbers[index] });
            tmpData = [...numbers];
            tmpData.splice(index, 1);
            setNumbers(tmpData);
            onShowSnackbar(true, 'Number deleted.', true, label);
        } else if (label === formLabels.email) {
            setDeletedEmail({ index, delEmail: emails[index] });
            tmpData = [...emails];
            tmpData.splice(index, 1);
            setEmails(tmpData);
            onShowSnackbar(true, 'Email deleted.', true, label);
        } else {
            onShowSnackbar(true, 'Something went wrong.', false, '');
            console.log('Błąd podczas usuwania pola tekstowego, nieznana etykieta.');
        }
    };

    const onUndoPressed = (label: string): void => {
        setIsDeleteClicked(false);
        let tmpData;
        if (label === formLabels.number) {
            tmpData = [...numbers];
            tmpData.splice(deletedNumber.index, 0, deletedNumber.delNumber);
            setNumbers(tmpData);
        } else if (label === formLabels.email) {
            tmpData = [...emails];
            tmpData.splice(deletedEmail.index, 0, deletedEmail.delEmail);
            setEmails(tmpData);
        } else {
            onShowSnackbar(true, 'Undo action failed. Something went wrong.', false, '');
        }
    };

    const saveMessage = (dataValidOk: boolean): void => {
        if (dataValidOk) {
            onShowSnackbar(true, 'Contact saved.', false, '');
        } else if (dataValid.nameOrOneNumberEmpty) {
            onShowSnackbar(true, 'Please enter your name and at least one phone number', false, '');
        } else if (dataValid.oneOfNumbersEmpty) {
            onShowSnackbar(true, 'Fill out the fields with the phone number', false, '');
        } else if (dataValid.oneOfEmailsEmpty) {
            onShowSnackbar(true, 'Fill out the fields with the email adress', false, '');
        }
    };

    const onSaveContact = (): void => {
        //Walidacja odbywa się przy pomocy metody checkDataValidation
        const dataValidOk = !dataValid.nameOrOneNumberEmpty && !dataValid.oneOfNumbersEmpty && !dataValid.oneOfEmailsEmpty;
        if (dataValidOk) {
            if (mode === modes.create) {
                dispatch(createContact(buildContactObject()));
            } else if (mode === modes.edit && id !== null) {
                dispatch(updateContact(buildContactObject(), id));
            }
        }
        saveMessage(dataValidOk);
    };

    const checkCameraPermissions = useCallback(async (): Promise<boolean> => {
        const cameraPermissions = await ImagePicker.getCameraPermissionsAsync();
        if (cameraPermissions.status === 'granted') {
            return true;
        } else {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted') {
                return true;
            }
        }
        return false;
    }, []);

    const checkCameraRollPermissions = useCallback(async (): Promise<boolean> => {
        const cameraRollPermissions = await ImagePicker.getCameraRollPermissionsAsync();
        if (cameraRollPermissions.status === 'granted') {
            return true;
        } else {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status === 'granted') {
                return true;
            }
        }
        return false;
    }, []);

    const pickImage = useCallback(async (): Promise<void> => {
        try {
            setIsMenuVisible(false);
            const permission = await checkCameraPermissions() && await checkCameraRollPermissions();
            if (permission) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                if (!result.cancelled) {
                    setImage(result.uri);
                }
            } else {
                showDeclinedPermissionAlert();
            }
        } catch (error) {
            console.log(error);
        }
    }, [checkCameraPermissions, checkCameraRollPermissions]);

    const useCamera = useCallback(async ()=>{
        try{
            setIsMenuVisible(false);
            const permission = await checkCameraPermissions() && await checkCameraRollPermissions();
            if (permission) {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                if (!result.cancelled) {
                    setImage(result.uri);
                }
            } else {
                showDeclinedPermissionAlert();
            }
        }
        catch (error) {
            console.log(error);
        }
    },[checkCameraRollPermissions, checkCameraPermissions]);

    return (
        <AddEdit
            mode={mode}
            numbers={numbers}
            emails={emails}
            navigation={navigation}
            contact={buildContactObject()}
            groups={filteredGroups}
            image={image}
            isMenuVisible={isMenuVisible}
            pickImage={pickImage}
            setImage={setImage}
            setIsMenuVisible={setIsMenuVisible}
            snackbar={snackbar}
            onGroups={onGroups}
            onChangeName={onChangeName}
            onChangeSecondName={onChangeSecondName}
            onChangeLastName={onChangeLastName}
            onSaveContact={onSaveContact}
            onChangeTextInput={onChangeTextInput}
            onDeleteTextInput={onDeleteTextInput}
            addInputField={addInputField}
            onChangeDropdown={onChangeDropdown}
            onDismissSnackbar={onDismissSnackbar}
            onUndoPressed={onUndoPressed}
            useCamera={useCamera}
        />
    );
};

export default AddEditScreen;
