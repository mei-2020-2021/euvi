import React from 'react';
import {Text, TextInput, Button, View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import Style from '../style';
import Lang from '../lang';
import LoadingScreen from '../loading';

function SearchScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={Style.screen}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>{user.displayName}</Text>
      <Text>{user.email}</Text>
        </View>
      )}
    </>
  );
}
export default SearchScreen;
