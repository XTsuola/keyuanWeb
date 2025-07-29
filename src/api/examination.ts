import request from "../utils/request";

export interface DeleteParams {
  _id: string;
  id?: number;
}

export interface StemArrType {
  key: string | number;
  score: string | number;
}

export interface AddQuestionType {
  stem: string;
  type: number;
  a?:string
  b?:string
  c?:string
  d?:string
  answer: number | string;
  remark: string;
}

export interface EditQuestionType extends AddQuestionType {
  id: number;
}

export interface AddPaperType {
  paperName: string;
  stemArr?: StemArrType[];
  score: number | string;
  time: number | null;
  remark: string;
}

export interface EditPaperType extends AddPaperType {
  id: number;
}

export interface AddUserType {
  userName: string;
  account: string;
  password: string;
  age: string;
  level: number | undefined;
  remark: string;
}

export interface EditUserType extends AddUserType {
  id: number
}

export interface UsersPaperType {
  id: number;
  userName: string;
  paperList: number[];
}

export interface DistributeType {
  id: number;
  paperArr: number[];
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

export interface UpdateDataList {
  index: number;
  type: number;
  id: number;
  stem: string;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  answer?: string;
}

export interface AutoUpdatePaperParams {
  dataArr: string;
  paperId: number;
  userId: number;
}

export interface PaperDataType {
  userId: number;
  paperList: number[];
}

// 获取题库列表
export function getQuestionList() {
  return request({
    url: "/getQuestionList",
    method: "get",
  });
}

// 新增题库试题
export function addQuestion(data: AddQuestionType) {
  return request({
    url: "/addQuestion",
    method: "post",
    data: data,
  });
}

// 修改题库试题
export function updateQuestion(data: EditQuestionType) {
  return request({
    url: "/updateQuestion",
    method: "post",
    data: data,
  });
}

// 删除题库试题
export function deleteQuestion(id: number) {
  return request({
    url: "/deleteQuestion?id=" + id,
    method: "delete",
  });
}

// 获取试卷列表
export function getPaperList() {
  return request({
    url: "/getPaperList",
    method: "get",
  });
}

// 新增试卷
export function addPaper(data: AddPaperType) {
  return request({
    url: "/addPaper",
    method: "post",
    data: data,
  });
}

// 修改试卷
export function updatePaper(data: EditPaperType) {
  return request({
    url: "/updatePaper",
    method: "post",
    data: data,
  });
}

// 删除试卷
export function deletePaper(id: number) {
  return request({
    url: "/deletePaper?id=" + id,
    method: "delete",
  });
}

// 获取详情试题列表
export function getStemArrList(id: number) {
  return request({
    url: "/getStemArrList?paperId=" + id,
    method: "get",
  });
}

// 获取用户列表
export function getUserList() {
  return request({
    url: "/getUserList",
    method: "get",
  });
}

// 新增用户
export function addUser(data: AddUserType) {
  return request({
    url: "/addUser",
    method: "post",
    data: data,
  });
}

// 修改用户
export function updateUser(data: EditUserType) {
  return request({
    url: "/updateUser",
    method: "post",
    data: data,
  });
}

// 删除试卷
export function deleteUser(id:number, level:number) {
  return request({
    url: "/deleteUser",
    method: "delete",
    data: {
      id: id,
      level: level
    },
  });
}

// 获取所有用户关联的试卷
export function getStudentsPaper() {
  return request({
    url: "/getStudentsPaper",
    method: "get",
  });
}

// 获取用户对应试卷详情
export function getUserPaperList(data: PaperDataType) {
  return request({
    url: "/getUserPaperList",
    method: "post",
    data: data,
  });
}

// 查询剩余试卷下拉框
export function getOthersPaperSelectList(data: number[]) {
  return request({
    url: "/getOthersPaperSelectList",
    method: "post",
    data: data,
  });
}

// 新增答卷
export function addReport(data: AddReportType) {
  return request({
    url: "/addReport",
    method: "post",
    data: data,
  });
}

// 删除考卷
export function deleteReport(data: DeleteReportType) {
  return request({
    url: "/deleteReport",
    method: "post",
    data: data,
  });
}

// 获取当前用户试卷
export function getMyPaperList(id: number) {
  return request({
    url: "/getMyPaperList?id=" + id,
    method: "get",
  });
}

// 获取当前试卷
export function getNowPaper(id: number) {
  return request({
    url: "/getNowPaper?id=" + id,
    method: "get",
  });
}

// 自动阅卷
export function autoUpdatePaper(data: AutoUpdatePaperParams) {
  return request({
    url: "/autoUpdatePaper",
    method: "post",
    data: data,
  });
}

// 重置当前试卷
export function resetNowPaper(id: number) {
  return request({
    url: "/resetReport?id=" + id,
    method: "get",
  });
}

// 查询结果
export function getResult(id: number) {
  return request({
    url: "/getResult?id=" + id,
    method: "get",
  });
}

// 测试
export function hhh(data: any) {
  return request({
    url: "/sds",
    method: "post",
    data: data,
  });
}
