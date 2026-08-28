import { get, post } from "./index";

// 获取象棋地图
export const getChessMap = () => get("/chess/getMap");

// 重置象棋地图
export const resetChessMap = () => get("/chess/reset");

// 更新象棋地图
export const updateChessMap = (data: unknown) => post("/chess/update", data);
