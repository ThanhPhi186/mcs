import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanComponent = () => {
  return (
    <QRCodeScanner
      reactivate={true}
      showMarker={true}
      ref={node => {
        this.scanner = node;
      }}
      onRead={this.onSuccess}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          on your computer and scan the QR code to test.
        </Text>
      }
      bottomContent={
        <View>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => this.scanner.reactivate()}>
            <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => this.setState({scan: false})}>
            <Text style={styles.buttonTextStyle}>Stop Scan</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default ScanComponent;

const styles = StyleSheet.create({});
