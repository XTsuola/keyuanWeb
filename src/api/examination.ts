import { get, post, del, delBody } from "./index";
import type { PaginationType, RequiredPagination } from "./common";

export interface StemArrType {
  key: string | number;
  score: string | number;
}

export type GetQuestionListType = RequiredPagination;
export type GetPaperListType = RequiredPagination;
export type GetUserListType = RequiredPagination;
export type GetStudentsPaperListType = RequiredPagination;

export interface AddQuestionType {
  id?: number;
  stem: string;
  type: number;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  answer: number | string;
  remark: string;
}

export interface AddPaperType {
  id?: number;
  paperName: string;
  stemArr?: StemArrType[];
  score: number | string;
  time: number | null;
  remark: string;
}

export interface AddUserType {
  id?: number;
  userName: string;
  account: string;
  password: string;
  age: string;
  level?: number;
  remark: string;
}

export interface PaperDataType {
  userId: number;
  paperList: number[];
}

export interface AddReportType {
  userId: number;
  paperId: number;
}

export interface DeleteReportType {
  id: number;
  userId: number;
  paperId: number;
}

export interface GetMyPaperListType extends PaginationType {
  id: number;
}

export interface AutoUpdatePaperParams {
  dataArr: string;
  paperId: number;
  userId: number;
}

export const getQuestionList = (params: GetQuestionListType) => get("/getQuestionList", params);

export const addQuestion = (data: AddQuestionType) => post("/addQuestion", data);

export const updateQuestion = (data: AddQuestionType) => post("/updateQuestion", data);

export const deleteQuestion = (id: number) => del("/deleteQuestion", { id });

export const getPaperList = (params: GetPaperListType) => get("/getPaperList", params);

export const addPaper = (data: AddPaperType) => post("/addPaper", data);

export const updatePaper = (data: AddPaperType) => post("/updatePaper", data);

export const deletePaper = (id: number) => del("/deletePaper", { id });

export const getStemArrList = (id: number) => get("/getStemArrList", { paperId: id });

export const getUserList = (params: GetUserListType) => get("/getUserList", params);

export const addUser = (data: AddUserType) => post("/addUser", data);

export const updateUser = (data: AddUserType) => post("/updateUser", data);

export const deleteUser = (id: number, level: number) => delBody("/deleteUser", { id, level });

export const getStudentsPaper = (params: GetStudentsPaperListType) => get("/getStudentsPaper", params);

export const getUserPaperList = (data: PaperDataType) => post("/getUserPaperList", data);

export const getOthersPaperSelectList = (data: number[]) => post("/getOthersPaperSelectList", data);

export const addReport = (data: AddReportType) => post("/addReport", data);

export const deleteReport = (data: DeleteReportType) => post("/deleteReport", data);

export const getMyPaperList = (params: GetMyPaperListType) => get("/getMyPaperList", params);

export const getNowPaper = (id: number) => get("/getNowPaper", { id });

export const autoUpdatePaper = (data: AutoUpdatePaperParams) => post("/autoUpdatePaper", data);

export const resetNowPaper = (id: number) => get("/resetReport", { id });

export const getResult = (id: number) => get("/getResult", { id });
