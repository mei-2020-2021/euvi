import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import Style from '../style';
import LoadingScreen from '../loading';
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
        const uid = auth().currentUser.uid;
        
        
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Error: Email already in use');
        }
        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid: Email');
        }
        if (error.code === 'auth/weak-password') {
          setPasswordError('Error: Weak password');
        }
        if (error.code === 'auth/operation-not-allowed') {
          setUnknownError('Invalid: Unknown');
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
              placeholder={'Firstname'}
              onChangeText={(firstName: string) => setFirstName(firstName)}></TextInput>
            <TextInput
              style={[Style.authInput, {flex: 1, marginStart: 8}]}
              autoCompleteType={'name'}
              placeholder={'Lastname'}
              onChangeText={(lastName: string) => setLastName(lastName)}></TextInput>
          </View>
          <TextInputMask
            style={Style.authInput}
            placeholder={'Birth date (dd/mm/yyyy)'}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={birthday}
            onChangeText={setBirthday}
          />

          <TextInput
            style={Style.authInput}
            placeholder={'Email'}
            autoCompleteType={'email'}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onChangeText={(email: string) => setEmail(email)}></TextInput>
          {emailError.length > 0 ? <Text style={Style.authError}>{emailError}</Text> : null}

          <TextInput
            style={Style.authInput}
            placeholder={'Password'}
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={(password: string) => setPassword(password)}></TextInput>
          {passwordError.length > 0 ? <Text style={Style.authError}>{passwordError}</Text> : null}
          {unknownError.length > 0 ? <Text style={Style.authError}>{unknownError}</Text> : null}
          <Button title={'Sign Up'} onPress={() => signUp(email, password)}></Button>
        </View>
      )}
    </>
  );
}
export default SignUpScreen;
