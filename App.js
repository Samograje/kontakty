import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import ListContainer from "./src/components/list/ListContainer";
import DetailsContainer from "./src/components/details/DetailsContainer";
import AddEditContainer from "./src/components/addEdit/AddEditContainer";
import GroupsContainer from "./src/components/groups/GroupsContainer";
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
                          component={ListContainer}
                          options={{title: 'Contacts'}}
            />
            <Stack.Screen name="Details"
                          component={DetailsContainer}
                          options={{title: 'Details'}}
            />
            <Stack.Screen name="AddEdit"
                          component={AddEditContainer}
                          options={{title: 'New contact/Edit Contact'}}
            />
            <Stack.Screen name="Groups"
                          component={GroupsContainer}
                          options={{title: 'Groups'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
