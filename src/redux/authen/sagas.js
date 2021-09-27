import {put, call, takeEvery, select} from 'redux-saga/effects';
import ServiceHandle from '../../services/ServiceHandle';
import {Const} from '../../utils';
import {getProfile, logout} from './action';

const getBaseUrl = state => state.AuthenOverallReducer.domain;

function* getProfileAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.CheckAuth;
    const response = yield call(ServiceHandle.get, url);
    if (response.ok) {
      yield put(getProfile.success(response.data.data));
    } else {
      yield put(getProfile.failed(response.error));
    }
  } catch (error) {
    yield put(getProfile.failed(error));
  }
}

function* logoutAsync(action) {
  try {
    const baseURL = yield select(getBaseUrl);

    const url = baseURL + Const.API.Logout;
    const response = yield call(ServiceHandle.post, url);
    if (response.ok) {
      yield put(logout.success(response.data));
    } else {
      yield put(logout.failed(response.error));
    }
  } catch (error) {
    yield put(logout.failed(error));
  }
}

export function* AuthenOverallWatcher() {
  [yield takeEvery(getProfile.requestName, getProfileAsync)];
  [yield takeEvery(logout.requestName, logoutAsync)];
}
