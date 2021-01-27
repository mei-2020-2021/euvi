import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoggedInScreen from './_index';
import ProfileScreen from './profile';
import ContentScreen from './contentScreen';
import AddServiceScreen from './manageServices';

function LoggedInStackScreen() {
  const Stack = createStackNavigator();

  return (
    <View style={{height: '100%'}}>
      <Stack.Navigator initialRouteName="LoggedInScreen">
        <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} options={{header: () => null}} />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="ContentScreen"
          component={ContentScreen}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="AddServiceScreen"
          component={AddServiceScreen}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    </View>
  );
}
export default LoggedInStackScreen;
