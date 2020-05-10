import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
    groups: any;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const GroupsList = (props: Props) => {
    const { groups } = props;

    return <></>;
};

export default GroupsList;
