import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import LoadingScreen from '../../loading';
import Content from '../../../components/Content';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

function WatchingScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [watchingContent, setWatchingContent] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:6969/content/watchlist?uid=' + auth().currentUser.uid + '&statusTypeId=1')
      .then((res) => res.json())
      .then((data) => {
        setWatchingContent(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <ScrollView style={{padding: 8, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
            {watchingContent.map((content) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                }}>
                <Content contentId={content.Id} screen={'watching'} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default WatchingScreen;
