/* eslint-disable prettier/prettier */
import React, { ReactElement, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ContactsList from './ContactsList';
import { getContacts, getGroups } from '../../redux/selectors/Selectors';
import { Contact } from '../../redux/reducers/ContactsReducer';
import { Group } from '../../redux/reducers/GroupsReducer';
import { modes } from '../StringsHelper';

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

const sendMessage = (): void => {
    console.log('sms')
};

const makeCall = (): void => {
    console.log('call')
};

const selectItem = (itemId: number | null, selectedIds: []): void => {
    console.log('item selected');
    console.log(itemId)
    if (itemId != null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const i = selectedIds.indexOf(itemId);
        if (i > -1) {
            selectedIds.splice(i, 1);
            console.log(selectedIds);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            selectedIds.push(itemId);
            console.log(selectedIds);
        }
    }
};

const ContactsListScreen = ({ route }): ReactElement => {
    const { navigate } = useNavigation();
    const group: Group = useSelector(getGroups).filter((g: Group) => g.id === route.params?.groupId)[0];
    let contacts = useSelector(getContacts);
    if (group) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        contacts = contacts.filter((contact: Contact) => group.contactsIds.includes(contact.id));
    }
    const [searchText, setSearchText] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    const onCreate = (): void => navigate('AddEdit', { mode: 'create' });
    const onDetails = (id: number | null): void => navigate('Details', { id, mode: modes.edit });
    const onGroupList = (): void => navigate('GroupsList');
    const onSearch = (query: string): void => setSearchText(query);
    const onClearSearch = (): void => setSearchText('');
    const onSwipeLeft = (): void => sendMessage();
    const onSwipeRight = (): void => makeCall();
    const onItemSelect = (itemId: number | null, selectedIds: []): void => selectItem(itemId, selectedIds);

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
            forGroupModeEnabled={!!group}
            onGroupList={onGroupList}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            onItemSelect={onItemSelect}
            selectedIds={selectedIds}
        />
    );
};

export default ContactsListScreen;
