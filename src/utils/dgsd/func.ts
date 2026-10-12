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
    "步兵", "骑兵", "射手", "骑射手", "长矛兵", "冲击步兵", "火药部队", "战象", "僧侣", "独特部队",
    "掷矛手", "骆驼", "马穆鲁克", "攻城武器", "重型攻城武器", "冲车", "舰船", "渔船", "远程舰船", "喷火船",
    "英雄", "建筑", "石制建筑", "石墙和门",
];

const COST_LABELS = ["木材", "食物", "黄金", "石料"];

const TAG_TONES: Record<number, { color?: string; className?: string }> = {
    1: { color: "blue" },
    2: { color: "gold" },
    3: { color: "green" },
    4: { color: "geekblue" },
    5: { color: "cyan" },
    6: { color: "orange" },
    7: { color: "magenta" },
    8: { color: "red" },
    9: { color: "yellow" },
    10: { className: "dgsd-tag-10" },
    11: { color: "lime" },
    12: { color: "volcano" },
    13: { className: "dgsd-tag-13" },
    14: { className: "dgsd-tag-14" },
    15: { className: "dgsd-tag-15" },
    16: { className: "dgsd-tag-16" },
    17: { className: "dgsd-tag-17" },
    18: { className: "dgsd-tag-18" },
    19: { className: "dgsd-tag-19" },
    20: { className: "dgsd-tag-20" },
    21: { className: "dgsd-tag-21" },
    22: { className: "dgsd-tag-22" },
    23: { className: "dgsd-tag-23" },
    24: { className: "dgsd-tag-24" },
};

export function tagName(id: number) {
    return unitTags[id - 1] ?? String(id);
}

export function tagColor(id: number) {
    return TAG_TONES[id]?.color;
}

export function tagClass(id: number) {
    return TAG_TONES[id]?.className;
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
