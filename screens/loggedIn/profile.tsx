import 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';

const signOut = () => auth().signOut();

function ProfileScreen() {
  return <Button title={'Sign Out'} onPress={() => signOut()}></Button>;
}

export default ProfileScreen;
