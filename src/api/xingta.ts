import request from "../utils/request";

export interface GetHeroListParams {
  pageSize: number;
  pageNo: number;
}

export interface AddHeroParams {
  name: string;
  title: string;
  mainShuxing: string;
  otherShuxing: string;
  weapon: string;
  gongfa: string;
  introduce: string;
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
    url: "/xingta/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增角色
export function addHero(data: AddHeroParams) {
  return request({
    url: "/xingta/addHero",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateHero(data: UpdateHeroParams) {
  return request({
    url: "/xingta/updateHero",
    method: "post",
    data: data,
  });
}

// 删除角色
export function deleteHero(data: DeleteParams) {
  return request({
    url: "/xingta/deleteHero",
    method: "get",
    params: data,
  });
}
