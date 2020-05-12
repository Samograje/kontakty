import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../redux/selectors/Selectors';
import GroupsView from './Groups';
import {
    addContactToGroup,
    createGroup,
    removeContactFromGroup,
    removeGroup,
} from '../../redux/actions/ActionCreators';
import { Group } from '../../redux/reducers/GroupsReducer';
import { Alert, BackHandler } from 'react-native';
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
    const { id, mode, userGroups, setGroupsState } = props.route.params;
    const groups = useSelector(getGroups);
    const dispatch = useDispatch();
    const [chosenGroups, setChosenGroups] = useState(userGroups);

    const onGroupPress = useCallback(
        (groupId: number, isIncluded: boolean): void => {
            if (mode === modes.create) {
                if (isIncluded) {
                    const temp = chosenGroups.filter((chosenGroupId: number): boolean => chosenGroupId !== groupId);
                    console.warn('before: ' + chosenGroups);
                    console.warn('after: ' + temp);
                    setChosenGroups(temp);
                } else {
                    const tempGroups = chosenGroups;
                    tempGroups.push(groupId);
                    setChosenGroups(tempGroups);
                    console.warn('added: ' + tempGroups);
                }
            } else {
                isIncluded ? dispatch(removeContactFromGroup(id, groupId)) : dispatch(addContactToGroup(id, groupId));
            }
        },
        [chosenGroups, dispatch, id, mode],
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
                    isChecked: chosenGroups.includes(el.id),
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
    }, [chosenGroups, mode, groups, id]);

    useEffect(() => {
        const onBackPress = (): boolean => {
            if (mode === modes.create) {
                setGroupsState([1]);
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [chosenGroups, mode, setGroupsState]);

    return (
        <GroupsView data={data} onGroupPress={onGroupPress} onLongGroupPress={onLongGroupPress} addGroup={addGroup} />
    );
};

export default GroupsScreen;
