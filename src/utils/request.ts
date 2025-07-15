import { message } from "ant-design-vue";
import axios, { type AxiosRequestConfig } from "axios";
import { useRouter } from "vue-router";

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    // 超时
    timeout: 20000
});

// request拦截器
service.interceptors.request.use(config => {
    const token = sessionStorage.getItem("token");
    if (token && config.headers) {
        config.headers.token = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
let isShowMsg = true;
service.interceptors.response.use(res => {
    if (res.data.code == 401) {
        if (isShowMsg) {
            message.error(res.data.msg);
            sessionStorage.clear();
        }
        isShowMsg = false;
        setTimeout(() => {
            isShowMsg = true;
        }, 1500)
        setTimeout(() => {
            location.reload()
        }, 500)
        return false;
    } else {
        return res;
    }
}, error => {

    if(error.response.status == 401) {
        if (isShowMsg) {
            message.error(error.response.data.msg);
            sessionStorage.clear();
        }
        isShowMsg = false;
        setTimeout(() => {
            isShowMsg = true;
        }, 1500)
        setTimeout(() => {
            location.reload()
        }, 500)
    } else {
        message.error(error.response.data.msg)
    }
    return Promise.reject(error);
});

export default (config: AxiosRequestConfig<any>) => {
    if (!config.headers) {
        config.headers = {};
    }
    return service(config);
}