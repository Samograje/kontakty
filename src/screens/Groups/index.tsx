import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroups} from '../../redux/selectors/Selectors';
import GroupsView from "./Groups";
import {addContactToGroup, createGroup, removeContactFromGroup} from "../../redux/actions/ActionCreators";

interface Props {
    route: any
}

export interface Data {
    id: string,
    name: string,
    contactsIds: number[],
    isChecked: boolean,
}

const GroupsScreen = (props: Props) => {
    const {id} = props.route.params;
    const groups = useSelector(getGroups);
    const dispatch = useDispatch();

    const onGroupPress = (groupId: string, isIncluded: boolean) => {
        isIncluded ? dispatch(removeContactFromGroup(id, groupId)) : dispatch(addContactToGroup(id, groupId));
    };

    const addGroup = (name: string) => {
        if(!name) return;
        let group = {id: `${groups.length + 1}`, name: name, contactsIds: []};
        dispatch(createGroup(group));
    };

    const data: Data[] = useMemo(() => {
        return groups.map((el, i) => {
            return {
                ...el,
                isChecked: el.contactsIds.includes(id),
            };
        });
    }, [groups]);

    return (
        <GroupsView data={data} onGroupPress={onGroupPress} addGroup={addGroup}/>
    );
};

export default GroupsScreen;
