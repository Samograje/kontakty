import React from 'react';
import { Button, FlatList, Image, Platform, SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { Linking } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Contact } from '../../redux/reducers/ContactsReducer';

interface Props {
    id: number;
    onEdit: (id: number) => {};
    onDelete: () => void;
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
        marginBottom: 10,
    },
    container: {
        flex: 4,
    },
    button: {
        width: '20%',
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

const Details = (props: Props) => {
    const { id, onEdit, onDelete, contact } = props;

    function makeCall(phoneNumber: string) {
        if (phoneNumber !== null && phoneNumber !== 'undefined') {
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${phoneNumber}';
            } else {
                phoneNumber = 'telprompt:${phoneNumber}';
            }
            Linking.openURL(phoneNumber);
        }
    }

    function sendSMS(phoneNumber: string) {
        if (phoneNumber !== null && phoneNumber !== 'undefined') {
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${phoneNumber}`;
            } else {
                phoneNumber = `telprompt:${phoneNumber}`;
            }
            Linking.openURL(`sms:&addresses=${phoneNumber}&body=`);
        }
    }

    function sendEMail(eMail: string) {
        if (eMail !== null && eMail !== 'undefined') {
            Linking.openURL(`mailto:${eMail}?subject=&body=`);
        }
    }

    function PhoneNumberItem({ item }) {
        return (
            <View style={styles.details}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.number}</Text>
                    <Text style={styles.title}>{item.category}</Text>
                </View>
                <View style={styles.itemActions}>
                    <IconButton icon='phone' color={Colors.green500} size={25} onPress={() => makeCall(item.number)} />
                    <IconButton icon='message' color={Colors.green500} size={25} onPress={() => sendSMS(item.number)} />
                </View>
            </View>
        );
    }

    function EMailItem({ item }) {
        if (contact.emails.length > 0) {
            console.log(contact.emails);
            return (
                <View style={styles.details}>
                    <Text style={styles.title}>{item.email}</Text>
                    <View style={styles.itemActions}>
                        <IconButton
                            icon='email'
                            color={Colors.green500}
                            size={25}
                            onPress={() => sendEMail(item.email)}
                        />
                    </View>
                </View>
            );
        } else {
            return <View style={styles.details}></View>;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar size='large' rounded={true} icon={{ name: 'user', type: 'font-awesome' }} />
                <Text style={styles.name}>
                    {contact.firstName} {contact.lastName}
                </Text>
            </View>

            <View style={styles.actions}>
                <IconButton
                    style={styles.button}
                    icon='account-heart'
                    color={Colors.grey500}
                    size={50}
                    onPress={() => console.log('<3')}
                />
                <IconButton
                    style={styles.button}
                    icon='account-edit'
                    color={Colors.grey500}
                    size={50}
                    onPress={() => {
                        onEdit(id);
                    }}
                />
                <IconButton
                    style={styles.button}
                    icon='delete'
                    color={Colors.grey500}
                    size={50}
                    onPress={() => {
                        onDelete();
                    }}
                />
                <IconButton
                    icon='account-group'
                    color={Colors.grey500}
                    size={50}
                    onPress={() => console.log('account-group')}
                />
            </View>

            <SafeAreaView style={styles.container}>
                <FlatList data={contact.telNumbers} renderItem={({ item }) => <PhoneNumberItem item={item} />} />
            </SafeAreaView>

            <SafeAreaView style={styles.container}>
                <FlatList data={contact.emails} renderItem={({ item }) => <EMailItem item={item} />} />
            </SafeAreaView>
        </View>
    );
};

export default Details;
