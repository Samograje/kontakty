import React from 'react';
import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { Linking } from 'react-native';
import { Contact } from '../../redux/reducers/ContactsReducer';
import ProperAvatar from '../ProperAvatar';

interface Props {
    id: number;
    onEdit: (id: number) => {};
    onDelete: () => void;
    onGroupList: () => void;
    contact: Contact;
}

const styles = StyleSheet.create({
    avatar: {
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    container: {
        flex: 4,
    },
    button: {
        width: '25%',
    },
    header: {
        fontSize: 20,
        backgroundColor: '#fff',
    },
    item: {
        marginHorizontal: 8,
    },
    title: {
        fontSize: 16,
        justifyContent: 'center',
    },
    details: {
        flex: 1,
        backgroundColor: Colors.grey50,
        padding: 8,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemActions: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

const Details = (props: Props): JSX.Element => {
    const { id, onEdit, onDelete, onGroupList, contact } = props;

    function makeCall(phoneNumber: string): void {
        if (phoneNumber !== null && phoneNumber !== 'undefined') {
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${phoneNumber}';
            } else {
                phoneNumber = 'telprompt:${phoneNumber}';
            }
            Linking.openURL(phoneNumber)
                .then((r) => console.log(r))
                .catch(function(error) {
                    console.log('There has been a problem with operation: ' + error.message);
                    // ADD THIS THROW error
                    throw error;
                });
        }
    }

    function sendSMS(phoneNumber: string): void {
        if (phoneNumber !== null && phoneNumber !== 'undefined') {
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${phoneNumber}`;
            } else {
                phoneNumber = `telprompt:${phoneNumber}`;
            }
            Linking.openURL(`sms:&addresses=${phoneNumber}&body=`)
                .then((r) => console.log(r))
                .catch(function(error) {
                    console.log('There has been a problem with operation: ' + error.message);
                    // ADD THIS THROW error
                    throw error;
                });
        }
    }

    function sendEMail(eMail: string): void {
        if (eMail !== null && eMail !== 'undefined') {
            Linking.openURL(`mailto:${eMail}?subject=&body=`)
                .then((r) => console.log(r))
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    // ADD THIS THROW error
                    throw error;
                });
        }
    }

    function PhoneNumberItem({ item }): JSX.Element {
        return (
            <View style={styles.details}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.number}</Text>
                    <Text style={styles.title}>{item.category}</Text>
                </View>
                <View style={styles.itemActions}>
                    <IconButton
                        icon='phone'
                        color={Colors.green500}
                        size={25}
                        onPress={(): void => makeCall(item.number)}
                    />
                    <IconButton
                        icon='message'
                        color={Colors.green500}
                        size={25}
                        onPress={(): void => sendSMS(item.number)}
                    />
                </View>
            </View>
        );
    }

    function EMailItem({ item }): JSX.Element {
        if (contact.emails != null) {
            return (
                <View style={styles.details}>
                    <Text style={styles.title}>{item.email}</Text>
                    <View style={styles.itemActions}>
                        <IconButton
                            icon='email'
                            color={Colors.green500}
                            size={25}
                            onPress={(): void => sendEMail(item.email)}
                        />
                    </View>
                </View>
            );
        } else {
            return <View style={styles.details} />;
        }
    }

    const createAlert = (): void =>
        Alert.alert(
            'Operation Confirm',
            'Are you sure you want to delete this contact?',
            [
                {
                    text: 'Cancel',
                    onPress: (): void => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: (): void => onDelete() },
            ],
            { cancelable: false },
        );

    if (contact !== undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <ProperAvatar
                        path={contact.photoUrl}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        size={70}
                    />
                    <Text style={styles.name}>
                        {contact.firstName} {contact.lastName}
                    </Text>
                </View>

                <View style={styles.actions}>
                    <IconButton
                        style={styles.button}
                        icon='account-edit'
                        color={Colors.grey500}
                        size={50}
                        onPress={(): void => {
                            onEdit(id);
                        }}
                    />
                    <IconButton
                        style={styles.button}
                        icon='delete'
                        color={Colors.grey500}
                        size={50}
                        onPress={(): void => {
                            createAlert();
                        }}
                    />
                    <IconButton icon='account-group' color={Colors.grey500} size={50} onPress={onGroupList} />
                </View>

                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={contact.telNumbers}
                        keyExtractor={(item): string => item.number}
                        renderItem={({ item }): JSX.Element => <PhoneNumberItem item={item} />}
                    />
                </SafeAreaView>

                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={contact.emails}
                        keyExtractor={(item): string => item.email}
                        renderItem={({ item }): JSX.Element => <EMailItem item={item} />}
                    />
                </SafeAreaView>
            </View>
        );
    } else {
        return <View />;
    }
};

export default Details;
