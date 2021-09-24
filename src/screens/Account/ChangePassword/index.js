import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppDialog, Button} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux/authen';
import {post} from '../../../services/ServiceHandle';
import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [messErr, setMessErr] = useState();
  const [modalError, setModalError] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  const accountUser = useSelector(
    state => state.AuthenOverallReducer.accountUser,
  );

  const dispatch = useDispatch();
  // const validatePassWord = (text) => {
  //   const regexp = /(?=.*[A-Za-z])(?=.*[0-9])[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$/;
  //   return regexp.test(text);
  // };

  const handelCheckValue = () => {
    if (!currentPassword || !newPassword || !passwordVerify) {
      setMessErr(trans('doNotEmptyPassword'));
      return true;
    }
    return false;
  };

  const changePass = () => {
    if (handelCheckValue()) {
      setModalError(true);
      return;
    }
    const params = {
      username: accountUser.USERNAME,
      currentPassword,
      newPassword,
      passwordVerify,
    };
    post(BaseUrl + Const.API.ChangePassWord, params).then(res => {
      if (res.ok) {
        if (!res.data._ERROR_MESSAGE_ && !res.data._ERROR_MESSAGE_LIST_) {
          if (res.data.login === 'FALSE') {
            return setModalLogout(true);
          }
          SimpleToast.show(trans('changePassSuccess'));
          setTimeout(() => {
            dispatch(AuthenOverallRedux.Actions.logout.request());
          }, 500);
        } else {
          if (res.data.login === 'FALSE') {
            return setModalLogout(true);
          }
          setMessErr(res.data._ERROR_MESSAGE_ || trans('errorOccurred'));
          setModalError(true);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <Appbar.Content title={trans('changePass')} />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput
          label={trans('oldPass')}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <TextInput
          label={trans('newPass')}
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <TextInput
          label={trans('confirmPass')}
          value={passwordVerify}
          onChangeText={setPasswordVerify}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.btn}
          titleColor={Colors.WHITE}
          title={trans('confirm').toUpperCase()}
          onPress={changePass}
        />
      </View>
      <AppDialog
        content={messErr}
        isVisible={modalError}
        onPressClose={() => setModalError(false)}
      />
      <AppDialog
        content={trans('expiredToken')}
        isVisible={modalLogout}
        onPressClose={() => {
          setModalLogout(false);
          setTimeout(() => {
            dispatch(AuthenOverallRedux.Actions.logout.request());
          }, 500);
        }}
      />
    </View>
  );
};
export default ChangePassword;
