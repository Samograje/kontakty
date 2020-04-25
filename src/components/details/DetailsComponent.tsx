import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

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
      <View>
          <Text>Imię i nazwisko kontaktu o id: {id}</Text>

          <View style={styles.container}>
              <IconButton style={styles.button}
                          icon="account-heart"
                          color={Colors.blue500}
                          size={100}
                          onPress={() => console.log('<3')}
              />
              <IconButton style={styles.button}
                          icon="account-edit"
                          color={Colors.blue500}
                          size={100}
                          onPress={() => {onEdit(id)}}
              />
          </View>

      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '50%',
    }
});

export default DetailsComponent;
