import axios from "axios";
import { errorToast, successToast } from "../utils/utils";
import { store } from "../Redux/store/store";
export const axiosClient = axios.create();
//"http://ec2-3-144-196-218.us-east-2.compute.amazonaws.com/"
const baseUrl = "http://ec2-3-144-196-218.us-east-2.compute.amazonaws.com/";

axiosClient.defaults.baseURL = baseUrl;

axiosClient.interceptors.request.use(function (config) {
  const token = store.getState?.user?.auth;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
axiosClient.interceptors.response.use(
  function (response) {
    successToast(response?.data?.message);
    return response;
  },
  function (error) {
    if (error?.name === "CanceledError") {
      return null;
    } else {
      errorToast("error");
    }

    return Promise.reject(error);
  }
);
