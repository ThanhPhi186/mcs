import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-gesture-handler';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_14} from '../../../styles/Typography';

const ComponentSearch = props => {
  const {title, type, zIndex} = props;

  const [open, setOpen] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'dropdown':
        return (
          <View style={styles.containerDropdown}>
            <DropDownPicker
              {...props}
              open={open}
              setOpen={setOpen}
              arrowSize={20}
              arrowColor="#90A1B5"
              placeholderStyle={styles.placeholderStyle}
              style={styles.styleDropdown}
              containerStyle={styles.containerStyle}
              labelStyle={styles.labelStyle}
              itemStyle={styles.itemStyle}
              dropDownStyle={styles.dropDownStyle}
              activeLabelStyle={styles.activeLabelStyle}
              activeItemStyle={styles.activeItemStyle}
            />
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
    <View style={[styles.container, {zIndex: zIndex}]}>
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
    zIndex: 22,
  },

  //dropdown
  containerStyle: {
    alignSelf: 'center',
    // height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    width: '100%',
  },
  labelStyle: {
    color: 'black',
    fontSize: 16,
  },
  activeLabelStyle: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  itemStyle: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  dropDownStyle: {
    backgroundColor: Colors.WHITE,
  },
  styleDropdown: {
    borderRadius: Mixin.moderateSize(4),
    height: Mixin.moderateSize(40),

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 1,
  },
  placeholderStyle: {
    color: 'transparent',
  },
  activeItemStyle: {
    // backgroundColor: color.primary,
  },
};
