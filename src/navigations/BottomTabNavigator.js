import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HomeScreen,
  ChangePassword,
  MainAccount,
  ChangeStore,
  ListPO,
  SearchProductScreen,
  ListPriceChange,
  ListPricePolicy,
  DetailPricePolicy,
  CancelOrderStatistic,
  CashierLoginHistory,
  SelectSupplier,
  SelectProduct,
  ConfirmOrder,
  DetailPO,
  EditPO,
  ListInventoryPeriod,
  DetailInventoryPeriod,
  ListLocation,
  ContactScreen,
  ShareScreen,
  ImportItem,
  ListTally,
  ListApplicableStore,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles';
import {FONT_SIZE_10} from '../styles/Typography';
import {device_width} from '../styles/Mixin';
import TabShape from './TabShape';
import {NAVIGATION_BOTTOM_TABS_HEIGHT} from '../styles/GlobalStyles';
import {NAVIGATION_NAME} from '.';
import {Appbar} from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

    if (
      routeName === NAVIGATION_NAME.ListPO ||
      routeName === NAVIGATION_NAME.SearchProductScreen ||
      routeName === NAVIGATION_NAME.ListPriceChange ||
      routeName === NAVIGATION_NAME.ListPricePolicy ||
      routeName === NAVIGATION_NAME.DetailPricePolicy ||
      routeName === NAVIGATION_NAME.CancelOrderStatistic ||
      routeName === NAVIGATION_NAME.CashierLoginHistory ||
      routeName === NAVIGATION_NAME.SelectSupplier ||
      routeName === NAVIGATION_NAME.SelectProduct ||
      routeName === NAVIGATION_NAME.ConfirmOrder ||
      routeName === NAVIGATION_NAME.DetailPO ||
      routeName === NAVIGATION_NAME.EditPO ||
      routeName === NAVIGATION_NAME.ListInventoryPeriod ||
      routeName === NAVIGATION_NAME.DetailInventoryPeriod ||
      routeName === NAVIGATION_NAME.ListLocation ||
      routeName === NAVIGATION_NAME.ImportItem ||
      routeName === NAVIGATION_NAME.ListTally ||
      routeName === NAVIGATION_NAME.ListApplicableStore
    ) {
      return false;
    }
    return true;
  };

  const getPersonVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainAccount';

    if (
      routeName === NAVIGATION_NAME.ChangeStore ||
      routeName === NAVIGATION_NAME.ChangePassword
    ) {
      return false;
    }
    return true;
  };

  const getSalesProductVisibility = route => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? 'ListProductInStore';
    if (routeName === 'SalesCart' || routeName === 'PaymentOfSales') {
      return false;
    }
    return true;
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName={NAVIGATION_NAME.HomeScreen}>
        <Stack.Screen
          name={NAVIGATION_NAME.HomeScreen}
          component={HomeScreen}
        />
        <Stack.Screen name={NAVIGATION_NAME.ListPO} component={ListPO} />
        <Stack.Screen name={NAVIGATION_NAME.DetailPO} component={DetailPO} />
        <Stack.Screen name={NAVIGATION_NAME.EditPO} component={EditPO} />
        <Stack.Screen
          name={NAVIGATION_NAME.SearchProductScreen}
          component={SearchProductScreen}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListPriceChange}
          component={ListPriceChange}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListPricePolicy}
          component={ListPricePolicy}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.DetailPricePolicy}
          component={DetailPricePolicy}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.CancelOrderStatistic}
          component={CancelOrderStatistic}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.CashierLoginHistory}
          component={CashierLoginHistory}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.SelectSupplier}
          component={SelectSupplier}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.SelectProduct}
          component={SelectProduct}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ConfirmOrder}
          component={ConfirmOrder}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListInventoryPeriod}
          component={ListInventoryPeriod}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.DetailInventoryPeriod}
          component={DetailInventoryPeriod}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListLocation}
          component={ListLocation}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ImportItem}
          component={ImportItem}
        />
        <Stack.Screen name={NAVIGATION_NAME.ListTally} component={ListTally} />

        <Stack.Screen
          name={NAVIGATION_NAME.ListApplicableStore}
          component={ListApplicableStore}
        />
      </Stack.Navigator>
    );
  };

  const AccountStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName={NAVIGATION_NAME.MainAccount}>
        <Stack.Screen
          name={NAVIGATION_NAME.MainAccount}
          component={MainAccount}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ChangeStore}
          component={ChangeStore}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ChangePassword}
          component={ChangePassword}
        />
      </Stack.Navigator>
    );
  };

  function MyTabBar({state, descriptors, navigation}) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const tabWidth = React.useMemo(
      () => device_width / state.routes.length,
      [state.routes.length],
    );

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    const renderIcon = name => {
      switch (name) {
        case trans('home'):
          return 'home';
        case trans('contact'):
          return 'phone-in-talk';
        case 'L??n ????n':
          return 'plus-circle-outline';
        case trans('share'):
          return 'share-variant';
        case trans('personal'):
          return 'account';
        default:
          break;
      }
    };

    return (
      <View style={styles.content}>
        <TabShape {...{tabWidth}} />
        <View style={styles.subContent}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            if (index === 2) {
              return <CustomButtonTab onPress={() => {}} key={index} />;
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={renderIcon(label)}
                  color={isFocused ? Colors.PRIMARY : Colors.GRAY}
                  size={24}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.PRIMARY : Colors.GRAY,
                    marginTop: 4,
                    fontSize: FONT_SIZE_10,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  const middleComponent = () => {
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={trans('home')}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen name={trans('contact')} component={ContactScreen} />
      <Tab.Screen
        name="L??n ????n"
        component={middleComponent}
        options={({route}) => ({
          tabBarVisible: getSalesProductVisibility(route),
        })}
      />
      <Tab.Screen
        name={trans('share')}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View style={{padding: 6}}>
                <MaterialCommunityIcons name="bell" size={size} color={color} />
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 4,
                    width: 16,
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '600'}}>
                    4
                  </Text>
                </View>
              </View>
            );
          },
        }}
        component={ShareScreen}
      />
      <Tab.Screen
        name={trans('personal')}
        component={AccountStack}
        options={({route}) => ({
          tabBarVisible: getPersonVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = {
  content: {
    position: 'absolute',
    bottom: 0,
  },
  subContent: {
    flexDirection: 'row',
    position: 'absolute',
    height: NAVIGATION_BOTTOM_TABS_HEIGHT,
    width: device_width,
  },
};

export default BottomTabNavigator;
