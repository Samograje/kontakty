import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';

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
        padding: 5,
        borderRadius: 10,
        borderColor: '#0d8b0c',
        borderWidth: 1,
        backgroundColor: 'white',
        width: width - 30,
        height: 150,
    },
    textInput: {
        margin: 10,
        backgroundColor: 'white',
        borderColor: '#0d8b0c',
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
            backdropColor={'#c8c8c8'}
            backdropOpacity={0.2}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <TextInput
                        numberOfLines={1}
                        style={styles.textInput}
                        label={'Group name'}
                        onChangeText={(text) => setModalInput(text)}
                    />
                    <Button
                        compact={true}
                        color={'#0d8b0c'}
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