import request from "./index";
import type { PaginationType } from "./common";

// 获取用户信息
export function getUserInfo(id: number) {
  return request({
    url: "/getUserInfo?id=" + id,
    method: "get",
  });
}

// 修改头像
export interface UpdateImgParams {
  id: number;
  oldImg: string
  img: string;
}
export function updateImg(data: UpdateImgParams) {
  return request({
    url: "/updateImg",
    method: "post",
    data: data,
  });
}

// 获取成员列表
export interface GetMemberListParams extends PaginationType {
  groupName: number | undefined;
}
export function getMemberList(data: GetMemberListParams) {
  return request({
    url: "/getMemberList",
    method: "get",
    params: data,
  });
}

// 新增成员
export interface AddMemberParams {
  id?: number
  name: string;
  qq: string;
  groupName: string;
  position: string;
  remark: string;
}
export function addMember(data: AddMemberParams) {
  return request({
    url: "/addMember",
    method: "post",
    data: data,
  });
}

// 修改成员
export function updateMember(data: AddMemberParams) {
  return request({
    url: "/updateMember",
    method: "post",
    data: data,
  });
}

// 删除成员
export function deleteMember(id: number) {
  return request({
    url: "/deleteMember?id=" + id,
    method: "delete",
  });
}

// 获取福利列表
export function getWelfareList() {
  return request({
    url: "/getWelfareList",
    method: "get",
  });
}

// 新增福利
export interface AddWelfareParams {
  id?: number;
  remark: string;
}
export function addWelfare(data: AddWelfareParams) {
  return request({
    url: "/addWelfare",
    method: "post",
    data: data,
  });
}

// 修改福利
export function updateWelfare(data: AddWelfareParams) {
  return request({
    url: "/updateWelfare",
    method: "post",
    data: data,
  });
}

// 删除福利
export function deleteWelfare(id: number) {
  return request({
    url: "/deleteWelfare?id=" + id,
    method: "delete",
  });
}

// 获取精彩锦集列表
export function getWrcList(data: PaginationType) {
  return request({
    url: "/getWrcList",
    method: "get",
    params: data,
  });
}

// 新增集锦
export interface AddWrcPasrams {
  name: string;
  url: string;
  author: string;
  time: string;
  remark: string;
}
export function addWrc(data: AddWrcPasrams) {
  return request({
    url: "/addWrc",
    method: "post",
    data: data,
  });
}

// 删除精彩锦集
export function deleteWrc(id: number) {
  return request({
    url: "/deleteWrc?id=" + id,
    method: "delete",
  });
}