import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import Style from '../../style';
import {Autocomplete} from 'react-native-dropdown-autocomplete';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IP} from './../../../conf'

function NewGroupScreen({route, navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [friendsList, setFriendsList] = React.useState(null);
  const [groupName, SetGroupName] = React.useState('');
  const [groupFriendList, setGroupFriendList] = React.useState([]);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setFriendsList(() => {
      return route.params.friendsList;
    });
    setLoading(false);
  }, []);

  function handleSelectItem(item) {
    setGroupFriendList([...groupFriendList, item]);
  }

  async function createGroup() {
    var users = groupFriendList.map((el) => {
      return el.uid + '';
    });

    await fetch(
        IP + 'group/createGroup?ownerId=' +
        user.uid +
        '&name=' +
        groupName +
        '&users=' +
        users.toString(),
      {
        method: 'POST',
      },
    ).then(navigation.goBack());
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 16, backgroundColor: 'white', height: '100%'}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingVertical: 8, marginTop: 16}}>
              <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>New group</Text>
          </View>
          <TextInput
            onChangeText={(groupName: string) => SetGroupName(groupName)}
            style={{marginVertical: 8, fontSize: 16, borderBottomWidth: 1, paddingBottom: 4}}
            placeholder="Group name"
          />
          <View style={styles.autocompletesContainer}>
            <Autocomplete
              separatorStyle={{borderWidth: 0}}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.container}
              noDataTextStyle={{fontSize: 16}}
              handleSelectItem={(item) => handleSelectItem(item)}
              renderIcon={() => (
                <Ionicons name="ios-add-circle-outline" size={20} color="#c7c6c1" style={styles.plus} />
              )}
              minimumCharactersCount={0}
              data={friendsList}
              highlightText
              placeholder="Add a friend"
              noDataText={'No friend with that name.'}
              valueExtractor={(item) => {
                return item.firstName + ' ' + item.lastName;
              }}
              rightContent
              resetOnSelect={true}
              rightTextExtractor={(item) => item.properties}
            />
          </View>
          <View style={{paddingVertical: 8, marginTop: 16}}>
            {groupFriendList.length > 0
              ? groupFriendList.map((el) => {
                  return (
                    <Text style={{fontSize: 16, paddingBottom: 4}}>
                      <Icon name="rhombus-medium" color={'#15616d'} size={16} />
                      {el.firstName + ' ' + el.lastName}
                    </Text>
                  );
                })
              : null}
          </View>
          <TouchableOpacity
            style={{
              padding: 16,
              marginTop: 32,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#15616d',
              overflow: 'hidden',
              borderRadius: 4,
            }}
            onPress={() => createGroup()}>
            <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    zIndex: 1,
    width: '100%',
  },
  input: {maxHeight: 40, borderRadius: 4, fontSize: 16, borderColor: '#15616d'},
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
});

export default NewGroupScreen;
