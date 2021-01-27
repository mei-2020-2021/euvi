import React, {useState, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {AccordionList} from 'accordion-collapse-react-native';
import {Dimensions, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import fetch from 'node-fetch';
import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingScreen from '../loading';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Style from '../style';
import {backend} from './../../conf';
import StarRating from 'react-native-star-rating';

function ContentScreen({route, navigation}) {
  const {contentId} = route.params;
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
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
  const [duration, setDuration] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [, setLastEpisode] = React.useState(null);
  const [, setWatchAt] = React.useState(null);
  const onStateChange = useCallback((state) => {
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

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + 'h' + rminutes + 'm';
  }

  function loadData() {
    fetch(backend + 'content?id=' + contentId)
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
        setDuration(data.Duration);
        if (data.ContentTypeId === 2) {
          var episodes = data.Episode.map((episode) => {
            var episodeStatus = null;
            async () => {
              await fetch(
                backend + 'content/getStatusType?contentId=' + episode.Id + '&uid=' + auth().currentUser.uid,
              ).then((data) => {
                episodeStatus = data;
              });
            };
            return {
              Id: episode.Id,
              Title: episode.Title,
              ReleaseYear: episode.ReleaseYear,
              Sinopse: episode.Sinopse,
              Duration: episode.Duration,
              Season: episode.SeriesEpisode.SeasonNumber,
              Episode: episode.SeriesEpisode.EpisodeNumber,
              EpisodeStatus: episodeStatus,
            };
          });
          const groupByKey = (list, key) =>
            list.reduce((hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}), {});
          const groupedBy = groupByKey(episodes, 'Season');
          let episodesData = [];
          Object.keys(groupedBy).forEach((key) => {
            episodesData.push({
              id: key,
              title: 'Season ' + key,
              body: groupedBy[key],
            });
          });
          setEpisodes(episodesData);
        }
        fetch(backend + 'content/contentStatus?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setStatus(data);
            fetch(backend + 'content/feedback?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
              .then((res) => res.json())
              .then((data) => {
                setFeedback(data);
                fetch(
                  backend + 'content/currentSeasonEpisodes?contentId=' + contentId + '&uid=' + auth().currentUser.uid,
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLastEpisode(data);
                    fetch(backend + 'content/seenAt?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
                      .then((res) => res.json())
                      .then((data) => {
                        setWatchAt(data);
                        setLoading(false);
                      });
                  });
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
      <View style={{padding: 8}}>
        {item.body.map((el) => {
          return (
            <TouchableOpacity onPress={() => toggleEpisode(el.Id, el.EpisodeStatus)}>
              <View>
                {el.EpisodesStatus != null && el.EpisodeStatus == 2 ? (
                  <Icon name="plus" color={'#15616d'} size={16} />
                ) : (
                  <></>
                )}
                <Text>{'S' + el.Season + ':E' + el.Episode + ': ' + el.Title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  async function toggleEpisode(episodeId, episodeStatus) {
    const status = episodeStatus === 2 ? 3 : 2;
    console.log(status);
    await fetch(
      backend +
        'content/updateStatusType?StatusTypeId=' +
        status +
        '&uid=' +
        auth().currentUser.uid +
        '&contentId=' +
        episodeId,
      {
        method: 'POST',
      },
    ).then(() => {
      setReload(!reload);
    });
  }

  async function giveFeedbackToContent(feedback) {
    await fetch(
      backend + 'content/feedback?feedback=' + feedback + '&uid=' + auth().currentUser.uid + '&contentId=' + contentId,
      {
        method: 'POST',
      },
    ).then(() => {
      setReload(!reload);
    });
  }

  async function associateContentWithUser(statusTypeId) {
    await fetch(
      backend +
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
        <ScrollView style={{backgroundColor: '#fff'}}>
          <View>
            <YoutubePlayer
              height={Dimensions.get('window').width / (16 / 9)}
              play={playing}
              videoId={trailerUrl.replace('https://youtu.be/', '')}
              onChangeState={onStateChange}
            />
          </View>
          <View style={{padding: 8}}>
            <View style={[Style.homeTopFlex]}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 6}}>
                <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: 4,
                  width: Dimensions.get('window').width - 46,
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginRight: 8,
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
            <View style={{flexDirection: 'row', padding: 8}}>
              <View style={{borderRadius: 4, overflow: 'hidden'}}>
                <Image
                  key={contentId}
                  style={{height: 200, width: (2 / 3) * 200}}
                  resizeMode="cover"
                  source={{uri: imageUrl, cache: 'force-cache'}}
                />
              </View>
              <View style={{paddingHorizontal: 16, height: 200}}>
                <View style={{marginRight: 'auto', marginBottom: 8, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', paddingRight: 1}}>IMDb rating:</Text>
                  <StarRating
                    halfStarEnabled={true}
                    disabled={true}
                    maxStars={5}
                    rating={parseFloat(imdbRating) / 2}
                    fullStarColor={'#f7d002'}
                    halfStarColor={'#f7d002'}
                    emptyStarColor={'#f7d002'}
                    emptyStar={'star-border'}
                    fullStar={'star'}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
                    starSize={22}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 4,
                    width: Dimensions.get('window').width - 400 / 3 - 48,
                  }}>
                  {genres.map((genre) => (
                    <Text
                      style={{
                        backgroundColor: genreColorMap[genre.Id].background,
                        color: genreColorMap[genre.Id].text,
                        fontSize: 12,
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
                <Text style={{fontWeight: 'bold', marginBottom: 2}}>Available at:</Text>
                <View style={{flexDirection: 'row', marginBottom: 8}}>
                  {services.map((service) => (
                    <Image
                      source={{uri: service.IconUrl}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 4,
                        marginRight: 4,
                      }}
                    />
                  ))}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#555555',
                    alignItems: 'center',
                    padding: 6,
                    borderRadius: 4,
                    marginRight: 'auto',
                    marginBottom: 4,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 10,
                      borderRadius: 4,
                      marginRight: 4,
                      overflow: 'hidden',
                      fontWeight: 'bold',
                      marginEnd: 'auto',
                    }}>
                    Duration: {timeConvert(duration)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingHorizontal: 8, paddingBottom: 16, paddingTop: 8}}>
              <Text style={{fontWeight: 'bold', marginBottom: 2}}>Synopsis:</Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  overflow: 'hidden',
                  borderRadius: 4,
                  marginBottom: 4,
                  textAlign: 'justify',
                }}>
                {sinopse}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#15616d',
                marginHorizontal: 8,
                alignItems: 'center',
                overflow: 'hidden',
                marginBottom: 8,
              }}>
              <TouchableOpacity
                style={[
                  {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                  status == 2 ? {backgroundColor: '#15616d'} : null,
                ]}
                onPress={() => {
                  associateContentWithUser(2);
                }}>
                <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                  <Icon name="eye-check" color={status == 2 ? '#fff' : '#000'} size={22} />
                  <Text style={{fontWeight: 'bold', color: status == 2 ? '#fff' : '#000'}}>Seen</Text>
                </View>
              </TouchableOpacity>
              {typeId === 1 ? null : (
                <TouchableOpacity
                  style={[
                    {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                    status == 1 ? {backgroundColor: '#15616d'} : null,
                  ]}
                  onPress={() => {
                    associateContentWithUser(1);
                  }}>
                  <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Icon name="eye" color={status == 1 ? '#fff' : '#000'} size={22} />
                    <Text style={{fontWeight: 'bold', color: status == 1 ? '#fff' : '#000'}}>Watching</Text>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                  status == 3 ? {backgroundColor: '#15616d'} : null,
                ]}
                onPress={() => {
                  associateContentWithUser(3);
                }}>
                <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                  <Icon name="bookmark-plus" color={status == 3 ? '#fff' : '#000'} size={22} />
                  <Text style={{fontWeight: 'bold', color: status == 3 ? '#fff' : '#000'}}>To see</Text>
                </View>
              </TouchableOpacity>
            </View>
            {status == 2 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: '#15616d',
                  marginHorizontal: 8,
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                <TouchableOpacity
                  style={[
                    {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                    feedback == -1 ? {backgroundColor: '#941c2f'} : null,
                  ]}
                  onPress={() => {
                    giveFeedbackToContent(-1);
                  }}>
                  <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Icon name="emoticon-dead" color={feedback == -1 ? '#fff' : '#000'} size={22} />
                    <Text style={{fontWeight: 'bold', color: feedback == -1 ? '#fff' : '#000'}}>Disliked</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                    feedback == 0 ? {backgroundColor: '#f7d002'} : null,
                  ]}
                  onPress={() => {
                    giveFeedbackToContent(0);
                  }}>
                  <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Icon name="emoticon-neutral" color={'#000'} size={22} />
                    <Text style={{fontWeight: 'bold', color: '#000'}}>Neutral</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {flex: 1, alignSelf: 'center', alignContent: 'center', paddingVertical: 8},
                    feedback == 1 ? {backgroundColor: '#018e42'} : null,
                  ]}
                  onPress={() => {
                    giveFeedbackToContent(1);
                  }}>
                  <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Icon name="emoticon" color={feedback == 1 ? '#fff' : '#000'} size={22} />
                    <Text style={{fontWeight: 'bold', color: feedback == 1 ? '#fff' : '#000'}}>Liked</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
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
        </ScrollView>
      )}
    </>
  );
}

export default ContentScreen;
