import {trans} from '../utils';
import {create} from 'apisauce';
import qs from 'querystring';

const api = create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const returnData = response => {
  console.log('response =====>', response);
  if (response.data) {
    if (response.data._ERROR_MESSAGE_ || response.data._ERROR_MESSAGE_LIST_) {
      return {
        ok: false,
        error:
          response.data._ERROR_MESSAGE_ ||
          response.data._ERROR_MESSAGE_LIST_[0],
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
