import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from '../../style'
import { Autocomplete } from "react-native-dropdown-autocomplete";


function NewFriendScreen( {navigation} ) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [friend, setFriend] = React.useState([]);
    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        setUser(auth().currentUser);
        fetch('http://localhost:6969/users/friends?uid='+auth().currentUser.uid)
        .then((res) => res.json())
        .then((data) => {
            setUserList(data)
            setLoading(false);
        });
    }, []);


    async function handleSelectItem(item) {
        await fetch('http://localhost:6969/friendship/friendship?uid='+ user.uid + '&frienduid=' + item.Uid,{
            method: 'POST'
          }).then(navigation.goBack())
    }

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <View style={styles.width_100}>
                            <Autocomplete inputStyle={[styles.width_100, styles.autocompleteBoder]} waitInterval={200} resetOnSelect={true} handleSelectItem={(item) => handleSelectItem(item)} style={styles.input} placeholder="Add a friend" minimumCharactersCount={0} data={userList} valueExtractor={item => item.FirstName + " " + item.LastName} />
                        </View>
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

export default NewFriendScreen