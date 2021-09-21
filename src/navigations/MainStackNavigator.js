import * as React from 'react';
import {NAVIGATION_NAME} from './navigationName';
import {createStackNavigator} from '@react-navigation/stack';
import {ChangePassword, LoginCompanyScreen, LoginScreen} from '../screens';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const MainStack = () => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const userAuthen = useSelector(
    state => state.AuthenOverallReducer.userAuthen,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      {BaseUrl ? (
        <Stack.Screen
          name={NAVIGATION_NAME.LoginScreen}
          component={LoginScreen}
        />
      ) : (
        <Stack.Screen
          name={NAVIGATION_NAME.LoginCompanyScreen}
          component={LoginCompanyScreen}
        />
      )}
      {userAuthen._REQ_PASS_CHANGE && (
        <Stack.Screen name="changePassword" component={ChangePassword} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
