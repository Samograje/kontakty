import React from 'react';
import Details from './Details';
import { getContacts, getGroups } from '../../redux/selectors/Selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
    createContact,
    removeContact,
    removeContactFromGroup,
    updateContact,
} from '../../redux/actions/ActionCreators';
import { modes } from '../StringsHelper';

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
    console.log(contactGroups);

    const onEdit = (id: number) => navigate('AddEdit', { id: id, mode: 'edit' });
    const onContactDelete = () => {
        console.log(id);
        dispatch(removeContact(id));
        contactGroups.forEach((g) => dispatch(removeContactFromGroup(id, g.id)));
    };

    return <Details id={id} onEdit={onEdit} onDelete={onContactDelete} contact={contact} />;
};

export default DetailsScreen;
