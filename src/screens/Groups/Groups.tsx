import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

interface Props {
    id: number,
}

const Groups = (props: Props) => {
    const {
        id,
    } = props;

    return (
        <View>
            <Text>Tutaj będą grupy id:{id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Groups;
