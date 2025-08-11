import request from "./index";

export interface StemArrType {
  key: string | number;
  score: string | number;
}

// export interface UsersPaperType {
//   id: number;
//   userName: string;
//   paperList: number[];
// }

// export interface DistributeType {
//   id: number;
//   paperArr: number[];
// }

// 获取题库列表
export interface GetQuestionListType {
  pageSize: number;
  pageNo: number;
}
export function getQuestionList(data: GetQuestionListType) {
  return request({
    url: "/getQuestionList",
    method: "get",
    params: data,
  });
}

// 新增题库试题
export interface AddQuestionType {
  id?: number;
  stem: string;
  type: number;
  a?: string
  b?: string
  c?: string
  d?: string
  answer: number | string;
  remark: string;
}
export function addQuestion(data: AddQuestionType) {
  return request({
    url: "/addQuestion",
    method: "post",
    data: data,
  });
}

// 修改题库试题
export function updateQuestion(data: AddQuestionType) {
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
export interface GetPaperListType {
  pageSize: number;
  pageNo: number;
}
export function getPaperList(data: GetPaperListType) {
  return request({
    url: "/getPaperList",
    method: "get",
    params: data,
  });
}

// 新增试卷
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
    data: data,
  });
}

// 修改试卷
export function updatePaper(data: AddPaperType) {
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
export interface GetUserListType {
  pageSize: number;
  pageNo: number;
}
export function getUserList(data: GetUserListType) {
  return request({
    url: "/getUserList",
    method: "get",
    params: data,
  });
}

// 新增用户
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
    data: data,
  });
}
export function updateUser(data: AddUserType) {
  return request({
    url: "/updateUser",
    method: "post",
    data: data,
  });
}

// 删除试卷
export function deleteUser(id: number, level: number) {
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
export interface GetStudentsPaperListType {
  pageSize: number;
  pageNo: number;
}
export function getStudentsPaper(data: GetStudentsPaperListType) {
  return request({
    url: "/getStudentsPaper",
    method: "get",
    params: data,
  });
}

// 获取用户对应试卷详情
export interface PaperDataType {
  userId: number;
  paperList: number[];
}
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
export interface AddReportType {
  userId: number;
  paperId: number;
}
export function addReport(data: AddReportType) {
  return request({
    url: "/addReport",
    method: "post",
    data: data,
  });
}

// 删除考卷
export interface DeleteReportType {
  id: number;
  userId: number;
  paperId: number;
}
export function deleteReport(data: DeleteReportType) {
  return request({
    url: "/deleteReport",
    method: "post",
    data: data,
  });
}

// 获取当前用户试卷
export interface GetMyPaperListType {
  id: number;
  pageSize: number;
  pageNo: number;
}
export function getMyPaperList(data: GetMyPaperListType) {
  return request({
    url: "/getMyPaperList",
    method: "get",
    params: data,
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
export interface AutoUpdatePaperParams {
  dataArr: string;
  paperId: number;
  userId: number;
}
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
