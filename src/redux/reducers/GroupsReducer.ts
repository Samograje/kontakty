import {
    CREATE_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    ADD_CONTACT_ID,
    REMOVE_CONTACT_ID,
    REMOVE_TEMP_GROUPS,
    ADD_GROUP_TO_TEMP_GROUPS,
    REMOVE_GROUP_FROM_TEMP_GROUPS,
} from '../_constants/Types';

export interface Group {
    id: number | null;
    name: string;
    contactsIds: number[];
}

interface State {
    generalId: number;
    groups: Group[];
    tempGroupsIds: number[];
}

const initialState: State = {
    generalId: 0,
    groups: [],
    tempGroupsIds: [],
};

export const GroupsReducer = (state = initialState, action): State => {
    switch (action.type) {
        case CREATE_GROUP:
            return {
                ...state,
                groups: [...state.groups, { ...action.group, id: state.generalId + 1 }],
                generalId: state.generalId + 1,
            };
        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(
                    (group): Group => (group.id === action.groupId ? { ...action.group, id: action.groupId } : group),
                ),
            };
        case REMOVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter((group): boolean => group.id !== action.id),
            };
        case ADD_CONTACT_ID:
            return {
                ...state,
                groups: state.groups.map(
                    (group): Group =>
                        group.id === action.groupId
                            ? {
                                  ...group,
                                  contactsIds: [...group.contactsIds, action.contactId],
                              }
                            : group,
                ),
            };
        case REMOVE_CONTACT_ID:
            return {
                ...state,
                groups: state.groups.map((group) =>
                    group.id === action.groupId
                        ? {
                              ...group,
                              contactsIds: group.contactsIds.filter(
                                  (contactId): boolean => contactId !== action.contactId,
                              ),
                          }
                        : group,
                ),
            };
        case REMOVE_TEMP_GROUPS:
            return {
                ...state,
                tempGroupsIds: [],
            };
        case ADD_GROUP_TO_TEMP_GROUPS:
            return {
                ...state,
                tempGroupsIds: [...state.tempGroupsIds, action.groupId],
            };
        case REMOVE_GROUP_FROM_TEMP_GROUPS:
            return {
                ...state,
                tempGroupsIds: state.tempGroupsIds.filter((id): boolean => id !== action.groupId),
            };
        default:
            return state;
    }
};
