import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { IP } from '../../../conf'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Style from './../../style';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ContentSearchScreen({ navigation }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [contentType, setContentType] = React.useState('');
    const [title, setTitle] = React.useState('')
    const [genreList, setGenreList] = React.useState([])
    const [selectedGenreList, setSelectedGenreList] = React.useState([])
    const genreColorMap = {
        1: {
            background: '#f79256',
            text: '#000',
        },
        2: {
            background: '#fbd1a2',
            text: '#000',
        },
        3: {
            background: '#7dcfb6',
            text: '#000',
        },
        4: {
            background: '#00b2ca',
            text: '#fff',
        },
        5: {
            background: '#1d4e89',
            text: '#fff',
        },
        6: {
            background: '#edead0',
            text: '#000',
        },
        7: {
            background: '#a0e8af',
            text: '#000',
        },
        8: {
            background: '#504136',
            text: '#fff',
        },
        9: {
            background: '#ffcae9',
            text: '#000',
        },
        10: {
            background: '#da344d',
            text: '#fff',
        },
        // Alterar isto para cores que façam sentido
        11: {
            background: '#da344d',
            text: '#fff',
        },
        12: {
            background: '#da344d',
            text: '#fff',
        },
        13: {
            background: '#da344d',
            text: '#fff',
        },
        14: {
            background: '#da344d',
            text: '#fff',
        },
    };
    function loadData() {
        fetch(IP + 'users?uid=' + auth().currentUser.uid)
            .then((res) => res.json())
            .then((data) => {
                const scopeUser = data;
                setUser(scopeUser);
                setLoading(false);
                fetch(IP + 'genre')
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data[0])
                        setGenreList(data)
                    }
                    );
            });

    }

    function sendSearchRequest(selectedGenreList, contentType, title) {
        fetch(IP + 'content/search/?type=' + contentType + '&genre=' + selectedGenreList + '&title=' + title)
            .then((res) => res.json())
            .then((data) => {
                navigation.navigate('SearchResults', { results: data[0] })
            })
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
                    <View style={{ padding: 8, backgroundColor: 'white', height: '100%' }}>
                        <View style={[Style.homeTopFlex, { marginBottom: 16 }]}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginTop: 16 }}>
                                <IconMaterialIcons name="arrow-back-ios" color={'#000'} size={22} />
                            </TouchableOpacity>
                            <Text style={{ marginTop: 16, fontSize: 32, fontWeight: 'bold', marginRight: 'auto' }}>
                                Search
                            </Text>

                        </View>
                        <TextInput style={{ marginVertical: 8, fontSize: 16, borderBottomWidth: 1, paddingBottom: 4 }}
                            onChangeText={(title: string) => setTitle(title)} placeholder='Search...'></TextInput>
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
                            onPress={() => setContentType('movie')}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>Movie</Text>
                        </TouchableOpacity>
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
                            onPress={() => setContentType('series')}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>Show</Text>
                        </TouchableOpacity>

                        {genreList.map((genre, id) => (
                            <TouchableOpacity onPress={() => setSelectedGenreList([...selectedGenreList, genre.Name])}>
                                <Text>
                                    {genre.Name}
                                </Text>
                            </TouchableOpacity>
                        ))}

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
                            onPress={() => sendSearchRequest(selectedGenreList, contentType, title)}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>Search!</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </>
    );
}

export default ContentSearchScreen;
