import { get, post, del } from "./index";
import type { PaginationType } from "./common";

export interface GetHeroListParams extends PaginationType {
  name?: string;
  gender?: number;
  star?: number;
  element?: string;
  weaponType?: string;
  country?: string;
  figure?: string;
}

export interface AddHeroParams {
  id?: number;
  name: string;
  figure?: string;
  gender?: number;
  star?: number;
  country?: string;
  element?: string;
  weaponType?: string;
  constellation: string;
  birthday: string;
  remark?: string;
}

export interface GetWeaponListParams extends PaginationType {
  name?: string;
}

export interface AddWeaponParams {
  id?: number;
  name: string;
  star?: number;
  weaponType?: string;
  attack: string;
  buff: string;
  tag: number[];
  info: string;
  remark?: string;
}

export const getHeroList = (params: GetHeroListParams) => get("/yuanshen/getHeroList", params);

export const addHero = (data: AddHeroParams) => post("/yuanshen/addHero", data);

export const updateHero = (data: AddHeroParams) => post("/yuanshen/updateHero", data);

export const deleteHero = (id: number) => del("/yuanshen/deleteHero", { id });

export const getWeaponList = (params: GetWeaponListParams) => get("/yuanshen/getWeaponList", params);

export const addWeapon = (data: AddWeaponParams) => post("/yuanshen/addWeapon", data);

export const updateWeapon = (data: AddWeaponParams) => post("/yuanshen/updateWeapon", data);

export const deleteWeapon = (id: number) => del("/yuanshen/deleteWeapon", { id });
