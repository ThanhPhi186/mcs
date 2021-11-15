import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../../components/atoms';
import {container, fontWeightBold} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Mixin} from '../../../../styles';
import {cloneDeep, forEach} from 'lodash';
import {post} from '../../../../services/ServiceHandle';
import SimpleToast from 'react-native-simple-toast';

const ImportItem = ({navigation, route}) => {
  const {orderId} = route.params;

  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    const params = {orderId};
    const getDataReceivable = () => {
      post(Const.API.GetOrderItemReceivableMobilemcs, params).then(res => {
        if (res.ok) {
          setDataOrder(res.data.orderItems);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getDataReceivable();
  }, [orderId]);

  const importItem = () => {
    // const params = {
    //   orderId,
    //   listOrderItems: [],
    // };
    // post(Const.API.ReceiveInventoryFromPOMobilemcs, params).then(res => {
    //   if (res.ok) {
    //   } else {
    //     SimpleToast.show(res.error, SimpleToast.SHORT);
    //   }
    // });
  };

  const lessAmount = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (elm.productId === item.productId) {
        elm.quantity -= 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const changeAmount = () => {};

  const addAmount = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (
        elm.productId === item.productId &&
        elm.quantity < elm.quantityRequired
      ) {
        elm.quantity += 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const renderItem = item => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View style={{flex: 1}}>
          <AppText style={{fontWeight: 'bold'}}>
            {item.productId} ({item.uomId})
          </AppText>
          <AppText>SL cần: {item.quantityRequired}</AppText>
          <AppText>{numeral(item.unitPrice).format()} đ</AppText>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={styles.boxAmount}
            value={item.quantity.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmount(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addAmount(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessAmount(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={[styles.boxAmount, {borderColor: Colors.RED}]}
            value={item.selectedAmount.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmount(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addAmount(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessAmount(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('importItem')} />
        <Appbar.Action icon="telegram" onPress={importItem} />
      </Appbar.Header>
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', paddingVertical: 12}}>
          <AppText containerStyle={{flex: 1}} style={fontWeightBold}>
            Tên sản phẩm
          </AppText>
          <AppText
            containerStyle={{flex: 1, alignItems: 'center'}}
            style={fontWeightBold}>
            Số lượng
          </AppText>
          <AppText
            containerStyle={{flex: 1, alignItems: 'center'}}
            style={fontWeightBold}>
            Nợ
          </AppText>
        </View>
        <FlatList
          data={dataOrder}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ImportItem;

const styles = StyleSheet.create({
  viewQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
    color: Colors.BLACK,
    marginRight: 8,
  },
});
