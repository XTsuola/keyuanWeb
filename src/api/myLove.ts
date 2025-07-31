import request from "../utils/request";
import type { PaginationType } from "./common";

// 获取照片列表
export function getPhotoList() {
  return request({
    url: "/myLove/photoList",
    method: "get",
  });
}

// 新增照片
export interface AddPhotoParams {
  name: string;
  url: string;
  createTime: string;
  remark: string;
  imgType: string;
}
export function addPhoto(data: AddPhotoParams) {
  return request({
    url: "/myLove/addPhoto",
    method: "post",
    data: data,
  });
}

// 删除照片
export interface DeletePhotoParams {
  id: number;
  url: string;
}
export function deletePhoto(data: DeletePhotoParams) {
  return request({
    url: "/myLove/deletePhoto",
    method: "delete",
    params: data,
  });
}


// 获取菜谱列表
export interface GetCookListType extends PaginationType {
  name?: string;
  cookType?: number;
  hunsu?: number;
  mastery?: number;
}
export function getCookList(data: GetCookListType) {
  return request({
    url: "/myLove/getCookList",
    method: "get",
    params: data,
  });
}

// 新增菜谱
export interface AddCookParams {
  id?: number;
  name: string;
  cookType: number | undefined;
  hunsu: number | undefined;
  mastery: number | undefined;
  foodMaterials: string;
  practice: string;
  count: string;
  remark: string;
}
export function addCook(data: AddCookParams) {
  return request({
    url: "/myLove/addCook",
    method: "post",
    data: data,
  });
}

// 修改菜谱
export function updateCook(data: AddCookParams) {
  return request({
    url: "/myLove/updateCook",
    method: "post",
    data: data,
  });
}

// 删除菜谱
export function deleteCook(id: number) {
  return request({
    url: "/myLove/deleteCook?id=" + id,
    method: "delete",
  });
}
