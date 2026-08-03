import request from "./index";
import type { PaginationType } from "./common";

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
    data,
  });
}

export function updateArms(data: AddArmsParams) {
  return request({
    url: "/hywz/updateArms",
    method: "post",
    data,
  });
}

export function deleteArms(id: number) {
  return request({
    url: "/hywz/deleteArms",
    method: "delete",
    params: { id },
  });
}
