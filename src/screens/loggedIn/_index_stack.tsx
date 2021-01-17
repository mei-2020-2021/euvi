import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoggedInScreen from './_index';
import ProfileScreen from './profile';
import ContentScreen from './contentScreen';

function LoggedInStackScreen() {
  const Stack = createStackNavigator();

  return (
    <View style={{height: '100%'}}>
      <Stack.Navigator initialRouteName="LoggedInScreen">
        <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} options={{header: () => null}} />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerBackTitleVisible: false, headerTitle: 'Profile'}}
        />
        <Stack.Screen
          name="ContentScreen"
          component={ContentScreen}
          options={({route}) => ({title: route.params.title, headerBackTitleVisible: false})}
        />
      </Stack.Navigator>
    </View>
  );
}
export default LoggedInStackScreen;
