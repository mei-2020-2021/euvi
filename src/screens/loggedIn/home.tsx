import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TextInput} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import Content from '../../components/Content';

function HomeScreen() {
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState([]);

  React.useEffect(() => {
    fetch('http://192.168.1.238:6969/content')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent(data);
        setLoading(false);
      });
  }, []);

  const serviceinfo = [
    {
      name: 'Netflix',
      image: require('./../../../media/serviceicons/Netflix.jpg'),
    },
    {
      name: 'PrimeVideo',
      image: require('./../../../media/serviceicons/PrimeVideo.jpg'),
    },
  ];
  const servicelist = serviceinfo.map((service, key) => <Image key={key} style={Style.icon} source={service.image} />);

  return (
    <>
      {loading || content == null ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{padding: 8}}>
          <View style={Style.homeTopFlex}>
            <Text style={Style.authTitle}>{auth().currentUser.displayName}</Text>
            <TextInput style={Style.searchBox} placeholder="Type Here..."></TextInput>
          </View>
          <View style={Style.homeServicesFlex}>{servicelist}</View>
          <Text style={{fontSize: 32, fontWeight: 'bold', paddingLeft: 8}}>Trending</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {content.map((content) => (
              <Content contentId={content.Id} screen={'home'} />
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </>
  );
}

export default HomeScreen;
