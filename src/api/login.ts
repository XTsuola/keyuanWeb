import request from "./index";

export interface LoginParams {
  account: string;
  password: string;
}

export function login(data: LoginParams) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
