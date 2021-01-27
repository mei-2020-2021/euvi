import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {backend} from './../../conf';

function ProfileScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [] = React.useState(false);
  const [] = React.useState(null);

  function signOut() {
    auth().signOut();
  }

  React.useEffect(() => {
    fetch(backend + 'profile/categories?uid=' + auth().currentUser.uid)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);

        const keys = Object.keys(data);
        console.log(keys);

        const values = Object.values(data);
        console.log(values);

        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading == null ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{padding: 8, backgroundColor: '#fff'}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
              <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Account</Text>
          </View>
          <Button title={'Sign Out'} onPress={() => signOut()} />
        </ScrollView>
      )}
    </>
  );
}

export default ProfileScreen;
