import React from 'react';
import {View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';

const ItemHomeMenu = props => {
  const {iconName, title} = props;
  return (
    <View style={{alignItems: 'center', width: '30%'}}>
      <MaterialCommunityIcons
        color={Colors.PRIMARY}
        name={iconName}
        size={32}
      />
      <AppText style={{textAlign: 'center', marginTop: 8}}>{title}</AppText>
    </View>
  );
};

export default ItemHomeMenu;
