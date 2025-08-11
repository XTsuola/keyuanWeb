export type AsldeMenuType = "group" | "folder" | "menu";

export interface Breadcrumb {
    url: string;
    type: AsldeMenuType;
    label: string;
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
}

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
}]

export async function getImg(str: string, callback: (e: any) => void) {
    const url = new URL(str, import.meta.url);
    // const url = (await import(str)).default
}

export function getNowTime(): string {
    const date = new Date();
    const Y = date.getFullYear();
    const M =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

export function getMyCard(allData: any, myCardList: any) {
    const list = [];
    for (let i = 0; i < myCardList.length; i++) {
        let ind = allData.findIndex((e: any) => e.name == myCardList[i]);
        list.push(allData[ind]);
    }
    return list;
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