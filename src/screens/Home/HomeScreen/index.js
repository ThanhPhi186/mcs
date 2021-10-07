import React from 'react';
import {StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppText} from '../../../components/atoms';
import {NAVIGATION_NAME} from '../../../navigations/NavigationName';
import {Colors} from '../../../styles';
import {container, titleBold, viewRow} from '../../../styles/GlobalStyles';
import {device_width, statusBar} from '../../../styles/Mixin';
import ItemHomeMenu from '../component/ItemHomeMenu';
import Toast from 'react-native-toast-message';

const HomeScreen = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const imagesSlider = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Tạo đơn hàng thành công 👋',
      style: {height: 200},
    });
  };

  const renderHeader = (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={viewRow}>
          <FastImage
            source={images.avatar}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View>
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
      <View style={styles.viewRowItem}>
        <ItemHomeMenu
          iconName="cart"
          title={`Đơn hàng ${'\n'} mua`}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ListPO)}
          // onPress={showToast}
        />
        <ItemHomeMenu
          iconName="shopping-search"
          title={`Tra cứu ${'\n'} sản phẩm`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.SearchProductScreen)
          }
        />
        <ItemHomeMenu iconName="bag-personal" title="Kiểm kê" />
      </View>
      <View style={styles.viewRowItem}>
        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={'Danh sách chính sách giá'}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ListPricePolicy)}
        />
        <ItemHomeMenu
          iconName="file-edit"
          title={'Danh sách giá thay đổi'}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ListPriceChange)}
        />
        <ItemHomeMenu
          iconName="file-remove"
          title={'Thống kê huỷ hàng'}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.CancelOrderStatistic)
          }
        />
      </View>
      <View style={styles.viewRowItem}>
        <ItemHomeMenu
          iconName="history"
          title={`Lịch sử ${'\n'} đăng nhập`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.CashierLoginHistory)
          }
        />
        <ItemHomeMenu
          iconName="file-plus"
          title={`Lên đơn ${'\n'} PO`}
          onPress={() => navigation.navigate(NAVIGATION_NAME.SelectSupplier)}
        />
        <ItemHomeMenu />
      </View>
    </View>
  );

  return (
    <View style={container}>
      <View style={{height: statusBar, backgroundColor: Colors.WHITE}}>
        <StatusBar
          backgroundColor={Colors.WHITE}
          translucent
          barStyle="dark-content"
        />
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
