import {
    CREATE_CONTACT,
    UPDATE_CONTACT,
    REMOVE_CONTACT,
    ADD_NUMBER,
    REMOVE_NUMBER,
    ADD_EMAIL,
    REMOVE_EMAIL,
} from '../_constants/Types';

export interface ContactNumber {
    category: string,
    number: string,
}

export interface ContactEmail {
    category: string,
    email: string,
}

export interface Contact {
    id: number,
    firstName: string,
    secondName: string,
    surname: string,
    photoUrl: string,
    telNumbers: ContactNumber[],
    emails: ContactEmail[],
}

interface State {
    contacts: Contact[],
}

const initialState : State = {
    contacts: [],
};

export const ContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                contacts: [...state.contacts, action.contact],
            };
        case UPDATE_CONTACT:
            return {
                contacts: state.contacts.map(
                    (contact, i) => i === action.contactIndex ? action.contact : contact
                )
            };
        case REMOVE_CONTACT:
            return {
                contacts: state.contacts.filter((contact) => contact.id !== action.id),
            };
        case ADD_NUMBER:
            return {
                contents: state.contacts.map(
                    (contact, i) => i === action.contactIndex ? {
                            ...contact, telNumbers: [...contact.telNumbers, action.contactNumber]
                        }
                        : contact
                )
            };
        case REMOVE_NUMBER:
            return {
                contents: state.contacts.map(
                    (contact, i) => i === action.contactIndex ? {
                            ...contact,
                            telNumbers: contact.telNumbers.filter((contactNumber) => contactNumber.number !== action.number)
                        }
                        : contact
                )
            };
        case ADD_EMAIL:
            return {
                contents: state.contacts.map(
                    (contact, i) => i === action.contactIndex ? {
                            ...contact,
                            emails: [...contact.emails, action.contactEmail]
                        }
                        : contact
                )
            };
        case REMOVE_EMAIL:
            return {
                contents: state.contacts.map(
                    (contact, i) => i === action.contactIndex ? {
                            ...contact,
                            emails: contact.emails.filter((contactEmail) => contactEmail.email !== action.email)
                        }
                        : contact
                )
            };
        default:
            return state;
    }
};
