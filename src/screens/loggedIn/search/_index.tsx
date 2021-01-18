import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './searchScreen';
import SearchGroupScreen from './searchGroupScreen';
import ContentSearchScreen from './contentSearchScreen';
import SearchResultsScreen from './searchResultsScreen';

function SearchContentScreen() {
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
          <View style={{ height: '100%' }}>
            <Stack.Navigator initialRouteName="search">
              <Stack.Screen
                options={{ headerShown: false, headerBackTitleVisible: false }}
                name="search"
                component={SearchScreen}
              />
              <Stack.Screen
                options={{ headerShown: false, headerBackTitleVisible: false }}
                name="searchGroup"
                component={SearchGroupScreen}
              />
              <Stack.Screen
                options={{ headerShown: false, headerBackTitleVisible: false }}
                name="contentSearch"
                component={ContentSearchScreen}
              />
              <Stack.Screen
                options={{ headerShown: false, headerBackTitleVisible: false }}
                name="SearchResults"
                component={SearchResultsScreen}
              />
            </Stack.Navigator>
          </View>
        )}
    </>
  );
}
export default SearchContentScreen;
