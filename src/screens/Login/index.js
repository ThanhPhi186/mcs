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
import {AppDialog} from '../../components/molecules';
import {AppLoading} from '../../components/atoms';
import {Mixin} from '../../styles';
import {post} from '../../services/ServiceHandle';
import {Const} from '../../utils';

const LoginScreen = ({navigation}) => {
  const [employeeCode, setEmployeeCode] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [modalError, setModalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const errorMessage = useSelector(
  //   (state) => state.AuthenOverallReducer.errorMessage,
  // );
  // const loading = useSelector((state) => state.AuthenOverallReducer.loading);
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

  const userAuthen = useSelector(
    state => state.AuthenOverallReducer.userAuthen,
  );
  const animatedTitle = new Animated.Value(0);
  const animatedBtnHorizontal = new Animated.Value(0);
  const animatedSpin = new Animated.Value(0);

  useEffect(() => {
    animate();
  }, []);

  // useEffect(() => {
  //   if (errorMessage) {
  //     setMessage(errorMessage);
  //     setTimeout(() => {
  //       setModalError(true);
  //     }, 700);
  //   }
  // }, [errorMessage]);

  useEffect(() => {
    if (userAuthen._REQ_PASS_CHANGE) {
      navigation.navigate('changePassword');
    }
  }, [userAuthen, navigation]);

  //todo
  // const login = () => {
  //   if (employeeCode && password) {
  //     const params = {
  //       USERNAME: employeeCode,
  //       PASSWORD: password,
  //     };
  //     dispatch(AuthenOverallRedux.Actions.login.request(params));
  //     dispatch(AuthenOverallRedux.Actions.getAccount(params));
  //   } else {
  //     setModalError(true);
  //     setMessage(trans('accountAndPassNotEmpty'));
  //   }
  // };

  const login = () => {
    if (employeeCode && password) {
      setLoading(true);
      const params = {
        USERNAME: employeeCode,
        PASSWORD: password,
      };
      post(BaseUrl + Const.API.Login, params).then(response => {
        if (!response.data._ERROR_MESSAGE_) {
          dispatch(AuthenOverallRedux.Actions.getAccount(params));
          dispatch(AuthenOverallRedux.Actions.loginSuccess(response.data));
          setLoading(false);
        } else {
          setMessage(response.data._ERROR_MESSAGE_);
          setLoading(false);
          setTimeout(() => {
            setModalError(true);
          }, 700);
        }
      });
    } else {
      setModalError(true);
      setMessage(trans('accountAndPassNotEmpty'));
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
      // Animated.spring(animatedTitle, {
      //   useNativeDriver: false,
      //   toValue: 1,
      //   friction: Platform.OS === 'android' ? 6 : 4,
      //   duration: 1000,
      //   tension: 50,

      // }),
    ]).start();
  };

  // const renderTitleAnimation = () => {
  //   const scaleTitle = animatedTitle.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [-Mixin.moderateSize(60), Mixin.device_height / 4],
  //   });
  //   return (
  //     <Animated.Text style={[styles.txtTile, {top: scaleTitle}]}>
  //       {trans('MontE').toUpperCase()}
  //     </Animated.Text>
  //   );
  // };

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
        <AppDialog
          content={message}
          isVisible={modalError}
          onPressClose={() => setModalError(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports
export default LoginScreen;
