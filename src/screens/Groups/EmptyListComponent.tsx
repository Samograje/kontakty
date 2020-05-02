import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

const EmptyListComponent = () => {
    return (
        <View style={styles.informationContainer}>
            <MaterialCommunityIcons size={100}
                                    name={'account-group'}
            />
            <Text style={styles.message}>No groups available. Add one!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    informationContainer: {
        flex: 1,
        marginBottom: 3,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        fontSize: 18,
        margin: 5
    }
});

export default EmptyListComponent;
