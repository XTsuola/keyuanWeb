import request from "../utils/request";
import type { PaginationType } from "./common";

export interface GetWeaponListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  type: number | undefined;
  star: number | undefined;
  baseAttack: string;
  attribute: string;
}

export interface AddWeaponParams {
  name: string;
  type: number | undefined;
  star: number | undefined;
  baseAttack: string;
  attribute: string;
  introduce: string;
  remark: string;
}

export interface UpdateWeaponParams extends AddWeaponParams {
  _id?: string;
  id?: number;
}

export interface GetRelicsListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  star: number | undefined;
  tag: string;
}

export interface AddRelicsParams {
  name: string;
  star: number | undefined;
  twoEffect: string;
  fourEffect: string;
  tag: string;
  remark: string;
}

export interface UpdateRelicsParams extends AddRelicsParams {
  _id?: string;
  id?: number;
}

export interface GetEnemyListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  enemyType: number | undefined;
}

export interface AddEnemyParams {
  name: string;
  enemyType: number | undefined;
  info: string;
  remark: string;
}

export interface UpdateEnemyParams extends AddEnemyParams {
  _id?: string;
  id?: number;
}

export interface GetAbyss12ListParams {
  pageSize: number;
  pageNo: number;
  name: string;
}

export interface AddAbyss12Params {
  version: string;
  firstUpper: string;
  firstLower: string;
  secondUpper: string;
  secondLower: string;
  thirdUpper: string;
  thirdLower: string;
  remark: string;
}

export interface UpdateAbyss12Params extends AddAbyss12Params {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
  img?: undefined | string;
}

// 获取角色列表
export interface GetHeroListParams extends PaginationType {
  name: string;
  gender: number | undefined;
  country: number | undefined;
  arms: number | undefined;
  shuxing: number | undefined;
  star: number | undefined;
  starSign: string | undefined;
}
export function getHeroList(data: GetHeroListParams) {
  return request({
    url: "/yuanshen/getHeroList",
    method: "get",
    params: data,
  });
}

// 新增角色
export interface AddHeroParams {
  id?: number;
  name: string;
  gender: number | undefined;
  country: number | undefined;
  arms: number | undefined;
  shuxing: number | undefined;
  star: number | undefined;
  lifeSeat: string;
  life: string;
  att: string;
  def: string;
  breach: string;
  introduce: string;
  remark: string;
  firstLook: string;
  birthday: string;
  img?: "";
}
export function addHero(data: AddHeroParams) {
  return request({
    url: "/yuanshen/addHero",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateHero(data: AddHeroParams) {
  return request({
    url: "/yuanshen/updateHero",
    method: "post",
    data: data,
  });
}

// 删除角色
export function deleteHero(id: number) {
  return request({
    url: "/yuanshen/deleteHero?id=" + id,
    method: "delete",
  });
}

// 获取武器列表
export function getWeaponList(data: GetWeaponListParams) {
  return request({
    url: "/yuanshen/getWeaponList",
    method: "get",
    params: data,
  });
}

// 新增武器
export function addWeapon(data: AddWeaponParams) {
  return request({
    url: "/yuanshen/addWeapon",
    method: "post",
    data: data,
  });
}

// 修改武器
export function updateWeapon(data: UpdateWeaponParams) {
  return request({
    url: "/yuanshen/updateWeapon",
    method: "post",
    data: data,
  });
}

// 删除武器
export function deleteWeapon(id: number) {
  return request({
    url: "/yuanshen/deleteWeapon?id=" + id,
    method: "delete",
  });
}

// 获取圣遗物列表
export function getRelicsList(data: GetRelicsListParams) {
  return request({
    url: "/yuanshen/getRelicsList",
    method: "get",
    params: data,
  });
}

// 新增圣遗物
export function addRelics(data: AddRelicsParams) {
  return request({
    url: "/yuanshen/addRelics",
    method: "post",
    data: data,
  });
}

// 修改圣遗物
export function updateRelics(data: UpdateRelicsParams) {
  return request({
    url: "/yuanshen/updateRelics",
    method: "post",
    data: data,
  });
}

// 删除圣遗物
export function deleteRelics(id: number) {
  return request({
    url: "/yuanshen/deleteRelics?id=" + id,
    method: "delete",
  });
}

// 获取怪物列表
export function getEnemyList(data: GetEnemyListParams) {
  return request({
    url: "/yuanshen/getEnemyList",
    method: "get",
    params: data,
  });
}

// 新增怪物
export function addEnemy(data: AddEnemyParams) {
  return request({
    url: "/yuanshen/addEnemy",
    method: "post",
    data: data,
  });
}

// 修改怪物
export function updateEnemy(data: UpdateEnemyParams) {
  return request({
    url: "/yuanshen/updateEnemy",
    method: "post",
    data: data,
  });
}

// 删除怪物
export function deleteEnemy(id: number) {
  return request({
    url: "/yuanshen/deleteEnemy?id=" + id,
    method: "delete",
  });
}

// 获取深渊12层怪物列表
export function getAbyss12List(data: GetAbyss12ListParams) {
  return request({
    url: "/yuanshen/getAbyss12List",
    method: "get",
    params: data,
  });
}

// 新增深渊12层怪物
export function addAbyss12(data: AddAbyss12Params) {
  return request({
    url: "/yuanshen/addAbyss12",
    method: "post",
    data: data,
  });
}

// 修改深渊12层怪物
export function updateAbyss12(data: UpdateAbyss12Params) {
  return request({
    url: "/yuanshen/updateAbyss12",
    method: "post",
    data: data,
  });
}

// 删除深渊12层怪物
export function deleteAbyss12(id: number) {
  return request({
    url: "/yuanshen/deleteAbyss12?id=" + id,
    method: "delete",
  });
}
