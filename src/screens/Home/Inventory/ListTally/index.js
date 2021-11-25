import React, {useRef, useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Appbar, FAB} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScanComponent} from '../../../../components/molecules';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {trans} from '../../../../utils';

const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
const CAM_VIEW_WIDTH = Dimensions.get('screen').width;

const leftMargin = 100;
const topMargin = 50;
const frameWidth = 200;
const frameHeight = 250;

const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
const scanAreaY = topMargin / CAM_VIEW_WIDTH;
const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;

const ListTally = ({navigation}) => {
  const [listProduct, setListProduct] = useState([]);
  const [barcodeType, setBarcodeType] = useState('');
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');

  const [camera, setCamera] = useState({
    camera: {
      type: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
    },
  });

  const defaultBarcodeTypes = [RNCamera.Constants.BarCodeType];

  const cameraRef = useRef();

  useEffect(() => {
    if (isBarcodeRead) {
      Alert.alert(barcodeType, barcodeValue, [
        {
          text: 'OK',
          onPress: () => {
            // reset everything
            setIsBarcodeRead(false);
            setBarcodeType('');
            setBarcodeValue('');
          },
        },
      ]);
    }
  }, [isBarcodeRead, barcodeType, barcodeValue]);

  const onBarcodeRead = event => {
    console.log('event', event);
    if (!isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeType(event.type);
      setBarcodeValue(event.data);
    }
  };

  const renderItem = () => {};

  return (
    // <View style={container}>
    //   <Appbar.Header>
    //     <Appbar.BackAction onPress={() => navigation.goBack()} />
    //     <Appbar.Content title={trans('listProduct')} />
    //   </Appbar.Header>
    //   <View style={styles.contentContainer}>
    //     <FlatList
    //       data={listProduct}
    //       renderItem={({item}) => renderItem(item)}
    //       keyExtractor={(item, index) => index.toString()}
    //       contentContainerStyle={styles.containerFlatlist}
    //     />
    //   </View>
    //   <FAB
    //     style={styles.fab}
    //     icon="qrcode-scan"
    //     onPress={() => setScanQr(true)}
    //   />
    // </View>
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        defaultTouchToFocus
        // flashMode={this.state.camera.flashMode}
        mirrorImage={false}
        onBarCodeRead={onBarcodeRead}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }
        style={styles.preview}
        type={camera.type}
        barcodeTypes={isBarcodeRead ? [] : defaultBarcodeTypes}
        rectOfInterest={{
          x: scanAreaX,
          y: scanAreaY,
          width: scanAreaWidth,
          height: scanAreaHeight,
        }}
        cameraViewDimensions={{
          width: CAM_VIEW_WIDTH,
          height: CAM_VIEW_HEIGHT,
        }}
      />
      <View style={[styles.overlay, styles.topOverlay]}>
        <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
      </View>
      <View style={[styles.overlay, styles.bottomOverlay]}>
        <TouchableOpacity
          onPress={() => {
            console.log('scan clicked');
          }}
          style={styles.enterBarcodeManualButton}
          title="Enter Barcode"
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: leftMargin,
          right: topMargin,
          width: frameWidth,
          height: frameHeight,
          borderWidth: 2,
          borderColor: 'red',
          opacity: 0.5,
        }}
      />
    </View>
  );
};
export default ListTally;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.PRIMARY,
  },
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
