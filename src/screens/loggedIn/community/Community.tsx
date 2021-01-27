import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text} from 'react-native';
import Styles from '../../../../Styles';
import {backend} from './../../../conf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

function CommunityHomeScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [groupList, setGroupList] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);
  const [recommendationList, setRecommendationList] = React.useState([]);

  function loadData() {
    fetch(backend + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        fetch(backend + 'group?uid=' + scopeUser.Uid)
          .then((res) => res.json())
          .then((data) => {
            const scopeGroupsList = [];
            data.forEach((group) => {
              const info = {name: group.Name, ownerId: group.OwnerId};
              scopeGroupsList.push(info);
            });
            setGroupList(scopeGroupsList);
            fetch(backend + 'friendship?userId=' + scopeUser.Id)
              .then((res) => res.json())
              .then((data) => {
                const scopeFriendsList = [];
                data.forEach((friend) => {
                  const info = {id: friend.Uid, firstName: friend.FirstName, lastName: friend.LastName};
                  scopeFriendsList.push(info);
                });
                setFriendList(scopeFriendsList);
                fetch(backend + 'recommendation?uid=' + scopeUser.Uid)
                  .then((res) => res.json())
                  .then((data) => {
                    setRecommendationList(data);
                    setLoading(false);
                  });
              });
          });
      });
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
    loadData();
  }, [navigation]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={Styles.whiteBackgroundScreen}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
            <Text style={Styles.authTitle}>Community</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignSelf: 'baseline', marginRight: 8, marginTop: 7}}
              onPress={() => navigation.navigate('Recommendations', {recommendations: recommendationList})}>
              <View style={{position: 'relative', top: 7, left: 17}}>
                <Icon name="inbox-full" color={'#15616d'} size={38} />
              </View>
              <View style={{backgroundColor: '#f5c518', width: 25, height: 25, borderRadius: 16}}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {recommendationList.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', paddingHorizontal: 8}}>
            <View style={{flexGrow: 1, flexShrink: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <Icon name="account-group" color={'#15616d'} size={24} />
                  <Text style={{paddingLeft: 8, fontSize: 24, fontWeight: 'bold'}}>Groups</Text>
                </View>
                <Icon
                  name="plus-circle-outline"
                  size={30}
                  color={'#28a745'}
                  onPress={() => {
                    navigation.navigate('NewGroup', {friendsList: friendList});
                  }}
                />
              </View>
              <ScrollView style={{padding: 8}}>
                {groupList.map((el) => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          paddingLeft: 4,
                        }}>
                        {el.name}
                      </Text>
                      <IconMaterialIcons name="keyboard-arrow-right" color={'#000'} size={20} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{height: 1, borderWidth: 1, marginHorizontal: 8, marginVertical: 16, opacity: 0.5}} />
            <View style={{flexGrow: 1, flexShrink: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <Icon name="account" color={'#15616d'} size={24} />
                  <Text style={{paddingLeft: 8, fontSize: 24, fontWeight: 'bold'}}>Friends</Text>
                </View>
                <Icon
                  name="plus-circle-outline"
                  size={30}
                  color={'#28a745'}
                  onPress={() => {
                    navigation.navigate('NewFriend', {friendsList: friendList});
                  }}
                />
              </View>
              <ScrollView style={{padding: 8}}>
                {friendList.map((el) => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          paddingLeft: 4,
                        }}>
                        {el.firstName + ' ' + el.lastName}
                      </Text>
                      <IconMaterialIcons name="keyboard-arrow-right" color={'#000'} size={20} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default CommunityHomeScreen;
