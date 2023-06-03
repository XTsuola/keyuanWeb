import request from "../utils/request"

export interface GetHeroListParams {
    pageSize: number
    pageNo: number
    name: string
    gender: number | undefined
    country: number | undefined
    arms: number | undefined
    shuxing: number | undefined
    star: number | undefined
    starSign: string | undefined
}

export interface AddHeroParams {
    name: string
    gender: number | undefined
    country: number | undefined
    arms: number | undefined
    shuxing: number | undefined
    star: number | undefined
    lifeSeat: string
    life: string
    att: string
    def: string
    breach: string
    introduce: string
    remark: string
    img?: ""
}

export interface UpdateHeroParams extends AddHeroParams {
    _id?: string
    id?: number
}

export interface GetWeaponListParams {
    pageSize: number
    pageNo: number
    name: string
    type: number | undefined
    star: number | undefined
    baseAttack: string
    attribute: string
}

export interface AddWeaponParams {
    name: string
    type: number | undefined
    star: number | undefined
    baseAttack: string
    attribute: string
    introduce: string
    remark: string
}

export interface UpdateWeaponParams extends AddWeaponParams {
    _id?: string
    id?: number
}

export interface GetRelicsListParams {
    pageSize: number
    pageNo: number
    name: string
    star: number | undefined
    tag: string
}

export interface AddRelicsParams {
    name: string
    star: number | undefined
    twoEffect: string
    fourEffect: string
    tag: string
    remark: string
}

export interface UpdateRelicsParams extends AddRelicsParams {
    _id?: string
    id?: number
}

export interface DeleteParams {
    _id: string
    img?: undefined | string
}

// 获取角色列表
export function getHeroList(data: GetHeroListParams) {
    return request({
        url: '/yuanshen/getHeroList',
        method: 'get',
        params: data
    })
}

// 新增角色
export function addHero(data: AddHeroParams) {
    return request({
        url: '/yuanshen/addHero',
        method: 'post',
        data: data
    })
}

// 修改角色
export function updateHero(data: UpdateHeroParams) {
    return request({
        url: '/yuanshen/updateHero',
        method: 'post',
        data: data
    })
}

// 删除角色
export function deleteHero(data: DeleteParams) {
    return request({
        url: '/yuanshen/deleteHero',
        method: 'get',
        params: data
    })
}

// 获取武器列表
export function getWeaponList(data: GetWeaponListParams) {
    return request({
        url: '/yuanshen/getWeaponList',
        method: 'get',
        params: data
    })
}

// 新增武器
export function addWeapon(data: AddWeaponParams) {
    return request({
        url: '/yuanshen/addWeapon',
        method: 'post',
        data: data
    })
}

// 修改武器
export function updateWeapon(data: UpdateWeaponParams) {
    return request({
        url: '/yuanshen/updateWeapon',
        method: 'post',
        data: data
    })
}

// 删除武器
export function deleteWeapon(data: DeleteParams) {
    return request({
        url: '/yuanshen/deleteWeapon',
        method: 'get',
        params: data
    })
}

// 获取圣遗物列表
export function getRelicsList(data: GetRelicsListParams) {
    return request({
        url: '/yuanshen/getRelicsList',
        method: 'get',
        params: data
    })
}

// 新增圣遗物
export function addRelics(data: AddRelicsParams) {
    return request({
        url: '/yuanshen/addRelics',
        method: 'post',
        data: data
    })
}

// 修改圣遗物
export function updateRelics(data: UpdateRelicsParams) {
    return request({
        url: '/yuanshen/updateRelics',
        method: 'post',
        data: data
    })
}

// 删除圣遗物
export function deleteRelics(data: DeleteParams) {
    return request({
        url: '/yuanshen/deleteRelics',
        method: 'get',
        params: data
    })
}
