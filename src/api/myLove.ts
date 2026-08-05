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

export interface AddCookParams {
  id?: number;
  name: string;
  cookType?: number;
  hunsu?: number;
  mastery?: number;
  foodMaterials: string;
  practice: string;
  count: string;
  remark: string;
}

export const getPhotoList = () => get("/myLove/photoList");

export const addPhoto = (data: AddPhotoParams) => post("/myLove/addPhoto", data);

export const deletePhoto = (data: DeletePhotoParams) => del("/myLove/deletePhoto", data);
