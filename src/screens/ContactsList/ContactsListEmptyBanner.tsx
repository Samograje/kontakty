import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ContactsListEmptyBanner = () => {
  return (
    <Text style={styles.container}>
      Nie dodano jeszcze żadnych kontaktów
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 2,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ContactsListEmptyBanner;
