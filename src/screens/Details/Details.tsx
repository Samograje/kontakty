import React from 'react';
import {Button, FlatList, Image, Platform, SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import {Linking} from 'react-native'
import {Divider} from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import {handlePress} from "react-native-paper/lib/typescript/src/components/RadioButton/utils";

interface Props {
    id: number,
    onEdit: (id: number) => {},
}

const Details = (props: Props) => {
    const {
        id,
        onEdit,

    } = props;

    const PHONE_NUMBERS = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            phoneNumber: '123 456 789',
            category: 'dom'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            phoneNumber: '123 456 789',
            category: 'służbowy',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            phoneNumber: '694311180',
            category: 'komórka',

        },
    ];

    const E_MAILS = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            eMail: 'samograjepolsl@gmail.com',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            eMail: 'zbigniew.sroczynski@polsl.pl',
        },
    ];

    function makeCall(phoneNumber : string) {
        console.log(phoneNumber);
        if(phoneNumber !== null && phoneNumber !== 'undefined'){
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${phoneNumber}';
            } else {
                phoneNumber = 'telprompt:${phoneNumber}';
            }
            Linking.openURL(phoneNumber);
        }
    };

    function sendSMS(phoneNumber : string) {
        console.log(phoneNumber);
        if(phoneNumber !== null && phoneNumber !== 'undefined'){
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${phoneNumber}`;
            } else {
                phoneNumber = `telprompt:${phoneNumber}`;
            }
            Linking.openURL(`sms:&addresses=${phoneNumber}&body=`);
        }
    };

    function sendEMail(eMail : string) {
        console.log(eMail);
        if(eMail !== null && eMail !== 'undefined'){
            Linking.openURL(`mailto:${eMail}?subject=&body=`);
        }
    };

    function PhoneNumberItem({item}) {
        return (
          <View style={styles.details}>
              <View style={styles.item}>
                  <Text style={styles.title}>{item.phoneNumber}</Text>
                  <Text style={styles.title}>{item.category}</Text>
              </View>
              <View style={styles.itemActions}>
                  <IconButton
                    icon="phone"
                    color={Colors.green500}
                    size={25}
                    onPress={() => makeCall(item.phoneNumber)}
                  />
                  <IconButton
                    icon="message"
                    color={Colors.green500}
                    size={25}
                    onPress={() => sendSMS((item.phoneNumber))}
                  />
              </View>
          </View>

        );
    }

    function EMailItem({ item }) {
        return (
          <View style={styles.details}>
              <Text style={styles.title}>{item.eMail}</Text>
              <View style={styles.itemActions}>
                  <IconButton
                              icon="email"
                              color={Colors.green500}
                              size={25}
                              onPress={() => sendEMail((item.eMail))}
                  />
              </View>
          </View>
        );
    }

    return (
      <View style={styles.container}>

          <View style={styles.avatar}>
              <Avatar
                size="large"
                rounded={true}
                icon={{name: 'user', type: 'font-awesome'}}
              />
              <Text style={styles.name}>Zdzisław Sroczyński</Text>
          </View>

          <View style={styles.actions}>
              <IconButton style={styles.button}
                          icon="account-heart"
                          color={Colors.grey500}
                          size={50}
                          onPress={() => console.log('<3')}
              />
              <IconButton style={styles.button}
                          icon="account-edit"
                          color={Colors.grey500}
                          size={50}
                          onPress={() => {
                              onEdit(id)
                          }}
              />
              <IconButton style={styles.button}
                          icon="delete"
                          color={Colors.grey500}
                          size={50}
                          onPress={() => console.log('delete')}
              />
              <IconButton
                icon="account-group"
                color={Colors.grey500}
                size={50}
                onPress={() => console.log('account-group')}
              />
          </View>


          <SafeAreaView style={styles.container}>
              <FlatList
                data={PHONE_NUMBERS}
                renderItem={({ item }) => <PhoneNumberItem item={item} />}
                keyExtractor={item => item.id}
              />
          </SafeAreaView>

          <SafeAreaView style={styles.container}>
              <FlatList
                data={E_MAILS}
                renderItem={({ item }) => <EMailItem item={item} />}
                keyExtractor={item => item.id}
              />
          </SafeAreaView>


      </View>


    );
};

const styles = StyleSheet.create({
    avatar: {
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 24
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    container: {
        flex: 4
    },
    button: {
        width: '20%',
    },
    header: {
        fontSize: 20,
        backgroundColor: "#fff"
    },
    item: {

        marginHorizontal: 8,
    },
    title: {
        fontSize: 16,
        justifyContent: 'center'
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
        justifyContent: 'center'
    }

});

export default Details;
