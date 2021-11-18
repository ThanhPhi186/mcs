import {trans} from '../utils';
import {create} from 'apisauce';
import qs from 'querystring';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux, StoreRedux} from '../redux';

const api = create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// api.addMonitor(res => {
//   console.log('addMonitor', res);
//   if (res.data._USER_HAS_LOGOUT === 'Y') {
//     setTimeout(() => {
//       SimpleToast.show(trans('expiredToken'), SimpleToast.SHORT);
//     }, 700);
//   }
// });

// api.axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage?.getItem('token')) || {};
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

const returnData = response => {
  console.log('response =====>', response);

  // const dispatch = useDispatch();
  if (response.data) {
    if (response.data?._ERROR_MESSAGE_ || response.data?._ERROR_MESSAGE_LIST_) {
      return {
        ok: false,
        error:
          response.data?._ERROR_MESSAGE_ ||
          response.data?._ERROR_MESSAGE_LIST_[0],
      };
    } else if (response.data._USER_HAS_LOGOUT === 'Y') {
      // dispatch(AuthenOverallRedux.Actions.handleLogout());
      // dispatch(StoreRedux.Actions.changeStore(''));
      return {
        ok: false,
        error: trans('expiredToken'),
      };
    } else {
      return {
        data: response.data,
        headers: response.headers,
        ok: true,
      };
    }
  } else {
    return {
      ok: false,
      error: trans('networkError'),
    };
  }
};

const setHeader = cookies => {
  api.setHeader('Cookie', `JSESSIONID=${cookies}`);
};

const setBaseUrl = url => {
  api.setBaseURL(url);
};

const get = async (url, params) => {
  const response = await api.get(url, params);
  return returnData(response);
};
const post = async (url, payload) => {
  const response = await api.post(url, qs.stringify(payload));
  return returnData(response);
};
const put = async (url, payload) => {
  const response = await api.put(url, payload);
  return returnData(response);
};
const deleteApi = async (url, payload) => {
  const response = await api.delete(url, payload);
  return returnData(response);
};

export {setHeader, setBaseUrl, get, post, put, deleteApi};
