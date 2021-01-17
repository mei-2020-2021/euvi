import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';

import PastScreen from './past';
import PresentScreen from './present';
import FutureScreen from './future';

function WachlistScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        initialRouteName="Watching"
        tabBarOptions={{labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20}}}>
        <Tab.Screen name="Seen" component={PastScreen} />
        <Tab.Screen name="Watching" component={PresentScreen} />
        <Tab.Screen name="To See" component={FutureScreen} />
      </Tab.Navigator>
    </View>
  );
}
export default WachlistScreen;
