import React, {useEffect, useState} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import {trans} from '../../utils/i18n';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_NAME} from '../../navigations/navigationName';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';
import {AppDialog} from '../../components/molecules';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {Colors} from '../../styles';

const LoginCompanyScreen = props => {
  const [companyCode, setCompanyCode] = useState();
  const [message, setMessage] = useState();
  const [modalError, setModalError] = useState(false);

  const type = useSelector(state => state.AuthenOverallReducer.type);
  const errorMessage = useSelector(
    state => state.AuthenOverallReducer.errorMessage,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'GET_DOMAIN_FAILED') {
      setMessage(errorMessage);
      setModalError(true);
    }
    if (type === 'GET_DOMAIN_SUCCESS') {
      console.log('aaaaa');
      navigation.navigate(NAVIGATION_NAME.LoginScreen);
    }
  }, [type]);

  const getCompany = () => {
    if (!companyCode) {
      setMessage(trans('companyCodeNotEmpty'));
      setModalError(true);
    } else {
      dispatch(
        AuthenOverallRedux.Actions.getDomain.request({key: companyCode}),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.logoWhite}
        style={{width: 170, height: 100, marginBottom: 20}}
      />
      <TextInput
        style={styles.txtInput}
        value={companyCode}
        onChangeText={text => setCompanyCode(text)}
        placeholder={trans('enterCompanyCode')}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.btn}
        mode="text"
        color="white"
        onPress={getCompany}>
        <AppText
          style={{
            color: Colors.WHITE,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {trans('continue').toUpperCase()}
        </AppText>
      </TouchableOpacity>
      <AppDialog
        content={message}
        isVisible={modalError}
        onPressClose={() => setModalError(false)}
      />
    </View>
  );
};

// Exports
export default LoginCompanyScreen;
