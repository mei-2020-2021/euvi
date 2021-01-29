import React from 'react';
import LoadingScreen from '../../loading';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Style from './../../style';
import Content from '../../../components/content.component';

function SearchResultsScreen({navigation, route}) {
  const [] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [contentList, setContentList] = React.useState([]);

  function loadData() {
    const list = route.params.results.map((el) => {
      return {
        Id: el.Id,
        Title: el.Title,
      };
    });
    setContentList(list);
    setLoading(false);
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
          <ScrollView>
            <View style={[Style.homeTopFlex, {marginBottom: 16}]}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginTop: 16}}>
                <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
              </TouchableOpacity>
              <Text style={{marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto'}}>Search Results</Text>
            </View>
            {contentList.map((content, index) => (
              <>
                <View style={[index !== 0 ? {borderTopWidth: 1, opacity: 0.15, marginHorizontal: 8} : null]} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ContentScreen', {contentId: content.Id, title: content.Title});
                  }}>
                  <Content key={content.Id} contentId={content.Id} screen={'toWatch'} />
                </TouchableOpacity>
              </>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default SearchResultsScreen;
