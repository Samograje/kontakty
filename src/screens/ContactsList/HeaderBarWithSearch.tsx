import React, { ReactElement } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts, margin, padding } from '../../styles/common';

interface Props {
    totalElements: number;
    searchText: string;
    onSearch: (query: string) => void;
    onClearSearch: () => void;
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: colors.primaryDark,
        padding: 5,
        paddingHorizontal: padding.sm,
    },
    searchBar: {
        flex: 1,
        elevation: 10,
        paddingHorizontal: padding.md,
        borderRadius: 2,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
    },
    searchIcon: {
        textAlignVertical: 'center',
    },
    input: {
        marginLeft: margin.md,
        flex: 1,
        fontSize: fonts.md,
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
            <View style={styles.searchBar}>
                <Icon style={styles.searchIcon} name='md-search' size={25} />
                <TextInput
                    style={styles.input}
                    value={searchText}
                    onChangeText={onSearch}
                    placeholder={placeholder}
                    placeholderTextColor='gray'
                />
                {searchText.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={onClearSearch}>
                        <Icon name='md-close' size={25} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default HeaderBarWithSearch;
