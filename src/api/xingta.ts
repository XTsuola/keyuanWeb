import request from "./index";
import type { PaginationType } from "./common";

export function getHeroList(data: PaginationType) {
  return request({
    url: "/xingta/getHeroList",
    method: "get",
    params: data,
  });
}

export interface AddHeroParams {
  id?: number;
  name: string;
  title: string;
  mainShuxing: string;
  otherShuxing: string;
  weapon: string;
  gongfa: string;
  introduce: string;
  remark: string;
}

export function addHero(data: AddHeroParams) {
  return request({
    url: "/xingta/addHero",
    method: "post",
    data,
  });
}

export function updateHero(data: AddHeroParams) {
  return request({
    url: "/xingta/updateHero",
    method: "post",
    data,
  });
}

export function deleteHero(id: number) {
  return request({
    url: "/xingta/deleteHero",
    method: "delete",
    params: { id },
  });
}
