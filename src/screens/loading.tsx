import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Style from './style';

function LoadingScreen() {
  return (
    <View style={[Style.screen, {flex: 1, justifyContent: 'center', flexDirection: 'row'}]}>
      <ActivityIndicator size="large" />
    </View>
  );
}
export default LoadingScreen;
