import React, { useState, useCallback, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { Dimensions, Image, Button, Text, View, ScrollView } from 'react-native';
import fetch from 'node-fetch';
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingScreen from '../loading';
import { AccordionList } from 'accordion-collapse-react-native';

function ContentScreen({ route, navigation }) {
  const { contentId } = route.params;
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
  const [playing, setPlaying] = useState(false);
  const [typeId, setTTypeId] = useState(null);
  const [episodes, setEpisodes] = React.useState([]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
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
  };

  React.useEffect(() => {
    fetch('http://192.168.1.238:6969/content?id=' + contentId)
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
        setLoading(false);
        setTTypeId(data.ContentTypeId);
        if (data.ContentTypeId === 2) {
          setEpisodes(data.Episode.map((episode) => {
            return {
              Title: episode.Title,
              ReleaseYear: episode.ReleaseYear,
              Sinopse: episode.Sinopse,
              Duration: episode.Duration,
              Season: episode.SeriesEpisode.SeasonNumber,
              Episode: episode.SeriesEpisode.EpisodeNumber,
            }
          })
          
          )
        }
      });
  }, []);

  console.log(episodes)

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
          <>
            <View>
              <YoutubePlayer
                height={Dimensions.get('window').width / (16 / 9)}
                play={playing}
                videoId={trailerUrl.replace('https://youtu.be/', '')}
                onChangeState={onStateChange}
              />
            </View>
            <View style={{ flexDirection: 'row', padding: 8 }}>
              <Image
                key={contentId}
                style={{ height: 150, width: (2 / 3) * 150 }}
                resizeMode="cover"
                source={{ uri: imageUrl, cache: 'force-cache' }}
              />

              <ScrollView style={{ paddingHorizontal: 16, height: 150 }}>
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
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  {services.map((service) => (
                    <Image
                      source={{ uri: service.IconUrl }}
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 }}>
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

                <Button onPress={() => { }} title={'Teste'}></Button>
              </ScrollView>
            </View>
              <View>
                <Button onPress={() => { }} title={'Seen'}></Button>
                <Button onPress={() => { }} title={'Add to Watchlist'}></Button>
                {typeId === 1 ? null : (
                  <><Button onPress={() => { }} title={'Start Watching'}></Button>
                    {/* {episodes.map((episode) => { return (<><Text>{episode.Title}</Text></>) })} */}
                  </>
                )}
              </View>
          </>
        )}
    </>
  );
}

export default ContentScreen;
