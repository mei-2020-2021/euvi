import React from 'react';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Style from './../../style'
import { AccordionList } from "accordion-collapse-react-native";

function CommunityHomeScreen({ navigation }) {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState(null);

    React.useEffect(() => {
        setUser(auth().currentUser);
        setList(() => {
            return [
                {
                    id: 1,
                    isGroup: true,
                    title: 'Groups',
                    body: [{ id: 1, name: "Grupo 1", owner: "Joao" }, { id: 2, name: "Grupo 2", owner: "Alfredo" }, { id: 3, name: "Grupo 3", owner: "Ricardo" }, { id: 4, name: "Grupo 4", owner: "Ricardo" }],
                },
                {
                    id: 2,
                    isGroup: false,
                    title: 'Friends',
                    body: [{ id: 1, name: "Ana" }, { id: 2, name: "Joao" }, { id: 3, name: "Alfredo" }, { id: 4, name: "Ricardo" }],
                }
            ]
        })
        setLoading(false);
    }, []);

    function _head(item) {
        return (<View style={Style.homeTopFlex}>
            <Text style={Style.authTitle}>{item.title}</Text>
            <Button
                title="Botao"
                onPress={() => {item.id == 1 ? (navigation.navigate('NewGroup')) : (navigation.navigate('NewFriend'))}}
            />
        </View>)
    }

    function _body(item) {
        return (
            <View style={{ padding: 8 }}>
                
                {item.isGroup == 1 ? (
                item.body.map(el => {return (
                    <View style={Style.homeTopFlex}>
                        <Text style={styles.item}>{el.name}</Text>
                        <Text style={styles.item}>Owner: {el.owner}</Text>
                    </View>
                    )})
            ) : (
                item.body.map(el => {return (
                    <View>
                        <Text style={styles.item}>{el.name}</Text>
                    </View>
                    )})
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

