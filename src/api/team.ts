import { get, post, del } from "./index";
import type { PaginationType } from "./common";

export interface UpdateImgParams {
  id: number;
  img: string;
}

export interface GetMemberListParams extends PaginationType {
  groupName?: string | number;
}

export interface AddMemberParams {
  id?: number;
  name: string;
  qq: string;
  groupName: string;
  position: string;
  remark: string;
}

export interface AddWelfareParams {
  id?: number;
  remark: string;
}

export interface AddWrcParams {
  name: string;
  url: string;
  author: string;
  time: string;
  remark: string;
}

// 登录用户信息
export const getUserInfo = (id: number) => get("/getUserInfo", { id });

// 更新头像
export const updateImg = (data: UpdateImgParams) => post("/updateImg", data);

// 客缘成员列表
export const getMemberList = (params: GetMemberListParams) => get("/getMemberList", params);

// 新增客缘成员
export const addMember = (data: AddMemberParams) => post("/addMember", data);

// 修改客缘成员
export const updateMember = (data: AddMemberParams) => post("/updateMember", data);

// 删除客缘成员
export const deleteMember = (id: number) => del("/deleteMember", { id });

// 福利列表
export const getWelfareList = () => get("/getWelfareList");

// 新增福利
export const addWelfare = (data: AddWelfareParams) => post("/addWelfare", data);

// 修改福利
export const updateWelfare = (data: AddWelfareParams) => post("/updateWelfare", data);

// 删除福利
export const deleteWelfare = (id: number) => del("/deleteWelfare", { id });

// 锦集列表
export const getWrcList = (params: PaginationType) => get("/getWrcList", params);

// 新增锦集
export const addWrc = (data: AddWrcParams) => post("/addWrc", data);

// 删除锦集
export const deleteWrc = (id: number) => del("/deleteWrc", { id });
