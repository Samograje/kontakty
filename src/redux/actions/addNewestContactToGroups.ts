import { addContactToGroup, removeTempGroups } from './ActionCreators';

const addNewestContactToGroup = (tempGroupsIds) => {
    return (dispatch, getState) => {
        const { contacts } = getState().ContactsReducer;

        const newContactId = contacts[contacts.length - 1].id;
        if (tempGroupsIds.length > 0) {
            tempGroupsIds.forEach((groupId) => {
                dispatch(addContactToGroup(newContactId, groupId));
            });
        }

        dispatch(removeTempGroups());
    };
};

export default addNewestContactToGroup;
