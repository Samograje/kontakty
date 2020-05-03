import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface Props {
  item: Contact,
}

const ContactListItem = (props: Props) => {
  const {
    firstName,
    lastName,
    photoUrl,
  } = props.item;

  return (
    <Text style={styles.container}>
      {firstName} {lastName}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    margin: 10,
    marginLeft: 20,
  },
});

export default ContactListItem;
