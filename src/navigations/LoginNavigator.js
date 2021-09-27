import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, ChangePassword} from '../screens';

const Stack = createStackNavigator();
const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
