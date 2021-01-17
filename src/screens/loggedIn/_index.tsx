import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../loading';
import WatchlistStackScreen from './watchlist/_index_stack';
import CommunityScreen from './community/_index';
import HomeScreen from './home';

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
            <BottomTab.Screen name="Watchlist" component={WatchlistStackScreen} />
            <BottomTab.Screen name="Community" component={CommunityScreen} />
          </BottomTab.Navigator>
        </View>
      )}
    </>
  );
}
export default LoggedOutScreen;
