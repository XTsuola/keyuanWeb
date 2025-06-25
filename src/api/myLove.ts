import request from "../utils/request";

export interface AddPhotoParams {
  name: string;
  url: string;
  createTime: string;
  remark: string;
  imgType: string;
}

export interface GetCookListParams {
  pageSize: number;
  pageNo: number;
  name: string;
  cookType: number | undefined;
  hunsu: number | undefined;
  mastery: number | undefined;
}

export interface AddCookParams {
  name: string;
  cookType: number | undefined;
  hunsu: number | undefined;
  mastery: number | undefined;
  foodMaterials: string;
  practice: string;
  count: string;
  remark: string;
}

export interface UpdateCookParams extends AddCookParams {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
}

export interface DeletePhotoParams {
  id: number;
  url: string;
}

// 获取照片列表
export function getPhotoList() {
  return request({
    url: "/myLove/photoList",
    method: "get",
  });
}

// 新增照片
export function addPhoto(data: AddPhotoParams) {
  return request({
    url: "/myLove/addPhoto",
    method: "post",
    data: data,
  });
}

// 删除照片
export function deletePhoto(data: DeletePhotoParams) {
  return request({
    url: "/myLove/deletePhoto",
    method: "delete",
    params: data,
  });
}

// 获取菜谱列表
export function getCookList(data: GetCookListParams) {
  return request({
    url: "/myLove/getCookList",
    method: "get",
    params: data,
  });
}

// 新增菜谱
export function addCook(data: AddCookParams) {
  return request({
    url: "/myLove/addCook",
    method: "post",
    data: data,
  });
}

// 修改菜谱
export function updateCook(data: UpdateCookParams) {
  return request({
    url: "/myLove/updateCook",
    method: "post",
    data: data,
  });
}

// 删除菜谱
export function deleteCook(data: DeleteParams) {
  return request({
    url: "/myLove/deleteCook",
    method: "get",
    params: data,
  });
}
