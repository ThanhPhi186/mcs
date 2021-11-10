import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import CompanyNavigator from './CompanyNavigator';

const MainNavigator = () => {
  const {domain, userAuthen} = useSelector(state => ({
    domain: state.AuthenOverallReducer.domain,
    userAuthen: state.AuthenOverallReducer.userAuthen,
  }));

  return (
    <NavigationContainer>
      {!domain ? (
        <CompanyNavigator />
      ) : userAuthen._LOGIN_PASSED_ ? (
        <BottomTabNavigator />
      ) : (
        <LoginNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
