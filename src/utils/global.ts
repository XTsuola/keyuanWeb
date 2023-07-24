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
    const url = (await import(str)).default
    // const url = new URL(str, import.meta.url)
}