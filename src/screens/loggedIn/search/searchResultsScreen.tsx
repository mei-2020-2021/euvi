import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { IP } from '../../../conf'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Style from './../../style';
import { TextInput } from 'react-native-gesture-handler';
import Content from '../../../components/Content';

function SearchResultsScreen({ navigation, route }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [contentList, setContentList] = React.useState([]);

    function loadData() {
        const list = route.params.results.map(el => {
            return {
                Id: el.Id,
                Title: el.Title,
            }
        });
        setContentList(list)
        setLoading(false)
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
                    <View style={{ padding: 8, backgroundColor: 'white', height: '100%' }}>
                        <ScrollView>
                            <View style={[Style.homeTopFlex, { marginBottom: 16 }]}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginTop: 16 }}>
                                    <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto' }}>
                                    Search Results
                                </Text>
                            </View>
                            {contentList.map((content) => (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('ContentScreen', { contentId: content.Id, title: content.Title });
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
