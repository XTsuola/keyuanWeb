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

// 考题列表
export const getQuestionList = (params: GetQuestionListType) => get("/getQuestionList", params);

// 新增考题
export const addQuestion = (data: AddQuestionType) => post("/addQuestion", data);

// 修改考题
export const updateQuestion = (data: AddQuestionType) => post("/updateQuestion", data);

// 删除考题
export const deleteQuestion = (id: number) => del("/deleteQuestion", { id });

// 试卷列表
export const getPaperList = (params: GetPaperListType) => get("/getPaperList", params);

// 新增试卷
export const addPaper = (data: AddPaperType) => post("/addPaper", data);

// 修改试卷
export const updatePaper = (data: AddPaperType) => post("/updatePaper", data);

// 删除试卷
export const deletePaper = (id: number) => del("/deletePaper", { id });

// 试题数组
export const getStemArrList = (id: number) => get("/getStemArrList", { paperId: id });

// 考生列表
export const getUserList = (params: GetUserListType) => get("/getUserList", params);

// 新增考生
export const addUser = (data: AddUserType) => post("/addUser", data);

// 修改考生
export const updateUser = (data: AddUserType) => post("/updateUser", data);

// 删除考生
export const deleteUser = (id: number, level: number) => delBody("/deleteUser", { id, level });

// 用户试卷
export const getStudentsPaper = (params: GetStudentsPaperListType) => get("/getStudentsPaper", params);

// 用户试卷列表
export const getUserPaperList = (data: PaperDataType) => post("/getUserPaperList", data);

// 未分配用户试卷列表
export const getOthersPaperSelectList = (data: number[]) => post("/getOthersPaperSelectList", data);

// 新增答卷
export const addReport = (data: AddReportType) => post("/addReport", data);

// 删除答卷
export const deleteReport = (data: DeleteReportType) => post("/deleteReport", data);

// 我的试卷列表
export const getMyPaperList = (params: GetMyPaperListType) => get("/getMyPaperList", params);

// 当前试卷信息
export const getNowPaper = (id: number) => get("/getNowPaper", { id });

// 自动阅卷
export const autoUpdatePaper = (data: AutoUpdatePaperParams) => post("/autoUpdatePaper", data);

// 重置试卷
export const resetNowPaper = (id: number) => get("/resetReport", { id });

// 获取答卷信息
export const getResult = (id: number) => get("/getResult", { id });
