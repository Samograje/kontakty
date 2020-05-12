import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
//path: string, name: string, avatarSize: number
const ProperAvatar = (props): ReactElement => {
    const { path, size, name } = props;
    const [fileExists, setFileExists] = useState(false);
    const label = name ? name.charAt(0).toUpperCase() : '?';

    const checkPath = useCallback(async () => {
        try {
            const { exists } = await FileSystem.getInfoAsync(path);
            return exists;
        } catch (error) {
            console.log(error);
            return false;
        }
    }, [path]);

    useEffect(() => {
        checkPath().then((response) => setFileExists(response));
    }, [checkPath]);

    return fileExists ? (
        <Avatar.Image size={size} source={{ uri: path }} />
    ) : (
        <Avatar.Text size={size} label={label} />
    );
};

export default ProperAvatar;
