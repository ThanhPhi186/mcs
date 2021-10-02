import React, {useState} from 'react';
import {Alert, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {Const} from '../../utils';
import {AppText} from '../atoms';
import numeral from 'numeral';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItem = props => {
  const {
    type,
    item,
    addQuantityProps,
    lessQuantityProps,
    styleProps,
    chooseExpDate,
    changeQuantityProps,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'choose' && {backgroundColor: Colors.WHITE_SMOKE},
        styleProps,
      ]}
      {...props}>
      <View style={styles.viewImg}>
        <FastImage
          resizeMode="contain"
          style={styles.img}
          source={
            item.image
              ? {uri: Const.API.baseImgURL + item.image}
              : images.noImage
          }
        />
      </View>
      <View style={styles.leftContent}>
        <AppText style={styles.nameProduct}>{item.productName}</AppText>
        <AppText style={styles.info}>
          {item.productCode}{' '}
          {(item.uomDescription || item.abbreviation) &&
            `(${item.uomDescription || item.abbreviation})`}
        </AppText>
        {chooseExpDate ? (
          <TouchableOpacity onPress={chooseExpDate}>
            <AppText style={styles.info}>
              {moment(item.expiredDate).format('DD/MM/YYYY')}
            </AppText>
          </TouchableOpacity>
        ) : (
          <AppText style={styles.info}>
            {item.priceVAT && numeral(item.priceVAT).format()}
          </AppText>
        )}
      </View>
      {type === 'choose' && (
        <>
          <TextInput
            style={styles.boxAmount}
            value={(
              item.quantity ||
              item.qtyInInventory ||
              item.qtyExpInventory ||
              ''
            ).toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeQuantityProps(valueInput, item)}
          />
          <View style={styles.viewQuantity}>
            <TouchableOpacity onPress={() => addQuantityProps(item)}>
              <Icon name="menu-up" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessQuantityProps(item)}>
              <Icon name="menu-down" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {type === 'readOnly' && (
        <AppText
          containerStyle={[
            styles.boxAmount,
            {marginRight: Mixin.moderateSize(16)},
          ]}>
          {item.quantity}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
export default CardItem;

const styles = {
  container: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  info: {
    fontStyle: 'italic',
  },
  viewQuantity: {
    marginHorizontal: 8,
  },
};
