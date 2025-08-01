import request from "../utils/request";
import type { PaginationType } from "./common";

// 获取兵种列表
export interface GetArmsListParams extends PaginationType {
  name: string;
}
export function getArmsList(data: GetArmsListParams) {
  return request({
    url: "/hywz/getArmsList",
    method: "get",
    params: data,
  });
}

// 新增兵种
export interface AddArmsParams {
  id?: number;
  name: string;
  type: string | undefined;
  life: string;
  att: string;
  magic: string;
  skill: string;
  speed: string;
  xingyun: string;
  def: string;
  mof: string;
  tige: string;
  talent: string;
  remark: string;
}
export function addArms(data: AddArmsParams) {
  return request({
    url: "/hywz/addArms",
    method: "post",
    data: data,
  });
}

// 修改兵种
export function updateArms(data: AddArmsParams) {
  return request({
    url: "/hywz/updateArms",
    method: "post",
    data: data,
  });
}

// 删除兵种
export function deleteArms(id: number) {
  return request({
    url: "/hywz/deleteArms?id=" + id,
    method: "delete",
  });
}
