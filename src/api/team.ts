import request from "../utils/request";

export interface GetUserInfoParams {
  _id: string;
}

export interface UpdateImgParams {
  id: number;
  img: string;
}

export interface GetMemberListParams {
  pageSize: number;
  pageNo: number;
  group: number | undefined;
}

export interface AddMemberParams {
  name: string;
  qq: string;
  group: string;
  position: string;
  remark: string;
}

export interface UpdateMemberParams extends AddMemberParams {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
}

export interface AddWelfareParams {
  remark: string;
}

export interface UpdateWelfareParams extends AddWelfareParams {
  _id: string;
  id: number;
}

export interface AddWrcPasrams {
  name: string;
  url: string;
  author: string;
  time: string;
  remark: string;
}

// 获取用户信息
export function getUserInfo(data: GetUserInfoParams) {
  return request({
    url: "/getUserInfo",
    method: "get",
    params: data
  });
}

// 修改头像
export function updateImg(data: UpdateImgParams) {
  return request({
    url: "/updateImg",
    method: "post",
    data: data
  });
}

// 获取成员列表
export function getMemberList(data: GetMemberListParams) {
  return request({
    url: "/getMemberList",
    method: "get",
    params: data
  });
}

// 获取分组信息
export function getGroupInfo() {
  return request({
    url: "/getGroupInfo",
    method: "get"
  });
}

// 新增成员
export function addMember(data: AddMemberParams) {
  return request({
    url: "/addMember",
    method: "post",
    data: data
  });
}

// 修改成员
export function updateMember(data: UpdateMemberParams) {
  return request({
    url: "/updateMember",
    method: "post",
    data: data
  });
}

// 删除成员
export function deleteMember(data: DeleteParams) {
  return request({
    url: "/deleteMember",
    method: "get",
    params: data
  });
}

// 获取福利列表
export function getWelfareList() {
  return request({
    url: "/getWelfareList",
    method: "get"
  });
}

// 新增福利
export function addWelfare(data: AddWelfareParams) {
  return request({
    url: "/addWelfare",
    method: "post",
    data: data
  });
}

// 修改福利
export function updateWelfare(data: UpdateWelfareParams) {
  return request({
    url: "/updateWelfare",
    method: "post",
    data: data
  });
}

// 删除福利
export function deleteWelfare(data: DeleteParams) {
  return request({
    url: "/deleteWelfare",
    method: "get",
    params: data
  });
}

// 获取精彩锦集列表
export function getWrcList() {
  return request({
    url: "/getWrcList",
    method: "get"
  });
}

// 新增视频福利
export function addWrcVideo(data: any) {
  return request({
    url: "/addWrcVideo",
    method: "post",
    data: data
  });
}

// 新增图片福利
export function addWrcImg(data: any) {
  return request({
    url: "/addWrcImg",
    method: "post",
    data: data
  });
}

// 删除精彩锦集
export function deleteWrc(data: DeleteParams) {
  return request({
    url: "/deleteWrc",
    method: "get",
    params: data
  });
}

// 新增集锦
export function addWrc(data: AddWrcPasrams) {
  return request({
    url: "/addWrc",
    method: "post",
    data: data
  });
}
