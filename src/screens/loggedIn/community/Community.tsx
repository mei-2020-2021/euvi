import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from './../../style'
import { AccordionList } from "accordion-collapse-react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function CommunityHomeScreen({ navigation }) {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState(null);
    const [groupList, setGroupList] = React.useState([]);
    const [friendList, setFriendList] = React.useState([]);

    React.useEffect(() => {
        fetch('http://192.168.1.238:6969/users?uid=' + auth().currentUser.uid)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setUser(data.Id.toString());
                return data.Id
            }).then((id) => fetch('http://192.168.1.238:6969/group?userId=' + id)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    var groupListData = []
                    data.forEach(group => {
                        const info = { name: group.Name, ownerId: group.OwnerId }
                        groupListData.push(info)
                    });
                    setGroupList(groupListData)
                    return id
                })).then((id) => fetch('http://192.168.1.238:6969/friendship?userId=' + id)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        var friendListData = []
                        data.forEach(friend => {
                            const info = { id: friend.Id, firstName: friend.FirstName, lastName: friend.LastName }
                            friendListData.push(info)
                        });
                        console.log(friendListData)
                        setFriendList(friendListData)
                    })).then(() => setList(() => {
                        return [
                            {
                                id: 1,
                                isGroup: true,
                                title: 'Groups',
                                body: groupList
                            },
                            {
                                id: 2,
                                isGroup: false,
                                title: 'Friends',
                                body: friendList,
                            }
                        ]
                    })).then(() => setLoading(false))
    }, []);

    function _head(item) {
        return (<View style={Style.homeTopFlex}>
            <Text style={Style.authTitle}>{item.title}</Text>
            <Icon
                name="plus"
                onPress={() => { item.id == 1 ? (navigation.navigate('NewGroup', { friendsList: friendList })) : (navigation.navigate('NewFriend')) }}
            >
            </Icon>
        </View>)
    }

    function _body(item) {
        return (
            <View style={{ padding: 8 }}>

                {item.isGroup ? (
                    item.body.map(el => {
                        return (
                            <View style={Style.homeTopFlex}>
                                <Text style={styles.item}>{el.name}</Text>
                                {el.ownerId == user ? (<Text style={styles.item}>Owner</Text>) : (<></>)}
                            </View>
                        )
                    })
                ) : (
                        item.body.map(el => {
                            return (
                                <View>
                                    <Text style={styles.item}>{el.firstName + " " + el.lastName}</Text>
                                </View>
                            )
                        })
                    )}
            </View>
        );
    }

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                    <View style={{ padding: 8 }}>
                        <View style={Style.homeTopFlex}>
                            <Text style={Style.authTitle}>Community</Text>
                            <Button
                                title="Botao"
                                onPress={() => Alert.alert("Recomendações Notificações")}
                            />
                        </View>
                        <AccordionList
                            expandedIndex={1}
                            list={list}
                            header={_head}
                            body={_body}
                            keyExtractor={item => `${item.id}`}
                        />
                    </View>
                )}
        </>
    );
}



const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    item: {
        fontSize: 16,
        margin: 5,
    }
});

export default CommunityHomeScreen

