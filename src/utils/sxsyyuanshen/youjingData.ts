/**
 * 原神幽境危战
 * bosses4: 三名首领，名称·词缀（n4）
 * bosses5: 三名首领，名称·词缀（n5）
 */
export interface YoujingPeriod {
    period: number;
    version: string;
    name: string;
    start: string;
    end: string;
    bosses4: [string, string, string];
    bosses5: [string, string, string];
}

export const youjingVersions = [
    { id: "5", name: "5.x", color: "#d45a3a" },
    { id: "6", name: "6.x", color: "#6a9bb8" },
    { id: "7", name: "7.x", color: "#c9a227" },
];

export function parseBoss(raw: string) {
    const sep = raw.includes("·") ? "·" : "・";
    const index = raw.lastIndexOf(sep);
    if (index <= 0) return { name: raw, title: "" };
    return { name: raw.slice(0, index), title: raw.slice(index + sep.length) };
}

export function bossesOf(item: YoujingPeriod, tier: 4 | 5) {
    const list = tier === 4 ? item.bosses4 : item.bosses5;
    return list.map((raw, index) => ({ index: index + 1, raw, ...parseBoss(raw) }));
}

export function bossesMerged(item: YoujingPeriod) {
    const harder = bossesOf(item, 5);
    return bossesOf(item, 4).map((boss, index) => ({
        index: boss.index,
        name: boss.name,
        title4: boss.title,
        title5: harder[index]?.title ?? "",
    }));
}

export const youjingList: YoujingPeriod[] = [
    {
        period: 1,
        version: "5.7",
        name: "驱侵之役",
        start: "2025.06.25",
        end: "2025.07.29",
        bosses4: ["水形幻人·强浪", "熔岩辉龙像·锐火", "秘源机兵统御械·疾攻"],
        bosses5: ["水形幻人·极旋湍流", "熔岩辉龙像·炽烈流焰", "秘源机兵统御械·毁灭武装"]
    },
    {
        period: 2,
        version: "5.8",
        name: "劲烈之役",
        start: "2025.08.06",
        end: "2025.09.09",
        bosses4: ["深邃摹结株·诡速", "历经百战的玳龟·迸雷", "历经百战的皮皮潘偶像·闪幻"],
        bosses5: ["深邃摹结株·虚暗幻变", "历经百战的玳龟·坚盾轰雷", "历经百战的皮皮潘偶像·百诈瞬变"]
    },
    {
        period: 3,
        version: "6.0",
        name: "骇轰之役",
        start: "2025.09.17",
        end: "2025.10.21",
        bosses4: ["兆载永劫龙兽·骇擎", "历经百战的岩居蟹·钢甲", "历经百战的火刃突击队员·狂热"],
        bosses5: ["兆载永劫龙兽·歼灭构型", "历经百战的岩居蟹·百万爆轰", "历经百战的火刃突击队员·决死武装"]
    },
    {
        period: 4,
        version: "6.1",
        name: "迅悍之役",
        start: "2025.10.29",
        end: "2025.12.02",
        bosses4: ["霜夜巡天灵主·晦蚀", "历经百战的执灯人·烈悲", "历经百战的霜役人·疾刺"],
        bosses5: ["霜夜巡天灵主·惊恨憎愤", "历经百战的执灯人·哀恸回响", "历经百战的霜役人·涉血芒锋"]
    },
    {
        period: 5,
        version: "6.2",
        name: "坠震之役",
        start: "2025.12.10",
        end: "2026.01.13",
        bosses4: ["深罪浸礼者·锐言", "历经百战的暝视龙·苦寒", "实验性场力发生装置·增幅"],
        bosses5: ["深罪浸礼者·肃烈狂音", "历经百战的暝视龙·霜雪苛念", "实验性场力发生装置·极端势能"]
    },
    {
        period: 6,
        version: "6.3",
        name: "除晦之役",
        start: "2026.01.21",
        end: "2026.02.24",
        bosses4: ["深黯魇语之主·利爪", "历经百战的火刃突击队员·狂热", "铁甲熔火帝皇·急袭"],
        bosses5: ["深黯魇语之主·袭掠锋刃", "历经百战的火刃突击队员·决死武装", "铁甲熔火帝皇·敕命远征"]
    },
    {
        period: 7,
        version: "6.4",
        name: "摧枯之役",
        start: "2026.03.04",
        end: "2026.04.07",
        bosses4: ["历经百战的十六倍曼陀草·绿灾", "重拳出击鸭·领舰", "秘源机兵统御械·疾攻"],
        bosses5: ["历经百战的十六倍曼陀草·风滚狂蔓", "重拳出击鸭·重甲武库", "秘源机兵统御械·毁灭武装"]
    },
    {
        period: 8,
        version: "6.5",
        name: "断玉之役",
        start: "2026.04.15",
        end: "2026.05.19",
        bosses4: ["蕴光月守宫·冥顽", "深邃摹结株·诡速", "霜夜巡天灵主·晦蚀"],
        bosses5: ["蕴光月守宫·根牙磐错", "深邃摹结株·虚暗幻变", "霜夜巡天灵主·惊恨憎愤"]
    },
    {
        period: 9,
        version: "6.6",
        name: "啸卷之役",
        start: "2026.05.27",
        end: "2026.06.30",
        bosses4: ["历经百战的凛狼·韧魂", "水形幻人·强浪", "开眼者·蔑视"],
        bosses5: ["历经百战的凛狼·极寒冰魄", "水形幻人·极旋湍流", "开眼者·傲然睥睨"]
    },
    {
        period: 10,
        version: "6.7",
        name: "栗烈之役",
        start: "2026.07.08",
        end: "2026.08.11",
        bosses4: ["先驱秘源统辖阵列之影・集群", "深黯魇语之主·利爪", "秘源机兵构型械·利爪"],
        bosses5: ["先驱秘源统辖阵列之影・蜂巢意志", "深黯魇语之主·袭掠锋刃", "秘源机兵构型械·裂解剪钳"]
    },
    {
        period: 11,
        version: "7.0",
        name: "星芒之役",
        start: "2026.08.19",
        end: "2026.09.22",
        bosses4: ["嵌合翼骏狮·激荡", "历经百战的风役人·迅斩", "重拳出击鸭·领舰"],
        bosses5: ["嵌合翼骏狮·催枯伟力", "历经百战的风役人·诡谲芒锋", "重拳出击鸭·重甲武库"]
    },
    {
        period: 12,
        version: "7.1",
        name: "烁煌之役",
        start: "2026.09.30",
        end: "2026.11.03",
        bosses4: ["历经百战的矮灵雕刻师・斧凿", "秘源机兵统御械・疾攻", "游雪的护刃・复奏"],
        bosses5: ["历经百战的矮灵雕刻师・运风成斤", "秘源机兵统御械・毁灭武装", "游雪的护刃・不绝余音"]
    },
];
