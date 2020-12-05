import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Lang from '../../lang';

const signOut = () => auth().signOut();

function SignOutScreen() {
  return <Button title={Lang.AUTH.SIGN_OUT} onPress={() => signOut()}></Button>;
}
export default SignOutScreen;
