import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button, Text, View, ScrollView, Dimensions} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {backend} from './../../conf';

function ProfileScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [watchTime, setWatchTime] = React.useState(0);

  const [] = React.useState(false);
  const [] = React.useState(null);

  function signOut() {
    auth().signOut();
  }

  React.useEffect(() => {
    fetch(backend + 'profile/categories?uid=' + auth().currentUser.uid)
      .then((data) => data.json())
      .then((data) => {
        setCategories(data);
        fetch(backend + 'profile/watchTime?uid=' + auth().currentUser.uid)
          .then((data) => data.json())
          .then((data) => {
            setWatchTime(data[0].WatchTime);
            setLoading(false);
          });
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

          <View style={{margin: 8}}>
            <Text style={{fontSize: 20}}>
              You have watched <Text style={{fontWeight: 'bold'}}>{watchTime} minutes</Text> of content, that's{' '}
              <Text style={{fontWeight: 'bold'}}>
                {Math.round(watchTime / (60 * 8))}
                {Math.round(watchTime / (60 * 8)) > 1 ? ' nights' : ' night'}
              </Text>{' '}
              of good sleep.
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: 16,
              margin: 16,
              alignSelf: 'center',
              overflow: 'hidden',
              borderColor: '#941c2f',
              borderWidth: 2,
              borderRadius: 4,
              width: Dimensions.get('window').width - 32,
            }}
            onPress={() => signOut()}>
            <Text style={{color: 'black', alignSelf: 'center', fontWeight: 'bold', color: '#941c2f'}}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

export default ProfileScreen;
