import React from 'react';
import GroupsList from './GroupList';
import { useSelector, useDispatch } from 'react-redux';
import { getGroups } from '../../redux/selectors/Selectors';
import { useNavigation } from '@react-navigation/native';
import { Group } from '../../redux/reducers/GroupsReducer';
import { createGroup, removeGroup } from '../../redux/actions/ActionCreators';
import { Alert } from 'react-native';

const GroupsListScreen = (): JSX.Element => {
    const groups = useSelector(getGroups);
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const onPress = (group: Group): void => navigate('ContactsListForGroup', { groupId: group.id });

    //TODO: metody z Group index, spróować zrobić wspólne
    const addGroup = (name: string): void => {
        if (!name) return;
        const group: Group = { id: null, name: name, contactsIds: [] };
        dispatch(createGroup(group));
    };
    const onLongGroupPress = (groupId: number | null, groupName: string): void => {
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
    return (
        <GroupsList
            groups={groups}
            onPress={onPress}
            addGroup={addGroup}
            onLongGroupPress={onLongGroupPress}
        />
    );
};

export default GroupsListScreen;
