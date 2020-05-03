import React, { useEffect, useState } from 'react';
import AddEdit from "./AddEdit";
import { getContacts } from "../../redux/selectors/Selectors";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formLabels, modes } from "../StringsHelper";
import {createContact, updateContact} from "../../redux/actions/ActionCreators";

const AddEditScreen  = ({route, navigation}) => {
    const {navigate} = useNavigation();
    const {id, mode} = route.params;
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [exampleInitialValue, setExampleInitialValue] = useState(0);
    //TODO: zmienić indeks na id wybranego kontaktu
    const [firstName, setFirstName] = useState(mode === modes.edit ? contacts[0].firstName : '');
    const [secondName, setSecondName] = useState(mode === modes.edit ? contacts[0].secondName : '');
    const [lastName, setSurname] = useState(mode === modes.edit ? contacts[0].lastName : '');
    const [numbers, setNumbers] = useState(mode === modes.edit ? (contacts[0].telNumbers) : ([{category: '', number: '',}]));
    const [deletedNumber, setDeletedNumber] = useState({number: '', category: ''});
    const [emails, setEmails] = useState(mode === modes.edit ? (contacts[0].emails) : ([{category: '', email: '',}]));
    const [deletedEmail, setDeletedEmail] = useState({email: '', category: ''});
    const [snackbar, setSnackbar] = useState({isVisible: false, message: '', isActionVisible: false, label: ''});
    const buildContactObject = () => {
        return  {
            id: exampleInitialValue + 1,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            photoUrl: 'https://i.ytimg.com/vi/e5kVnW7E2YM/maxresdefault.jpg',
            telNumbers: numbers,
            emails: emails,
        };
    };
    let contact = buildContactObject();

    const addInputField = (label: string) => {
        if(label === formLabels.number){
            setNumbers([...numbers, {category: '', number: ''}]);
        } else if (label === formLabels.email) {
            setEmails([...emails, {category: '', email: ''}]);
        } else {
            console.log("Błąd podczas dodawania nowego pola, nieznana etykieta.")
        }
    };

    //TODO: zmienić nazwe, myląca
    const onChangeInputField = (label: string, value: string, index: number) => {
        let tmpData;
        if(label === formLabels.number){
            tmpData = [...numbers];
            tmpData[index].number = value;
            setNumbers(tmpData);
            setDeletedNumber(tmpData[index]);
        } else if (label == formLabels.email) {
            tmpData = [...emails];
            tmpData[index].email = value;
            setEmails(tmpData);
            setDeletedEmail(tmpData[index]);
        }
        else {
            console.log("Błąd pdczas zmiany danych w polu tekstowym, nieznana etykieta.")
        }
    };

    const onChangeDropdown = (label: string, value: string, index: number) => {
        let tmpData;
        if(label === formLabels.number){
            tmpData = [...numbers];
            tmpData[index].category = value;
            setNumbers(tmpData);
            setDeletedNumber(tmpData[index]);
        } else if (label == formLabels.email) {
            tmpData = [...emails];
            tmpData[index].category = value;
            setEmails(tmpData);
            setDeletedEmail(tmpData[index]);
        }
        else {
            console.log("Błąd podczas zmiany danych w rozwijanym menu, nieznana etykieta.")
        }
    };

    const onDeleteTextInput = (label: string, index: number) => {
        let tmpData;
        if(label === formLabels.number) {
            setDeletedNumber(numbers[index]);
            tmpData = [...numbers];
            tmpData.splice(index, 1);
            setNumbers(tmpData);
            onShowSnackbar(true,'Number deleted.', true, label);
        } else if (label === formLabels.email) {
            setDeletedEmail(emails[index]);
            tmpData = [...emails];
            tmpData.splice(index, 1);
            setEmails(tmpData);
            onShowSnackbar(true,'Email deleted.', true, label);
        } else {
            console.log("Błąd podczas usuwania pola tekstowego, nieznana etykieta.");
        }
    };

    const onUndoPressed = (label: string) => {
        let tmpData;
        if(label === formLabels.number){
            tmpData = [...numbers];
            tmpData.push(deletedNumber);
            setNumbers(tmpData);
        } else if(label === formLabels.email){
            tmpData = [...emails];
            tmpData.push(deletedEmail);
            setEmails(tmpData);
        } else {
            onShowSnackbar(true, 'Undo action failed. Something went wrong.', false, '');
        }
    };

    const onSaveContact = (mode: string, index: number) => {
        // TODO: walidacja danych ??
        if(mode === modes.create) {
            dispatch(createContact(buildContactObject()));
        } else if (mode === modes.edit) {
            dispatch(updateContact(buildContactObject(), index));
        }
        onShowSnackbar(true,'Contact saved.', false, '');
    };

    const onGroups = (id: number) => {navigate('Groups', {id: id})};
    const onChangeName = (name: string) => {setFirstName(name)};
    const onChangeSecondName = (secondName: string) => {setSecondName(secondName)};
    const onChangeSurname = (lastName: string) => {setSurname(lastName)};
    const onDismissSnackbar = () => {setSnackbar({isVisible: false, message: '', isActionVisible: false, label: ''})};
    const onShowSnackbar = (isVisible: true, message: string, isActionVisible: boolean, label: string) =>
    {setSnackbar({isVisible: true, message: message, isActionVisible: isActionVisible, label: label})};
    useEffect(()=>{
        setExampleInitialValue(contacts.length);
    },[contacts]);

    return (
        <AddEdit
            //TODO: uporządkować kolejność
            mode={mode}
            onGroups={onGroups}
            onChangeName={onChangeName}
            onChangeSecondName={onChangeSecondName}
            onChangeSurname={onChangeSurname}
            onSaveContact={onSaveContact}
            numbers={numbers}
            emails={emails}
            navigation={navigation}
            onChangeInputField={onChangeInputField}
            onDeleteTextInput={onDeleteTextInput}
            addInputField={addInputField}
            contact={contact}
            onChangeDropdown={onChangeDropdown}
            snackbar={snackbar}
            onDismissSnackbar={onDismissSnackbar}
            onUndoPressed={onUndoPressed}
        />
    );
};

export default AddEditScreen;
