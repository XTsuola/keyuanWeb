import request from "../utils/request"

export interface GetHeroListParams {
    pageSize: number
    pageNo: number
    name: string
    gender: number | undefined
    star: number | undefined
    country: number | undefined
}

export interface AddHeroParams {
    name: string
    gender: number | undefined
    star: number | undefined
    country: number | undefined
    link: string
    skill: string
    weapon: string
    remark: string
}

export interface UpdateHeroParams extends AddHeroParams {
    _id?: string
    id?: number
}

export interface DeleteParams {
    _id: string
}

// 获取英雄列表
export function getHeroList(data: GetHeroListParams) {
    return request({
        url: '/yjz/getHeroList',
        method: 'get',
        params: data
    })
}

// 新增英雄
export function addHero(data: AddHeroParams) {
    return request({
        url: '/yjz/addHero',
        method: 'post',
        data: data
    })
}

// 修改英雄
export function updateHero(data: UpdateHeroParams) {
    return request({
        url: '/yjz/updateHero',
        method: 'post',
        data: data
    })
}

// 删除英雄
export function deleteHero(data: DeleteParams) {
    return request({
        url: '/yjz/deleteHero',
        method: 'get',
        params: data
    })
}