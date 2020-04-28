import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import ContactsListScreen from "./src/screens/ContactsList";
import DetailsScreen from "./src/screens/Details";
import AddEditScreen from "./src/screens/AddEdit";
import GroupsScreen from "./src/screens/Groups";
import configureStore from './src/redux/Store';

const Stack = createStackNavigator();
const store = configureStore();
const persistedStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="List"
                           screenOptions={{
                             headerStyle: {
                               backgroundColor: 'darkgreen'
                             },
                             headerTintColor: 'white',
                           }}
          >
            <Stack.Screen name="List"
                          component={ContactsListScreen}
                          options={{title: 'Contacts'}}
            />
            <Stack.Screen name="Details"
                          component={DetailsScreen}
                          options={{title: 'Details'}}
            />
            <Stack.Screen name="AddEdit"
                          component={AddEditScreen}
                          options={{title: 'New contact/Edit Contact'}}
            />
            <Stack.Screen name="Groups"
                          component={GroupsScreen}
                          options={{title: 'Groups'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
