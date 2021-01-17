import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import WatchlistScreen from './_index';
import ContentScreen from '../contentScreen';

function WachlistStackScreen() {
  const Stack = createStackNavigator();

  return (
    <View style={{height: '100%'}}>
      <Stack.Navigator initialRouteName="Watchlist">
        <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} options={{header: () => null}} />
        <Stack.Screen
          name="ContentScreen"
          component={ContentScreen}
          options={({route}) => ({title: route.params.title, headerBackTitleVisible: false})}
        />
      </Stack.Navigator>
    </View>
  );
}
export default WachlistStackScreen;
