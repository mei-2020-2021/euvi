import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../loading';
import WatchlistScreen from './watchlist/_index';
import CommunityScreen from './community/_index';
import HomeScreen from './home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function LoggedInScreen() {
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
            <BottomTab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => <Icon name="movie-search" color={color} size={size} />,
              }}
            />
            <BottomTab.Screen
              name="Watchlist"
              component={WatchlistScreen}
              options={{
                tabBarLabel: 'Watchlist',
                tabBarIcon: ({color, size}) => <Icon name="view-carousel" color={color} size={size} />,
              }}
            />
            <BottomTab.Screen
              name="Community"
              component={CommunityScreen}
              options={{
                tabBarLabel: 'Community',
                tabBarIcon: ({color, size}) => <Icon name="account-group" color={color} size={size} />,
              }}
            />
          </BottomTab.Navigator>
        </View>
      )}
    </>
  );
}
export default LoggedInScreen;
