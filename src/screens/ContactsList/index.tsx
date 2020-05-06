import React, { ReactElement, useEffect, useState } from 'react';
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

const ContactsListScreen = (): ReactElement => {
    const { navigate } = useNavigation();
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const [exampleInitialValue, setExampleInitialValue] = useState(0);

    const onCreate = (): void => navigate('AddEdit', { mode: 'create' });
    const onDetails = (id: number | null): void => navigate('Details', { id });

    useEffect(() => {
        setExampleInitialValue(contacts.length);
    }, [contacts]);

    const addExampleContact = (firstName: string, lastName: string, photoUrl: string | null): void => {
        const contact = {
            id: exampleInitialValue + 1,
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
        dispatch(createContact(contact));
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

    // sorts and groups contacts by the first letter of the first name
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

    return (
        // TODO: update style rules
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
