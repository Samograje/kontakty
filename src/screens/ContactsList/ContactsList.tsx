import React from 'react';
import { Button, SectionList, StyleSheet, View } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ContactListItem from './ContactListItem';
import ContactsListSectionHeader from './ContactsListSectionHeader';
import ContactsListEmptyBanner from './ContactsListEmptyBanner';

interface Props {
  onCreate: () => void,
  onView: (id: number) => void,
  onExample: () => void,
  data: {
    title: string,
    data: Contact[],
  }[],
}

const ContactsList = (props: Props) => {
  const {
    onCreate,
    onView,
    onExample,
    data,
  } = props;

  const keyExtractor = (item, index) => item + index;

  return (
    <View style={styles.container}>
      <Button title="Szczegóły kontaktu o id 4" onPress={() => onView(4)} />
      <Button title="FAB dodaj nowy kontakt" onPress={onCreate} />
      <Button title="Niespodzianka xD" onPress={onExample} />

      <SectionList
        sections={data}
        keyExtractor={keyExtractor}
        renderItem={ContactListItem}
        renderSectionHeader={ContactsListSectionHeader}
        ListEmptyComponent={ContactsListEmptyBanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContactsList;
