import { message } from "ant-design-vue";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 20000,
});

service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let canShowAuthMsg = true;

function handleUnauthorized(msg?: string) {
  if (canShowAuthMsg) {
    message.error(msg || "登录已过期，请重新登录");
    sessionStorage.clear();
  }
  canShowAuthMsg = false;
  setTimeout(() => {
    canShowAuthMsg = true;
  }, 1500);
  setTimeout(() => {
    location.reload();
  }, 500);
}

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data?.code == 401) {
      handleUnauthorized(res.data.msg);
      return false as unknown as AxiosResponse;
    }
    return res;
  },
  (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.msg;

    if (status == 401) {
      handleUnauthorized(msg);
    } else if (msg) {
      message.error(msg);
    } else {
      message.error("网络异常，请稍后重试");
    }

    return Promise.reject(error);
  }
);

export default function request<T = any>(config: AxiosRequestConfig<T>) {
  return service(config);
}
