import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, StyleSheet} from 'react-native';
import Style from './../../style';
import {AccordionList} from 'accordion-collapse-react-native';
import {IP} from './../../../conf'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CommunityHomeScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState(null);
  const [groupList, setGroupList] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);
  const [recommendationList, setRecommendationList] = React.useState([]);

  function loadData() {
    fetch(IP + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        fetch(IP + 'group?uid=' + scopeUser.Uid)
          .then((res) => res.json())
          .then((data) => {
            const scopeGroupsList = [];
            data.forEach((group) => {
              const info = {name: group.Name, ownerId: group.OwnerId};
              scopeGroupsList.push(info);
            });
            setGroupList(scopeGroupsList);
            fetch(IP + 'friendship?userId=' + scopeUser.Id)
              .then((res) => res.json())
              .then((data) => {
                const scopeFriendsList = [];
                data.forEach((friend) => {
                  const info = {id: friend.Uid, firstName: friend.FirstName, lastName: friend.LastName};
                  scopeFriendsList.push(info);
                });
                setFriendList(scopeFriendsList);
                fetch(IP + 'recommendation?uid=' + scopeUser.Uid)
                  .then((res) => res.json())
                  .then((data) => {
                    setRecommendationList(data);
                    setList([
                      {
                        id: 1,
                        isGroup: true,
                        title: 'Groups',
                        body: scopeGroupsList,
                      },
                      {
                        id: 2,
                        isGroup: false,
                        title: 'Friends',
                        body: scopeFriendsList,
                      },
                    ]);
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

  function _head(item) {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {item.id == 1 ? (
            <Icon name="account-group" color={'#15616d'} size={24} />
          ) : (
            <Icon name="account" color={'#15616d'} size={24} />
          )}
          <Text style={{paddingLeft: 8, marginTop: 16, fontSize: 24, fontWeight: 'bold'}}>{item.title}</Text>
        </View>
        <Icon
          name="plus-circle-outline"
          size={24}
          color={'#28a745'}
          onPress={() => {
            item.id == 1
              ? navigation.navigate('NewGroup', {friendsList: friendList})
              : navigation.navigate('NewFriend');
          }}></Icon>
      </View>
    );
  }

  function _body(item) {
    return (
      <View style={{padding: 8}}>
        {item.isGroup
          ? item.body.map((el) => {
              return (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderColor: 'black',
                    paddingVertical: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {el.ownerId == user.Id ? (
                    <Icon name="radiobox-marked" color={'#15616d'} size={16} />
                  ) : (
                    <Icon name="radiobox-blank" color={'#15616d'} size={16} />
                  )}
                  <Text
                    style={{
                      fontSize: 16,
                      paddingLeft: 4,
                    }}>
                    {el.name}
                  </Text>
                </View>
              );
            })
          : item.body.map((el) => {
              return (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderColor: 'black',
                    paddingVertical: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="radiobox-blank" color={'#15616d'} size={16} />
                  <Text
                    style={{
                      fontSize: 16,
                      paddingLeft: 4,
                    }}>
                    {el.firstName + ' ' + el.lastName}
                  </Text>
                </View>
              );
            })}
      </View>
    );
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 8, backgroundColor: 'white', height: '100%'}}>
          <View style={[Style.homeTopFlex]}>
            <Text style={Style.authTitle}>Community</Text>
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
          <AccordionList
            expandedIndex={1}
            list={list}
            header={_head}
            body={_body}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  item: {
    fontSize: 16,
    margin: 5,
  },
});

export default CommunityHomeScreen;
