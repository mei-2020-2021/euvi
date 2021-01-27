import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Style from '../../style';
import {Autocomplete} from 'react-native-dropdown-autocomplete';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {backend} from '../../../conf';

function NewFriendScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    setUser(auth().currentUser);
    fetch(backend + 'users/friends?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setUser(auth().currentUser);
    fetch(backend + 'users/friends?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setLoading(false);
      });
  }, []);
  async function handleSelectItem(item) {
    await fetch(backend + 'friendship/friendship?uid=' + user.uid + '&frienduid=' + item.Uid, {
      method: 'POST',
    }).then(navigation.goBack());
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 16, backgroundColor: 'white', height: '100%'}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
              <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Add a friend</Text>
          </View>

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
              data={userList}
              highlightText
              placeholder="Add a friend"
              noDataText={'No friend with that name.'}
              valueExtractor={(item) => item.FirstName + ' ' + item.LastName}
              rightContent
              resetOnSelect={true}
              rightTextExtractor={(item) => item.properties}
            />
          </View>
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

export default NewFriendScreen;
