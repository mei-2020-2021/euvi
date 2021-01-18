import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Style from './../../style';
import { ScrollView } from 'react-native-gesture-handler';
import Content from '../../../components/Content';

function RecommendationsScreen({ navigation, route }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [recommendations, setRecommendations] = React.useState([]);

    function loadData() {
        fetch('http://192.168.1.238:6969/users?uid=' + auth().currentUser.uid)
            .then((res) => res.json())
            .then((data) => {
                const scopeUser = data;
                setUser(scopeUser);
                setRecommendations(() => {
                    return route.params.recommendations
                });
                setLoading(false);
            });
    }

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            loadData();
        });
        loadData()
    }, []);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <ScrollView>
                        {recommendations.map((recommendation) => (
                            <>
                            <TouchableOpacity
                                onPress={() => {
                                navigation.navigate('ContentScreen', {contentId: recommendation.Id, title: recommendation.Title});
                                }}>
                                <Text style={styles.title}>{recommendation.FirstName  + ' ' + recommendation.LastName + ' recommended:'}</Text>
                                <Content key={recommendation.Id} contentId={recommendation.Id} screen={'recommendations'} />
                            </TouchableOpacity>
                                
                            </>
                        ))}
                        </ScrollView>
                    </View>
                )}
        </>
    )

}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RecommendationsScreen;