import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Style from '../../style';
import LoadingScreen from '../../loading';
import {TextInput} from 'react-native-gesture-handler';
import Content from '../../../components/Content';

function WatchedScreen() {
  const [loading, setLoading] = React.useState(true);
  const [watchedContent, setWatchedContent] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:6969/content')
      .then((res) => res.json())
      .then((data) => {
        setWatchedContent(data);
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
            {watchedContent.map((content) => (
              <Content contentId={content.Id} screen={'watched'} />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default WatchedScreen;
