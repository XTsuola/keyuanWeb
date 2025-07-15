export type AsldeMenuType = "group" | "folder" | "menu";

export interface Breadcrumb {
  url: string;
  type: AsldeMenuType;
  label: string;
}

export interface ScrollType {
    x: number
    y: number | undefined
}

export interface Type {
    label: string
    value: number | string | undefined
}

export type AddType = "add" | "edit" | "detail"

export const levelName = {
  1: "超级管理员",
  2: "管理员",
  3: "普通成员",
};

export const groupList: any = [{
    label: "暂无分组",
    value: "暂无分组"
}, {
    label: "一队",
    value: "一队"
}, {
    label: "二队",
    value: "二队"
}, {
    label: "三队",
    value: "三队"
}, {
    label: "四队",
    value: "四队"
}, {
    label: "五队",
    value: "五队"
}, {
    label: "六队",
    value: "六队"
}];

export async function getImg(str: string, callback: (e: any) => void) {
  const url = new URL(str, import.meta.url);
  // const url = (await import(str)).default
}

/* async function getImg(str: string[], callback: (e: any) => void) {
    let crr = []
    for(let i = 0;i<str.length;i++) {
        crr.push((await import(str[i])).default)
    }
    callback(crr)
}
const xxx = ref<any>("")
let kk = ["../../assets/img/eda1.png", "../../assets/img/eda2.png", "../../assets/img/eda3.png"]
getImg(kk, (res) => { 
    xxx.value = res
}) */