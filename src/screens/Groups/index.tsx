import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, getTempGroupsIds } from '../../redux/selectors/Selectors';
import GroupsView from './Groups';
import {
    addContactToGroup,
    addGroupToTempGroups,
    createGroup,
    removeContactFromGroup,
    removeGroup,
    removeGroupFromTempGroups,
} from '../../redux/actions/ActionCreators';
import { Group } from '../../redux/reducers/GroupsReducer';
import { Alert } from 'react-native';
import { modes } from '../StringsHelper';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    route: any;
}

export interface DataWithIsChecked {
    id: number;
    name: string;
    contactsIds: number[];
    isChecked: boolean;
}

const GroupsScreen = (props: Props) => {
    const { id, mode } = props.route.params;
    const groups = useSelector(getGroups);
    const tempGroups = useSelector(getTempGroupsIds);
    const dispatch = useDispatch();

    const onGroupPress = useCallback(
        (groupId: number, isIncluded: boolean): void => {
            if (mode === modes.create) {
                isIncluded ? dispatch(removeGroupFromTempGroups(groupId)) : dispatch(addGroupToTempGroups(groupId));
            } else {
                isIncluded ? dispatch(removeContactFromGroup(id, groupId)) : dispatch(addContactToGroup(id, groupId));
            }
        },
        [dispatch, id, mode],
    );

    const addGroup = (name: string): void => {
        if (!name) return;
        const group: Group = { id: null, name: name, contactsIds: [] };
        dispatch(createGroup(group));
    };

    const onLongGroupPress = (groupId: number, groupName: string): void => {
        if (!groupId) return;
        Alert.alert(
            'Group',
            `Do you want to delete '${groupName}' permanently?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: (): void => dispatch(removeGroup(groupId)) },
            ],
            { cancelable: true },
        );
    };

    const data: DataWithIsChecked[] = useMemo(() => {
        if (mode === modes.create) {
            return groups.map((el) => {
                return {
                    ...el,
                    isChecked: tempGroups.includes(el.id),
                };
            });
        } else {
            return groups.map((el) => {
                return {
                    ...el,
                    isChecked: el.contactsIds.includes(id),
                };
            });
        }
    }, [tempGroups, mode, groups, id]);

    return (
        <GroupsView data={data} onGroupPress={onGroupPress} onLongGroupPress={onLongGroupPress} addGroup={addGroup} />
    );
};

export default GroupsScreen;
