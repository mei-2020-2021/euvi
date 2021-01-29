import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import {View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {backend} from '../../../conf';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from './../../style';
import MultiSelect from 'react-native-multiple-select';
import {query} from 'express';
import {isColString} from 'sequelize/types/lib/utils';

function ContentSearchScreen({navigation}) {
  const [, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [genreList, setGenreList] = React.useState([]);
  const [selectedGenreList, setSelectedGenreList] = React.useState([]);
  const [isMovieSelected, setIsMovieSelected] = React.useState(false);
  const [isTvShowSelected, setIsTvShowelected] = React.useState(false);

  function loadData() {
    fetch(backend + 'users?uid=' + auth().currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        const scopeUser = data;
        setUser(scopeUser);
        setLoading(false);
        fetch(backend + 'genre')
          .then((res) => res.json())
          .then((data) => {
            setGenreList(data);
          });
      });
  }

  function search() {
    const type = isMovieSelected && isTvShowSelected ? '1,2' : isMovieSelected ? '1' : isTvShowSelected ? '2' : null;
    const genre = selectedGenreList.length > 0 ? selectedGenreList.map((data) => data.id).join(',') : null;
    let query = type ? 'type=' + type : '';
    query += genre ? (query.length > 0 ? '&genre=' + genre : 'genre=' + genre) : '';
    query += title.length > 0 ? (query.length > 0 ? '&title=' + title : 'title=' + title) : '';

    fetch(backend + 'content/search')
      .then((res) => res.json())
      .then((data) => {
        navigation.navigate('SearchResults', {results: data});
      });
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
  }, [navigation]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{padding: 8, backgroundColor: 'white', height: '100%'}}>
          <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
              <Icon name="arrow-back-ios" color={'#000'} size={22} />
            </TouchableOpacity>
            <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Search</Text>
          </View>
          <TextInput
            style={{
              margin: 8,
              marginBottom: 0,
              fontSize: 16,
              borderWidth: 2,
              borderColor: '#15616d',
              padding: 16,
              borderRadius: 4,
              shadowOffset: {width: 0, height: 0},
            }}
            onChangeText={(title: string) => setTitle(title)}
            placeholder="Title"
          />
          <View style={{flexDirection: 'row', padding: 8}}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  padding: 14,
                  overflow: 'hidden',
                  borderRadius: 4,
                  marginRight: 8,
                  borderColor: '#15616d',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                },
                isMovieSelected ? {backgroundColor: '#15616d'} : null,
              ]}
              onPress={() => setIsMovieSelected(!isMovieSelected)}>
              <IconMaterialIcons name="movie-roll" color={isMovieSelected ? 'white' : 'black'} size={22} />
              <Text
                style={[
                  {color: '#000', alignSelf: 'center', fontWeight: 'bold', marginLeft: 8},
                  isMovieSelected ? {color: 'white'} : null,
                ]}>
                Movie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  padding: 14,
                  overflow: 'hidden',
                  borderRadius: 4,
                  borderColor: '#15616d',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                },
                isTvShowSelected ? {backgroundColor: '#15616d'} : null,
              ]}
              onPress={() => setIsTvShowelected(!isTvShowSelected)}>
              <Icon name="tv" color={isTvShowSelected ? 'white' : 'black'} size={22} />

              <Text
                style={[
                  {color: '#000', alignSelf: 'center', fontWeight: 'bold', marginLeft: 8},
                  isTvShowSelected ? {color: 'white'} : null,
                ]}>
                TV Show
              </Text>
            </TouchableOpacity>
          </View>
          <MultiSelect
            items={genreList}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedGenreList}
            selectedItems={selectedGenreList}
            selectText="Categories"
            searchInputPlaceholderText="Categories"
            tagRemoveIconColor="#dc3545"
            tagBorderColor="#15616d"
            tagTextColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#28a745"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#000'}}
            hideSubmitButton
            hideDropdown
            styleItemsContainer={{backgroundColor: 'white'}}
            styleInputGroup={{paddingVertical: 8, marginBottom: 8}}
            styleSelectorContainer={{borderColor: '#15616d', borderWidth: 2, marginHorizontal: 8, borderRadius: 4}}
            styleRowList={{marginVertical: 2}}
            //separador
            tagContainerStyle={{
              borderWidth: 0,
              margin: 0,
              padding: 0,
              borderWidth: 0,
              width: Dimensions.get('window').width - 32,
            }}
            styleDropdownMenu={{
              borderColor: '#15616d',
              borderWidth: 2,
              marginHorizontal: 8,
              borderRadius: 4,
              height: 'auto',
              paddingLeft: 16,
              marginBottom: 4,
            }}
            styleDropdownMenuSubsection={{
              padding: 0,
              margin: 0,
              borderBottomWidth: 0,
            }}
          />
          <TouchableOpacity
            style={{
              padding: 16,
              margin: 16,
              alignSelf: 'center',
              backgroundColor: '#15616d',
              overflow: 'hidden',
              borderRadius: 4,
              width: Dimensions.get('window').width - 32,
            }}
            onPress={() => search()}>
            <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default ContentSearchScreen;
