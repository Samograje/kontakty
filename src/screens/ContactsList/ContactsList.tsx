import React, { ReactElement } from 'react';
import { Button, SectionList, SectionListRenderItem, SectionListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ContactListItem from './ContactListItem';
import ContactsListSectionHeader from './ContactsListSectionHeader';
import ContactsListEmptyBanner from './ContactsListEmptyBanner';

interface Props {
    onCreate: () => void;
    onView: (id: number | null) => void;
    onExample: () => void;
    data: {
        title: string;
        data: Contact[];
    }[];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const ContactsList = (props: Props): JSX.Element => {
    // eslint-disable-next-line prettier/prettier
    const {
        onCreate,
        onView,
        onExample,
        data,
    } = props;

    const keyExtractor = (item, index): string => item + index;
    const renderItem: SectionListRenderItem<Contact> = (p: SectionListRenderItemInfo<Contact>): ReactElement => (
        <ContactListItem item={p.item} onClick={(): void => onView(p.item.id)} />
    );

    return (
        <View style={styles.container}>
            <Button title='FAB dodaj nowy kontakt' onPress={onCreate} />
            <Button title='Click here!' onPress={onExample} />
            <SectionList
                sections={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={ContactsListSectionHeader}
                ListEmptyComponent={ContactsListEmptyBanner}
            />
        </View>
    );
};

export default ContactsList;
