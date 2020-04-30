import React, { useState, useEffect } from 'react';
import ContactsList from './ContactsList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from "../../redux/actions/ActionCreators";
import { getContacts } from '../../redux/selectors/Selectors';
import {modes} from "../StringsHelper";


const ContactsListScreen = () => {
  const {navigate} = useNavigation();
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [exampleInitialValue, setExampleInitialValue] = useState(0);

  const onCreate = () => navigate('AddEdit', {mode: modes.create});
  const onEdit = (id: number) => navigate('AddEdit', {id: id, mode: modes.edit});
  const onDetails = (id: number) => navigate('Details', {id});

  useEffect(()=>{
    setExampleInitialValue(contacts.length);
  },[contacts]);

  const addContact = () => {
    let contact = {
      id: exampleInitialValue+1,
      firstName: 'Testowy',
      secondName: '',
      surname: 'Kontakt',
      photoUrl: 'https://i.ytimg.com/vi/e5kVnW7E2YM/maxresdefault.jpg',
      telNumbers: [{
        category: 'Domowy',
        number: '111222333',
      }],
      emails: [{
        category: 'Prywatny',
        email: 'smoczyca@hollywood.com',
      }],
    };
    dispatch(createContact(contact));
  };

  return (
      <ContactsList
          addContact={addContact}
          value={exampleInitialValue}
          onDetails={onDetails}
          onCreate={onCreate}
          onEdit={onEdit}
      />
  );
};

export default ContactsListScreen;