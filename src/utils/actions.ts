import { Linking, Platform } from 'react-native';

export const makeCall = (phoneNumber: string): Promise<any> => {
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${phoneNumber}`;
    } else {
        phoneNumber = `telprompt:${phoneNumber}`;
    }
    return Linking.openURL(phoneNumber)
        .then((r) => console.log(r))
        .catch((error) => {
            console.log('There has been a problem with operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
};

export const sendSMS = (phoneNumber: string): void => {
    if (phoneNumber) {
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        } else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }
        Linking.openURL(`sms:&addresses=${phoneNumber}&body=`)
            .then((r) => console.log(r))
            .catch((error) => {
                console.log('There has been a problem with operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
    }
};

export const sendEMail = (eMail: string): void => {
    if (eMail) {
        Linking.openURL(`mailto:${eMail}?subject=&body=`)
            .then((r) => console.log(r))
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
    }
};
