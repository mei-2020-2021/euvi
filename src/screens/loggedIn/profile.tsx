import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, Button, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TextInput, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import Content from '../../components/Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IP} from './../../conf'

function ProfileScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(false);
  const [addedServices, setAddedServices] = React.useState([]);
  const [notAddedServices, setNotAddedServices] = React.useState([]);

  const [user, setUser] = React.useState(null);

  function signOut() {
    auth().signOut();
  }

  React.useEffect(() => {
    fetch(IP + 'users/?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setAddedServices(data.Services);
        fetch(IP + 'services/getNotUserService?uid=' + auth().currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setNotAddedServices(data);
            setLoading(false);
          });
      });
  }, [reload]);

  function removeService(serviceId) {
    fetch(
      IP + 'services/removeService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid,
    ).then(() => {
      setReload(!reload);
    });
  }

  function addService(serviceId) {
    console.log(IP + 'services/addService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid);
    fetch(IP + 'services/addService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid).then(
      () => {
        setReload(!reload);
      },
    );
  }

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
          <Button title={'Sign Out'} onPress={() => signOut()}></Button>
        </ScrollView>
      )}
    </>
  );
}

export default ProfileScreen;
