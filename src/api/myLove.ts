import request from "./index";
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
