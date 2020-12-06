import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Dimensions, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import { TextInput } from 'react-native-gesture-handler';

function HomeScreen() {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, []);
    const serviceinfo = [
        {
          name: 'Netflix',
          image: require('./../../media/serviceicons/Netflix.jpg'),
        },
        {
          name: 'PrimeVideo',
          image: require('./../../media/serviceicons/PrimeVideo.jpg'),
        },
      ];
    const servicelist = serviceinfo.map((service, key) =>
        <Image style={Style.icon} source={service.image}/>
    );
    
    const moviePosters = [
        require('./../../media/posters/carnivalrow.png'),
        require('./../../media/posters/the-boys.png'),
        require('./../../media/posters/the-legend-of-korra.png'),
        require('./../../media/posters/office.jpg'),
    ];

    

    
    const moviePostersList = moviePosters.map((image, key) => 
        <Image style={{height:300, width:150, borderRadius: 8, marginLeft: 5}} resizeMode="contain" source={image}/>
    );


    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (<ScrollView>
                <View style={Style.homeTopFlex}>
                    <Text style={Style.authTitle}>EUVI</Text>
                    <TextInput style={Style.searchBox} placeholder="Type Here..."></TextInput>
                </View>
                <View style={Style.homeServicesFlex}>{servicelist}</View>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>New</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {moviePostersList}
                </ScrollView>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>Movies</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {moviePostersList}
                </ScrollView>
            </ScrollView>)}
        </>
    );
}

export default HomeScreen;