import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PastScreen from './past';
import PresentScreen from './present';
import FutureScreen from './future';

function WatchlistScreen() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Watching"
      tabBarOptions={{
        labelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
          fontSize: 20,
        },
        indicatorStyle: {
          backgroundColor: '#15616d',
        },
      }}>
      <Tab.Screen name="Seen" component={PastScreen} />
      <Tab.Screen name="Watching" component={PresentScreen} />
      <Tab.Screen name="To See" component={FutureScreen} />
    </Tab.Navigator>
  );
}
export default WatchlistScreen;
