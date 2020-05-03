import {
    CREATE_CONTACT,
    UPDATE_CONTACT,
    REMOVE_CONTACT,
    CREATE_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    ADD_CONTACT_ID,
    REMOVE_CONTACT_ID,
} from '../_constants/Types';
import { Contact } from '../reducers/ContactsReducer';
import { Group } from '../reducers/GroupsReducer';

export const createContact = (contact: Contact) => {
    return {
        type: CREATE_CONTACT,
        contact,
    };
};

export const updateContact = (contact: Contact, contactIndex: number) => {
    return {
        type: UPDATE_CONTACT,
        contact,
        contactIndex,
    };
};

export const removeContact = (id: number) => {
    return {
        type: REMOVE_CONTACT,
        id,
    };
};

export const createGroup = (group: Group) => {
    return {
        type: CREATE_GROUP,
        group,
    };
};

export const updateGroup = (group: Group, groupIndex: number) => {
    return {
        type: UPDATE_GROUP,
        group,
        groupIndex,
    };
};

export const removeGroup = (id: number) => {
    return {
        type: REMOVE_GROUP,
        id,
    };
};

export const addContactToGroup = (contactId: number, groupIndex: number) => {
    return {
        type: ADD_CONTACT_ID,
        contactId,
        groupIndex,
    };
};

export const removeContactId = (contactId: number, groupIndex: number) => {
    return {
        type: REMOVE_CONTACT_ID,
        contactId,
        groupIndex,
    };
};
