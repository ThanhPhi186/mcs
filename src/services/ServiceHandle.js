import {Const} from '../utils';
// import axios from 'axios';
import qs from 'querystring';
import {create} from 'apisauce';

class serviceHandle {
  constructor() {
    this.api = create({
      baseURL: Const.API.baseURL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  returnData(response) {
    console.log('response =====>', response);
    if (response.status === Const.RESPONSE_CODES.SUCCESS.SUCCESS) {
      return {
        data: response.data,
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: 'Error',
      };
    }
  }

  setHeader = cookies => {
    this.api.setHeader('Cookie', `JSESSIONID=${cookies}`);
  };

  setBaseUrl = url => {
    this.api.setBaseURL(url);
  };

  get = async (url, params) => {
    const response = await this.api.get(url, params);
    return this.returnData(response);
  };
  post = async (url, payload) => {
    const response = await this.api.post(url, qs.stringify(payload));
    return this.returnData(response);
  };

  put = async (url, payload) => {
    const response = await this.api.put(url, payload);
    return this.returnData(response);
  };
  delete = async (url, payload) => {
    const response = await this.api.delete(url, payload);
    return this.returnData(response);
  };
}
var ServiceHandle = new serviceHandle();
export default ServiceHandle;
