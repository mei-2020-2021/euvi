import React, {FunctionComponent} from 'react';
import {View, Image, Text} from 'react-native';
import WatchedScreen from '../screens/loggedIn/watchlist/past';
import WatchingScreen from '../screens/loggedIn/watchlist/present';
import ToWatchScreen from '../screens/loggedIn/watchlist/future';

import auth from '@react-native-firebase/auth';

import fetch from 'node-fetch';

type ContentProps = {
  contentId: string;
  screen: any;
};

const Content: FunctionComponent<ContentProps> = ({contentId, screen}) => {
  const [userId, setUserId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [releaseYear, setReleaseYear] = React.useState(null);
  const [sinopse, setSinopse] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [trailerUrl, setTrailerUrl] = React.useState(null);
  const [imdbRating, setImdbRating] = React.useState(null);

  React.useEffect(() => {
    // const uid = auth().currentUser.uid;
    // axios.get('http://localhost:6969/users?uid=' + uid).then((res) => {
    //   setUserId(res.data.id);
    // });

    fetch('http://192.168.1.238:6969/content?id=' + contentId)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setReleaseYear(data.ReleaseYear);
        setSinopse(data.Sinopse);
        setImageUrl(data.ImageUrl);
        setTrailerUrl(data.TrailerUrl);
        setImdbRating(data.ImdbRating);
      });
  }, []);

  return (
    <View style={{flexDirection: 'row', margin: 8}}>
      <Image key={contentId} style={{height: 200, width: (2 / 3) * 200}} resizeMode="cover" source={{uri: imageUrl}} />
      {screen == WatchedScreen ? (
        <View>
          <Text>{title}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Content;
