import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Style from '../../style';
import Lang from '../../lang';
import LoadingScreen from '../../loading';
import {TextInputMask} from 'react-native-masked-text';

function SignUpScreen() {
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [unknownError, setUnknownError] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [sex, setSex] = React.useState('');

  React.useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setUnknownError('');
  }, [email, password]);

  const signUp = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth().currentUser;
        user.updateProfile({displayName: `${firstName.trim()} ${lastName.trim()}`});
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            name: user.displayName,
            email: user.email,
            birthday: birthday,
          })
          .then(() => {
            console.log('User added!');
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError(Lang.ERROR.EMAIl_ALREADY_IN_USE);
        }
        if (error.code === 'auth/invalid-email') {
          setEmailError(Lang.ERROR.INVALID_EMAIL);
        }
        if (error.code === 'auth/weak-password') {
          setPasswordError(Lang.ERROR.WEAK_PASSWORD);
        }
        if (error.code === 'auth/operation-not-allowed') {
          setUnknownError(Lang.ERROR.UNKNOWN);
        }
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={Style.screen}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[Style.authInput, {flex: 1, marginEnd: 8}]}
              autoCompleteType={'name'}
              placeholder={Lang.AUTH.FIRSTNAME}
              onChangeText={(firstName: string) => setFirstName(firstName)}></TextInput>
            <TextInput
              style={[Style.authInput, {flex: 1, marginStart: 8}]}
              autoCompleteType={'name'}
              placeholder={Lang.AUTH.LASTNAME}
              onChangeText={(lastName: string) => setLastName(lastName)}></TextInput>
          </View>
          <TextInputMask
            style={Style.authInput}
            placeholder={Lang.AUTH.BIRTHDAY}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={birthday}
            onChangeText={setBirthday}
          />

          <TextInput
            style={Style.authInput}
            placeholder={Lang.AUTH.EMAIL}
            autoCompleteType={'email'}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onChangeText={(email: string) => setEmail(email)}></TextInput>
          {emailError.length > 0 ? <Text style={Style.authError}>{emailError}</Text> : null}

          <TextInput
            style={Style.authInput}
            placeholder={Lang.AUTH.PASSWORD}
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={(password: string) => setPassword(password)}></TextInput>
          {passwordError.length > 0 ? <Text style={Style.authError}>{passwordError}</Text> : null}
          {unknownError.length > 0 ? <Text style={Style.authError}>{unknownError}</Text> : null}
          <Button title={Lang.AUTH.SIGN_UP} onPress={() => signUp(email, password)}></Button>
        </View>
      )}
    </>
  );
}
export default SignUpScreen;
