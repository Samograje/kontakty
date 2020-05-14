import React from 'react';
import Details from './Details';
import { getContacts, getGroups } from '../../redux/selectors/Selectors';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact, removeContactFromGroup } from '../../redux/actions/ActionCreators';

interface Props {
    navigation: {
        goBack: () => {};
        navigate: (screenName: string, params?: object) => {};
    };
    route;
}

const DetailsScreen = (props: Props) => {
    const { id } = props.route.params;
    const { navigate } = props.navigation;
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const groups = useSelector(getGroups);
    const contact = contacts.find((c) => c.id == id);
    const contactGroups = groups.filter((g) => g.contactsIds.includes(id));

    const onEdit = (id: number) => navigate('AddEdit', { id: id, mode: 'edit' });
    const onContactDelete = () => {
        dispatch(removeContact(id));
        contactGroups.forEach((g) => dispatch(removeContactFromGroup(id, g.id)));
        props.navigation.goBack();
    };

    return <Details id={id} onEdit={onEdit} onDelete={onContactDelete} contact={contact} />;
};

export default DetailsScreen;
