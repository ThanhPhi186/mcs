import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {AppText} from '../../../components/atoms';
import AppDropDown from '../../../components/molecules/Dropdown';
import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_14} from '../../../styles/Typography';

const ComponentSearch = props => {
  const {title, type} = props;

  const renderContent = () => {
    switch (type) {
      case 'dropdown':
        return (
          <View style={styles.containerDropdown}>
            <AppDropDown />
          </View>
        );

      default:
        return (
          <TextInput
            {...props}
            style={styles.txtInput}
            placeholderTextColor={Colors.PLACE_HOLDER}
          />
        );
    }
  };
  return (
    <View style={styles.container}>
      <AppText containerStyle={styles.title} style={styles.txtTitle}>
        {title}
      </AppText>
      {renderContent()}
    </View>
  );
};

export default ComponentSearch;

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  txtTitle: {
    fontWeight: 'bold',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    fontSize: FONT_SIZE_14,
    color: Colors.BLACK,
    flex: 3,
  },
  containerDropdown: {
    flex: 3,
  },
};
