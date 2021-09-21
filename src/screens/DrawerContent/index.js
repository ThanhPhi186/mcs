import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Avatar, Title, Drawer} from 'react-native-paper';
import {Colors, Mixin} from '../../styles';
import {trans} from '../../utils/i18n';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppDialog} from '../../components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux} from '../../redux/authen';
import {ProductRedux, StoreRedux} from '../../redux';
import {images} from '../../assets';

export function DrawerContent(props) {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalChangeComp, setModalChangeComp] = useState(false);
  const [active, setActive] = useState('createOrder');
  const {navigation} = props;

  const dispatch = useDispatch();
  const channel = useSelector(state => state.StoreReducer.channel);
  const accountUser = useSelector(
    state => state.AuthenOverallReducer.accountUser,
  );

  const logout = () => {
    dispatch(StoreRedux.Actions.changeChanel(''));
    dispatch(AuthenOverallRedux.Actions.logout.request());
  };

  const changeCompany = () => {
    dispatch(StoreRedux.Actions.changeChanel(''));
    dispatch(AuthenOverallRedux.Actions.resetCompany());
    dispatch(AuthenOverallRedux.Actions.logout.request());
  };

  const renderWithChannel = () => {
    return (
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={size}
            />
          )}
          label={trans('createOrder')}
          onPress={() => {
            navigation.navigate('createOrder', {screens: 'createOrder'});
            setActive('createOrder');
          }}
          focused={active === 'createOrder'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={size}
            />
          )}
          label={trans('addCustomer')}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'createCustomer'}],
            });
            setActive('addCustomer');
          }}
          focused={active === 'addCustomer'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="badge-account-horizontal"
              color={color}
              size={size}
            />
          )}
          label={trans('agentProposal')}
          onPress={() => {
            navigation.navigate('agentList');
            setActive('agentProposal');
          }}
          focused={active === 'agentProposal'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="notebook" color={color} size={size} />
          )}
          label={trans('listSaleOrder')}
          onPress={() => {
            navigation.navigate('saleOder');
            setActive('listSaleOrder');
          }}
          focused={active === 'listSaleOrder'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="hammer-wrench"
              color={color}
              size={size}
            />
          )}
          label={trans('utilities')}
          onPress={() => {
            navigation.navigate('utility');
            setActive('utility');
          }}
          focused={active === 'utility'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="tag-text" color={color} size={size} />
          )}
          label={trans('promotion')}
          onPress={() => {
            navigation.navigate('promotion');
            setActive('promotion');
          }}
          focused={active === 'promotion'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={color}
              size={size}
            />
          )}
          label={trans('reportStatistic')}
          onPress={() => {
            navigation.navigate('reportStatistic');
            setActive('reportStatistic');
          }}
          focused={active === 'reportStatistic'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          )}
          label={trans('changeSalesChannels')}
          onPress={() => {
            navigation.navigate('changeChannel');
            setActive('changeChannel');
          }}
          focused={active === 'changeChannel'}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="key" color={color} size={size} />
          )}
          label={trans('changePass')}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'changePassword'}],
            });
            setActive('changePassword');
          }}
          focused={active === 'changePassword'}
        />

        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="home-import-outline"
              color={color}
              size={size}
            />
          )}
          label={trans('companyChange')}
          onPress={() => {
            setModalChangeComp(true);
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label={trans('logout')}
          onPress={() => {
            setModalLogout(true);
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
          label={`${trans('version')} (1.0.2)`}
        />
      </Drawer.Section>
    );
  };

  const renderWithoutChannel = () => {
    return (
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          )}
          label={trans('changeSalesChannels')}
          onPress={() => navigation.navigate('changeChannel')}
        />

        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="home-import-outline"
              color={color}
              size={size}
            />
          )}
          label={trans('companyChange')}
          onPress={() => {
            setModalChangeComp(true);
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label={trans('logout')}
          onPress={() => {
            setModalLogout(true);
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
          label={`${trans('version')} (1.0.2)`}
        />
      </Drawer.Section>
    );
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image source={images.logo_circle} size={80} />
          <Title style={styles.title}>{accountUser.USERNAME}</Title>
        </View>
        {channel ? renderWithChannel() : renderWithoutChannel()}

        <AppDialog
          content={trans('confirmLogout')}
          isVisible={modalLogout}
          titleClose={trans('no').toUpperCase()}
          onPressClose={() => setModalLogout(false)}
          titleConfirm={trans('yes').toUpperCase()}
          onPressConfirm={logout}
        />
        <AppDialog
          content={trans('confirmChangeCompany')}
          isVisible={modalChangeComp}
          titleClose={trans('no').toUpperCase()}
          onPressClose={() => setModalChangeComp(false)}
          titleConfirm={trans('yes').toUpperCase()}
          onPressConfirm={changeCompany}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: Colors.PRIMARY,
    paddingTop: 40,
  },
  title: {
    // marginTop: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  caption: {
    fontSize: 14,
    marginBottom: Mixin.moderateSize(8),
    color: Colors.BLACK,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
