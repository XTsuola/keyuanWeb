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

export const blueObj = [{
    level: 1,
    zhanli: 10,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 1,
}, {
    level: 2,
    zhanli: 22,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 2,
}, {
    level: 3,
    zhanli: 48,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 4,
}, {
    level: 4,
    zhanli: 100,
    zuanshi: 10,
    cailiao: [0, 0, 0, 0],
    count: 8,
}, {
    level: 5,
    zhanli: 220,
    zuanshi: 35,
    cailiao: [10, 0, 0, 0],
    count: 16,
}, {
    level: 6,
    zhanli: 480,
    zuanshi: 90,
    cailiao: [50, 0, 0, 0],
    count: 32,
}, {
    level: 7,
    zhanli: 1000,
    zuanshi: 220,
    cailiao: [200, 0, 0, 0],
    count: 64,
}, {
    level: 8,
    zhanli: 2200,
    zuanshi: 500,
    cailiao: [400, 20, 0, 0],
    count: 128,
}, {
    level: 9,
    zhanli: 4800,
    zuanshi: 820,
    cailiao: [600, 70, 0, 0],
    count: 192,
}, {
    level: 10,
    zhanli: 10000,
    zuanshi: 1570,
    cailiao: [1000, 290, 0, 0],
    count: 320,
}, {
    level: 11,
    zhanli: 13500,
    zuanshi: 2470,
    cailiao: [1400, 310, 20, 0],
    count: 448,
}, {
    level: 12,
    zhanli: 20000,
    zuanshi: 3940,
    cailiao: [2000, 380, 90, 0],
    count: 640,
}, {
    level: 13,
    zhanli: 26000,
    zuanshi: 5460,
    cailiao: [2600, 450, 290, 0],
    count: 832,
}, {
    level: 14,
    zhanli: 38000,
    zuanshi: 7780,
    cailiao: [3600, 740, 290, 35],
    count: 1152,
}, {
    level: 15,
    zhanli: 50000,
    zuanshi: 10150,
    cailiao: [4600, 1030, 290, 185],
    count: 1472,
}, {
    level: 16,
    zhanli: 60000,
    zuanshi: 12670,
    cailiao: [5600, 1320, 290, 385],
    count: 1792,
}, {
    level: 17,
    zhanli: 73500,
    zuanshi: 16190,
    cailiao: [11000, 1630, 310, 465],
    count: 2240,
}, {
    level: 18,
    zhanli: 87000,
    zuanshi: 19810,
    cailiao: [12400, 3440, 330, 625],
    count: 2688,
}, {
    level: 19,
    zhanli: 100500,
    zuanshi: 23780,
    cailiao: [28800, 3750, 350, 725],
    count: 3136,
}, {
    level: 20,
    zhanli: 114000,
    zuanshi: 28050,
    cailiao: [30200, 4060, 1970, 845],
    count: 3584,
}, {
    level: 21,
    zhanli: 134000,
    zuanshi: 33950,
    cailiao: [36200, 5640, 2860, 995],
    count: 4224,
}, {
    level: 22,
    zhanli: 154000,
    zuanshi: 40150,
    cailiao: [43200, 8020, 3930, 1145],
    count: 4864,
}]

export const purpleObj = [{
    level: 1,
    zhanli: 30,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 1,
}, {
    level: 2,
    zhanli: 65,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 2,
}, {
    level: 3,
    zhanli: 150,
    zuanshi: 10,
    cailiao: [0, 0, 0, 0],
    count: 4,
}, {
    level: 4,
    zhanli: 300,
    zuanshi: 40,
    cailiao: [20, 0, 0, 0],
    count: 8,
}, {
    level: 5,
    zhanli: 660,
    zuanshi: 110,
    cailiao: [90, 0, 0, 0],
    count: 16,
}, {
    level: 6,
    zhanli: 1440,
    zuanshi: 270,
    cailiao: [330, 0, 0, 0],
    count: 32,
}, {
    level: 7,
    zhanli: 3000,
    zuanshi: 620,
    cailiao: [660, 30, 0, 0],
    count: 64,
}, {
    level: 8,
    zhanli: 6600,
    zuanshi: 1010,
    cailiao: [990, 100, 0, 0],
    count: 96,
}, {
    level: 9,
    zhanli: 14400,
    zuanshi: 1930,
    cailiao: [1650, 400, 0, 0],
    count: 160,
}, {
    level: 10,
    zhanli: 30000,
    zuanshi: 3150,
    cailiao: [2310, 1100, 0, 0],
    count: 224,
}, {
    level: 11,
    zhanli: 40000,
    zuanshi: 5060,
    cailiao: [3300, 1200, 30, 0],
    count: 320,
}, {
    level: 12,
    zhanli: 55000,
    zuanshi: 7320,
    cailiao: [4290, 1300, 120, 0],
    count: 416,
}, {
    level: 13,
    zhanli: 72000,
    zuanshi: 10500,
    cailiao: [5940, 1700, 420, 0],
    count: 576,
}, {
    level: 14,
    zhanli: 90000,
    zuanshi: 13930,
    cailiao: [7590, 2100, 420, 50],
    count: 736,
}, {
    level: 15,
    zhanli: 125000,
    zuanshi: 18580,
    cailiao: [9900, 3200, 420, 250],
    count: 960,
}, {
    level: 16,
    zhanli: 155000,
    zuanshi: 23530,
    cailiao: [12210, 4300, 420, 550],
    count: 1184,
}, {
    level: 17,
    zhanli: 185000,
    zuanshi: 28630,
    cailiao: [20520, 5400, 420, 670],
    count: 1408,
}, {
    level: 18,
    zhanli: 225000,
    zuanshi: 35790,
    cailiao: [23820, 6600, 1050, 870],
    count: 1728,
}, {
    level: 19,
    zhanli: 265000,
    zuanshi: 43350,
    cailiao: [27120, 13800, 1080, 990],
    count: 2048,
}, {
    level: 20,
    zhanli: 305000,
    zuanshi: 51410,
    cailiao: [30420, 15000, 3110, 1140],
    count: 2368,
}, {
    level: 21,
    zhanli: 360000,
    zuanshi: 62010,
    cailiao: [38720, 18300, 4230, 1290],
    count: 2784,
}, {
    level: 22,
    zhanli: 415000,
    zuanshi: 73010,
    cailiao: [47420, 21800, 5550, 1455],
    count: 3200,
}]

export const goldObj = [{
    level: 1,
    zhanli: 120,
    zuanshi: 0,
    cailiao: [0, 0, 0, 0],
    count: 1,
}, {
    level: 2,
    zhanli: 280,
    zuanshi: 20,
    cailiao: [0, 0, 0, 0],
    count: 2,
}, {
    level: 3,
    zhanli: 600,
    zuanshi: 80,
    cailiao: [30, 0, 0, 0],
    count: 4,
}, {
    level: 4,
    zhanli: 1300,
    zuanshi: 220,
    cailiao: [150, 0, 0, 0],
    count: 8,
}, {
    level: 5,
    zhanli: 2700,
    zuanshi: 540,
    cailiao: [500, 0, 0, 0],
    count: 16,
}, {
    level: 6,
    zhanli: 5800,
    zuanshi: 1280,
    cailiao: [1000, 50, 0, 0],
    count: 32,
}, {
    level: 7,
    zhanli: 12000,
    zuanshi: 2880,
    cailiao: [2000, 220, 0, 0],
    count: 64,
}, {
    level: 8,
    zhanli: 26500,
    zuanshi: 4560,
    cailiao: [3000, 570, 0, 0],
    count: 96,
}, {
    level: 9,
    zhanli: 58000,
    zuanshi: 6840,
    cailiao: [4000, 1420, 0, 0],
    count: 128,
}, {
    level: 10,
    zhanli: 120000,
    zuanshi: 11720,
    cailiao: [6000, 3440, 0, 0],
    count: 192,
}, {
    level: 11,
    zhanli: 160000,
    zuanshi: 17600,
    cailiao: [8000, 3660, 60, 0],
    count: 256,
}, {
    level: 12,
    zhanli: 220000,
    zuanshi: 27160,
    cailiao: [11000, 4230, 260, 0],
    count: 352,
}, {
    level: 13,
    zhanli: 255000,
    zuanshi: 36720,
    cailiao: [14000, 4800, 860, 0],
    count: 448,
}, {
    level: 14,
    zhanli: 325000,
    zuanshi: 49580,
    cailiao: [18000, 6220, 860, 100],
    count: 576,
}, {
    level: 15,
    zhanli: 400000,
    zuanshi: 62440,
    cailiao: [22000, 7640, 860, 450],
    count: 704,
}, {
    level: 16,
    zhanli: 458000,
    zuanshi: 76440,
    cailiao: [26000, 9060, 860, 1050],
    count: 832,
}, {
    level: 17,
    zhanli: 578000,
    zuanshi: 96040,
    cailiao: [32000, 16000, 860, 1270],
    count: 1024,
}, {
    level: 18,
    zhanli: 698000,
    zuanshi: 116340,
    cailiao: [38000, 19440, 1760, 1670],
    count: 1216,
}, {
    level: 19,
    zhanli: 818000,
    zuanshi: 137040,
    cailiao: [74000, 22880, 1760, 1870],
    count: 1408,
}, {
    level: 20,
    zhanli: 938000,
    zuanshi: 158700,
    cailiao: [80000, 26320, 4760, 2170],
    count: 1600
}, {
    level: 21,
    zhanli: 1098000,
    zuanshi: 187800,
    cailiao: [93120, 32440, 6820, 2470],
    count: 1856,
}, {
    level: 22,
    zhanli: 1258000,
    zuanshi: 217400,
    cailiao: [106620, 38840, 9180, 2800],
    count: 2112
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