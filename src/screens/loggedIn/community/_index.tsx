import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {createStackNavigator} from '@react-navigation/stack';
import CommunityHomeScreen from './Community';
import NewFriend from './NewFriend';
import NewGroup from './NewGroup';
import Recommendations from './Recommendation';

function CommunityScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  const Stack = createStackNavigator();
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{height: '100%'}}>
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
        </View>
      )}
    </>
  );
}
export default CommunityScreen;
