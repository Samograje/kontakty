import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from "./src/components/list/ListContainer";
import DetailsContainer from "./src/components/details/DetailsContainer";
import AddEditContainer from "./src/components/addEdit/AddEditContainer";
import GroupsContainer from "./src/components/groups/GroupsContainer";
const Stack = createStackNavigator();

const App = () =>{
  return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="List"
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
  );
};

export default App;