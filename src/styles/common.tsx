import { Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
};

export const colors = {
    primary: '#2195f2',
    primaryLight: '#6ec5ff',
    primaryDark: '#0068bf',
    secondary: '#ffc107',
    secondaryLight: '#fff350',
    secondaryDark: '#c79100',
    text: '#000000',
    textWhite: '#FFF',
    background: '#e0e0e0',
    tint: '#E8EAF6',
    icon: Colors.grey600,
};

export const padding = {
    xs: 5,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
};

export const margin = {
    vsm: 5,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
};

export const fonts = {
    sm: 12,
    md: 18,
    lg: 28,
};

export const radius = {
    sm: 10,
    md: 20,
    lg: 30,
};
