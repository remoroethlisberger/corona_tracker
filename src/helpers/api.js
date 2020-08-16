import axios from 'axios';
import auth from './auth';

const baseurl = 'https://api.corona.waremama.ch/';

const callAPI = async (path, data, params) => {
  let r = {};
  try {
    r = await axios.post(baseurl + path, data, params);
  } catch (error) {}
  return r;
};

const api = {
  register: async (data) => {
    let r = await callAPI('', data, { params: { method: 'create' } });
    return r;
  },
  login: async (data) => {
    let r = await callAPI('', data, { params: { method: 'login' } });
    return r;
  },
  userprofile: async () => {
    let data = {
      token: auth.getCookie(),
    };
    let r = await callAPI('', data, { params: { method: 'userprofile' } });
    return r;
  },
  updateprofile: async (profiledata) => {
    profiledata['token'] = auth.getCookie();
    let r = await callAPI('', profiledata, {
      params: { method: 'updateprofile' },
    });
    return r;
  },
};

export default api;
