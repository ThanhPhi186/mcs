import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Button} from '../../../components/molecules';
import ServiceHandle, {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {FONT_SIZE_14} from '../../../styles/Typography';
import {Const, trans} from '../../../utils';
import ComponentSearch from '../component/ComponentSearch';
import ItemOrder from '../component/ItemOrder';

const PurchaseOrder = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [dataOrder, setDataOrder] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);

  useEffect(() => {
    const params = {
      productStoreId: store,
    };
    ServiceHandle.post(Const.API.GetListPOMobilemcs, params).then(res => {
      if (res.ok) {
        setDataOrder(res.data.listOrders);
      }
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <ItemOrder
        item={item}
        onPress={() =>
          navigation.navigate('OrderDetail', {orderId: item.orderId})
        }
      />
    );
  };

  const renderSearch = (
    <View style={styles.containerSearch}>
      <ComponentSearch title="Tìm kiếm" />
      <ComponentSearch type="dropdown" title="Trạng thái" />
      <ComponentSearch type="dropdown" title="Nhà CC" />
      <ComponentSearch type="dropdown" title="TT Khovt" />
      <View style={styles.viewBtn}>
        <Button
          title="Bỏ tìm kiếm"
          containerStyle={styles.btnSearch}
          titleStyle={styles.txtBtnSearch}
          onPress={() => setDisplaySearch(false)}
        />
        <Button
          title="Tìm kiếm"
          containerStyle={styles.btnSearch}
          titleStyle={styles.txtBtnSearch}
        />
      </View>
    </View>
  );

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('orderList')} />
        <Appbar.Action
          icon="magnify"
          onPress={() => setDisplaySearch(!displaySearch)}
        />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        {displaySearch && renderSearch}
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default PurchaseOrder;

const styles = {
  contentContainer: {
    flex: 1,
  },
  containerSearch: {
    padding: 12,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btnSearch: {
    width: '48%',
    height: 40,
    borderRadius: 8,
  },
  txtBtnSearch: {
    fontSize: FONT_SIZE_14,
  },
};
