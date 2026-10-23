import type { UnitLine } from "../func";

export const qitaList: UnitLine[] = [{
    id: 6101,
    name: ["村民"],
    cost: [0, 50, 0, 0],
    tag: [],
    skill: ["采集、建造、维修、作为猎人时射程为3"],
    life: [25],
    att: [3],
    def: [0],
    mof: [0],
    speed: [0.8],
    eyes: [4],
    att_interval: [2],
    shecheng: [0],
    time: [25],
    bonus: ["对重型攻城器+6、石制建筑+6、建筑+3"],
    level: ["/"]
}, {
    id: 6102,
    name: ["僧侣"],
    cost: [0, 0, 100, 0],
    tag: [12],
    skill: ["招降、治疗友军、拾取圣遗物、对其他部队招降射程为9、治疗距离为4"],
    life: [30],
    att: [0],
    def: [0],
    mof: [0],
    speed: [0.7],
    eyes: [11],
    att_interval: [62],
    shecheng: [9],
    time: [51],
    bonus: ["/"],
    level: ["/"]
}, {
    id: 6103,
    name: ["贸易马车"],
    cost: [100, 0, 50, 0],
    tag: [],
    skill: ["贸易获得黄金"],
    life: [70],
    att: [0],
    def: [0],
    mof: [0],
    speed: [1.25],
    eyes: [7],
    att_interval: [62],
    shecheng: [0],
    time: [51],
    bonus: ["/"],
    level: ["/"]
}, {
    id: 6104,
    name: ["传教士"],
    cost: [0, 30, 100, 0],
    tag: [4, 12, 20],
    skill: ["招降、治疗友军、拾取圣遗物、对其他部队招降射程为7、治疗距离为4、拾取圣遗物后移速降低到0.9"],
    life: [30],
    att: [0],
    def: [0],
    mof: [0],
    speed: [1.1],
    eyes: [9],
    att_interval: [62],
    shecheng: [7],
    time: [51],
    bonus: ["/"],
    level: ["/"]
}, {
    id: 6105,
    name: ["牧师战士"],
    cost: [0, 30, 50, 0],
    tag: [1, 12, 20],
    skill: ["治疗友军、拾取圣遗物"],
    life: [80],
    att: [11],
    def: [1],
    mof: [1],
    speed: [0.85],
    eyes: [3],
    att_interval: [2],
    shecheng: [0],
    time: [51],
    bonus: ["/"],
    level: ["/"]
}, {
    id: 6201,
    name: ["刘备"],
    cost: [0, 500, 500, 0],
    tag: [1, 20, 21],
    skill: ["恢复10范围内单位的生命值，有自愈能力"],
    life: [425],
    att: [15],
    def: [3],
    mof: [3],
    speed: [0.9],
    eyes: [5],
    att_interval: [2],
    shecheng: [0],
    time: [60],
    bonus: ["对冲击步兵+3"],
    level: ["/"]
}, {
    id: 6202,
    name: ["曹操"],
    cost: [0, 500, 500, 0],
    tag: [4, 20, 21],
    skill: ["提升10范围内单位的攻击速度，有自愈能力"],
    life: [475],
    att: [14],
    def: [3],
    mof: [3],
    speed: [1.49],
    eyes: [5],
    att_interval: [2],
    shecheng: [0],
    time: [60],
    bonus: ["对射手+3"],
    level: ["/"]
}, {
    id: 6203,
    name: ["孙坚"],
    cost: [0, 500, 500, 0],
    tag: [4, 20, 21],
    skill: ["提升10范围内单位的移动速度，有自愈能力"],
    life: [400],
    att: [15],
    def: [4],
    mof: [4],
    speed: [1.55],
    eyes: [5],
    att_interval: [2],
    shecheng: [0],
    time: [60],
    bonus: ["/"],
    level: ["/"]
}];

/**
 * id：单位ID，6开头的是其他村民、僧侣、英雄单位
 * name：其他村民、僧侣、英雄名称、[更低等级单位、更高等级单位]
 * cost：花费、[木材、食物、黄金、石料]
 * tag：当前单位的标签，可多个，标签含义：从1开始、["步兵", "冲击步兵", "长矛兵", "骑兵", "骆驼", "马穆鲁克", "战象", "射手", "骑射手", "掷矛手", "火药部队", "僧侣", "攻城武器", "重型攻城武器", "冲车", "渔船", "舰船", "远程舰船", "喷火船", "独特部队", "英雄", "建筑", "石制建筑", "石墙和门"]
 * skill：单位特殊能力、[更低等级单位、更高等级单位]
 * life：单位生命值、[更低等级单位、更高等级单位]
 * att：单位攻击、[更低等级单位、更高等级单位]
 * def: 单位护甲、[更低等级单位、更高等级单位]
 * mof：单位远程护甲、[更低等级单位、更高等级单位]
 * speed：单位移速、[更低等级单位、更高等级单位]
 * eyes：单位视野、[更低等级单位、更高等级单位]
 * att_interval：单位攻击间隔、[更低等级单位、更高等级单位]
 * time：单位训练时间、[更低等级单位、更高等级单位]
 * bonus：单位攻击加成、[更低等级单位、更高等级单位]
 * level：单位升级花费、[更低等级单位、更高等级单位]
 */