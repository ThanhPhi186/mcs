import React from 'react';
import {StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {isIphoneX} from '../../../helpers/iphoneXHelper';
import {NAVIGATION_NAME} from '../../../navigations';
import {Colors} from '../../../styles';
import {container, titleBold, viewRow} from '../../../styles/GlobalStyles';
import {device_width, statusBar} from '../../../styles/Mixin';
import ItemHomeMenu from '../component/ItemHomeMenu';

const HomeScreen = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const imagesSlider = [
    images.intro1,
    images.intro2,
    images.intro3,
    images.intro4,
  ];

  const renderHeader = (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={[viewRow, {flex: 1}]}>
          <FastImage
            source={images.avatar}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <AppText style={titleBold}>Nguyễn Thành Phi</AppText>
            <AppText>{store.storeName}</AppText>
          </View>
        </View>
        <FastImage
          source={images.logoVertical}
          style={styles.logoCompany}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  const renderImageSlider = (
    <SliderBox
      images={imagesSlider}
      sliderBoxHeight={140}
      dotColor="#FFEE58"
      autoplay
      inactiveDotColor="#90A4AE"
      circleLoop
      ImageComponentStyle={styles.itemImageSlider}
    />
  );

  const renderItem = (
    <View style={styles.containerItem}>
      <ItemHomeMenu
        iconName="cart"
        title={`Đơn hàng ${'\n'} mua`}
        onPress={() => navigation.navigate(NAVIGATION_NAME.ListPO)}
      />
      <ItemHomeMenu
        iconName="file-plus"
        title={`Lên đơn ${'\n'} PO`}
        onPress={() => navigation.navigate(NAVIGATION_NAME.SelectSupplier)}
      />
      <ItemHomeMenu
        iconName="shopping-search"
        title={`Tra cứu ${'\n'} sản phẩm`}
        onPress={() => navigation.navigate(NAVIGATION_NAME.SearchProductScreen)}
      />

      <ItemHomeMenu
        iconName="currency-usd-circle"
        title={'Danh sách chính sách giá'}
        onPress={() => navigation.navigate(NAVIGATION_NAME.ListPricePolicy)}
      />
      <ItemHomeMenu
        iconName="file-edit"
        title={`Danh sách giá ${'\n'} thay đổi`}
        onPress={() => navigation.navigate(NAVIGATION_NAME.ListPriceChange)}
      />
      <ItemHomeMenu
        iconName="file-remove"
        title={`Thống kê ${'\n'} huỷ hàng`}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.CancelOrderStatistic)
        }
      />
      <ItemHomeMenu
        iconName="bag-personal"
        title="Kiểm kê"
        onPress={() => navigation.navigate(NAVIGATION_NAME.ListInventoryPeriod)}
      />
      <ItemHomeMenu
        iconName="history"
        title={`Lịch sử ${'\n'} đăng nhập`}
        onPress={() => navigation.navigate(NAVIGATION_NAME.CashierLoginHistory)}
      />
    </View>
  );

  return (
    <View style={container}>
      <View
        style={{
          height: isIphoneX() ? statusBar : 0,
          backgroundColor: Colors.WHITE,
        }}>
        {/* <StatusBar
          backgroundColor={Colors.WHITE}
          translucent
          barStyle="dark-content"
        /> */}
      </View>
      {renderHeader}
      {renderImageSlider}
      {renderItem}
    </View>
  );
};

export default HomeScreen;

const styles = {
  headerContainer: {
    overflow: 'hidden',
    paddingBottom: 4,
  },
  headerContent: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  logoCompany: {
    width: 80,
    height: 40,
  },
  itemImageSlider: {
    borderRadius: 16,
    width: device_width - 24,
    marginTop: 12,
  },
  containerItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  viewRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};
