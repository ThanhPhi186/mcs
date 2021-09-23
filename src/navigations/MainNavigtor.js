import React, {useEffect} from 'react';
import MainStackNavigator from './MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ChangeChannel, ChangePassword} from '../screens';
import {DrawerContent} from '../screens/DrawerContent';
import {useSelector} from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const authReducer = useSelector(state => state.AuthenOverallReducer);
  const channel = useSelector(state => state.StoreReducer.channel);

  return (
    <NavigationContainer>
      {!authReducer.userAuthen._LOGIN_PASSED_ ? (
        <BottomTabNavigator />
      ) : (
        <MainStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = {
  drawerContainer: {
    width: '80%',
  },
};
