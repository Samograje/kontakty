import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyListComponent = () => {
    return (
        <View style={styles.informationContainer}>
            <Text style={styles.message}>No items available</Text>
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
        margin: 5,
        color: '#80BDFF'
    }
});

export default EmptyListComponent;
