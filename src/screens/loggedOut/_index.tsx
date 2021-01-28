import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignInScreen from './signIn';
import SignUpScreen from './signUp';

function LoggedOutScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 28},
          indicatorStyle: {
            backgroundColor: '#15616d',
          },
        }}>
        <Tab.Screen name="Sign In" component={SignInScreen} />
        <Tab.Screen name="Sign Up" component={SignUpScreen} />
      </Tab.Navigator>
    </View>
  );
}
export default LoggedOutScreen;
