import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppLoading, AppText} from '../../../../components/atoms';
import {getBottomSpace} from '../../../../helpers/iphoneXHelper';
import {NAVIGATION_NAME} from '../../../../navigations/NavigationName';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {LINE_HEIGHT} from '../../../../styles/Typography';
import {Const, trans} from '../../../../utils';

const SelectSupplier = ({navigation}) => {
  const [searchString, setSearchString] = useState('');
  const [listSupplier, setListSupplier] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListSupplier = () => {
      setLoading(true);
      const params = {
        viewSize: 0,
        viewIndex: 0,
        searchString,
      };
      ServiceHandle.post(Const.API.FindSupplierInfoMobilemcs, params)
        .then(res => {
          if (res.ok) {
            setListSupplier(res.data.listSuppliers);
          } else {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }
        })
        .finally(() => setLoading(false));
    };
    getListSupplier();
  }, [searchString]);

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.SelectProduct, {
            supplierId: item.partyId,
          })
        }>
        <AppText style={styles.storeName}>{item.groupName}</AppText>
        <AppText style={styles.storeCode}>{item.partyCode}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('selectSupplier')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.containerSearch}>
          <Searchbar
            placeholder={trans('searchSupplier')}
            style={styles.boxSearch}
            inputStyle={styles.input}
            onChangeText={setSearchString}
          />
        </View>
        <FlatList
          data={listSupplier}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.containerListSupp}
        />
      </View>
    </View>
  );
};

export default SelectSupplier;

const styles = {
  contentContainer: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(8),
  },
  storeName: {
    fontWeight: 'bold',
    lineHeight: LINE_HEIGHT,
  },
  storeCode: {
    fontStyle: 'italic',
    lineHeight: LINE_HEIGHT,
  },
  containerSearch: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  boxSearch: {
    width: '90%',
    borderRadius: 12,
  },
  containerListSupp: {
    paddingHorizontal: 16,
    paddingBottom: 16 + getBottomSpace(),
  },
};
