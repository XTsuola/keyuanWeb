import request from "./index";
import type { PaginationType } from "./common";

export interface StemArrType {
  key: string | number;
  score: string | number;
}

export type GetQuestionListType = Required<PaginationType>;
export type GetPaperListType = Required<PaginationType>;
export type GetUserListType = Required<PaginationType>;
export type GetStudentsPaperListType = Required<PaginationType>;

export function getQuestionList(data: GetQuestionListType) {
  return request({
    url: "/getQuestionList",
    method: "get",
    params: data,
  });
}

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

export function addQuestion(data: AddQuestionType) {
  return request({
    url: "/addQuestion",
    method: "post",
    data,
  });
}

export function updateQuestion(data: AddQuestionType) {
  return request({
    url: "/updateQuestion",
    method: "post",
    data,
  });
}

export function deleteQuestion(id: number) {
  return request({
    url: "/deleteQuestion",
    method: "delete",
    params: { id },
  });
}

export function getPaperList(data: GetPaperListType) {
  return request({
    url: "/getPaperList",
    method: "get",
    params: data,
  });
}

export interface AddPaperType {
  id?: number;
  paperName: string;
  stemArr?: StemArrType[];
  score: number | string;
  time: number | null;
  remark: string;
}

export function addPaper(data: AddPaperType) {
  return request({
    url: "/addPaper",
    method: "post",
    data,
  });
}

export function updatePaper(data: AddPaperType) {
  return request({
    url: "/updatePaper",
    method: "post",
    data,
  });
}

export function deletePaper(id: number) {
  return request({
    url: "/deletePaper",
    method: "delete",
    params: { id },
  });
}

export function getStemArrList(id: number) {
  return request({
    url: "/getStemArrList",
    method: "get",
    params: { paperId: id },
  });
}

export function getUserList(data: GetUserListType) {
  return request({
    url: "/getUserList",
    method: "get",
    params: data,
  });
}

export interface AddUserType {
  id?: number;
  userName: string;
  account: string;
  password: string;
  age: string;
  level: number | undefined;
  remark: string;
}

export function addUser(data: AddUserType) {
  return request({
    url: "/addUser",
    method: "post",
    data,
  });
}

export function updateUser(data: AddUserType) {
  return request({
    url: "/updateUser",
    method: "post",
    data,
  });
}

export function deleteUser(id: number, level: number) {
  return request({
    url: "/deleteUser",
    method: "delete",
    data: { id, level },
  });
}

export function getStudentsPaper(data: GetStudentsPaperListType) {
  return request({
    url: "/getStudentsPaper",
    method: "get",
    params: data,
  });
}

export interface PaperDataType {
  userId: number;
  paperList: number[];
}

export function getUserPaperList(data: PaperDataType) {
  return request({
    url: "/getUserPaperList",
    method: "post",
    data,
  });
}

export function getOthersPaperSelectList(data: number[]) {
  return request({
    url: "/getOthersPaperSelectList",
    method: "post",
    data,
  });
}

export interface AddReportType {
  userId: number;
  paperId: number;
}

export function addReport(data: AddReportType) {
  return request({
    url: "/addReport",
    method: "post",
    data,
  });
}

export interface DeleteReportType {
  id: number;
  userId: number;
  paperId: number;
}

export function deleteReport(data: DeleteReportType) {
  return request({
    url: "/deleteReport",
    method: "post",
    data,
  });
}

export interface GetMyPaperListType extends PaginationType {
  id: number;
}

export function getMyPaperList(data: GetMyPaperListType) {
  return request({
    url: "/getMyPaperList",
    method: "get",
    params: data,
  });
}

export function getNowPaper(id: number) {
  return request({
    url: "/getNowPaper",
    method: "get",
    params: { id },
  });
}

export interface AutoUpdatePaperParams {
  dataArr: string;
  paperId: number;
  userId: number;
}

export function autoUpdatePaper(data: AutoUpdatePaperParams) {
  return request({
    url: "/autoUpdatePaper",
    method: "post",
    data,
  });
}

export function resetNowPaper(id: number) {
  return request({
    url: "/resetReport",
    method: "get",
    params: { id },
  });
}

export function getResult(id: number) {
  return request({
    url: "/getResult",
    method: "get",
    params: { id },
  });
}
