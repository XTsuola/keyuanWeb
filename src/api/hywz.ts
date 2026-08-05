import { get, post, del } from "./index";
import type { PaginationType } from "./common";

export interface GetArmsListParams extends PaginationType {
  name?: string;
}

export interface AddArmsParams {
  id?: number;
  name: string;
  type?: string;
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

export const getArmsList = (params: GetArmsListParams) => get("/hywz/getArmsList", params);

export const addArms = (data: AddArmsParams) => post("/hywz/addArms", data);

export const updateArms = (data: AddArmsParams) => post("/hywz/updateArms", data);

export const deleteArms = (id: number) => del("/hywz/deleteArms", { id });
