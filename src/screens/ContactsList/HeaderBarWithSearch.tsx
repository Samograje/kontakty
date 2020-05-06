import React, { ReactElement } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
    totalElements: number;
    onSearch: (query: string) => void;
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: 'darkgreen',
        padding: 10,
        paddingLeft: 20,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'whitesmoke',
    },
});

const HeaderBarWithSearch = (props: Props): ReactElement => {
    const placeholder = `Search contacts (${props.totalElements})`;
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={props.onSearch}
                placeholder={placeholder}
                placeholderTextColor='whitesmoke'
            />
        </View>
    );
};

export default HeaderBarWithSearch;
