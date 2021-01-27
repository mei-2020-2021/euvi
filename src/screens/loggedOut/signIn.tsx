import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import Style from '../style';
import LoadingScreen from '../loading';

function SignInScreen() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [unknownError, setUnknownError] = React.useState('');

  React.useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setUnknownError('');
  }, [email, password]);

  function signIn() {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid: Email');
        } else if (error.code === 'auth/wrong-password') {
          setPasswordError('Invalid: Password');
        } else {
          setUnknownError('Invalid: Unknown');
        }
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={Style.screen}>
          <TextInput
            style={Style.authInput}
            placeholder={'Email'}
            autoCompleteType={'email'}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onChangeText={(data: string) => setEmail(data)}
          />
          {emailError.length > 0 ? <Text style={Style.authError}>{emailError}</Text> : null}
          <TextInput
            style={Style.authInput}
            placeholder={'Password'}
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onChangeText={(data: string) => setPassword(data)}
          />
          {passwordError.length > 0 ? <Text style={Style.authError}>{passwordError}</Text> : null}
          {unknownError.length > 0 ? <Text style={Style.authError}>{unknownError}</Text> : null}
          <Button title={'Sign In'} onPress={signIn} />
        </View>
      )}
    </>
  );
}
export default SignInScreen;
