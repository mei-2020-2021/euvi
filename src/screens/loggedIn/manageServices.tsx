import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Image, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {backend} from '../../conf';
import Styles from '../../../Styles';

function AddServiceScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(true);
  const [userServices, setUserServices] = React.useState([]);
  const [otherServices, setOtherServices] = React.useState([]);
  const [] = React.useState(null);

  function loadData() {
    fetch(backend + 'users/?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Services);
        setUserServices(data.Services);
        fetch(backend + 'services/otherServices?uid=' + auth().currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setOtherServices(data);
            setLoading(false);
          });
      });
  }

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    loadData();
  }, [reload]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
  }, [navigation]);

  function removeService(serviceId) {
    fetch(backend + 'services/removeService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid).then(() => {
      setReload(!reload);
    });
  }

  function addService(serviceId) {
    console.log(backend + 'services/addService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid);
    fetch(backend + 'services/addService?serviceId=' + serviceId + '&uid=' + auth().currentUser.uid).then(() => {
      setReload(!reload);
    });
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
            <Text style={Styles.viewTitle}>Manage services</Text>
          </View>
          {userServices.length > 0 ? (
            <View style={Styles.manageServiceWrapper}>
              <Text style={Styles.manageServiceTitle}>My services</Text>
              <View style={Styles.manageServiceFlexView}>
                {userServices.map((service) => (
                  <View>
                    <Image key={service.Id} source={{uri: service.IconUrl}} style={Styles.manageServiceIcon} />
                    <View style={Styles.manageServiceView}>
                      <TouchableOpacity key={service.Id} onPress={() => removeService(service.Id)}>
                        <Icon name="minus-circle-outline" color={'#dc3545'} size={26} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
          {otherServices.length > 0 ? (
            <View style={Styles.manageServiceWrapper}>
              <Text style={Styles.manageServiceTitle}>Other services</Text>
              <View style={Styles.manageServiceFlexView}>
                {otherServices.map((service) => (
                  <View>
                    <Image
                      key={service.Id}
                      source={{uri: service.IconUrl, cache: 'force-cache'}}
                      style={Styles.manageServiceIcon}
                    />
                    <View style={Styles.manageServiceView}>
                      <TouchableOpacity key={service.Id} onPress={() => addService(service.Id)}>
                        <Icon name="plus-circle-outline" color={'#28a745'} size={26} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </ScrollView>
      )}
    </>
  );
}

export default AddServiceScreen;
