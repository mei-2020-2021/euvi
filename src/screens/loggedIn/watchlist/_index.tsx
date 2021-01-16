import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../loading';

import PastScreen from './past';
import PresentScreen from './present';
import FutureScreen from './future';

function WachlistScreen() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setUser(auth().currentUser);
    setLoading(false);
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{height: '100%'}}>
          <Tab.Navigator tabBarOptions={{labelStyle: {textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20}}}>
            <Tab.Screen name="Past" component={PastScreen} />
            <Tab.Screen name="Present" component={PresentScreen} />
            <Tab.Screen name="Future" component={FutureScreen} />
          </Tab.Navigator>
        </View>
      )}
    </>
  );
}
export default WachlistScreen;
