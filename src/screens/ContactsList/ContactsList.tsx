import React, { ReactElement } from 'react';
import { Button, SectionList, SectionListRenderItem, SectionListRenderItemInfo, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
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
    fixedView: {
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    fab: {
        backgroundColor: 'darkgreen',
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
            <Button title='Click here!' onPress={onExample} />
            <SectionList
                sections={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={ContactsListSectionHeader}
                ListEmptyComponent={ContactsListEmptyBanner}
            />
            <View style={styles.fixedView}>
                {/* eslint-disable-next-line prettier/prettier */}
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={onCreate}
                />
            </View>
        </View>
    );
};

export default ContactsList;
