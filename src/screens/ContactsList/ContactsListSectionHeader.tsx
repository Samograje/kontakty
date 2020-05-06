import React, { ReactElement } from 'react';
import { SectionListData, StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface Props {
    section: SectionListData<Contact>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'darkgreen',
        fontSize: 24,
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 0,
    },
});

const ContactsListSectionHeader = (props: Props): ReactElement => {
    const { title } = props.section;
    return <Text style={styles.container}>{title}</Text>;
};

export default ContactsListSectionHeader;
