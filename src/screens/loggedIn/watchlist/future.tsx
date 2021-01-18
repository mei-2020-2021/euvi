import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Style from '../../style';
import LoadingScreen from '../../loading';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Content from '../../../components/Content';
import {IP} from './../../../conf';

function WatchlistScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [toWatchContent, setToWatchContent] = React.useState([]);

  function loadData() {
    fetch(IP + 'content/watchlist?uid=' + auth().currentUser.uid + '&statusTypeId=3')
      .then((res) => res.json())
      .then((data) => {
        setToWatchContent(data);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <ScrollView style={{padding: 8, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
            {toWatchContent.map((content) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                }}>
                <Content contentId={content.Id} screen={'toWatch'} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default WatchlistScreen;
