import request from "./index";
import type { PaginationType } from "./common";

// 获取英雄列表
export interface GetHeroListParams extends PaginationType {
  name: string | undefined;
  star: number | undefined;
  gender: number | undefined;
  camp: number | undefined;
  arms: string | undefined;
  skillGroup: string | undefined;
  skin: string | undefined;
}
export function getHeroList(data: GetHeroListParams) {
  return request({
    url: "/mhmnz/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增兵英雄
export interface AddHeroParams {
  id?: number;
  name: string;
  gender: number | undefined;
  star: number | undefined;
  camp: number[];
  arms: string;
  exclusive: string;
  superSkill: string;
  skillGroup: string;
  castGrainSkill: string;
  talent: string;
  skin: string
  introduce: string;
}
export function addHero(data: AddHeroParams) {
  return request({
    url: "/mhmnz/addHero",
    method: "post",
    data: data,
  });
}

// 修改英雄
export function updateHero(data: AddHeroParams) {
  return request({
    url: "/mhmnz/updateHero",
    method: "post",
    data: data,
  });
}

// 删除英雄
export function deleteHero(id: number) {
  return request({
    url: "/mhmnz/deleteHero?id=" + id,
    method: "delete",
  });
}

// 获取兵种列表
export interface GetArmsListParams extends PaginationType {
  name: string;
  type: number | undefined;
}
export function getArmsList(data: GetArmsListParams) {
  return request({
    url: "/mhmnz/getArmsList",
    method: "get",
    params: data,
  });
}

// 新增兵种
export interface AddArmsParams {
  id?: number;
  name: string;
  type: number | undefined;
  life: string;
  att: string;
  def: string;
  mof: string;
  talent: string;
  skin: string
  remark: string;
}
export function addArms(data: AddArmsParams) {
  return request({
    url: "/mhmnz/addArms",
    method: "post",
    data: data,
  });
}

// 修改兵种
export function updateArms(data: AddArmsParams) {
  return request({
    url: "/mhmnz/updateArms",
    method: "post",
    data: data,
  });
}

// 删除兵种
export function deleteArms(id: number) {
  return request({
    url: "/mhmnz/deleteArms?id=" + id,
    method: "delete",
  });
}

// 获取武器列表
export interface GetWeaponListParams extends PaginationType {
  name: string;
  star: number | undefined;
  weaponType: number | undefined;
  isExclusive: number | undefined;
}
export function getWeaponList(data: GetWeaponListParams) {
  return request({
    url: "/mhmnz/getWeaponList",
    method: "get",
    params: data,
  });
}

// 新增武器
export interface AddWeaponParams {
  id?: number;
  name: string;
  star: number | undefined;
  weaponType: number | undefined;
  isExclusive: number | undefined;
  shuxing: string;
  introduce: string;
  remark: string;
}
export function addWeapon(data: AddWeaponParams) {
  return request({
    url: "/mhmnz/addWeapon",
    method: "post",
    data: data,
  });
}

// 修改武器
export function updateWeapon(data: AddWeaponParams) {
  return request({
    url: "/mhmnz/updateWeapon",
    method: "post",
    data: data,
  });
}

// 删除武器
export function deleteWeapon(id: number) {
  return request({
    url: "/mhmnz/deleteWeapon?id=" + id,
    method: "delete",
  });
}
