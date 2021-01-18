import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { IP } from '../../../conf'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Style from './../../style';
import { TextInput } from 'react-native-gesture-handler';

function ContentSearchScreen({ navigation }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [contentType, setContentType] = React.useState(1);
    const [genreList, setGenreList] = React.useState([])

    function loadData() {
        fetch(IP + 'users?uid=' + auth().currentUser.uid)
            .then((res) => res.json())
            .then((data) => {
                const scopeUser = data;
                setUser(scopeUser);
                setLoading(false)
                fetch(IP + 'users?uid=' + auth().currentUser.uid)
            });

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
                        <TextInput placeholder='Search...'></TextInput>
                        <Button title={'Movie'} onPress={() => setContentType(1)}></Button>
                        <Button title={'Show'} onPress={() => setContentType(2)}></Button>
                    </View>
                )}
        </>
    );
}

export default ContentSearchScreen;
