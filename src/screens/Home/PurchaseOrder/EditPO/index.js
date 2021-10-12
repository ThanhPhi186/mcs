import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../../components/atoms';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import SelectDate from '../../component/SelectDate';
import moment from 'moment';
import {Colors, Mixin} from '../../../../styles';
import {ServiceHandle} from '../../../../services';
import SimpleToast from 'react-native-simple-toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Button, CardItem} from '../../../../components/molecules';
import {getBottomSpace} from '../../../../helpers/iphoneXHelper';

const EditPO = ({navigation, route}) => {
  const {orderDetail} = route.params;
  const [startDate, setStartDate] = useState(
    moment(orderDetail?.shipAfterDate).format('DD/MM/YYYY'),
  );

  const [endDate, setEndDate] = useState(
    moment(orderDetail?.shipBeforeDate).format('DD/MM/YYYY'),
  );

  const [listChooseProduct, setListChooseProduct] = useState(
    orderDetail.orderItems,
  );

  const rowTranslateAnimatedValues = {};

  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.id] = new Animated.Value(1);
  });

  const animationIsRunning = useRef(false);

  console.log('orderDetail', orderDetail);

  const confirmEditOrder = () => {
    const products = listChooseProduct?.map(elm => {
      return {
        productId: elm.productId,
        quantity: elm.quantity.toString(),
        lastPrice: elm.lastPrice.toString(),
        quantityUomId: elm.uomId,
        orderItemSeqId: elm.orderItemSeqId,
        itemComment: '',
      };
    });

    const params = {
      orderId: orderDetail.orderId,
      listOrderItemDelete: JSON.stringify(products),
      listOrderItemUpdate: JSON.stringify(),
      shipAfterDate: moment(startDate, 'DD/MM/YYYY').valueOf(),
      shipBeforeDate: moment(endDate, 'DD/MM/YYYY').valueOf(),
    };
    ServiceHandle.post(Const.API.UpdatePOMobilemcs, params).then(res => {
      if (res.ok) {
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  //   const checkForUpdate = () => {
  //     if (
  //       moment(startDate, 'DD/MM/YYYY').valueOf() !== orderDetail.shipAfterDate ||
  //       moment(endDate, 'DD/MM/YYYY').valueOf() !== orderDetail.shipBeforeDate
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   };

  const addAmount = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessAmount = item => {
    if (item.quantity > 1) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.productId === item?.productId) {
          elm.quantity -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    }
  };

  const changeAmount = (valueInput, item) => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity = Number(valueInput);
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Mixin.device_width && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listChooseProduct].filter(item => item.id !== key);
        setListChooseProduct(newData);
        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = item => {
    return (
      <Animated.View
        style={[
          styles.rowFrontContainer,
          {
            height: rowTranslateAnimatedValues[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80],
            }),
          },
        ]}>
        <CardItem
          item={item}
          type="choose"
          addAmountProps={addAmount}
          lessAmountProps={lessAmount}
          changeAmountProps={changeAmount}
          disabled
        />
      </Animated.View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <AppText style={styles.backTextWhite}>Delete</AppText>
      </View>
    </View>
  );

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('editOrder')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.containerDate}>
          <AppText>Giao hàng :</AppText>
          <View style={{flexDirection: 'row'}}>
            <SelectDate
              valueDate={startDate}
              setValueDate={date =>
                setStartDate(moment(date).format('DD/MM/YYYY'))
              }
            />
            <View style={styles.line} />
            <SelectDate
              valueDate={endDate}
              setValueDate={date =>
                setEndDate(moment(date).format('DD/MM/YYYY'))
              }
            />
          </View>
        </View>
        <SwipeListView
          disableRightSwipe
          data={listChooseProduct}
          renderItem={({item}) => renderItem(item)}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Mixin.device_width}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      {listChooseProduct.length >= 1 && (
        <Button
          containerStyle={styles.btnEditOrder}
          title={trans('updateOrder')}
          onPress={confirmEditOrder}
        />
      )}
    </View>
  );
};
export default EditPO;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerDate: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  line: {
    width: 20,
    backgroundColor: Colors.LIGHT_GREY,
    height: 1,
    alignSelf: 'center',
  },
  btnEditOrder: {
    alignSelf: 'center',
    marginBottom: getBottomSpace(),
  },
});
