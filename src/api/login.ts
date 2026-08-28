import { post } from "./index";

export interface LoginParams {
  account: string;
  password: string;
}

// 登录
export const login = (data: LoginParams) => post("/login", data);
