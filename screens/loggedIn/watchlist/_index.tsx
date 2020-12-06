import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';

import WatchedScreen from './watched';
import WatchingScreen from './watching';
import ToWatchScreen from './toWatch';

function ProfileScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{height: '100%'}}>
          <Tab.Navigator tabBarOptions={{labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20}}}>
            <Tab.Screen name="Watched" component={WatchedScreen} />
            <Tab.Screen name="Watching" component={WatchingScreen} />
            <Tab.Screen name="Watchlist" component={ToWatchScreen} />
          </Tab.Navigator>
        </View>
      )}
    </>
  );
}
export default ProfileScreen;
