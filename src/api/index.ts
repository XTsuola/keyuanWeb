import { message } from "ant-design-vue";
import axios, {
  AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 20000,
});

function isLoginRequest(url?: string) {
  return !!url && url.includes("/login");
}

function isUnauthorizedCode(code: unknown) {
  return Number(code) === 401;
}

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      // 后端鉴权读取 header.token
      config.headers.set("token", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let canShowAuthMsg = true;
let redirecting = false;

function handleUnauthorized(msg?: string) {
  if (redirecting) return;
  redirecting = true;

  if (canShowAuthMsg) {
    message.error(msg || "登录已过期，请重新登录");
    canShowAuthMsg = false;
    setTimeout(() => {
      canShowAuthMsg = true;
    }, 1500);
  }

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("nowTouxiang");

  // hash 路由下避免整页 reload 造成循环闪烁
  if (!location.hash.includes("/login")) {
    location.hash = "#/login";
  }

  setTimeout(() => {
    redirecting = false;
  }, 1500);
}

service.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config?.url;
    if (isUnauthorizedCode(res.data?.code) && !isLoginRequest(url)) {
      handleUnauthorized(res.data?.msg);
      return Promise.reject(res.data);
    }
    return res;
  },
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const msg = error.response?.data?.msg;
    const url = error.config?.url;

    if ((status === 401 || isUnauthorizedCode(code)) && !isLoginRequest(url)) {
      handleUnauthorized(msg);
    } else if (msg) {
      message.error(msg);
    } else if (!axios.isCancel(error)) {
      message.error("网络异常，请稍后重试");
    }

    return Promise.reject(error);
  }
);

export default function request<T = any>(config: AxiosRequestConfig) {
  return service.request<T>(config);
}

export const get = <T = any>(url: string, params?: object) =>
  request<T>({ url, method: "get", params });

export const post = <T = any>(url: string, data?: unknown) =>
  request<T>({ url, method: "post", data });

export const del = <T = any>(url: string, params?: object) =>
  request<T>({ url, method: "delete", params });

export const delBody = <T = any>(url: string, data?: unknown) =>
  request<T>({ url, method: "delete", data });
