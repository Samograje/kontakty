import React, {useEffect, useState} from 'react';
import AddEdit from "./AddEdit";
import {getContacts} from "../../redux/selectors/Selectors";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const AddEditScreen  = ({route, navigation}) => {
    const {navigate} = useNavigation();
    const {id, mode} = route.params;
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [exampleInitialValue, setExampleInitialValue] = useState(0);
    //TODO: wczytywanie tablicy dla edycji
    const [numbers, setNumbers] = useState([{category: '', number: '',}]);
    const [emails, setEmails] = useState([{category: '', email: '',}]);
    let contact = {
        id: exampleInitialValue + 1,
        firstName: '',
        secondName: '',
        surname: '',
        photoUrl: '',
        telNumbers: [{
            category: '',
            number: '',
        }],
        emails: [{
            category: '',
            email: '',
        }],
    };

    const addInputField = () => {
        setNumbers([...numbers, {category: '', number: ''}]);
        // console.log(contact);
    };

    const onChangeInputField = (value, index) => {
        let tmpNumbers = [...numbers];
        tmpNumbers[index].number = value;
        setNumbers(tmpNumbers);
    };

    const onDeleteTextInput = (index) => {
        let tmpNumbers = [...numbers];
        tmpNumbers.splice(index, 1);
        setNumbers(tmpNumbers);
    };

    const onGroups = (id: number) => navigate('Groups', {id: id});
    const onChangeName = (name: string) => {contact.firstName = name};
    const onChangeSecondName = (secondName: string) => {contact.secondName = secondName};
    const onChangeSurname = (surname: string) => {contact.surname = surname};
    const createContact = () => {
        // dispatch(createContact(contact));
        console.log("Dodaje kontakt");
    };

    useEffect(()=>{
        setExampleInitialValue(contacts.length);
    },[contacts]);

    return (
        <AddEdit
            mode={mode}
            onGroups={onGroups}
            onChangeName={onChangeName}
            onChangeSecondName={onChangeSecondName}
            onChangeSurname={onChangeSurname}
            createContact={createContact}
            numbers={numbers}
            emails={emails}
            navigation={navigation}
            onChangeInputField={onChangeInputField}
            onDeleteTextInput={onDeleteTextInput}
            addInputField={addInputField}
        />
    );
};
export default AddEditScreen;
