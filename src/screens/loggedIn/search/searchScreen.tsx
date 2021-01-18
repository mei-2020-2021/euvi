import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, Button} from 'react-native';
import Style from '../../style';
import {AccordionList} from 'accordion-collapse-react-native';
import {IP} from '../../../conf'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SearchScreen({navigation}) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState(null);
  const [groupList, setGroupList] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);
  const [recommendationList, setRecommendationList] = React.useState([]);

  function loadData() {
    setLoading(false);
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
        <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 8, backgroundColor: 'white', height: '100%'}}>
          <View>
            <Text>As User</Text>
            <Button onPress={() => {}} title={'As User'}></Button>
          </View>
          <View>
            <Text>As Group</Text>
            <Button onPress={() => {navigation.navigate('searchGroup')}} title={'As Group'}></Button>
          </View>
        </View>
      )}
    </>
  );
}

export default SearchScreen;
