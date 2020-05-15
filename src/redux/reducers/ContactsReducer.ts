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
    id: number | null;
    firstName: string;
    secondName: string;
    lastName: string;
    photoUrl: string;
    telNumbers: ContactNumber[];
    emails: ContactEmail[] | null;
}

interface State {
    generalId: number;
    contacts: Contact[];
}

const initialState: State = {
    generalId: 0,
    contacts: [],
};

export const ContactsReducer = (state = initialState, action): State => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                contacts: [...state.contacts, { ...action.contact, id: state.generalId + 1 }],
                generalId: state.generalId + 1,
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(
                    (contact): Contact =>
                        contact.id === action.contactId
                            ? { ...action.contact, id: action.contactId }
                            : contact,
                ),
            };
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact): boolean => contact.id !== action.id),
            };
        default:
            return state;
    }
};
