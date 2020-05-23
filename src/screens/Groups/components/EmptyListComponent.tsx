import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { fonts, margin } from '../../../styles/common';

const styles = StyleSheet.create({
    informationContainer: {
        flex: 1,
        margin: margin.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: fonts.lg,
        margin: margin.sm,
        textAlign: 'center',
    },
});

const EmptyListComponent = () => {
    return (
        <View style={styles.informationContainer}>
            <MaterialCommunityIcons size={100} name={'account-group'} />
            <Text style={styles.message}>No groups available. Add one!</Text>
        </View>
    );
};

export default EmptyListComponent;
