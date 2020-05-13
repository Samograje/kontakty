import React, { ReactElement, useCallback, useEffect, useState, useMemo } from 'react';
import { Avatar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

interface Props {
    path: string;
    firstName: string;
    lastName: string;
    size: number;
}

const ProperAvatar = (props: Props): ReactElement => {
    const { path, size, firstName, lastName } = props;
    const [fileExists, setFileExists] = useState(false);
    const label = useMemo(() => {
        const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '';
        const secondLetter = lastName ? lastName.charAt(0).toUpperCase() : '';
        const result = firstLetter + secondLetter;

        return result ? result : '?';
    }, [firstName, lastName]);

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

    return fileExists ? <Avatar.Image size={size} source={{ uri: path }} /> : <Avatar.Text size={size} label={label} />;
};

export default ProperAvatar;
