import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Image, Text, View, ScrollView} from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fetch from 'node-fetch';
import Content from '../../components/content.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {backend} from './../../conf';

function HomeScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [contentTrendingNow, setContentTrendingNow] = React.useState([]);
  const [contentTopMovies, setContentTopMovies] = React.useState([]);
  const [contentTopSeries, setContentTopSeries] = React.useState([]);

  const [user, setUser] = React.useState(null);

  function loadData() {
    fetch(backend + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        fetch(backend + 'content/trendingNow')
          .then((res) => res.json())
          .then((data) => {
            setContentTrendingNow(data);
            fetch(backend + 'content/topMovies')
              .then((res) => res.json())
              .then((data) => {
                setContentTopMovies(data);
                fetch(backend + 'content/topSeries')
                  .then((res) => res.json())
                  .then((data) => {
                    setContentTopSeries(data);
                    setLoading(false);
                  });
              });
          });
      });
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
  }, [navigation]);

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading || contentTrendingNow == null ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{padding: 8, backgroundColor: 'white'}}>
          <View style={Style.homeTopFlex}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Text style={Style.authTitle}>
                {user.FirstName} {user.LastName}
              </Text>
              <Text
                style={{
                  paddingLeft: 8,
                  marginBottom: 16,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                <Icon name="account-cog-outline" color={'#000'} size={16} />
                <View style={{paddingHorizontal: 2}} />
                Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Style.homeServicesFlex}>
            {user.Services.map((service) => (
              <Image
                key={service.Id}
                source={{uri: service.IconUrl}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#000',
                  borderWidth: 1,
                  marginRight: 8,
                }}
              />
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 4,
                borderColor: '#f7d002',
                borderWidth: 2,
              }}
              onPress={() => navigation.navigate('AddServiceScreen')}>
              <Icon name="plus" color={'#f7d002'} size={36} style />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8}}>Trending Now</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {contentTrendingNow.map((content) => (
                <TouchableOpacity
                  key={content.Id}
                  onPress={() => {
                    navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                  }}>
                  <Content key={content.Id} contentId={content.Id} screen={'home'} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={{borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8}} />
          <View style={{marginVertical: 8}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8}}>Top Movies</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {contentTopMovies.map((content) => (
                <TouchableOpacity
                  key={content.Id}
                  onPress={() => {
                    navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                  }}>
                  <Content key={content.Id} contentId={content.Id} screen={'home'} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={{borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8}} />
          <View style={{marginVertical: 8}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8}}>Top Series</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {contentTopSeries.map((content) => (
                <TouchableOpacity
                  key={content.Id}
                  onPress={() => {
                    navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                  }}>
                  <Content key={content.Id} contentId={content.Id} screen={'home'} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default HomeScreen;
