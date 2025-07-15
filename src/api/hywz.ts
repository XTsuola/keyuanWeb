import request from "../utils/request";

export interface GetArmsListParams {
  pageSize: number;
  pageNo: number;
  name: string;
}

export interface AddArmsParams {
  name: string;
  type: string | undefined;
  life: string;
  att: string;
  magic: string;
  skill: string;
  speed: string;
  xingyun: string;
  def: string;
  mof: string;
  tige: string;
  talent: string;
  remark: string;
}

export interface UpdateArmsParams extends AddArmsParams {
  _id?: string;
  id?: number;
}

export interface DeleteParams {
  _id: string;
}

// 获取兵种列表
export function getArmsList(data: GetArmsListParams) {
  return request({
    url: "/hywz/getArmsList",
    method: "get",
    params: data,
  });
}

// 新增兵种
export function addArms(data: AddArmsParams) {
  return request({
    url: "/hywz/addArms",
    method: "post",
    data: data,
  });
}

// 修改兵种
export function updateArms(data: UpdateArmsParams) {
  return request({
    url: "/hywz/updateArms",
    method: "post",
    data: data,
  });
}

// 删除兵种
export function deleteArms(id: number) {
  return request({
    url: "/hywz/deleteArms?id=" + id,
    method: "delete",
  });
}
