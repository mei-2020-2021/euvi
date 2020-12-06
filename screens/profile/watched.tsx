import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Dimensions, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../style';
import LoadingScreen from '../loading';
import { TextInput } from 'react-native-gesture-handler';

function WatchedScreen() {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, []);
    
    const contentInfo = [
        {
          name: 'Carnival Row',
          image: require('./../../media/posters/carnivalrow.png'),
        },
        {
          name: 'The Boys',
          image: require('./../../media/posters/the-boys.png'),
        },
        {
            name: 'The Legend of Korra',
            image: require('./../../media/posters/the-legend-of-korra.png'),
        },
        {
        name: 'The Office',
        image: require('./../../media/posters/office.jpg'),
        },
      ];

    const contentInfoList = contentInfo.map((content, key) => 
        <View key={key}  style={{flexDirection: 'row'}}>
            <Image style={{height:200, width:150, marginTop:5}} resizeMode="contain" source={content.image}/>
            <View>
                <Text>{content.name}</Text>
            </View>
        </View>
    );


    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <View style={{width:'100%', padding:5}}>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {contentInfoList}
                    </ScrollView>
                </View>
            )}
        </>
    );

}

export default WatchedScreen;