import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from '../../style'
import { Autocomplete } from "react-native-dropdown-autocomplete";
import { TextInput } from 'react-native-gesture-handler';

function NewGroupScreen() {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [friendsList, setFriendsList] = React.useState(null);
    const [groupName, SetGroupName] = React.useState('');
    const [groupFriendList, setGroupFriendList] = React.useState([]);

    React.useEffect(() => {
        setUser(auth().currentUser);
        setFriendsList(() => {
            return [{ id: 1, Uid: "1", FirstName: "Leonor", LastName: "Cordeiro" }, { id: 2, Uid: "2", FirstName: "Madalena ", LastName: "Gonçalves" }, { id: 3, Uid: "3", FirstName: "Anita ", LastName: "Peres" }, { id: 4, Uid: "4", FirstName: "David ", LastName: "Silva" }]
        });
        setLoading(false);
    }, []);

    function handleSelectItem(item) {
        setGroupFriendList([...groupFriendList, item])
    }

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <TextInput onChangeText={(groupName: string) => SetGroupName(groupName)} style={[styles.width_100, Style.authInput]} placeholder="Group name..."></TextInput>
                        <View style={styles.width_100}>
                            <Autocomplete inputStyle={[styles.width_100, styles.autocompleteBoder]} waitInterval={200} resetOnSelect={true} handleSelectItem={(item) => handleSelectItem(item)} style={styles.input} placeholder="Add a friend" minimumCharactersCount={0} data={friendsList} valueExtractor={item => item.FirstName + "" + item.LastName} />
                        </View>
                        {groupFriendList.length > 0 ? (groupFriendList.map(el => {
                            return (
                                <View style={Style.homeTopFlex}>
                                    <Text>{el.FirstName + " " + el.LastName}</Text>
                                    <></>
                                </View>)
                        })) : (<></>)}
                        <Button style={styles.submitButton} title="Create group!" onPress={() => Alert.alert(groupName)} />
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