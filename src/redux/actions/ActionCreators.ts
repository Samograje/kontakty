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

export const updateContact = (contact: Contact, contactId: number) => {
    return {
        type: UPDATE_CONTACT,
        contact,
        contactId,
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

export const updateGroup = (group: Group, groupId: number) => {
    return {
        type: UPDATE_GROUP,
        group,
        groupId,
    };
};

export const removeGroup = (id: number) => {
    return {
        type: REMOVE_GROUP,
        id,
    };
};

export const addContactToGroup = (contactId: number, groupId: number) => {
    return {
        type: ADD_CONTACT_ID,
        contactId,
        groupId,
    };
};

export const removeContactFromGroup = (contactId: number, groupId: number) => {
    return {
        type: REMOVE_CONTACT_ID,
        contactId,
        groupId,
    };
};
