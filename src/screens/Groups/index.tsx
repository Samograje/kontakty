import React, {useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../redux/selectors/Selectors';
import GroupsView from "./Groups";

interface Props {
    contactId: number,
}

export interface Data {
    id: string,
    name: string,
    contactsIds: [],
    isChecked: boolean,
}

const GroupsScreen = (props: Props) => {
    const { contactId } = props;
    const groups = useSelector(getGroups);
    const dispatch = useDispatch();

    const data : Data[] = useMemo(() => {
        return groups.map((el, i) => {
            return {
                ...el,
                isChecked: el.contactsIds.includes(contactId),
            };
        });
    }, [groups]);

    return (
        <GroupsView data={data}/>
    );
};

export default GroupsScreen;
