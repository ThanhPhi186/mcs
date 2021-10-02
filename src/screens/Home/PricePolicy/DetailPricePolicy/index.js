import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';
import {ItemInfo} from '../../../../components/molecules';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {FONT_SIZE_20} from '../../../../styles/Typography';
import {Const, trans} from '../../../../utils';
import moment from 'moment';

const DetailPricePolicy = ({navigation, route}) => {
  const {productQuotationId} = route.params;
  const [detailPricePolicy, setDetailPricePolicy] = useState();

  useEffect(() => {
    const params = {
      productQuotationId,
    };
    ServiceHandle.post(Const.API.GetQuotationInfoMobilemcs, params).then(
      res => {
        if (res.ok) {
          setDetailPricePolicy(res.data);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      },
    );
  }, [productQuotationId]);

  const renderApplyStore = (
    <View style={styles.infoPolicy}>
      <AppText style={styles.productName} containerStyle={styles.viewTitle}>
        {trans('applicableProducts')} :
      </AppText>
      {detailPricePolicy?.listProductQuotationRuleData.map((elm, index) => {
        return elm.categoryName ? (
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 8,
              paddingBottom: 8,
            }}
            key={index}>
            <AppText style={{fontWeight: 'bold', marginBottom: 4}}>
              {elm.categoryName}
            </AppText>
            <AppText style={{marginBottom: 4}}>
              {elm.productQuotationId}
            </AppText>
            <AppText>{elm.amount}</AppText>
          </View>
        ) : (
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 8,
              paddingBottom: 8,
            }}
            key={index}>
            <AppText style={{fontWeight: 'bold', marginBottom: 4}}>
              {elm.productName}
            </AppText>
            <AppText style={{marginBottom: 4}}>{elm.productId}</AppText>
            <AppText>
              {elm.quantityUomDesc} - {elm.taxPercentage} -{' '}
              {elm.priceToDistNormalAfterVAT}
            </AppText>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailPricePolicy')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.infoPolicy}>
          <View style={styles.viewProductName}>
            <AppText
              style={styles.productName}
              containerStyle={styles.viewTitle}>
              {detailPricePolicy?.quotationName}
            </AppText>
          </View>
          <ItemInfo
            title={trans('id')}
            value={detailPricePolicy?.productQuotationId}
          />
          <ItemInfo
            title={trans('startDate')}
            value={moment(detailPricePolicy?.fromDate).format('DD-MM-YYYY')}
          />
          <ItemInfo
            title={trans('unit')}
            value={detailPricePolicy?.currencyUomId}
          />
        </View>
        {renderApplyStore}
      </View>
    </View>
  );
};
export default DetailPricePolicy;

const styles = {
  contentContainer: {
    flex: 1,
  },
  infoPolicy: {
    borderRadius: 12,
    ...Mixin.padding(12, 20, 12, 20),
    ...Mixin.margin(12, 12, 0, 12),
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewProductName: {
    borderBottomWidth: 1,
    paddingVertical: Mixin.moderateSize(8),
    borderColor: Colors.WHITE_SMOKE,
  },
  productName: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: FONT_SIZE_20,
    color: Colors.GRAY,
  },
  viewInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
