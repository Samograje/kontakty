import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, padding } from '../../styles/common';

interface Props {
    elementsCount: number;
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: colors.primaryDark,
        padding: 5,
        paddingHorizontal: padding.sm,
    },
});

const HeaderBarWithMultipleChoice = (props: Props): ReactElement => {
    return (
        <View style={styles.container}>
            <Text>{props.elementsCount} item(s) selected</Text>
        </View>
    );
};

export default HeaderBarWithMultipleChoice;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
