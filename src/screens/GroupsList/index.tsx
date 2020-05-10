import React, { useCallback, useState } from 'react';
import GroupsList from './GroupList';
import AddEditScreen from '../AddEdit';

const GroupsListScreen = ({ route, navigation }): JSX.Element => {
    return <GroupsList groups={'grupy'} />;
};

export default GroupsListScreen;
