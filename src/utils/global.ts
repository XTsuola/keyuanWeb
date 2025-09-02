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

export const qingshuBase = {
    "backgroundTitle": "(1)游戏背景：",
    "background": "每位玩家都将扮演公主的追求者，游戏目的是成为最后一个被淘汰者，这样便可以将自己的情书送给公主，从而获得一颗公主的爱心。 当爱心达到一定数量时，你便可以迎娶公主，走向人生巅峰。",
    "roleTitle": "(2)游戏角色：",
    "roleIntroduce": [
        "1.（侍卫）：共5张。指定一名玩家猜出其一张名字不是侍卫的卡，如果该名玩家持有这张卡，则他淘汰出局。",
        "2.（牧师）：共2张。查看另一名玩家的手牌。",
        "3.（男爵）：共2张。选择另一名玩家，与其比较手牌点数大小，较小者淘汰出局。",
        "4.（侍女）：共2张。直到你的下一个回合，忽略其他玩家的卡牌对你的影响。",
        "5.（王子）：共2张。选择场上一名还在游戏中的玩家，被指定的玩家弃掉手牌，然后摸一张新的牌。",
        "6.（国王）：共1张。将你手上的卡与你选择的另一名玩家交换。",
        "7.（女伯爵）：共1张。如果你手上有女伯爵并且有着国王或者王子的时候，你必须弃置女伯爵。",
        "8.（公主）：共1张。如果你弃置或者打出这张牌，你将直接淘汰出局。"
    ],
    "role": [
        { "id": 1, "name": "侍卫" },
        { "id": 2, "name": "牧师" },
        { "id": 3, "name": "男爵" },
        { "id": 4, "name": "侍女" },
        { "id": 5, "name": "王子" },
        { "id": 6, "name": "国王" },
        { "id": 7, "name": "女伯爵" },
        { "id": 8, "name": "公主" }
    ]
}

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