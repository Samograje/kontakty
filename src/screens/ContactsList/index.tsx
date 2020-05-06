import React, { ReactElement, useState } from 'react';
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

const searchContacts = (contacts: Contact[], query: string): Contact[] => {
    return contacts.filter((contact: Contact): boolean => {
        const firstNameMatches = contact.firstName.startsWith(query);
        const lastNameMatches = contact.lastName.startsWith(query);
        const bothMatchesWithSpace = `${contact.firstName} ${contact.lastName}`.startsWith(query);
        return firstNameMatches || lastNameMatches || bothMatchesWithSpace;
    });
};

const groupContactsByFirstNameFirstLetter = (contacts: Contact[]): ContactsSection[] => {
    return contacts
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
            const letter = currValue.firstName.charAt(0) || 'Empty';

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
};

const getExampleContact = (firstName: string, lastName: string, photoUrl: string | null): Contact => {
    return {
        id: null,
        firstName,
        secondName: '',
        lastName,
        photoUrl: photoUrl || 'https://i.ytimg.com/vi/e5kVnW7E2YM/maxresdefault.jpg',
        telNumbers: [
            {
                category: 'Home',
                number: '111222333',
            },
        ],
        emails: [
            {
                category: 'Private',
                email: 'smoczyca@hollywood.com', // XDD
            },
        ],
    };
};

const ContactsListScreen = (): ReactElement => {
    const { navigate } = useNavigation();
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [contactsFiltered, setContactsFiltered] = useState(contacts);

    const onCreate = (): void => navigate('AddEdit', { mode: 'create' });
    const onDetails = (id: number | null): void => navigate('Details', { id });

    const onSearch = (query: string): void => {
        setContactsFiltered(searchContacts(contacts, query));
    };

    // TODO: remove example when adding contact image by form will be available
    const addExampleContact = (firstName: string, lastName: string, photoUrl: string | null): void => {
        dispatch(createContact(getExampleContact(firstName, lastName, photoUrl)));
    };
    const addExampleContacts = (): void => {
        addExampleContact('Agata', 'Pała', null);
        addExampleContact('Andrzej', 'Dupa', 'https://d.wpimg.pl/1624536224--718230253/andrzej-duda.jpg');
        addExampleContact(
            'Wojciech',
            'Puczyk',
            'https://vignette.wikia.nocookie.net/serialblokekipa/images/c/c9/Wojtas_Puczyk.png/revision/latest/scale-to-width-down/340?cb=20170802081833&path-prefix=pl',
        );
    };

    const contactsSectioned = groupContactsByFirstNameFirstLetter(contactsFiltered);

    return (
        <ContactsList
            onCreate={onCreate}
            onView={onDetails}
            onSearch={onSearch}
            onExample={addExampleContacts}
            data={contactsSectioned}
            totalElements={contacts.length}
        />
    );
};

export default ContactsListScreen;
