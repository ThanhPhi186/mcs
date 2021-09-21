import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';

import {Const} from '../../utils';

import {getCart} from './action';

function* getCartAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.ImportCart;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getCart.success(response.data.data));
    } else {
      yield put(getCart.failed(response.error));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

export function* CartWatcher() {
  [yield takeEvery(getCart.requestName, getCartAsync)];
}
