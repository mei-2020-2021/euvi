import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInScreen from './screens/sign/in';
import SignUpScreen from './screens/sign/up';
import SignOutScreen from './screens/sign/out';
import ProfileScreen from './screens/profile';
import SearchScreen from './screens/search';
import SettingsScreen from './screens/settings';
import LoadingScreen from './screens/loading';

const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  function onAuthStateChanged(user: any) {
    setUser(user);
    setLoading(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{height: '100%'}}>
        {loading ? (
          <LoadingScreen />
        ) : user ? (
          <BottomTab.Navigator>
            <BottomTab.Screen name="Perfil" component={ProfileScreen} />
            <BottomTab.Screen name="Procurar" component={SearchScreen} />
            <BottomTab.Screen name="Definições" component={SettingsScreen} />
          </BottomTab.Navigator>
        ) : (
          <Tab.Navigator tabBarOptions={{labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 28}}}>
            <Tab.Screen name="Entrar" component={SignInScreen} />
            <Tab.Screen name="Registar" component={SignUpScreen} />
          </Tab.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
