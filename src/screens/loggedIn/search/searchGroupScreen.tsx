import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet } from 'react-native';
import Style from '../../style';
import { AccordionList } from 'accordion-collapse-react-native';
import { IP } from '../../../conf'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SearchGroupScreen({ navigation }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [groupList, setGroupList] = React.useState([]);

    function loadData() {
        fetch(IP + 'users?uid=' + auth().currentUser.uid)
        .then((res) => res.json())
        .then((data) => {
          const scopeUser = data;
          setUser(scopeUser);
          fetch(IP + 'group?uid=' + scopeUser.Uid)
            .then((res) => res.json())
            .then((data) => {
              setGroupList(data);
              setLoading(false)
            })});
            
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
                        {groupList.map((el) => {
                            return (
                                <View
                                    style={{
                                        borderTopWidth: 1,
                                        borderColor: 'black',
                                        paddingVertical: 4,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    {el.OwnerId == user.Id ? (
                                        <Icon name="radiobox-marked" color={'#15616d'} size={16} />
                                    ) : (
                                            <Icon name="radiobox-blank" color={'#15616d'} size={16} />
                                        )}
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            paddingLeft: 4,
                                        }}>
                                        {el.Name}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}
        </>
    );
}

export default SearchGroupScreen;
