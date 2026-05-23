import request from "./index";
import type { PaginationType } from "./common";

// 获取英雄列表
export interface GetHeroListParams extends PaginationType {
    name: string;
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
    genter: number | undefined;
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
