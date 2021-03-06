import React, { ReactElement } from 'react';
import {
    Alert,
    SectionList,
    SectionListRenderItem,
    SectionListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors, FAB } from 'react-native-paper';
import Swipeable from 'react-native-swipeable-row';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ContactListItem from './ContactListItem';
import ContactsListSectionHeader from './ContactsListSectionHeader';
import ContactsListEmptyBanner from './ContactsListEmptyBanner';
import HeaderBarWithSearch from './HeaderBarWithSearch';
import HeaderBarWithMultipleChoice from './HeaderBarWithMultipleChoice';
import { colors, fonts, padding } from '../../styles/common';

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
    onDeleteContacts: () => void;
    onClearSelection: () => void;
    onMakeCall: (contact: Contact) => void;
    onSendSms: (contact: Contact) => void;
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
    swipeItemText: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: padding.md,
        backgroundColor: colors.secondaryDark,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: fonts.md,
        fontWeight: '900',
        borderRadius: 5,
    },
    textAlignRight: {
        textAlign: 'right',
    },
    textAlignLeft: {
        textAlign: 'left',
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
        onDeleteContacts,
        onClearSelection,
        onMakeCall,
        onSendSms,
    } = props;

    const keyExtractor = (item, index): string => item + index;

    const renderItem: SectionListRenderItem<Contact> = (
        contactInfo: SectionListRenderItemInfo<Contact>,
    ): ReactElement => {
        let onLongPress;
        if (!searchText) {
            onLongPress = (): void => onItemSelect(contactInfo.item.id);
        }

        const key = contactInfo.item.id || -1;

        const leftContent = (
            <Text style={[styles.swipeItemText, styles.textAlignRight]} key={key}>
                Send SMS
            </Text>
        );

        const rightContent = (
            <Text style={[styles.swipeItemText, styles.textAlignLeft]} key={key}>
                Call
            </Text>
        );

        return (
            <Swipeable
                leftContent={leftContent}
                rightContent={rightContent}
                leftActionActivationDistance={200}
                rightActionActivationDistance={200}
                onLeftActionComplete={(): void => onSendSms(contactInfo.item)}
                onRightActionComplete={(): void => onMakeCall(contactInfo.item)}
            >
                <ContactListItem
                    firstName={contactInfo.item.firstName}
                    lastName={contactInfo.item.lastName}
                    photoUrl={contactInfo.item.photoUrl}
                    onPress={(): void => onView(contactInfo.item.id)}
                    onLongPress={onLongPress}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    isSelected={selectedIds.includes(contactInfo.item.id)}
                />
            </Swipeable>
        );
    };

    const createAlert = (): void =>
        Alert.alert(
            'Operation Confirm',
            'Are you sure you want to delete selected contacts?',
            [
                {
                    text: 'Cancel',
                    onPress: (): void => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: (): void => onDeleteContacts() },
            ],
            { cancelable: false },
        );

    return (
        <View style={styles.container}>
            {!forGroupModeEnabled && (
                <>
                    {!!selectedIds.length && (
                        <HeaderBarWithMultipleChoice
                            elementsCount={selectedIds.length}
                            onClearSelection={onClearSelection}
                            onDeleteContacts={createAlert}
                        />
                    )}
                    {!selectedIds.length && (
                        <HeaderBarWithSearch
                            totalElements={totalElements}
                            searchText={searchText}
                            onSearch={onSearch}
                            onClearSearch={onClearSearch}
                        />
                    )}
                    <ContactListItem
                        firstName='My'
                        lastName='groups'
                        photoUrl=''
                        onPress={onGroupList}
                        isSelected={false}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        onLongPress={null}
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
