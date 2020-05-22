import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { colors, fonts, margin, padding } from '../../../styles/common';

const { width } = Dimensions.get('window');

interface Props {
    modalVisible: boolean;
    setModalVisible: (boolean) => void;
    addGroup: (string) => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        padding: padding.sm,
        borderRadius: 10,
        borderColor: colors.primaryDark,
        borderWidth: 1,
        backgroundColor: 'white',
        width: width - 30,
        height: 150,
    },
    textInput: {
        margin: margin.sm,
        fontSize: fonts.md,
        backgroundColor: '#fff',
    },
    addText: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
});

const AddGroupModal = (props: Props) => {
    const [modalInput, setModalInput] = useState('');
    const { modalVisible, setModalVisible, addGroup } = props;

    const onAddGroupPress = useCallback(() => {
        addGroup(modalInput);
        setModalVisible(false);
        setModalInput('');
    }, [addGroup, setModalVisible, setModalInput, modalInput]);

    return (
        <Modal
            onDismiss={(): void => {
                setModalVisible(false);
            }}
            isVisible={modalVisible}
            onBackButtonPress={(): void => {
                setModalVisible(false);
            }}
            onBackdropPress={(): void => {
                setModalVisible(false);
            }}
            backdropOpacity={0.3}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <TextInput
                        numberOfLines={1}
                        style={styles.textInput}
                        theme={{ colors: { primary: colors.primaryDark } }}
                        label={'Group name'}
                        onChangeText={(text) => setModalInput(text)}
                    />
                    <Button
                        compact={true}
                        color={colors.primaryDark}
                        style={styles.addText}
                        onPress={onAddGroupPress}
                        disabled={!modalInput}
                    >
                        Add group
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

export default AddGroupModal;
