import axios from 'axios';

const request = (method) => (url) => (data, params) => axios({
  method,
  url,
  data,
  params,
});

export const getRequest = request('get');
export const postRequest = request('post');
export const putRequest = request('put');
export const patchRequest = request('patch');
export const deleteRequest = request('delete');
