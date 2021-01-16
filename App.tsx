import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoggedOutScreen from './src/screens/loggedOut/_index';
import LoggedInScreen from './src/screens/loggedIn/_index';
import LoadingScreen from './src/screens/loading';

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
        {loading ? <LoadingScreen /> : user ? <LoggedInScreen /> : <LoggedOutScreen />}
      </SafeAreaView>

    </NavigationContainer>
  );
}

export default App;
