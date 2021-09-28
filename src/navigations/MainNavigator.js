import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import CompanyNavigator from './CompanyNavigator';

const MainNavigator = () => {
  const authReducer = useSelector(state => state.AuthenOverallReducer);

  console.log('authReducer', authReducer);

  return (
    <NavigationContainer>
      {!authReducer.domain ? (
        <CompanyNavigator />
      ) : authReducer.userAuthen._LOGIN_PASSED_ ? (
        <BottomTabNavigator />
      ) : (
        <LoginNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
