import request from "../utils/request";

export interface LoginParams {
  account: string;
  password: string;
}

// 登录
export function login(data: LoginParams) {
  return request(
    {
      url: "/login",
      method: "post",
      data: data,
    },
    false
  );
}
