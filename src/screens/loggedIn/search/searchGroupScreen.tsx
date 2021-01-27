import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text} from 'react-native';
import {backend} from '../../../conf';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Style from '../../style';

function SearchGroupScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [groupList, setGroupList] = React.useState([]);

  function loadData() {
    fetch(backend + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        fetch(backend + 'group?uid=' + scopeUser.Uid)
          .then((res) => res.json())
          .then((data) => {
            setGroupList(data);
            setLoading(false);
          });
      });
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => loadData());
  }, [navigation]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 8, backgroundColor: '#fff', flex: 1}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
              <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Select a group</Text>
          </View>
          <ScrollView style={{padding: 8}}>
            {groupList.map((el) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('contentSearch');
                  }}
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
                    {el.Name}
                  </Text>
                  <IconMaterialIcons name="keyboard-arrow-right" color={'#000'} size={20} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default SearchGroupScreen;
