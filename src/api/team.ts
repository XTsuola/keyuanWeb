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

/** @deprecated 拼写错误遗留，请改用 AddWrcParams */
export type AddWrcPasrams = AddWrcParams;

export const getUserInfo = (id: number) => get("/getUserInfo", { id });

export const updateImg = (data: UpdateImgParams) => post("/updateImg", data);

export const getMemberList = (params: GetMemberListParams) => get("/getMemberList", params);

export const addMember = (data: AddMemberParams) => post("/addMember", data);

export const updateMember = (data: AddMemberParams) => post("/updateMember", data);

export const deleteMember = (id: number) => del("/deleteMember", { id });

export const getWelfareList = () => get("/getWelfareList");

export const addWelfare = (data: AddWelfareParams) => post("/addWelfare", data);

export const updateWelfare = (data: AddWelfareParams) => post("/updateWelfare", data);

export const deleteWelfare = (id: number) => del("/deleteWelfare", { id });

export const getWrcList = (params: PaginationType) => get("/getWrcList", params);

export const addWrc = (data: AddWrcParams) => post("/addWrc", data);

export const deleteWrc = (id: number) => del("/deleteWrc", { id });
