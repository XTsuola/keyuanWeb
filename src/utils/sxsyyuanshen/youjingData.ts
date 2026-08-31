/**
 * 原神幽境危战
 * bosses: 三名首领，名称·词缀
 */
export interface YoujingPeriod {
    period: number;
    version: string;
    name: string;
    start: string;
    end: string;
    bosses: [string, string, string];
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

export function bossesOf(item: YoujingPeriod) {
    return item.bosses.map((raw, index) => ({ index: index + 1, raw, ...parseBoss(raw) }));
}

export const youjingList: YoujingPeriod[] = [
    {
        period: 1,
        version: "5.7",
        name: "驱侵之役",
        start: "2025.06.25",
        end: "2025.07.29",
        bosses: ["水形幻人·极旋湍流", "熔岩辉龙像·炽烈流焰", "秘源机兵·统御械·毁灭武装"],
    },
    {
        period: 2,
        version: "5.8",
        name: "劲烈之役",
        start: "2025.08.06",
        end: "2025.09.09",
        bosses: ["深邃摹结株·Ⅱ型·虚暗幻变", "历经百战的玳龟·坚盾轰雷", "历经百战的皮皮潘偶像·百诈瞬变"],
    },
    {
        period: 3,
        version: "6.0",
        name: "骇轰之役",
        start: "2025.09.17",
        end: "2025.10.21",
        bosses: ["兆载永劫龙兽·歼灭构型", "历经百战的岩居蟹·百万爆轰", "历经百战的火刃突击队员·决死武装"],
    },
    {
        period: 4,
        version: "6.1",
        name: "迅悍之役",
        start: "2025.10.29",
        end: "2025.12.02",
        bosses: ["霜夜巡天灵主·晦蚀", "历经百战的执灯人·哀恸回响", "历经百战的霜役人·涉血芒锋"],
    },
    {
        period: 5,
        version: "6.2",
        name: "坠震之役",
        start: "2025.12.10",
        end: "2026.01.13",
        bosses: ["深罪浸礼者·肃烈狂音", "历经百战的暝视龙·霜雪苛念", "实验性场力发生装置·布雷阁原型"],
    },
    {
        period: 6,
        version: "6.3",
        name: "除晦之役",
        start: "2026.01.21",
        end: "2026.02.24",
        bosses: ["深黯魇语之主·袭掠锋刃", "历经百战的火刃突击队员·决死武装", "铁甲熔火帝皇·敕命远征"],
    },
    {
        period: 7,
        version: "6.4",
        name: "摧枯之役",
        start: "2026.03.04",
        end: "2026.04.07",
        bosses: ["历经百战的十六倍曼陀草·风滚狂蔓", "重拳出击鸭·重甲武库", "秘源机兵·统御械·毁灭武装"],
    },
    {
        period: 8,
        version: "6.5",
        name: "断玉之役",
        start: "2026.04.15",
        end: "2026.05.19",
        bosses: ["蕴光月守宫·根牙磐错", "深邃摹结株·虚暗幻变", "霜夜巡天灵主·惊恨憎愤"],
    },
    {
        period: 9,
        version: "6.6",
        name: "啸卷之役",
        start: "2026.05.27",
        end: "2026.06.30",
        bosses: ["历经百战的凛狼·极寒冰魄", "水形幻人·极旋湍流", "开眼者·傲然睥睨"],
    },
    {
        period: 10,
        version: "6.7",
        name: "栗烈之役",
        start: "2026.07.08",
        end: "2026.08.11",
        bosses: ["历经百战的先驱秘源统辖阵列・蜂巢意志", "深黯魇语之主·袭掠锋刃", "秘源机兵·构型械·裂解剪钳"],
    },
    {
        period: 11,
        version: "7.0",
        name: "至冬第1期",
        start: "2026.08.19",
        end: "2026.09.22",
        bosses: ["嵌合翼骏狮·雷殛", "历经百战的风役人·风影", "重拳出击鸭·重甲武库"],
    },
];
