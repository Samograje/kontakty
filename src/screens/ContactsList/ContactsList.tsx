import React, { ReactElement } from 'react';
import {
    SectionList,
    SectionListRenderItem,
    SectionListRenderItemInfo,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ContactListItem from './ContactListItem';
import ContactsListSectionHeader from './ContactsListSectionHeader';
import ContactsListEmptyBanner from './ContactsListEmptyBanner';
import HeaderBarWithSearch from './HeaderBarWithSearch';

interface Props {
    onCreate: () => void;
    onView: (id: number | null) => void;
    onSearch: (query: string) => void;
    onClearSearch: () => void;
    data: {
        title: string;
        data: Contact[];
    }[];
    totalElements: number;
    searchText: string;
    onGroupList: () => void;
    forGroupModeEnabled: boolean;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    fixedView: {
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    fab: {
        zIndex: 200,
        backgroundColor: 'darkgreen',
    },
});

const ContactsList = (props: Props): JSX.Element => {
    const {
        onCreate,
        onView,
        onSearch,
        onClearSearch,
        data,
        totalElements,
        searchText,
        onGroupList,
        forGroupModeEnabled,
    } = props;

    const keyExtractor = (item, index): string => item + index;
    const renderItem: SectionListRenderItem<Contact> = (p: SectionListRenderItemInfo<Contact>): ReactElement => (
        <ContactListItem item={p.item} onClick={(): void => onView(p.item.id)} />
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgreen' />
            {!forGroupModeEnabled && (
                <>
                    <HeaderBarWithSearch
                        totalElements={totalElements}
                        searchText={searchText}
                        onSearch={onSearch}
                        onClearSearch={onClearSearch}
                    />
                    <ContactListItem
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        item={{
                            firstName: 'My',
                            lastName: 'groups',
                            photoUrl: '',
                        }}
                        onClick={onGroupList}
                    />
                    <View style={styles.fixedView}>
                        <FAB style={styles.fab} icon='plus' onPress={onCreate} />
                    </View>
                </>
            )}
            <SectionList
                style={styles.list}
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
