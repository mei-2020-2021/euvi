import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TextInput, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import Content from '../../components/Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

function AddServiceScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [addedServices, setAddedServices] = React.useState([]);
  const [notAddedServices, setNotAddedServices] = React.useState([]);

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:6969/users/?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setAddedServices(data.Services);
        fetch('http://localhost:6969/services/getNotUserService')
          .then((res) => res.json())
          .then((data) => {
            setNotAddedServices(data);
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
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Manage services</Text>
          </View>
          <View style={{marginVertical: 16}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, marginBottom: 8}}>My services</Text>
            <View style={{flexDirection: 'row', marginLeft: 8, marginBottom: 8}}>
              {addedServices.map((service) => (
                <>
                  <Image
                    key={service.Id}
                    source={{uri: service.IconUrl}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 4,
                      borderColor: '#000',
                      borderWidth: 1,
                      marginRight: 8,
                    }}
                  />
                  <View
                    style={{
                      position: 'relative',
                      left: -19,
                      bottom: -47,
                      backgroundColor: '#fff',
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                    }}>
                    <Icon name="minus-circle-outline" color={'#dc3545'} size={22} />
                  </View>
                </>
              ))}
            </View>
          </View>
          <View style={{marginVertical: 16}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, marginBottom: 8}}>Other services</Text>
            <View style={{flexDirection: 'row', marginLeft: 8, marginBottom: 8}}>
              {notAddedServices.map((service) => (
                <>
                  <Image
                    key={service.Id}
                    source={{uri: service.IconUrl}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 4,
                      borderColor: '#000',
                      borderWidth: 1,
                      marginRight: 8,
                    }}
                  />
                  <View
                    style={{
                      position: 'relative',
                      left: -19,
                      bottom: -47,
                      backgroundColor: '#fff',
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                    }}>
                    <Icon name="plus-circle-outline" color={'#28a745'} size={22} />
                  </View>
                </>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default AddServiceScreen;
