import request from "./index";
import type { PaginationType } from "./common";

export function getUserInfo(id: number) {
  return request({
    url: "/getUserInfo",
    method: "get",
    params: { id },
  });
}

export interface UpdateImgParams {
  id: number;
  img: string;
}

export function updateImg(data: UpdateImgParams) {
  return request({
    url: "/updateImg",
    method: "post",
    data,
  });
}

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

export interface AddMemberParams {
  id?: number;
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
    data,
  });
}

export function updateMember(data: AddMemberParams) {
  return request({
    url: "/updateMember",
    method: "post",
    data,
  });
}

export function deleteMember(id: number) {
  return request({
    url: "/deleteMember",
    method: "delete",
    params: { id },
  });
}

export function getWelfareList() {
  return request({
    url: "/getWelfareList",
    method: "get",
  });
}

export interface AddWelfareParams {
  id?: number;
  remark: string;
}

export function addWelfare(data: AddWelfareParams) {
  return request({
    url: "/addWelfare",
    method: "post",
    data,
  });
}

export function updateWelfare(data: AddWelfareParams) {
  return request({
    url: "/updateWelfare",
    method: "post",
    data,
  });
}

export function deleteWelfare(id: number) {
  return request({
    url: "/deleteWelfare",
    method: "delete",
    params: { id },
  });
}

export function getWrcList(data: PaginationType) {
  return request({
    url: "/getWrcList",
    method: "get",
    params: data,
  });
}

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
    data,
  });
}

export function deleteWrc(id: number) {
  return request({
    url: "/deleteWrc",
    method: "delete",
    params: { id },
  });
}
