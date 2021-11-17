import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Appbar, FAB} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScanComponent} from '../../../../components/molecules';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {trans} from '../../../../utils';

const ListTally = ({navigation}) => {
  const [listProduct, setListProduct] = useState([]);
  const [scanQr, setScanQr] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const [camera, setCamera] = useState({
    camera: {
      type: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
    },
  });

  const cameraRef = useRef();

  const onBarCodeRead = e => {
    console.log('onBarCodeRead', e);
  };

  const handleTourch = value => {
    if (value === true) {
      setTorchOn(false);
    } else {
      setTorchOn(true);
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
        onBarCodeRead={e => onBarCodeRead(e)}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }
        style={styles.preview}
        type={camera.type}
        // onGoogleVisionBarcodesDetected={({barcodes}) => {
        //   console.log('barcodes', barcodes);
        // }}
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
