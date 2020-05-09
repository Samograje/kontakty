import React from 'react';
import { StyleSheet, View, TouchableOpacity, BackHandler, EasingFunction } from 'react-native';
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

interface State {
    cameraType: EasingFunction;
}

export default class CameraView extends React.Component<Props, State> {
    state = {
        cameraType: Camera.Constants.Type.back,
    };

    backAction = (): boolean => {
        const { setIsCameraOn } = this.props;
        setIsCameraOn(false);
        return true;
    };

    componentDidMount(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
    }

    componentWillUnmount(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.backHandler.remove();
    }

    handleCameraType = (): void => {
        const { cameraType } = this.state;

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        });
    };

    takePicture = async (): Promise<void> => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            if (this.camera) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                const photo = await this.camera.takePictureAsync();
                photo && this.props.setImage(photo.uri);
                this.props.setIsCameraOn(false);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    pickImage = async (): Promise<void> => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                this.props.setImage(result.uri);
                this.props.setIsCameraOn(false);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.container}
                    type={this.state.cameraType}
                    ref={(ref): void => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        this.camera = ref;
                    }}
                >
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconContainer} onPress={(): Promise<void> => this.pickImage()}>
                            <Ionicons name='ios-photos' style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={this.takePicture.bind(this)}>
                            <FontAwesome name='camera' style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={(): void => this.handleCameraType()}>
                            <MaterialCommunityIcons name='camera-switch' style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}
