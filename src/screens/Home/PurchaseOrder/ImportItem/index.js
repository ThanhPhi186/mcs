import React from 'react';
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
import {CardItem} from '../../../../components/molecules';
import {container, fontWeightBold} from '../../../../styles/GlobalStyles';
import {trans} from '../../../../utils';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Mixin} from '../../../../styles';

const ImportItem = ({navigation, route}) => {
  const {dataItems} = route.params;

  console.log('dataItems', dataItems);

  const lessAmountProps = () => {};
  const changeAmountProps = () => {};
  const addAmountProps = () => {};

  const renderItem = item => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <AppText style={{fontWeight: 'bold'}}>
            {item.productId} ({item.uomId})
          </AppText>
          <AppText>SL cần: {item.quantity}</AppText>
          <AppText>{numeral(item.unitPrice).format()} đ</AppText>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={styles.boxAmount}
            value={item.quantity.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmountProps(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addAmountProps(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessAmountProps(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={styles.boxAmount}
            value={item.quantity.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmountProps(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addAmountProps(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessAmountProps(item)}>
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
          data={dataItems}
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
