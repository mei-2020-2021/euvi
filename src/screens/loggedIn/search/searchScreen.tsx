import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../../../../Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

function SearchScreen({navigation}) {
  return (
    <View style={Styles.searchMainView}>
      <TouchableOpacity
        style={Styles.searchMainButton}
        onPress={() => {
          navigation.navigate('contentSearch');
        }}>
        <Icon name="account" color={'#15616d'} size={60} />
        <Text style={Styles.searchMainText}>Search for me</Text>
        <View style={{flexDirection: 'row', bottom: -10}}>
          <Icon name="information" color={'#15616d'} size={13} />
          <Text style={{fontSize: 10, marginLeft: 4}}>Suggests content based on what I like</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.searchMainButton}
        onPress={() => {
          navigation.navigate('searchGroup');
        }}>
        <Icon name="account-group" color={'#15616d'} size={60} />
        <Text style={Styles.searchMainText}>Search for my group</Text>
        <View style={{flexDirection: 'row', bottom: -10}}>
          <Icon name="information" color={'#15616d'} size={13} />
          <Text style={{fontSize: 10, marginLeft: 4}}>Suggests content based on what group members like</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.searchMainButton}
        onPress={() => {
          navigation.navigate('contentSearch');
        }}>
        <Icon name="movie-filter" color={'#15616d'} size={60} />
        <Text style={Styles.searchMainText}>Custom search</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchScreen;
