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
    const [firstName, setFirstName] = useState(mode === modes.edit ? contacts[id].firstName : '');
    const [secondName, setSecondName] = useState(mode === modes.edit ? contacts[id].secondName : '');
    const [lastName, setSurname] = useState(mode === modes.edit ? contacts[id].lastName : '');
    const [numbers, setNumbers] = useState(mode === modes.edit ? (contacts[id].telNumbers) : ([{category: '', number: '',}]));
    const [deletedNumber, setDeletedNumber] = useState({number: '', category: ''});
    const [emails, setEmails] = useState(mode === modes.edit ? (contacts[id].emails) : ([{category: '', email: '',}]));
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
            onShowSnackbar(true, 'Something went wrong.', false, '');
            console.log("Błąd podczas dodawania nowego pola, nieznana etykieta.")
        }
    };

    const onChangeTextInput = (label: string, value: string, index: number) => {
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
            onShowSnackbar(true, 'Something went wrong.', false, '');
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
            onShowSnackbar(true, 'Something went wrong.', false, '');
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
            onShowSnackbar(true, 'Something went wrong.', false, '');
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
    const onChangeLastName = (lastName: string) => {setSurname(lastName)};
    const onDismissSnackbar = () => {setSnackbar({isVisible: false, message: '', isActionVisible: false, label: ''})};
    const onShowSnackbar = (isVisible: true, message: string, isActionVisible: boolean, label: string) =>
    {setSnackbar({isVisible: true, message: message, isActionVisible: isActionVisible, label: label})};
    useEffect(()=>{
        setExampleInitialValue(contacts.length);
    },[contacts]);

    return (
        <AddEdit
            mode={mode}
            numbers={numbers}
            emails={emails}
            navigation={navigation}
            contact={contact}
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
        />
    );
};

export default AddEditScreen;
