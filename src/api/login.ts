import { post } from "./index";

export interface LoginParams {
  account: string;
  password: string;
}

export const login = (data: LoginParams) => post("/login", data);
