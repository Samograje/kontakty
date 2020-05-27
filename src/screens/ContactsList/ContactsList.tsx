import React, { ReactElement } from 'react';
import { SectionList, SectionListRenderItem, SectionListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Colors, FAB } from 'react-native-paper';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ContactListItem from './ContactListItem';
import ContactsListSectionHeader from './ContactsListSectionHeader';
import ContactsListEmptyBanner from './ContactsListEmptyBanner';
import HeaderBarWithSearch from './HeaderBarWithSearch';
import { colors } from '../../styles/common';
import { makeCall, sendSMS } from '../../utils/actions';

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
    onItemSelect: (itemId: number | null) => void;
    selectedIds: number[];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    selected: {
        color: Colors.red500,
    },
    fixedView: {
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    fab: {
        zIndex: 200,
        backgroundColor: colors.secondaryDark,
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
        onItemSelect,
        selectedIds,
    } = props;

    const keyExtractor = (item, index): string => item + index;
    const renderItem: SectionListRenderItem<Contact> = (p: SectionListRenderItemInfo<Contact>): ReactElement => {
        let onSwipeLeft;
        let onSwipeRight;
        if (selectedIds.length === 0) {
            onSwipeLeft = (): void => sendSMS(p.item.telNumbers[0]?.number);
            onSwipeRight = (): void => makeCall(p.item.telNumbers[0]?.number);
        }
        let onLongPress;
        if (!searchText) {
            onLongPress = (): void => onItemSelect(p.item.id);
        }
        return (
            <ContactListItem
                item={p.item}
                onPress={(): void => onView(p.item.id)}
                onLongPress={onLongPress}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                isSelected={selectedIds.includes(p.item.id)}
            />
        );
    };

    return (
        <View style={styles.container}>
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
                        <FAB style={styles.fab} icon='plus' onPress={onCreate} color={colors.text} />
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
