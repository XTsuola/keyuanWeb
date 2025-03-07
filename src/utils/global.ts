export type AsldeMenuType = "group" | "folder" | "menu"

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

export async function getImg(str: string, callback: (e: any) => void) {
    const url = new URL(str, import.meta.url)
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