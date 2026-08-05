import { get, post } from "./index";

export const getChessMap = () => get("/chess/getMap");

export const resetChessMap = () => get("/chess/reset");

export const updateChessMap = (data: unknown) => post("/chess/update", data);
