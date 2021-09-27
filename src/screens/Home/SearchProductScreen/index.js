import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {ItemInfo, SearchProductComponent} from '../../../components/molecules';
import {container} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import styles from './styles';

const SearchProductScreen = ({navigation}) => {
  const [dataProduct, setDataProduct] = useState();
  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('searchProduct')} />
      </Appbar.Header>
      <SearchProductComponent />
      <View style={styles.contentContainer}>
        {dataProduct ? (
          <View style={styles.content}>
            <View style={styles.viewProductName}>
              <AppText
                style={styles.productName}
                containerStyle={styles.viewTitle}>
                {dataProduct.productName}
              </AppText>
            </View>
            <ItemInfo
              title={trans('nameList')}
              value={dataProduct.categoryName}
            />
            <ItemInfo
              title={trans('productCode')}
              value={dataProduct.productCode}
            />
            <ItemInfo
              title={trans('defaultPrice')}
              value={dataProduct.productDefaultPriceValue}
            />
            <ItemInfo
              title={trans('listedPrice')}
              value={dataProduct.productListPriceValue}
            />
            <ItemInfo
              title={trans('unit')}
              value={dataProduct.quantityUomDesc}
            />
            <ItemInfo title={trans('taxApplicable')} value="" />
            <ItemInfo
              title={trans('productType')}
              value={dataProduct.productTypeId}
            />
          </View>
        ) : (
          <View style={styles.viewInfo}>
            <AppText style={styles.info}>{trans('noProduct')}</AppText>
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchProductScreen;
