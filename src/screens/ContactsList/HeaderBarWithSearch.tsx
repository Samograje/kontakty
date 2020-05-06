import React, { ReactElement } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    totalElements: number;
    searchText: string;
    onSearch: (query: string) => void;
    onClearSearch: () => void;
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: 'darkgreen',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'whitesmoke',
    },
    clearButton: {
        justifyContent: 'center',
    },
});

const HeaderBarWithSearch = (props: Props): ReactElement => {
    const { totalElements, searchText, onSearch, onClearSearch } = props;
    const placeholder = `Search contacts (${totalElements})`;
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={onSearch}
                placeholder={placeholder}
                placeholderTextColor='whitesmoke'
            />
            {searchText.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={onClearSearch}>
                    <Icon name='md-close' color='whitesmoke' size={30} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default HeaderBarWithSearch;
