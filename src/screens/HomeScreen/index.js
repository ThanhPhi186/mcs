import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {container, titleBold, viewRow} from '../../styles/GlobalStyles';
import {SliderBox} from 'react-native-image-slider-box';
import {device_width} from '../../styles/Mixin';
import ItemHomeMenu from './component/ItemHomeMenu';

const HomeScreen = () => {
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
            <AppText>Cửa hàng 26 Nguyễn Văn Ni</AppText>
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
        <ItemHomeMenu iconName="cart" title={`Đơn hàng ${'\n'} mua`} />
        <ItemHomeMenu
          iconName="shopping-search"
          title={`Tìm kiếm ${'\n'} sản phẩm`}
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
        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={'Danh sách giá thay đổi'}
        />
        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={'Danh sách huỷ hàng'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={`Lịch sử ${'\n'} đăng nhập`}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={container}>
      <StatusBar backgroundColor="red" />
      {renderHeader}
      {renderImageSlider}
      {renderItem}
    </SafeAreaView>
  );
};

export default HomeScreen;
