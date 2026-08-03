import request from "./index";

export function getPhotoList() {
  return request({
    url: "/myLove/photoList",
    method: "get",
  });
}

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
    data,
  });
}

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
