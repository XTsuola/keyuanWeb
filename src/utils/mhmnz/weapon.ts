import { weaponData1 } from "./weapon1";
import { weaponData2 } from "./weapon2";
import { weaponData3 } from "./weapon3";
import { weaponData as weaponData4 } from "./weapon4";
import { weaponData5 } from "./weapon5";

/**
 * id：神器id
 * name：神器名称
 * type：部位：1.武器、2.防具、3.头饰、4.饰品
 * category：来源分类：1.武器、2.防具、3.头饰、4.饰品、5.专属
 * quality：神器品质：1.N、2.R、3.SR、4.SSR、5.SP
 * job：兵种限制：1.步兵、2.枪兵、3.骑兵、4.飞兵、5.水兵、6.弓兵、7.刺客、8.法师、9.僧侣、10.魔物、11.龙、12.全部
 * attribute：属性：[生命, 攻击, 智力, 防御, 魔防, 技巧]
 * skill：神器效果：[技能名称, 描述]
 * remark：神器介绍和备注
 */
export interface Weapon {
    id: number;
    name: string;
    type: number;
    category: number;
    quality: number;
    job: number[];
    attribute: [number, number, number, number, number, number];
    skill: string[];
    remark: string;
}

type WeaponRaw = Omit<Weapon, "category">;

function withCategory(list: WeaponRaw[], category: number): Weapon[] {
    return list.map((item) => ({ ...item, category }));
}

export const weaponData: Weapon[] = [
    ...withCategory(weaponData1 as WeaponRaw[], 1),
    ...withCategory(weaponData2 as WeaponRaw[], 2),
    ...withCategory(weaponData3 as WeaponRaw[], 3),
    ...withCategory(weaponData4 as WeaponRaw[], 4),
    ...withCategory(weaponData5 as WeaponRaw[], 5),
];
