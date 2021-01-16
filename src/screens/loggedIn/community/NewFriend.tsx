import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from '../../style'
import { Autocomplete } from "react-native-dropdown-autocomplete";


function NewFriendScreen() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [friend, setFriend] = React.useState(null);
    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        setUser(auth().currentUser);
        setLoading(false);
        setUserList(() => {
            return [{ id: 1, Uid: "1", FirstName: "Leonor", LastName: "Cordeiro" }, { id: 2, Uid: "2", FirstName: "Madalena ", LastName: "Gonçalves" }, { id: 3, Uid: "3", FirstName: "Anita ", LastName: "Peres" }, { id: 4, Uid: "4", FirstName: "David ", LastName: "Silva" }]
        });
    }, []);


    function handleSelectItem(item) {
        setFriend([...friend, item])
    }

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <View style={styles.width_100}>
                            <Autocomplete onDropdownClose={() => onDropdownClose()} onDropdownShow={() => onDropdownShow()} inputStyle={[styles.width_100, styles.autocompleteBoder]} waitInterval={200} resetOnSelect={true} handleSelectItem={(item) => handleSelectItem(item)} style={styles.input} placeholder="Add a friend" minimumCharactersCount={0} data={userList} valueExtractor={item => item.FirstName + "" + item.LastName} />
                        </View>
                        <Button title="Add Friend!" onPress={() => Alert.alert(friend)} style={styles.submitButton} />
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