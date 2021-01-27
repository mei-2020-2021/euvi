import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CommunityHomeScreen from './Community';
import NewFriend from './newFriend';
import NewGroup from './newGroup';
import Recommendations from './recommendations';

function CommunityScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Community">
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="Community"
        component={CommunityHomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="NewGroup"
        component={NewGroup}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="NewFriend"
        component={NewFriend}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="Recommendations"
        component={Recommendations}
      />
    </Stack.Navigator>
  );
}
export default CommunityScreen;
