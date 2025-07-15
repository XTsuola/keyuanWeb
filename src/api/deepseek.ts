import request from "../utils/request";

const QUERY_BASE_URL = "http://127.0.0.1:3000"; // 接口请求基础地址
const DEEP_SEEK = "https://api.deepseek.com"; // deepseek-gpt基础地址

/**
 * 注册到window对象上
 */
window.config = {
  baseUrl: QUERY_BASE_URL,
  deepseekUrl: DEEP_SEEK,
};

export const data = {
  baseUrl: window.config.baseUrl,
  deepseekUrl: window.config.deepseekUrl,
};

// DeepSeek配置文件
// API配置
export const API_CONFIG = {
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-18f133bb6a204f9bb6bb6423a5eedcc7", // 换成自己的apiKey
  dangerouslyAllowBrowser: true,
};

// 模型配置
export const MODEL_CONFIG = {
  stream: true,
  max_tokens: 8192, // 限制一次请求中模型生成 completion 的最大 token 数
  temperature: 0.6, // 严谨与想象 越低越严谨 官方建议0.6
};

// 本地存储键名配置
export const STORAGE_KEYS = {
  sessionList: "list",
  activeIndex: "index",
};

const baseUrl = data.deepseekUrl; // 添加代理(本地在vite.config.js添加，服务器在nginx添加)

export function getTokens(param) {
  return request({
    url: baseUrl + "/user/balance",
    method: "get",
    params: param,
    headers: {
      Authorization: "Bearer " + param.gptToken,
    },
  });
}
