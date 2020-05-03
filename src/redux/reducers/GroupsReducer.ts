import {
    CREATE_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    ADD_CONTACT_ID,
    REMOVE_CONTACT_ID,
} from '../_constants/Types';

export interface Group {
    id: number,
    name: string,
    contactsIds: number[],
}

export interface GroupWithoutId {
    name: string,
    contactsIds: number[],
}

interface State {
    generalId: number,
    groups: Group[],
}

const initialState: State = {
    generalId: 0,
    groups: [],
};

export const GroupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return {
                groups: [...state.groups, {...action.group, id: state.generalId + 1}],
                generalId: state.generalId + 1,
            };
        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(
                    (group, i) => i === action.group.id ? action.group : group
                )
            };
        case REMOVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter((group) => group.id !== action.id),
            };
        case ADD_CONTACT_ID:
            return {
                ...state,
                groups: state.groups.map(
                    (group, i) => group.id === action.groupId ? {
                            ...group, contactsIds: [...group.contactsIds, action.contactId]
                        }
                        : group
                )
            };
        case REMOVE_CONTACT_ID:
            return {
                ...state,
                groups: state.groups.map(
                    (group, i) => group.id === action.groupId ? {
                            ...group, contactsIds: group.contactsIds.filter((contactId) => contactId !== action.contactId)
                        }
                        : group
                )
            };
        default:
            return state;
    }
};
