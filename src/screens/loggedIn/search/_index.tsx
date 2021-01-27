import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './searchScreen';
import SearchGroupScreen from './searchGroupScreen';
import ContentSearchScreen from './contentSearchScreen';
import SearchResultsScreen from './searchResultsScreen';

function SearchContentScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="search">
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="search"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="searchGroup"
        component={SearchGroupScreen}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="contentSearch"
        component={ContentSearchScreen}
      />
      <Stack.Screen
        options={{headerShown: false, headerBackTitleVisible: false}}
        name="SearchResults"
        component={SearchResultsScreen}
      />
    </Stack.Navigator>
  );
}
export default SearchContentScreen;
