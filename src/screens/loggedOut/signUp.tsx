import React from 'react';
import {Text, TextInput, Button, View, TouchableOpacity, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';
import Style from '../style';
import LoadingScreen from '../loading';
import {TextInputMask} from 'react-native-masked-text';
import {backend} from '../../conf';

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

  React.useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setUnknownError('');
  }, [email, password]);

  const signUp = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const body = {
          Uid: auth().currentUser.uid,
          FirstName: firstName,
          LastName: lastName,
          BirthDate: birthday,
          Email: email,
        };
        fetch(backend + 'users', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'},
        });
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
              style={{
                margin: 8,
                marginBottom: 0,
                fontSize: 16,
                borderWidth: 2,
                borderColor: '#15616d',
                padding: 16,
                borderRadius: 4,
                shadowOffset: {width: 0, height: 0},
                flex: 1,
                marginEnd: 8,
              }}
              autoCompleteType={'name'}
              placeholder={'Firstname'}
              onChangeText={(firstName: string) => setFirstName(firstName)}
            />
            <TextInput
              style={{
                margin: 8,
                marginBottom: 0,
                fontSize: 16,
                borderWidth: 2,
                borderColor: '#15616d',
                padding: 16,
                borderRadius: 4,
                shadowOffset: {width: 0, height: 0},
                flex: 1,
                marginStart: 8,
              }}
              autoCompleteType={'name'}
              placeholder={'Lastname'}
              onChangeText={(lastName: string) => setLastName(lastName)}
            />
          </View>
          <TextInputMask
            style={{
              margin: 8,
              marginBottom: 0,
              fontSize: 16,
              borderWidth: 2,
              borderColor: '#15616d',
              padding: 16,
              borderRadius: 4,
              shadowOffset: {width: 0, height: 0},
            }}
            placeholder={'Birth date (dd/mm/yyyy)'}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={birthday}
            onChangeText={setBirthday}
          />

          <TextInput
            style={{
              margin: 8,
              marginBottom: 0,
              fontSize: 16,
              borderWidth: 2,
              borderColor: '#15616d',
              padding: 16,
              borderRadius: 4,
              shadowOffset: {width: 0, height: 0},
            }}
            placeholder={'Email'}
            autoCompleteType={'email'}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onChangeText={(email: string) => setEmail(email)}
          />
          {emailError.length > 0 ? <Text style={Style.authError}>{emailError}</Text> : null}

          <TextInput
            style={{
              margin: 8,
              marginBottom: 0,
              fontSize: 16,
              borderWidth: 2,
              borderColor: '#15616d',
              padding: 16,
              borderRadius: 4,
              shadowOffset: {width: 0, height: 0},
            }}
            placeholder={'Password'}
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={(password: string) => setPassword(password)}
          />
          {passwordError.length > 0 ? <Text style={Style.authError}>{passwordError}</Text> : null}
          {unknownError.length > 0 ? <Text style={Style.authError}>{unknownError}</Text> : null}

          <TouchableOpacity
            style={{
              padding: 16,
              margin: 16,
              alignSelf: 'center',
              backgroundColor: '#15616d',
              overflow: 'hidden',
              borderRadius: 4,
              width: Dimensions.get('window').width - 32,
            }}
            onPress={() => signUp(email, password)}>
            <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
export default SignUpScreen;
