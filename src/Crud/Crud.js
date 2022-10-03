import { axiosClient } from "../axios/axiosClient";

export const postReq = (url, payLoad) => {
  return axiosClient.post(url, payLoad);
};
export const getReqWithParams = (url, params) => {
  return axiosClient.get(url + params);
};
export const getReq = (url) => {
  return axiosClient.get(url);
};
export const patchReq = (url, payLoad) => {
  return axiosClient.patch(url, payLoad);
};
