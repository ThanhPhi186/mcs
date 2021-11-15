import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {trans} from '../../utils/i18n';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';
import AppText from '../../components/atoms/AppText';
import {AppLoading} from '../../components/atoms';
import {Mixin} from '../../styles';
import {Const} from '../../utils';
import CookieManager from '@react-native-cookies/cookies';
import {ServiceHandle} from '../../services';
import SimpleToast from 'react-native-simple-toast';
import {NAVIGATION_NAME} from '../../navigations';

const LoginScreen = ({navigation}) => {
  const [employeeCode, setEmployeeCode] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const domain = useSelector(state => state.AuthenOverallReducer.domain);

  const userAuthen = useSelector(
    state => state.AuthenOverallReducer.userAuthen,
  );
  const animatedTitle = new Animated.Value(0);
  const animatedBtnHorizontal = new Animated.Value(0);
  const animatedSpin = new Animated.Value(0);

  useEffect(() => {
    if (userAuthen._REQ_PASS_CHANGE) {
      navigation.navigate('changePassword');
    }
  }, [userAuthen, navigation]);

  useEffect(() => {
    animate();
  }, []);

  const login = () => {
    if (employeeCode && password) {
      setLoading(true);
      const params = {
        USERNAME: employeeCode,
        PASSWORD: password,

        // //fake
        // posTerminalId: 'NVN1',
        // isMobile: 'Y',
        // //end
      };
      ServiceHandle.post(Const.API.Login, params)
        .then(response => {
          if (response.ok) {
            CookieManager.get(domain + Const.API.Login).then(cookies => {
              console.log('CookieManager', cookies);
              ServiceHandle.setHeader(cookies.JSESSIONID.value);
              dispatch(AuthenOverallRedux.Actions.setCookies(cookies));
              dispatch(AuthenOverallRedux.Actions.getAccount(params));
              // dispatch(AuthenOverallRedux.Actions.loginSuccess(response.data));
              navigation.navigate(NAVIGATION_NAME.ChangeStore, {
                fromScreen: NAVIGATION_NAME.LoginScreen,
              });
            });
          } else {
            setTimeout(() => {
              SimpleToast.show(response.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setLoading(false));
    } else {
      SimpleToast.show(trans('accountAndPassNotEmpty'), SimpleToast.SHORT);
    }
  };

  const changeCompany = () => {
    dispatch(AuthenOverallRedux.Actions.resetCompany());
  };

  const createAnimation = (value, useNative, duration, easing, delay = 0) => {
    return Animated.timing(value, {
      useNativeDriver: useNative,
      toValue: 1,
      duration,
      easing,
      delay,
    });
  };

  const animate = () => {
    animatedBtnHorizontal.setValue(0);
    animatedTitle.setValue(0);
    Animated.sequence([
      Animated.parallel([
        createAnimation(animatedTitle, false, 1000, Easing.ease),
        createAnimation(animatedBtnHorizontal, false, 1000, Easing.ease),
      ]),
      createAnimation(animatedSpin, true, 1000, Easing.ease),
    ]).start();
  };

  const renderTitleAnimation = () => {
    const btnHorizontal = animatedBtnHorizontal.interpolate({
      inputRange: [0, 1],
      outputRange: [(Mixin.device_width - 20) * 2, 0],
    });
    return (
      <Animated.View
        style={[
          {width: '100%', alignItems: 'center'},
          {marginLeft: btnHorizontal},
        ]}>
        <AppText style={styles.txtTile}>{trans('MontE').toUpperCase()}</AppText>
      </Animated.View>
    );
  };

  const renderMoveHorizontal = () => {
    const btnHorizontal = animatedBtnHorizontal.interpolate({
      inputRange: [0, 1],
      outputRange: [(Mixin.device_width - 20) * 2, 0],
    });

    return (
      <>
        <Animated.View style={[styles.txtInput, {marginRight: btnHorizontal}]}>
          <TextInput
            value={employeeCode}
            onChangeText={setEmployeeCode}
            placeholder={trans('employeeCode')}
            autoCapitalize="none"
          />
        </Animated.View>
        <Animated.View style={[styles.txtInput, {marginLeft: btnHorizontal}]}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={trans('password')}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </Animated.View>
        <Animated.View style={{width: '100%', marginRight: btnHorizontal}}>
          <TouchableOpacity style={styles.btn} onPress={login}>
            <AppText style={styles.txtLogin}>
              {trans('login').toUpperCase()}
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  };
  const renderSpinChangeCom = () => {
    const rotateValue = animatedSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg'],
    });
    return (
      <Animated.View style={{transform: [{rotate: rotateValue}]}}>
        <TouchableOpacity onPress={changeCompany}>
          <AppText style={styles.txtCompanyChange}>
            {trans('companyChange')}
          </AppText>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AppLoading isVisible={loading} />
        {renderTitleAnimation()}
        {renderMoveHorizontal()}
        {renderSpinChangeCom()}
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports
export default LoginScreen;
