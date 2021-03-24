import axios from "axios";
import store from "@/store/index";
import router from "@/router";

axios.defaults.baseURL = "http://116.236.30.222:9700/";
axios.defaults.timeout = 20000;
// axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  config => {
    let token = store.state.common.token;
    config.headers.common["Authorization"] = token;
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

axios.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.errorCode === 401) router.push("/login");
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};
