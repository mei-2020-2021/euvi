import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoggedOutScreen from './src/screens/loggedOut/_index';
import LoggedInStackScreen from './src/screens/loggedIn/_index_stack';
import LoadingScreen from './src/screens/loading';
import Styles from './Styles';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  function onAuthStateChanged(authUser: any) {
    setUser(authUser);
    setLoading(false);
  }

  React.useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={Styles.greenBackgroundScreen}>
        {loading ? <LoadingScreen /> : user ? <LoggedInStackScreen /> : <LoggedOutScreen />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
