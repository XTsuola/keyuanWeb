import request from "../utils/request";

export interface GetHeroListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  gender: number | undefined;
  position: number | undefined;
  skin: string;
}

export interface AddHeroParams {
  name: string;
  gender: number | undefined;
  position: number[];
  skin: string;
  remark: string;
}

export interface UpdateHeroParams extends AddHeroParams {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
}

// 获取英雄列表
export function getHeroList(data: GetHeroListParams) {
  return request({
    url: "/wzry/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增角色
export function addHero(data: AddHeroParams) {
  return request({
    url: "/wzry/addHero",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateHero(data: UpdateHeroParams) {
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
