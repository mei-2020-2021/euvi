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
import {IP} from './../../conf';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';

function ProfileScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(false);
  const [data, setData] = React.useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [user, setUser] = React.useState(null);

  function signOut() {
    auth().signOut();
  }

  React.useEffect(() => {
    fetch(IP + 'profile/categories?uid=' + auth().currentUser.uid)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);

        const keys = Object.keys(data);
        console.log(keys);

        const values = Object.values(data);
        console.log(values);

        const processedData = {
          labels: keys,
          datasets: [
            {
              data: values,
            },
          ],
        };

        setData(processedData);
        setLoading(false);
      });
  }, []);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => '#000000',
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    withOuterLines: false,
    withInnerLines: false,
  };

  const graphStyle = {};

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
          <View>
            <BarChart
              style={graphStyle}
              data={data}
              width={Dimensions.get('window').width}
              height={220}
              yAxisLabel=""
              yAxisSuffix={''}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>
          <Button title={'Sign Out'} onPress={() => signOut()}></Button>
        </ScrollView>
      )}
    </>
  );
}

export default ProfileScreen;
