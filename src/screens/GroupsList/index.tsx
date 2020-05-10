import React from 'react';
import GroupsList from './GroupList';
import { useSelector } from 'react-redux';
import { getGroups } from '../../redux/selectors/Selectors';

const GroupsListScreen = (): JSX.Element => {
    const groups = useSelector(getGroups);

    const onPress = (): void => console.log('Przenieś mnie do listy kontaktów.');

    return <GroupsList groups={groups} onPress={onPress} />;
};

export default GroupsListScreen;
