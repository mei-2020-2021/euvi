import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Style from './../../style';
import {AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CommunityHomeScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState(null);
  const [groupList, setGroupList] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:6969/users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        fetch('http://localhost:6969/group?userId=' + scopeUser.Id)
          .then((res) => res.json())
          .then((data) => {
            const scopeGroupsList = [];
            data.forEach((group) => {
              const info = {name: group.Name, ownerId: group.OwnerId};
              scopeGroupsList.push(info);
            });
            setGroupList(scopeGroupsList);
            fetch('http://localhost:6969/friendship?userId=' + scopeUser.Id)
              .then((res) => res.json())
              .then((data) => {
                const scopeFriendsList = [];
                data.forEach((friend) => {
                  const info = {id: friend.Id, firstName: friend.FirstName, lastName: friend.LastName};
                  scopeFriendsList.push(info);
                });
                setFriendList(scopeFriendsList);
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
  }, []);

  function _head(item) {
    return (
      <View style={Style.homeTopFlex}>
        <Text style={Style.authTitle}>{item.title}</Text>
        <Icon
          name="plus"
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
                <View style={Style.homeTopFlex}>
                  <Text style={styles.item}>{el.name}</Text>
                  {el.ownerId == user ? <Text style={styles.item}>Owner</Text> : <></>}
                </View>
              );
            })
          : item.body.map((el) => {
              return (
                <View>
                  <Text style={styles.item}>{el.firstName + ' ' + el.lastName}</Text>
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
        <View style={{padding: 8}}>
          <View style={Style.homeTopFlex}>
            <Text style={Style.authTitle}>Community</Text>
            <Button title="Botao" onPress={() => Alert.alert('Recomendações Notificações')} />
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
