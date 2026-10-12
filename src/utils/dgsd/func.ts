export interface UnitLine {
    id: number;
    name: string[];
    cost: number[];
    tag: number[];
    skill: string[];
    life: number[];
    att: number[];
    def: number[];
    mof: number[];
    speed: number[];
    eyes: number[];
    att_interval: number[];
    shecheng: number[];
    time: number[];
    bonus: string[];
    level: string[];
}

export const unitTags = [
    "步兵",
    "骑兵",
    "射手",
    "骑射手",
    "长矛兵",
    "冲击步兵",
    "火药部队",
    "战象",
    "僧侣",
    "独特部队",
    "掷矛手",
    "骆驼",
    "马穆鲁克",
    "攻城武器",
    "重型攻城武器",
    "冲车",
    "舰船",
    "渔船",
    "远程舰船",
    "喷火船",
    "英雄",
    "建筑",
    "石制建筑",
    "石墙和门",
];

const TAG_COLORS = ["blue", "gold", "green", "purple", "cyan", "orange", "magenta", "red"];
const UNIQUE_TAG_ID = 10;
const COST_LABELS = ["木材", "食物", "黄金", "石料"];

export function tagName(id: number) {
    return unitTags[id - 1] ?? String(id);
}

export function isUniqueTag(id: number) {
    return id === UNIQUE_TAG_ID;
}

export function tagColor(id: number) {
    if (isUniqueTag(id)) return undefined;
    return TAG_COLORS[(id - 1) % TAG_COLORS.length];
}

export function lastOf<T>(list: T[]): T {
    return list[list.length - 1];
}

export function formatCost(cost: number[]) {
    const text = COST_LABELS
        .map((label, index) => (cost[index] ? `${cost[index]}${label}` : ""))
        .filter(Boolean)
        .join("+");
    return text || "—";
}

export function usedTags(tagLists: number[][]) {
    const ids = new Set<number>();
    for (const tags of tagLists) {
        for (const id of tags) ids.add(id);
    }
    return [...ids]
        .sort((a, b) => a - b)
        .map((id) => ({ id, name: tagName(id) }));
}
