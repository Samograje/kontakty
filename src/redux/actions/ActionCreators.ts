import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  ADD_NUMBER,
  REMOVE_NUMBER,
  ADD_EMAIL,
  REMOVE_EMAIL,
  CREATE_GROUP,
  UPDATE_GROUP,
  REMOVE_GROUP,
  ADD_CONTACT_ID,
  REMOVE_CONTACT_ID,
} from '../_constants/Types';
import { Contact, ContactEmail, ContactNumber } from "../reducers/ContactsReducer";
import { Group } from "../reducers/GroupsReducer";

export const createContact = (contact: Contact) => {
    return {
      type: CREATE_CONTACT,
      contact
    }
};

export const updateContact = (contact: Contact, contactIndex: number) => {
  return {
    type: UPDATE_CONTACT,
    contact,
    contactIndex
  }
};

export const removeContact = (id: number) => {
  return {
    type: REMOVE_CONTACT,
    id
  }
};

export const addNumber = (contactNumber: ContactNumber, contactIndex: number) => {
  return {
    type: ADD_NUMBER,
    contactNumber,
    contactIndex,
  }
};

export const removeNumber = (number: string, contactIndex: number) => {
  return {
    type: REMOVE_NUMBER,
    number,
    contactIndex,
  }
};

export const addEmail = (contactEmail: ContactEmail, contactIndex: number) => {
  return {
    type: ADD_EMAIL,
    contactEmail,
    contactIndex,
  }
};

export const removeEmail = (id: number, contactIndex: number) => {
  return {
    type: REMOVE_EMAIL,
    id,
    contactIndex,
  }
};

export const createGroup = (group: Group) => {
  return {
    type: CREATE_GROUP,
    group
  }
};

export const updateGroup = (group: Group, groupIndex: number) => {
  return {
    type: UPDATE_GROUP,
    group,
    groupIndex
  }
};

export const removeGroup = (id: number) => {
  return {
    type: REMOVE_GROUP,
    id
  }
};

export const addContactToGroup = (contactId: number, groupIndex: number) => {
  return {
    type: ADD_CONTACT_ID,
    contactId,
    groupIndex
  }
};

export const removeContactId = (contactId: number, groupIndex: number) => {
  return {
    type: REMOVE_CONTACT_ID,
    contactId,
    groupIndex,
  }
};
