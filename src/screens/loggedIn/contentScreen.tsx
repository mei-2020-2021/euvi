import React, { useState, useCallback, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { AccordionList } from 'accordion-collapse-react-native';
import { Dimensions, Image, Button, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import fetch from 'node-fetch';
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingScreen from '../loading';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../style';
import { IP } from './../../conf';

function ContentScreen({ route, navigation }) {
  const { contentId } = route.params;
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
  const [playing, setPlaying] = useState(false);
  const [typeId, setTTypeId] = useState(null);
  const [episodes, setEpisodes] = React.useState([]);
  const [status, setStatus] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
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
            var episodeStatus = null
            async () => {
              await fetch(IP + 'content/getStatusType?contentId=' + episode.Id + '&uid=' + auth().currentUser.uid)
                .then(data => {episodeStatus = data});
            }
            return {
              Id: episode.Id,
              Title: episode.Title,
              ReleaseYear: episode.ReleaseYear,
              Sinopse: episode.Sinopse,
              Duration: episode.Duration,
              Season: episode.SeriesEpisode.SeasonNumber,
              Episode: episode.SeriesEpisode.EpisodeNumber,
              EpisodeStatus: episodeStatus
            };
          });
          const groupByKey = (list, key) =>
            list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {});
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
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    loadData();
  }, [reload]);

  function _head(item) {
    return (
      <View style={Style.homeTopFlex}>
        <Text style={Style.authTitle}>{item.title}</Text>
      </View>
    );
  }

  function _body(item) {
    return (
      <View style={{ padding: 8 }}>
        {item.body.map((el) => {
          return (
            <TouchableOpacity onPress={() => toggleEpisode(el.Id, el.EpisodeStatus)}>
              <View>
                {(el.EpisodesStatus != null && el.EpisodeStatus == 2) ? (<Icon name="plus" color={'#15616d'} size={16} />) : (<></>)}
                <Text>{'S' + el.Season + ':E' + el.Episode + ': ' + el.Title + ' ' + el.EpisodeStatus}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  async function toggleEpisode(episodeId, episodeStatus) {
    const status = (episodeStatus == 2 )? (3) : (2);
    console.log(status)
    await fetch(
      IP + 'content/updateStatusType?StatusTypeId=' + status + '&uid=' + auth().currentUser.uid + '&contentId=' + episodeId,
      {
        method: 'POST',
      },
    ).then(() => {
      setReload(!reload);
    });
  }

  async function giveFeedbackToContent(feedback) {
    await fetch(
      IP + 'content/feedback?feedback=' + feedback + '&uid=' + auth().currentUser.uid + '&contentId=' + contentId,
      {
        method: 'POST',
      },
    ).then(() => {
      setReload(!reload);
    });
  }

  async function associateContentWithUser(statusTypeId) {
    await fetch(
      IP +
      'content/createStatus?statusTypeId=' +
      statusTypeId +
      '&uid=' +
      auth().currentUser.uid +
      '&contentId=' +
      contentId,
      {
        method: 'POST',
      },
    ).then(() => {
      setReload(!reload);
    });
  }
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
            <View style={{ padding: 8 }}>
              <View style={[Style.homeTopFlex, { marginBottom: 8 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginTop: 16 }}>
                  <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 4,
                    width: Dimensions.get('window').width - 46,
                    alignItems: 'baseline',
                  }}>
                  <Text
                    style={{
                      marginTop: 16,
                      fontSize: 28,
                      fontWeight: 'bold',
                      marginRight: 16,
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
              {status == 2 ? (
                <View>
                  <Button
                    onPress={() => {
                      giveFeedbackToContent(1);
                    }}
                    title={'Like'}></Button>
                  <Button
                    onPress={() => {
                      giveFeedbackToContent(-1);
                    }}
                    title={'Dislike'}></Button>
                </View>
              ) : (
                  <></>
                )}
              <View>
                <Button
                  onPress={() => {
                    associateContentWithUser(2);
                  }}
                  title={'Seen'}></Button>
                <Button
                  onPress={() => {
                    associateContentWithUser(3);
                  }}
                  title={'Add to Watchlist'}></Button>
                {/* Se for uma serie */}
                {typeId === 1 ? null : (
                  <Button
                    onPress={() => {
                      associateContentWithUser(1);
                    }}
                    title={'Start Watching'}></Button>
                )}
              </View>
              {typeId === 1 ? null : (
                <AccordionList
                  expandedIndex={1}
                  list={episodes}
                  header={_head}
                  body={_body}
                  keyExtractor={(episode) => `${episode.id}`}
                />
              )}
            </View>
          </>
        )}
    </>
  );
}

export default ContentScreen;
