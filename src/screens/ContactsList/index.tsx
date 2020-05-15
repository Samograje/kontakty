/* eslint-disable prettier/prettier */
import React, { ReactElement, useState } from 'react';
import ContactsList from './ContactsList';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors/Selectors';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface ContactsSection {
    title: string;
    data: Contact[];
}

const searchContacts = (contacts: Contact[], query: string): Contact[] => {
    return contacts.filter((contact: Contact): boolean => {
        const firstNameMatches = contact.firstName.toUpperCase().startsWith(query.toUpperCase());
        const lastNameMatches = contact.lastName.toUpperCase().startsWith(query.toUpperCase());
        const bothMatchesWithSpace = `${contact.firstName.toUpperCase()} ${contact.lastName.toUpperCase()}`
            .startsWith(query.toUpperCase());
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

const ContactsListScreen = (): ReactElement => {
    const { navigate } = useNavigation();
    const contacts = useSelector(getContacts);
    const [searchText, setSearchText] = useState('');

    const onCreate = (): void => navigate('AddEdit', { mode: 'create' });
    const onDetails = (id: number | null): void => navigate('Details', { id });
    const onGroupList = (): void => navigate('GroupsList');
    const onSearch = (query: string): void => setSearchText(query);
    const onClearSearch = (): void => setSearchText('');

    const contactsFiltered = searchContacts(contacts, searchText);
    const contactsSectioned = groupContactsByFirstNameFirstLetter(contactsFiltered);

    return (
        <ContactsList
            onCreate={onCreate}
            onView={onDetails}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            data={contactsSectioned}
            totalElements={contacts.length}
            searchText={searchText}
            onGroupList={onGroupList}
        />
    );
};

export default ContactsListScreen;
