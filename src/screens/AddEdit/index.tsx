import React, {createContext, useEffect, useState} from 'react';
import AddEdit from "./AddEdit";
import {getContacts} from "../../redux/selectors/Selectors";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {createContact, updateContact} from "../../redux/actions/ActionCreators";
import { formLabels, modes} from "../StringsHelper";

const AddEditScreen  = ({route, navigation}) => {
    const {navigate} = useNavigation();
    const {id, mode} = route.params;
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [exampleInitialValue, setExampleInitialValue] = useState(0);
    //TODO: zmienić indeks na id wybranego kontaktu
    const [firstName, setFirstName] = useState(mode === modes.edit ? contacts[id].firstName : '');
    const [secondName, setSecondName] = useState(mode === modes.edit ? contacts[id].secondName : '');
    const [surname, setSurname] = useState(mode === modes.edit ? contacts[id].surname : '');
    const [numbers, setNumbers] = useState(mode === modes.edit ? (contacts[id].telNumbers) : ([{category: '', number: '',}]));
    const [emails, setEmails] = useState(mode === modes.edit ? (contacts[id].emails) : ([{category: '', email: '',}]));
    const addInputField = (label: string) => {
        if(label === formLabels.number){
            setNumbers([...numbers, {category: '', number: ''}]);
        } else if (label === formLabels.email) {
            setEmails([...emails, {category: '', email: ''}]);
        } else {
            //TODO: błąd podczas dodawania nowego pola
        }
    };

    function buildContactObject () {
        return {
            id: exampleInitialValue+1,
            firstName:  firstName,
            secondName: secondName,
            surname: surname,
            photoUrl: 'https://i.ytimg.com/vi/e5kVnW7E2YM/maxresdefault.jpg',
            telNumbers: numbers,
            emails: emails,
        };
    }

    const onChangeInputField = (label: string, value: string, index: number) => {
        let tmpData;
        if(label === formLabels.number){
            tmpData = [...numbers];
            tmpData[index].number = value;
            setNumbers(tmpData);
        } else if (label == formLabels.email) {
            tmpData = [...emails];
            tmpData[index].email = value;
            setEmails(tmpData);
        }
        else {
            //TODO: błąd podczas zmiany danych
        }
    };

    const onDeleteTextInput = (label: string, index: number) => {
        let tmpData;
        if(label === formLabels.number) {
            tmpData = [...numbers];
            tmpData.splice(index, 1);
            setNumbers(tmpData);
        } else if (label === formLabels.email) {
            tmpData = [...emails];
            tmpData.splice(index, 1);
            setEmails(tmpData);
        } else {
            //TODO: błąd podczas usuwania pola
        }

    };

    const onSaveContact = (mode: string, index: number) => {
        console.log(buildContactObject());
        //TODO: walidacja danych ??
        // if(mode === modes.create) {
        //     dispatch(createContact(buildContactObject()));
        // } else if (mode === modes.edit) {
        //     updateContact(buildContactObject(), index);
        // }
        // console.log(contacts);
    };

    const onGroups = (id: number) => {
        // console.log(contacts);
        // navigate('Groups', {id: id})
    };

    const onChangeName = (name: string) => {setFirstName(name)};
    const onChangeSecondName = (secondName: string) => {setSecondName(secondName)};
    const onChangeSurname = (surname: string) => {setSurname(surname)};

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
            onSaveContact={onSaveContact}
            numbers={numbers}
            emails={emails}
            contact={contacts} //TODO: podmienić to
            navigation={navigation}
            onChangeInputField={onChangeInputField}
            onDeleteTextInput={onDeleteTextInput}
            addInputField={addInputField}
        />
    );
};
export default AddEditScreen;
