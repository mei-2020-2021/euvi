import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../loading';
import WatchlistScreen from './watchlist/_index';
import CommunityScreen from './community/_index';
import HomeScreen from './home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchContentScreen from './search/_index';

function LoggedInScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#aaaaaa',
        labelStyle: {fontWeight: 'bold'},
        style: {
          backgroundColor: '#15616d',
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Icon name="view-dashboard" color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchContentScreen}
        options={{
          tabBarLabel: 'Search',
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
  );
}
export default LoggedInScreen;
