import {
    CREATE_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    ADD_CONTACT_ID,
    REMOVE_CONTACT_ID,
} from '../_constants/Types';

export interface Group {
    id: number,
    contactsIds: [],
}

interface State {
    groups: Group[],
}

const initialState : State = {
    groups: [],
};

export const GroupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return {
                groups: [...state.groups, action.group],
            };
        case UPDATE_GROUP:
            return {
                groups: state.groups.map(
                    (group, i) => i === action.groupIndex ? action.group : group
                )
            };
        case REMOVE_GROUP:
            return {
                groups: state.groups.filter((group) => group.id !== action.id),
            };
        case ADD_CONTACT_ID:
            return {
                groups: state.groups.map(
                    (group, i) => i === action.groupIndex ? {
                            ...group, contactsIds: [...group.contactsIds, action.contactId]
                        }
                        : group
                )
            };
        case REMOVE_CONTACT_ID:
            return {
                groups: state.groups.map(
                    (group, i) => i === action.groupIndex ? {
                            ...group, contactsIds: group.contactsIds.filter((contactId) => contactId !== action.contactId)
                        }
                        : group
                )
            };
        default:
            return state;
    }
};
