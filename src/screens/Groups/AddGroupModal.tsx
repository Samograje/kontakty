import React, {useCallback, useState} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import Modal from 'react-native-modal';

const {width} = Dimensions.get('window');

interface Props {
    modalVisible: boolean,
    setModalVisible: (boolean) => void,
    addGroup: (string) => void,
}

const AddGroupModal = (props: Props) => {
    const [modalInput, setModalInput] = useState('');
    const {modalVisible, setModalVisible, addGroup} = props;

    const onAddGroupPress = useCallback(() => {
        addGroup(modalInput);
        setModalVisible(false);
        setModalInput('');
    }, [addGroup, setModalVisible, setModalInput, modalInput]);

    return (
        <Modal
            onDismiss={() => {
                setModalVisible(false);
            }}
            isVisible={modalVisible}
            onBackButtonPress={() => {
                setModalVisible(false);
            }}
            onBackdropPress={() => {
                setModalVisible(false);
            }}
            backdropColor={'#c8c8c8'}
            backdropOpacity={0.2}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <TextInput numberOfLines={1}
                               style={styles.textInput}
                               label={'Group name'}
                               onChangeText={text => setModalInput(text)}
                    />
                    <Button
                        compact={true}
                        style={styles.addText}
                        onPress={onAddGroupPress}
                        disabled={!modalInput}>
                        Add group
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

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
    },
    addText: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
});

export default AddGroupModal;
