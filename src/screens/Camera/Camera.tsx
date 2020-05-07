import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, BackHandler } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    },
    iconContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    icon: {
        color: '#fff',
        fontSize: 40,
    },
});

interface Props {
    setImage: (string) => void;
    setIsCameraOn: (boolean) => void;
}

const CameraView = (props: Props): JSX.Element => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const camera = useRef(null);
    const { setImage, setIsCameraOn } = props;

    const handleCameraType = useCallback(() => {
        setCameraType(
            cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        );
    }, [cameraType]);

    const takePicture = useCallback(async () => {
        if (camera) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const photo = await camera.takePictureAsync();
            photo && setImage(photo.uri);
            setIsCameraOn(false);
        }
    }, [setImage, setIsCameraOn]);

    const pickImage = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setIsCameraOn(false);
        }
    }, [setImage, setIsCameraOn]);

    useEffect(() => {
        const backAction = (): boolean => {
            setIsCameraOn(false);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return (): void => backHandler.remove();
    }, [setIsCameraOn]);

    return (
        <View style={styles.container}>
            <Camera style={styles.container} type={cameraType} ref={camera}>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconContainer} onPress={(): Promise<void> => pickImage()}>
                        <Ionicons name='ios-photos' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={(): Promise<void> => takePicture()}>
                        <FontAwesome name='camera' style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={(): void => handleCameraType()}>
                        <MaterialCommunityIcons name='camera-switch' style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

export default CameraView;
