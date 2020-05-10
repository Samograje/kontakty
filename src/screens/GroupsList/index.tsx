import React from 'react';
import GroupsList from './GroupList';
import { useSelector } from 'react-redux';
import { getGroups } from '../../redux/selectors/Selectors';
import { useNavigation } from '@react-navigation/native';

const GroupsListScreen = (): JSX.Element => {
    const groups = useSelector(getGroups);
    const { navigate } = useNavigation();
    const onPress = (): void => console.log('Przenieś mnie do listy kontaktów.');
    const onGroups = (): void => navigate('Groups', { id: null });

    return <GroupsList groups={groups} onPress={onPress} onGroups={onGroups} />;
};

export default GroupsListScreen;
