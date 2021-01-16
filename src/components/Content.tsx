import React, {FunctionComponent} from 'react';
import {View, Image, Text, ScrollView, Button} from 'react-native';
import WatchedScreen from '../screens/loggedIn/watchlist/past';
import WatchingScreen from '../screens/loggedIn/watchlist/present';
import ToWatchScreen from '../screens/loggedIn/watchlist/future';
import {Dimensions} from 'react-native';

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
  const [services, setServices] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  const genreColorMap = {
    1: {
      background: '#f79256',
      text: '#000',
    },
    2: {
      background: '#fbd1a2',
      text: '#000',
    },
    3: {
      background: '#7dcfb6',
      text: '#000',
    },
    4: {
      background: '#00b2ca',
      text: '#fff',
    },
    5: {
      background: '#1d4e89',
      text: '#fff',
    },
    6: {
      background: '#edead0',
      text: '#000',
    },
    7: {
      background: '#a0e8af',
      text: '#000',
    },
    8: {
      background: '#504136',
      text: '#fff',
    },
    9: {
      background: '#ffcae9',
      text: '#000',
    },
    10: {
      background: '#da344d',
      text: '#fff',
    },
  };

  React.useEffect(() => {
    // const uid = auth().currentUser.uid;
    // axios.get('http://localhost:6969/users?uid=' + uid).then((res) => {
    //   setUserId(res.data.id);
    // });

    fetch('http://localhost:6969/content?id=' + contentId)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setReleaseYear(data.ReleaseYear);
        setSinopse(data.Sinopse);
        setImageUrl(data.ImageUrl);
        setTrailerUrl(data.TrailerUrl);
        setImdbRating(data.ImdbRating);
        setServices(data.Services);
        setGenres(data.Genres);
      });
  }, []);

  return (
    <View style={{flexDirection: 'row', padding: 8}}>
      <Image
        key={contentId}
        style={[{height: 150, width: (2 / 3) * 150}, screen == 'watched' ? {opacity: 0.75} : null]}
        resizeMode="cover"
        source={{uri: imageUrl, cache: 'force-cache'}}
      />

      {screen == 'home' ? null : (
        <ScrollView style={{paddingHorizontal: 16, height: 150}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              flexWrap: 'wrap',
              width: Dimensions.get('window').width - 400 / 3 - 48,
              alignItems: 'baseline',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 4,
                marginBottom: 4,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#555555',
                fontWeight: 'bold',
                marginRight: 8,
                marginBottom: 4,
              }}>
              {releaseYear}
            </Text>
            <Text
              style={{
                color: '#000',
                backgroundColor: '#f5c518',
                fontSize: 10,
                overflow: 'hidden',
                borderRadius: 4,
                padding: 4,
                fontWeight: 'bold',
                marginBottom: 4,
              }}>
              IMDb: {imdbRating}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 8}}>
            {services.map((service) => (
              <Image
                source={{uri: service.IconUrl}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#000',
                  borderWidth: 1,
                  marginRight: 4,
                }}
              />
            ))}
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4}}>
            {genres.map((genre) => (
              <Text
                style={{
                  backgroundColor: genreColorMap[genre.Id].background,
                  color: genreColorMap[genre.Id].text,
                  fontSize: 10,
                  borderRadius: 4,
                  padding: 6,
                  marginRight: 4,
                  marginBottom: 4,
                  overflow: 'hidden',
                  fontWeight: 'bold',
                }}>
                {genre.Value}
              </Text>
            ))}
          </View>
          {screen == 'watched' ? (
            <>
              <Text
                style={{
                  backgroundColor: '#555555',
                  color: '#fff',
                  fontSize: 10,
                  borderRadius: 4,
                  padding: 6,
                  marginRight: 4,
                  marginBottom: 4,
                  overflow: 'hidden',
                  fontWeight: 'bold',
                  marginEnd: 'auto',
                }}>
                Seen:
              </Text>
            </>
          ) : null}
          <Button onPress={() => {}} title={'Teste'}></Button>
        </ScrollView>
      )}

      {screen == 'watching' ? <Text>watching</Text> : null}
      {screen == 'toWatch' ? <Text>toWatch</Text> : null}
    </View>
  );
};

export default Content;
