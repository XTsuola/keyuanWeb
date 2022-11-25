export type AsldeMenuType = "group" | "folder" | "menu";

export interface Breadcrumb {
    url: string,
    type: AsldeMenuType,
    label: string
}

export const levelName = {
    1: "超级管理员",
    2: "管理员",
    3: "普通成员"
}