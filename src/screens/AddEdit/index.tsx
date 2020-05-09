/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import AddEdit from './AddEdit';
import { getContacts } from '../../redux/selectors/Selectors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { formLabels, modes } from '../StringsHelper';
import { createContact, updateContact } from '../../redux/actions/ActionCreators';
import { contactT } from '../CustomTypes';
import { Alert } from 'react-native';

const showDeclinedPermissionAlert = () => {
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
    const dispatch = useDispatch();
    const isEdit = mode === modes.edit;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [image, setImage] = useState(isEdit ? contacts[id].photoUrl : '');
    const [firstName, setFirstName] = useState(isEdit ? contacts[id].firstName : '');
    const [secondName, setSecondName] = useState(isEdit ? contacts[id].secondName : '');
    const [lastName, setSurname] = useState(isEdit ? contacts[id].lastName : '');
    const [numbers, setNumbers] = useState(isEdit ? (contacts[id].telNumbers) : ([{ number: '', category: '' }]));
    const [deletedNumber, setDeletedNumber] = useState({ index: -1, delNumber: { number: '', category: '' } });
    const [emails, setEmails] = useState(isEdit ? (contacts[id].emails) : ([{ email: '', category: '' }]));
    const [deletedEmail, setDeletedEmail] = useState({ index: -1, delEmail: { email: '', category: '' } });
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', isActionVisible: false, label: '' });
    const [isDeleteClicked, setIsDeleteClicked] = useState(false); //Logika pomagająca przy procesie usuwania/cofania usunięcia,
    const buildContactObject = (): contactT => {
        return {
            id: null,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            photoUrl: image,
            telNumbers: numbers,
            emails: emails,
        };
    };
    const contact = buildContactObject();
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

    // metody
    const addInputField = (label: string): void => {
        if (label === formLabels.number) {
            setNumbers([...numbers, { category: '', number: '' }]);
        } else if (label === formLabels.email) {
            setEmails([...emails, { category: '', email: '' }]);
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
        setIsDeleteClicked(false);
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

    const onSaveContact = (): void => {
        if(isCameraOn) return;
        // TODO: walidacja danych
        // TODO: wyświetlanie grup należących do kontaktu
        if (mode === modes.create) {
            dispatch(createContact(buildContactObject()));
        } else if (mode === modes.edit && id !== null) {
            dispatch(updateContact(buildContactObject(), id));
        }
        onShowSnackbar(true, 'Contact saved.', false, '');
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
                console.log(result);
            } else {
                showDeclinedPermissionAlert();
            }
        } catch (error) {
            console.warn(error);
        }
    }, [checkCameraPermissions, checkCameraRollPermissions]);

    const useCamera = useCallback(async ()=>{
        try{
            setIsMenuVisible(false);
            const permission = await checkCameraPermissions() && await checkCameraRollPermissions();
            permission ? setIsCameraOn(true) : showDeclinedPermissionAlert();
        }
        catch (error) {
            console.warn(error);
        }
    },[checkCameraRollPermissions, checkCameraPermissions]);

    return (
        <AddEdit
            mode={mode}
            numbers={numbers}
            emails={emails}
            navigation={navigation}
            contact={contact}
            image={image}
            isCameraOn={isCameraOn}
            isMenuVisible={isMenuVisible}
            pickImage={pickImage}
            setImage={setImage}
            setIsCameraOn={setIsCameraOn}
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
