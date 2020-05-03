import React from 'react';
import { SectionListData, StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface Props {
  section: SectionListData<Contact>,
}

const ContactsListSectionHeader = (props: Props) => {
  const { title } = props.section;
  return (
    <Text style={styles.container}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'darkgreen',
    fontSize: 24,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 0,
  },
});

export default ContactsListSectionHeader;
