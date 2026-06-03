import request from "./index";
import type { PaginationType } from "./common";

// 获取英雄列表
export interface GetHeroListParams extends PaginationType {
    name?: string;
    gender?: number;
    star?: number;
    element?: string;
    weaponType?: string;
    country?: string;
    figure?: string;
}
export function getHeroList(data: GetHeroListParams) {
    return request({
        url: "/yuanshen/getHeroList",
        method: "get",
        params: data,
    });
}

// 新增英雄
export interface AddHeroParams {
    id?: number;
    name: string;
    figure: string | undefined;
    gender: number | undefined;
    star: number | undefined;
    country: string | undefined;
    element: string | undefined;
    weaponType: string | undefined;
    constellation: string;
    birthday: string;
    remark?: string;
}
export function addHero(data: AddHeroParams) {
    return request({
        url: "/yuanshen/addHero",
        method: "post",
        data: data,
    });
}

// 修改英雄
export function updateHero(data: AddHeroParams) {
    return request({
        url: "/yuanshen/updateHero",
        method: "post",
        data: data,
    });
}

// 删除英雄
export function deleteHero(id: number) {
    return request({
        url: "/yuanshen/deleteHero?id=" + id,
        method: "delete",
    });
}

// 获取武器列表
export interface GetWeaponListParams extends PaginationType {
    name?: string;
}
export function getWeaponList(data: GetWeaponListParams) {
    return request({
        url: "/yuanshen/getWeaponList",
        method: "get",
        params: data,
    });
}

// 新增武器
export interface AddWeaponParams {
    id?: number;
    name: string;
    star: number | undefined;
    weaponType: string | undefined;
    attack: string;
    buff: string;
    tag: number[];
    info: string;
    remark?: string;
}
export function addWeapon(data: AddWeaponParams) {
    return request({
        url: "/yuanshen/addWeapon",
        method: "post",
        data: data,
    });
}

// 修改武器
export function updateWeapon(data: AddWeaponParams) {
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
