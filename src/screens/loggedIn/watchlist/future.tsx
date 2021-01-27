import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, Text, Image} from 'react-native';
import LoadingScreen from '../../loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Content from '../../../components/content.component';
import {backend} from './../../../conf';
import Desert from '../../../media/desert.png';

function WatchlistScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [toWatchContent, setToWatchContent] = React.useState([]);

  function loadData() {
    fetch(backend + 'content/watchlist?uid=' + auth().currentUser.uid + '&statusTypeId=3')
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
          {toWatchContent.length > 0 ? (
            <ScrollView style={{padding: 8, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
              {toWatchContent.map((content, index) => (
                <>
                  <View style={[index !== 0 ? {borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8} : null]} />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                    }}>
                    <Content contentId={content.Id} screen={'toWatch'} />
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
                It looks like your to see list is empty... After you mark something too see later, it will appear here!
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

export default WatchlistScreen;
