import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import LoadingScreen from '../../loading';
import Content from '../../../components/content.component';
import {backend} from './../../../conf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Desert from '../../../media/desert.png';

function WatchingScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [watchingContent, setWatchingContent] = React.useState([]);

  function loadData() {
    fetch(backend + 'content/watchlist?uid=' + auth().currentUser.uid + '&statusTypeId=1')
      .then((res) => res.json())
      .then((data) => {
        setWatchingContent(data);
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
          {watchingContent.length > 0 ? (
            <ScrollView style={{padding: 8, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
              {watchingContent.map((content, index) => (
                <>
                  <View style={[index !== 0 ? {borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8} : null]} />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                    }}>
                    <Content contentId={content.Id} screen={'watching'} />
                  </TouchableOpacity>
                </>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'white',
              }}>
              <Image source={Desert} resizeMode={'contain'} style={{width: '50%', height: 100, marginBottom: 16}} />
              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingHorizontal: 32}}>
                It looks like your watching list is empty... Go start watching something!
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

export default WatchingScreen;
