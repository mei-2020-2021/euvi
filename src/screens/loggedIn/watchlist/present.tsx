import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Style from '../../style';
import LoadingScreen from '../../loading';
import {TextInput} from 'react-native-gesture-handler';
import Content from '../../../components/Content';

function WatchingScreen() {
  const [loading, setLoading] = React.useState(true);
  const [watchingContent, setWatchingContent] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:6969/content')
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
        <View style={{width: '100%', height: '100%', padding: 8}}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {watchingContent.map((content) => (
              <Content contentId={content.Id} screen="watching" />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default WatchingScreen;
