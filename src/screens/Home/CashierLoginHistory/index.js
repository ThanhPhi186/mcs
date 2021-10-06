import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {Colors, Mixin} from '../../../styles';
import {ServiceHandle} from '../../../services';
import {useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

const CashierLoginHistory = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [loginHistoryData, setLoginHistoryData] = useState();

  useEffect(() => {
    const params = {
      viewIndex: 0,
      viewSize: 10,
      productStoreId: store.productStoreId,
    };
    ServiceHandle.post(Const.API.GetListLoginPosHistoryMobilemcs, params).then(
      res => {
        if (res.ok) {
          setLoginHistoryData(res.data.listLoginPosHistory);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      },
    );
  }, [store.productStoreId]);

  const renderItem = item => {
    return (
      <View style={styles.containerItem}>
        <AppText style={styles.nameProduct}>
          {item.partyName} - {item.partyCode}
        </AppText>
        <AppText style={styles.txtInfo}>
          {item.posTerminalId} - {item.terminalName}
        </AppText>
        <AppText style={styles.txtInfo}>
          {item.fromDate} - {item.thruDate}
        </AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('CashierLoginHistory')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <FlatList
          data={loginHistoryData}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default CashierLoginHistory;

const styles = {
  contentContainer: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    ...Mixin.margin(12, 12, 0, 12),
    ...Mixin.padding(12),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  txtInfo: {
    fontStyle: 'italic',
    paddingTop: Mixin.moderateSize(8),
  },
};
