import request from "../utils/request";
import type { PaginationType } from "./common";

// 获取英雄列表
export interface GetHeroListType extends PaginationType {
  name: string;
  gender: number | undefined;
  position: number | undefined;
  skin: string;
}
export function getHeroList(data: GetHeroListType) {
  return request({
    url: "/wzry/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增角色
export interface AddHeroParams {
  id?: number;
  name: string;
  gender: number | undefined;
  position: number[];
  skin: string;
  remark: string;
}
export function addHero(data: AddHeroParams) {
  return request({
    url: "/wzry/addHero",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateHero(data: AddHeroParams) {
  return request({
    url: "/wzry/updateHero",
    method: "post",
    data: data,
  });
}

// 删除角色
export function deleteHero(id: number) {
  return request({
    url: "/wzry/deleteHero?id=" + id,
    method: "delete",
  });
}
