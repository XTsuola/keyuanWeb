import type { RouteRecordRaw } from "vue-router";

export interface FriendCardRoute {
  key: string;
  label: string;
}

export const friendCardRouterData: FriendCardRoute[] = [
  { key: "xingkongCard", label: "星空卡等" },
  { key: "dahetaoCard", label: "核桃卡等" },
  { key: "qieCard", label: "企鹅卡等" },
  { key: "taotailangCard", label: "淘汰郎卡等" },
  { key: "akuiCard", label: "阿奎卡等" },
  { key: "yiersansiwuCard", label: "12345卡等" },
  { key: "guyueCard", label: "古月卡等" },
  { key: "laoduCard", label: "老杜卡等" },
  { key: "xiaoheiCard", label: "小黑卡等" },
  { key: "jiaozhuCard", label: "教主卡等" },
  { key: "jiaoshouCard", label: "教授卡等" },
];

export function createDynamicChildren(list: FriendCardRoute[]): RouteRecordRaw[] {
  return list.map((item) => ({
    path: item.key,
    meta: {
      menuType: "menu",
      key: item.key,
      label: item.label,
      icon: "UnorderedListOutlined",
    },
    component: () => import(`@/views/game/zlzq/cardList/${item.key}/index.vue`),
  } as RouteRecordRaw));
}
