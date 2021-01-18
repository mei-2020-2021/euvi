import React, {FunctionComponent} from 'react';
import {View, Image, Text, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Dimensions} from 'react-native';
import {IP} from './../conf';

import auth from '@react-native-firebase/auth';

import fetch from 'node-fetch';

type ContentProps = {
  contentId: string;
  screen: any;
};

const Content: FunctionComponent<ContentProps> = ({contentId, screen}) => {
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [userId, setUserId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [releaseYear, setReleaseYear] = React.useState(null);
  const [sinopse, setSinopse] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [trailerUrl, setTrailerUrl] = React.useState(null);
  const [imdbRating, setImdbRating] = React.useState(null);
  const [services, setServices] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [playing, setPlaying] = React.useState(false);
  const [typeId, setTTypeId] = React.useState(null);
  const [episodes, setEpisodes] = React.useState([]);
  const [status, setStatus] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const onStateChange = React.useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

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
    // Alterar isto para cores que façam sentido
    11: {
      background: '#da344d',
      text: '#fff',
    },
    12: {
      background: '#da344d',
      text: '#fff',
    },
    13: {
      background: '#da344d',
      text: '#fff',
    },
  };

  function loadData() {
    fetch(IP + 'content?id=' + contentId)
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
        setTTypeId(data.ContentTypeId);
        if (data.ContentTypeId === 2) {
          var episodes = data.Episode.map((episode) => {
            return {
              Title: episode.Title,
              ReleaseYear: episode.ReleaseYear,
              Sinopse: episode.Sinopse,
              Duration: episode.Duration,
              Season: episode.SeriesEpisode.SeasonNumber,
              Episode: episode.SeriesEpisode.EpisodeNumber,
            };
          });
          const groupByKey = (list, key) =>
            list.reduce((hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}), {});
          const groupedBy = groupByKey(episodes, 'Season');
          let episodesData = [];
          Object.keys(groupedBy).forEach((key, index) => {
            episodesData.push({
              id: key,
              title: 'Season ' + key,
              body: groupedBy[key],
            });
          });
          setEpisodes(episodesData);
        }
        fetch(IP + 'content/getStatusType?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setStatus(data);
            fetch(IP + 'content/feedback?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
              .then((res) => res.json())
              .then((data) => {
                setFeedback(data);
                setLoading(false);
              });
          });
      });
  }

  React.useEffect(() => {
    loadData();
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
              marginBottom: 0,
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
          </View>
          <Text
            style={{
              color: '#000',
              backgroundColor: '#f5c518',
              fontSize: 10,
              overflow: 'hidden',
              borderRadius: 4,
              padding: 4,
              fontWeight: 'bold',
              marginBottom: 8,
              marginRight: 'auto',
            }}>
            IMDb: {imdbRating}
          </Text>
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
          {screen == 'watched' ? (
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
          ) : null}
          {screen == 'recommendations' ? (
            <>
              <View>
                <Icon name="plus" color={"white"} size={10} />
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
                  Info
                </Text>
              </View>
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
