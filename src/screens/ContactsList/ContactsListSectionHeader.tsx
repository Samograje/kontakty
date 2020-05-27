import React, { ReactElement } from 'react';
import { SectionListData, StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';
import { colors, fonts, margin } from '../../styles/common';

interface Props {
    section: SectionListData<Contact>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.primaryDark,
        fontSize: fonts.lg,
        marginTop: margin.lg,
        marginLeft: margin.lg,
        marginBottom: 0,
    },
});

const ContactsListSectionHeader = (props: Props): ReactElement => {
    const { title } = props.section;
    return <Text style={styles.container}>{title}</Text>;
};

export default ContactsListSectionHeader;
