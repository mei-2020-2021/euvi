import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Style from '../../style';
import {ScrollView} from 'react-native-gesture-handler';
import Content from '../../../components/content.component';
import {backend} from '../../../conf';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Desert from '../../../media/desert.png';

function RecommendationsScreen({navigation, route}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState([]);

  function loadData() {
    setLoading(true);
    fetch(backend + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        fetch(backend + 'recommendation?uid=' + scopeUser.Uid)
          .then((res) => res.json())
          .then((data) => {
            setRecommendations(data);
            setLoading(false);
          });
      });
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
  }, [navigation]);

  function openRecommendation(recommendation) {
    const friendId = recommendation.Uid;
    const contentId = recommendation.Id;
    fetch(
      backend +
        'recommendation/removeRecommendation?uid=' +
        auth().currentUser.uid +
        '&friendUid=' +
        friendId +
        '&contentId=' +
        contentId,
      {
        method: 'POST',
      },
    );

    navigation.navigate('ContentScreen', {contentId: recommendation.Id, title: recommendation.Title});
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 8, backgroundColor: 'white', height: '100%'}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
              <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Recommendations</Text>
          </View>
          {recommendations.length > 0 ? (
            <ScrollView>
              {recommendations.map((recommendation, index) => (
                <>
                  <View
                    style={[
                      index !== 0 ? {borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8, marginBottom: 8} : null,
                    ]}
                  />
                  <TouchableOpacity onPress={() => openRecommendation(recommendation)} style={{marginBottom: 8}}>
                    <Text style={styles.title}>
                      {recommendation.FirstName + ' ' + recommendation.LastName + ' recommended:'}
                    </Text>
                    <Content key={recommendation.Id} contentId={recommendation.Id} screen={'recommendations'} />
                  </TouchableOpacity>
                </>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'white',
              }}>
              <Image source={Desert} resizeMode={'contain'} style={{width: '50%', height: 100, marginBottom: 16}} />
              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingHorizontal: 32}}>
                It looks like you have no recomendations!
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 8,
  },
});

export default RecommendationsScreen;
