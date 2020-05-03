import { CREATE_CONTACT, UPDATE_CONTACT, REMOVE_CONTACT } from '../_constants/Types';

export interface ContactNumber {
    category: string;
    number: string;
}

export interface ContactEmail {
    category: string;
    email: string;
}

export interface Contact {
    id: number;
    firstName: string;
    secondName: string;
    lastName: string;
    photoUrl: string;
    telNumbers: ContactNumber[];
    emails: ContactEmail[];
}

interface State {
    contacts: Contact[];
}

const initialState: State = {
    contacts: [],
};

export const ContactsReducer = (state = initialState, action): State => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                contacts: [...state.contacts, action.contact],
            };
        case UPDATE_CONTACT:
            return {
                contacts: state.contacts.map(
                    (contact, i): Contact => (i === action.contactIndex ? action.contact : contact),
                ),
            };
        case REMOVE_CONTACT:
            return {
                contacts: state.contacts.filter((contact): boolean => contact.id !== action.id),
            };
        default:
            return state;
    }
};
