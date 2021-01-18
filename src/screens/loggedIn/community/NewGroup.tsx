import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from '../../style'
import { Autocomplete } from "react-native-dropdown-autocomplete";
import { TextInput } from 'react-native-gesture-handler';

function NewGroupScreen({ route, navigation }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [friendsList, setFriendsList] = React.useState(null);
    const [groupName, SetGroupName] = React.useState('');
    const [groupFriendList, setGroupFriendList] = React.useState([]);

    React.useEffect(() => {
        setUser(auth().currentUser);
        setFriendsList(() => {
            return route.params.friendsList
        });
        setLoading(false);
    }, []);

    function handleSelectItem(item) {
        setGroupFriendList([...groupFriendList, item])
        
    }

    async function createGroup() {
        var users = groupFriendList.map(el => {return el.uid+''})
        
        await fetch('http://192.168.1.238:6969/group/createGroup?ownerId='+ user.uid + '&name=' + groupName + '&users='+ users.toString(),{
            method: 'POST'
          }).then(navigation.goBack())
    }
    
    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <TextInput onChangeText={(groupName: string) => SetGroupName(groupName)} style={[styles.width_100, Style.authInput]} placeholder="Group name..."></TextInput>
                        <View style={styles.width_100}>
                            <Autocomplete inputStyle={[styles.width_100, styles.autocompleteBoder]} waitInterval={200} resetOnSelect={true} handleSelectItem={(item) => handleSelectItem(item)} style={styles.input} placeholder="Add a friend" minimumCharactersCount={0} data={friendsList} valueExtractor={item => {return item.firstName + " " + item.lastName}} />
                        </View>
                        {groupFriendList.length > 0 ? (groupFriendList.map(el => {
                            return (
                                <View style={Style.homeTopFlex}>
                                    <Text>{el.firstName + " " + el.lastName}</Text>
                                    <></>
                                </View>)
                        })) : (<></>)}
                        <Button style={styles.submitButton} title="Create group!" onPress={() => createGroup()} />
                    </View>
                )}
        </>
    );
}

const styles = StyleSheet.create({
    width_100: {
        width: "100%",
    },
    submitButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    autocompleteBoder: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
    }
});

export default NewGroupScreen;