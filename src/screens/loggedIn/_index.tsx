import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../loading';

import WatchlistScreen from './watchlist/_index';
import HomeScreen from './home';
import ProfileScreen from './profile';

function LoggedOutScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  const BottomTab = createBottomTabNavigator();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{height: '100%'}}>
          <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name="Watchlist" component={WatchlistScreen} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} />
          </BottomTab.Navigator>
        </View>
      )}
    </>
  );
}
export default LoggedOutScreen;
