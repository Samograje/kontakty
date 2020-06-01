/* eslint-disable prettier/prettier */
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import ContactsListScreen from './src/screens/ContactsList';
import DetailsScreen from './src/screens/Details';
import AddEditScreen from './src/screens/AddEdit';
import GroupsScreen from './src/screens/Groups';
import configureStore from './src/redux/Store';
import GroupsListScreen from './src/screens/GroupsList';
import { colors } from './src/styles/common';
import { StatusBar, YellowBox } from 'react-native';

const Stack = createStackNavigator();
const store = configureStore();
const persistedStore = persistStore(store);

const App = (): ReactElement => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore} loading={null}>
                <PaperProvider>
                <StatusBar backgroundColor={colors.primaryDark} />
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='List'
                        screenOptions={{
                            cardStyle: {
                                //Styl całego widoku
                                backgroundColor: colors.background,
                            },
                            headerStyle: {
                                backgroundColor: colors.primaryDark,
                            },
                            headerTintColor: colors.tint,
                        }}
                    >
                        <Stack.Screen
                            name='List'
                            component={ContactsListScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Details'
                            component={DetailsScreen}
                            options={{ title: 'Details' }}
                        />
                        <Stack.Screen
                            name='AddEdit'
                            component={AddEditScreen}
                            options={{ title: 'New contact/Edit Contact' }}
                        />
                        <Stack.Screen
                            name='Groups'
                            component={GroupsScreen}
                            options={{ title: 'Select groups' }}
                        />
                        <Stack.Screen
                            name='GroupsList'
                            component={GroupsListScreen}
                            options={{ title: 'My groups' }}
                        />
                        <Stack.Screen
                            name='ContactsListForGroup'
                            component={ContactsListScreen}
                            options={{ title: 'Contacts in group' }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

YellowBox.ignoreWarnings([
   'Please update the following components: Swipeable',
]);

// noinspection JSUnusedGlobalSymbols
export default App;
