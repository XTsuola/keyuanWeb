import request from "../utils/request";

export interface GetHeroListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  gender: number | undefined;
  star: number | undefined;
}

export interface AddHeroParams {
  name: string;
  gender: number | undefined;
  star: number | undefined;
  gj: string;
  sm: string;
  fy: string;
  sd: string;
  bj: string;
  bs: string;
  mz: string;
  dk: string;
  remark: string;
}

export interface UpdateHeroParams extends AddHeroParams {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
}

// 获取式神列表
export function getHeroList(data: GetHeroListParams) {
  return request({
    url: "/yys/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增式神
export function addHero(data: AddHeroParams) {
  return request({
    url: "/yys/addHero",
    method: "post",
    data: data,
  });
}

// 修改式神
export function updateHero(data: UpdateHeroParams) {
  return request({
    url: "/yys/updateHero",
    method: "post",
    data: data,
  });
}

// 删除式神
export function deleteHero(id: number) {
  return request({
    url: "/yys/deleteHero?id=" + id,
    method: "delete",
  });
}
