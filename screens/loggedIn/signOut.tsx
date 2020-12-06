import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const signOut = () => auth().signOut();

function SignOutScreen() {
  return <Button title={'Sign Out'} onPress={() => signOut()}></Button>;
}
export default SignOutScreen;
