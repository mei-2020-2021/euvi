import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import LoadingScreen from '../../loading';
import Content from '../../../components/Content';

function WatchingScreen({navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [watchingContent, setWatchingContent] = React.useState([]);

  React.useEffect(() => {
    fetch('http://192.168.1.238:6969/content')
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
          <ScrollView style={{padding: 8}} showsHorizontalScrollIndicator={false}>
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
