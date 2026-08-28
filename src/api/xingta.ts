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

// 星塔人物列表
export const getHeroList = (params: PaginationType) => get("/xingta/getHeroList", params);

// 新增星塔人物
export const addHero = (data: AddHeroParams) => post("/xingta/addHero", data);

// 修改星塔人物
export const updateHero = (data: AddHeroParams) => post("/xingta/updateHero", data);

// 删除星塔人物
export const deleteHero = (id: number) => del("/xingta/deleteHero", { id });
