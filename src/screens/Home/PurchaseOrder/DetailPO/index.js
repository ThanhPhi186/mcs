import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {images} from '../../../../assets';
import {AppText} from '../../../../components/atoms';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import numeral from 'numeral';
import {CardItem, ItemInfo} from '../../../../components/molecules';
import {Colors, Mixin} from '../../../../styles';
import {ServiceHandle} from '../../../../services';
import SimpleToast from 'react-native-simple-toast';

const DetailPO = ({navigation, route}) => {
  const {orderId} = route.params;
  const [dataDetail, setDataDetail] = useState();

  useEffect(() => {
    ServiceHandle.post(Const.API.GetDetailPOMobilemcs, {orderId}).then(res => {
      if (res.ok) {
        setDataDetail(res.data);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  }, [orderId]);

  const renderItem = item => {
    return <CardItem item={item} type="readOnly" />;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailOrder')} />
      </Appbar.Header>
      <View style={styles.content}>
        <ItemInfo title={trans('codeOrder')} value={dataDetail?.orderId} />
        <ItemInfo
          title={trans('supplierName')}
          value={dataDetail?.supplierName}
        />
        <ItemInfo
          title={trans('supplierId')}
          value={dataDetail?.supplierCode}
        />
        <ItemInfo title={trans('creationTime')} value={dataDetail?.orderDate} />
        <ItemInfo title={trans('createBy')} value={dataDetail?.createdBy} />
      </View>
      <View style={styles.content}>
        <ItemInfo
          title={trans('orderValue')}
          value={dataDetail?.remainingSubTotal}
          price
        />
        <ItemInfo title={trans('tax')} value={dataDetail?.taxTotal} price />
        <ItemInfo
          title={trans('totalPayment')}
          value={dataDetail?.grandTotal}
          price
        />
      </View>
      <View style={[styles.content, {flex: 2}]}>
        <AppText style={styles.txtTitle}>{trans('itemsList')} :</AppText>
        <FlatList
          data={dataDetail?.orderItems}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default DetailPO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
    ...Mixin.margin(12, 12, 0, 12),
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
  txtTitle: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  containerItem: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
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
});
