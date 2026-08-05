import { get, post, del } from "./index";
import type { PaginationType } from "./common";

export interface AddHeroParams {
  id?: number;
  name: string;
  title: string;
  mainShuxing: string;
  otherShuxing: string;
  weapon: string;
  gongfa: string;
  introduce: string;
  remark: string;
}

export const getHeroList = (params: PaginationType) => get("/xingta/getHeroList", params);

export const addHero = (data: AddHeroParams) => post("/xingta/addHero", data);

export const updateHero = (data: AddHeroParams) => post("/xingta/updateHero", data);

export const deleteHero = (id: number) => del("/xingta/deleteHero", { id });
