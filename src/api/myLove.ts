import { get, post, del } from "./index";

export interface AddPhotoParams {
  name: string;
  url: string;
  createTime: string;
  remark: string;
  imgType: string;
}

export interface DeletePhotoParams {
  id: number;
  url: string;
}

// 照片列表
export const getPhotoList = () => get("/myLove/photoList");

// 新增照片
export const addPhoto = (data: AddPhotoParams) => post("/myLove/addPhoto", data);

// 删除照片
export const deletePhoto = (data: DeletePhotoParams) => del("/myLove/deletePhoto", data);
