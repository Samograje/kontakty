import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroups} from '../../redux/selectors/Selectors';
import GroupsView from "./Groups";
import {addContactToGroup, createGroup, removeContactFromGroup, removeGroup} from "../../redux/actions/ActionCreators";
import {GroupWithoutId} from "../../redux/reducers/GroupsReducer";
import {Alert} from "react-native";

interface Props {
    route: any
}

export interface DataWithIsChecked {
    id: number,
    name: string,
    contactsIds: number[],
    isChecked: boolean,
}

const GroupsScreen = (props: Props) => {
    const {id} = props.route.params;
    const groups = useSelector(getGroups);
    const dispatch = useDispatch();

    const onGroupPress = (groupId: number, isIncluded: boolean) => {
        isIncluded ? dispatch(removeContactFromGroup(id, groupId)) : dispatch(addContactToGroup(id, groupId));
    };

    const addGroup = (name: string) => {
        if (!name) return;
        let group: GroupWithoutId = {name: name, contactsIds: []};
        dispatch(createGroup(group));
    };

    const onLongGroupPress = (groupId: number) => {
        if (!groupId) return;
        Alert.alert(
            "Group",
            "Do you want to delete this group permanently?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {text: "OK", onPress: () => dispatch(removeGroup(groupId))}
            ],
            {cancelable: true}
        );
    };

    const data: DataWithIsChecked[] = useMemo(() => {
        return groups.map((el, i) => {
            return {
                ...el,
                isChecked: el.contactsIds.includes(id),
            };
        });
    }, [groups]);

    return (
        <GroupsView data={data} onGroupPress={onGroupPress} onLongGroupPress={onLongGroupPress} addGroup={addGroup}/>
    );
};

export default GroupsScreen;
