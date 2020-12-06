import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../loading';
import SignInScreen from './signIn';
import SignUpScreen from './signUp';

function LoggedOutScreen() {
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
          <Tab.Navigator tabBarOptions={{labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 28}}}>
            <Tab.Screen name="Sign In" component={SignInScreen} />
            <Tab.Screen name="Sign Up" component={SignUpScreen} />
          </Tab.Navigator>
        </View>
      )}
    </>
  );
}
export default LoggedOutScreen;
