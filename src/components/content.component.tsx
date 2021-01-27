import React, {FunctionComponent} from 'react';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import {backend} from '../conf';
import auth from '@react-native-firebase/auth';
import fetch from 'node-fetch';
import StarRating from 'react-native-star-rating';
import Style from '../../Styles';

type ContentProps = {
  contentId: string;
  screen: any;
};

const Content: FunctionComponent<ContentProps> = ({contentId, screen}) => {
  const [title, setTitle] = React.useState('');
  const [releaseYear, setReleaseYear] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [imdbRating, setImdbRating] = React.useState('');
  const [services, setServices] = React.useState([]);
  const [duration, setDuration] = React.useState(0);
  const [watchAt, setWatchAt] = React.useState('');

  function timeConvert(n: number) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + 'h' + rminutes + 'm';
  }

  React.useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    fetch(backend + 'content?id=' + contentId)
      .then((res: {json: () => any}) => res.json())
      .then((data) => {
        setTitle(data.Title);
        setReleaseYear(data.ReleaseYear);
        setImageUrl(data.ImageUrl);
        setImdbRating(data.ImdbRating);
        setServices(data.Services);
        setDuration(data.Duration);
        fetch(backend + 'content/seenAt?contentId=' + contentId + '&uid=' + auth().currentUser.uid)
          .then((res: {json: () => any}) => res.json())
          .then((userWatchAt: any) => {
            setWatchAt(userWatchAt);
          });
      });
  }

  return (
    <View style={Style.contentMainView}>
      <View style={{borderRadius: 4, overflow: 'hidden'}}>
        <Image
          key={contentId}
          style={[Style.contentImage, screen === 'watched' ? Style.contentImageWatched : null]}
          resizeMode="cover"
          source={{uri: imageUrl, cache: 'force-cache'}}
        />
      </View>
      {screen === 'home' ? null : (
        <View style={Style.contentMainDetailsView}>
          <View style={Style.contentDetailsView}>
            <Text style={Style.contentTitle}>
              {title.trim()}
              <Text style={{marginHorizontal: 4}}> </Text>
              <Text style={Style.contentReleaseYear}>{releaseYear.trim()}</Text>
            </Text>
          </View>
          <Text style={{fontWeight: 'bold', marginBottom: 2}}>Available at:</Text>
          <View style={Style.contentServiceView}>
            {services.map((service) => (
              <Image source={{uri: service.IconUrl}} style={Style.contentServiceIcon} />
            ))}
          </View>
          {screen === 'watched' ? (
            <View style={Style.contentInfoView}>
              <Text style={Style.contentInfoText}>Seen at {moment(watchAt).format('LL').trim()}</Text>
            </View>
          ) : null}
          {screen === 'toWatch' ? (
            <View style={Style.contentInfoView}>
              <Text style={Style.contentInfoText}>Duration: {timeConvert(duration)}</Text>
            </View>
          ) : null}
          {screen === 'recommendations' ? (
            <View style={Style.contentRatingView}>
              <IconFontisto name="imdb" color={'black'} size={28} />
              <Text style={Style.contentRatingText}>:</Text>
              <StarRating
                halfStarEnabled={true}
                disabled={true}
                maxStars={5}
                rating={parseFloat(imdbRating) / 2}
                fullStarColor={'#f5c518'}
                halfStarColor={'#f5c518'}
                emptyStarColor={'#f5c518'}
                emptyStar={'star-border'}
                fullStar={'star'}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                starSize={24}
              />
            </View>
          ) : null}
          {screen === 'recommendations' ? (
            <View style={Style.contentInfoView}>
              <Icon name="plus" color={'white'} size={12} />
              <Text style={Style.contentInfoText}>Info</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Content;
