import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';
import {NAVIGATION_NAME} from '../../../../navigations/NavigationName';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';

import {Const, trans} from '../../../../utils';

const ListLocation = ({navigation}) => {
  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listLocation')} />
      </Appbar.Header>
      <View style={styles.contentContainer}></View>
    </View>
  );
};

export default ListLocation;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
