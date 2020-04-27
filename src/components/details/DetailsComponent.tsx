import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import {Linking} from 'react-native'
import {Divider} from 'react-native-elements';
import {Avatar} from 'react-native-elements';

interface Props {
    id: number,
    onEdit: (id: number) => {},
}

const DetailsComponent = (props: Props) => {
    const {
        id,
        onEdit,

    } = props;
    return (
      <View style={styles.all}>
          <Avatar
            size="xlarge"
            icon={{name: 'user', type: 'font-awesome'}}
            containerStyle={{flex: 2, marginLeft: 20, marginTop: 100, marginRight: 20, marginBottom: 100}}
            onPress={() => console.log("Works!")}
            showEditButton
          />
          <View>

              <Text style={styles.name}>Zdzisław Sroczyński</Text>
          </View>
          <Divider style={{backgroundColor: 'blue'}}/>


          <View style={styles.container}>

              <IconButton style={styles.button}
                          icon="account-heart"
                          color={Colors.blue500}
                          size={50}
                          onPress={() => console.log('<3')}
              />
              <IconButton style={styles.button}
                          icon="account-edit"
                          color={Colors.blue500}
                          size={50}
                          onPress={() => {
                              onEdit(id)
                          }}
              />
              <IconButton style={styles.button}
                          icon="delete"
                          color={Colors.blue500}
                          size={50}
                          onPress={() => console.log('delete')}
              />
              <IconButton
                          icon="account-group"
                          color={Colors.blue500}
                          size={50}
                          onPress={() => console.log('account-group')}
              />
          </View>

          <Divider style={{backgroundColor: 'blue'}}/>
          <View>
              <View style={styles.phone}>
                  <Text>+48 123 456 789</Text>
                  <IconButton
                              icon="phone"
                              color={Colors.blue500}
                              size={25}
                              onPress={() => console.log('call')}
                  />
                  <IconButton
                              icon="message"
                              color={Colors.blue500}
                              size={25}
                              onPress={() => console.log('m')}
                  />
              </View>

              <View style={styles.mail}>
                  <Text>samograjepolsl@gmail.com</Text>
                  <IconButton style={styles.button}
                              icon="email"
                              color={Colors.blue500}
                              size={25}
                              onPress={() => console.log('delete')}
                  />
              </View>
          </View>

      </View>
    );
};

const styles = StyleSheet.create({
    all: {
        flexDirection:'column'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '20%',
    },
    name: {
        fontSize: 24
    },
    phone: {
        flexDirection: 'row',
    },
    mail: {
        flexDirection: 'row',
    }
});

export default DetailsComponent;
