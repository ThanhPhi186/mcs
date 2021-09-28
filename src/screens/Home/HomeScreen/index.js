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

const HomeScreen = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const imagesSlider = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  const renderHeader = (
    <View style={{overflow: 'hidden', paddingBottom: 4}}>
      <View
        style={{
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
        }}>
        <View style={viewRow}>
          <FastImage
            source={images.avatar}
            style={{width: 48, height: 48, marginRight: 12}}
            resizeMode="contain"
          />
          <View>
            <AppText style={titleBold}>Nguyễn Thành Phi</AppText>
            <AppText>{store.storeName}</AppText>
          </View>
        </View>
        <FastImage
          source={images.logoVertical}
          style={{width: 80, height: 40}}
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
      ImageComponentStyle={{
        borderRadius: 16,
        width: device_width - 24,
        marginTop: 12,
      }}
    />
  );

  const renderItem = (
    <View
      style={{
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
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <ItemHomeMenu
          iconName="cart"
          title={`Đơn hàng ${'\n'} mua`}
          onPress={() => navigation.navigate(NAVIGATION_NAME.PurchaseOrder)}
        />
        <ItemHomeMenu
          iconName="shopping-search"
          title={`Tìm kiếm ${'\n'} sản phẩm`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.SearchProductScreen)
          }
        />
        <ItemHomeMenu iconName="bag-personal" title="Kiểm kê" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={'Danh sách chính sách giá'}
        />
        <ItemHomeMenu iconName="file-edit" title={'Danh sách giá thay đổi'} />
        <ItemHomeMenu iconName="file-remove" title={'Danh sách huỷ hàng'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <ItemHomeMenu iconName="history" title={`Lịch sử ${'\n'} đăng nhập`} />
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
