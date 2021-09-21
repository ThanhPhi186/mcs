import React, {useEffect} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../components/atoms';
import {StoreRedux} from '../../redux';
import {Const, trans} from '../../utils';
import styles from './styles';
// import RNBootSplash from 'react-native-bootsplash';
import {Colors} from '../../styles';
import {post} from '../../services/ServiceHandle';

const ChangeChannel = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const listStore = useSelector(state => state.StoreReducer.listProductStore);
  const channel = useSelector(state => state.StoreReducer.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    post(BaseUrl + Const.API.GetListProductStoreMobileMcs).then(res => {
      if (res.ok) {
      }
    });
  }, []);

  const onChangeChanel = item => {
    // RNBootSplash.show();
    dispatch(StoreRedux.Actions.changeChanel(item.productStoreId));
    navigation.reset({
      index: 0,
      routes: [{name: 'createOrder'}],
    });

    // setTimeout(() => {
    //   RNBootSplash.hide();
    // }, 1000);
  };

  const renderItem = elm => {
    return (
      <TouchableOpacity
        disabled={channel === elm.productStoreId}
        style={
          channel === elm.productStoreId
            ? {...styles.btn, backgroundColor: Colors.PRIMARY}
            : styles.btn
        }
        onPress={() => onChangeChanel(elm)}>
        <AppText
          style={
            channel === elm.productStoreId
              ? {...styles.storeName, color: Colors.WHITE}
              : styles.storeName
          }>
          {elm.storeName}
        </AppText>
        <AppText
          style={
            channel === elm.productStoreId
              ? {...styles.storeCode, color: Colors.WHITE}
              : styles.storeCode
          }>
          {elm.productStoreId}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <AppText style={styles.txtEmpty}>
        {trans('employeeNoSalesChannel')}
      </AppText>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title={trans('changeSalesChannels')} />
      </Appbar.Header>
      <FlatList
        data={listStore}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};
export default ChangeChannel;
