import React, {useEffect} from 'react';
import MainStackNavigator from './MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ChangeChannel, ChangePassword} from '../screens';
import {DrawerContent} from '../screens/DrawerContent';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
  const authReducer = useSelector(state => state.AuthenOverallReducer);
  const channel = useSelector(state => state.StoreReducer.channel);

  return (
    <NavigationContainer>
      {authReducer.userAuthen._LOGIN_PASSED_ ? (
        <Drawer.Navigator
          screenOptions={{headerShown: false}}
          drawerStyle={styles.drawerContainer}
          initialRouteName={channel ? 'createOrder' : 'changeChannel'}
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="changeChannel" component={ChangeChannel} />
          <Drawer.Screen name="changePassword" component={ChangePassword} />
        </Drawer.Navigator>
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
