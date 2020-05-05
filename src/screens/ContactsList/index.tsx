import React, { useEffect, useState } from 'react';
import ContactsList from './ContactsList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../redux/actions/ActionCreators';
import { getContacts } from '../../redux/selectors/Selectors';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface ContactsSection {
    title: string;
    data: Contact[];
}

const ContactsListScreen = (): JSX.Element => {
    const { navigate } = useNavigation();
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [exampleInitialValue, setExampleInitialValue] = useState(0);

    const onCreate = (): void => navigate('AddEdit', { mode: 'create' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onEdit = (id: number): void => navigate('AddEdit', { id: id, mode: 'edit' });
    const onDetails = (id: number): void => navigate('Details', { id });

    useEffect(() => {
        setExampleInitialValue(contacts.length);
    }, [contacts]);

    const addExampleContact = (firstName: string, lastName: string): void => {
        const contact = {
            id: exampleInitialValue + 1,
            firstName,
            secondName: '',
            lastName,
            photoUrl: 'https://i.ytimg.com/vi/e5kVnW7E2YM/maxresdefault.jpg',
            telNumbers: [
                {
                    category: 'Domowy',
                    number: '111222333',
                },
            ],
            emails: [
                {
                    category: 'Prywatny',
                    email: 'smoczyca@hollywood.com', // XDD
                },
            ],
        };
        dispatch(createContact(contact));
    };

    const addExampleContacts = (): void => {
        addExampleContact('Agata', 'Pała');
        addExampleContact('Andrzej', 'Dupa');
        addExampleContact('Wojciech', 'Puczyk');
    };

    // sortuje i grupuje kontakty po pierwszej literze imienia
    const contactsSectioned = contacts
        .sort((a: Contact, b: Contact) => {
            if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
                return -1;
            }
            if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
                return 1;
            }
            return 0;
        })
        .reduce((resultValue: ContactsSection[], currValue: Contact) => {
            const letter = currValue.firstName.charAt(0) || 'Puste';

            if (resultValue.length) {
                const lastSection: ContactsSection = resultValue[resultValue.length - 1];
                if (lastSection.title === letter) {
                    lastSection.data.push(currValue);
                    return resultValue;
                }
            }

            resultValue.push({
                title: letter,
                data: [currValue],
            });
            return resultValue;
        }, []);

    return (
        // TODO: zaktualizować reguły stylu
        // eslint-disable-next-line prettier/prettier
        <ContactsList
            onCreate={onCreate}
            onView={onDetails}
            onExample={addExampleContacts}
            data={contactsSectioned}
        />
    );
};

export default ContactsListScreen;
