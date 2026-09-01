import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { createDynamicChildren, friendCardRouterData } from "./friend";
import BlankLayout from "@/layout/BlankLayout.vue";

function folder(
  path: string,
  label: string,
  icon: NonNullable<RouteMeta["icon"]>,
  children: RouteRecordRaw[],
  extra: Partial<RouteMeta> = {}
): RouteRecordRaw {
  return {
    path,
    meta: {
      menuType: "folder",
      key: path.replace(/^\//, ""),
      icon,
      label,
      ...extra,
    },
    component: BlankLayout,
    children,
  } as RouteRecordRaw;
}

function menu(
  path: string,
  label: string,
  component: RouteRecordRaw["component"],
  extra: Partial<RouteMeta> = {}
): RouteRecordRaw {
  return {
    path,
    meta: {
      menuType: "menu",
      key: path,
      label,
      icon: "UnorderedListOutlined",
      ...extra,
    },
    component,
  } as RouteRecordRaw;
}

const friendRouter = createDynamicChildren(friendCardRouterData);

const newRouterDate: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/BasicLayout.vue"),
    children: [
      folder("/team", "客缘战队", "UserOutlined", [
        menu("home", "战队介绍", () => import("@/views/team/home.vue")),
        menu("memberList", "成员管理", () => import("@/views/team/memberList.vue")),
        menu("manager", "战队高管", () => import("@/views/team/manager.vue")),
        menu("wonderfulVideo", "精彩集锦", () => import("@/views/team/wonderfulVideo.vue")),
        menu("welfareList", "战队福利", () => import("@/views/team/welfareList.vue")),
        menu("xiangce", "战队相册", () => import("@/views/team/xiangce.vue")),
      ]),
      folder("/game", "游戏管理", "RocketOutlined", [
        folder("zhenlizhiquan", "真理之拳", "UnorderedListOutlined", [
          menu("zhenlizhiquanCardLevel", "我的卡等", () => import("@/views/game/zlzq/cardList/zz_myCard/index.vue")),
          ...friendRouter,
          menu("ceshiCard", "测试卡等", () => import("@/views/game/zlzq/zzz_ceshiLevel.vue")),
          menu("bikebiao", "提升曲线", () => import("@/views/game/zlzq/zzz_xy_bikebiao.vue")),
        ]),
        folder("yuanshen", "原神", "UnorderedListOutlined", [
          menu("yuanshenHeroList", "英雄列表", () => import("@/views/game/yuanshen/heroList.vue")),
          menu("yuanshenWeaponList", "武器列表", () => import("@/views/game/yuanshen/weaponList.vue")),
          menu("yuanshenDiliList", "地理志", () => import("@/views/game/yuanshen/diliList.vue")),
          menu("yuanshenCailiaoList", "材料列表", () => import("@/views/game/yuanshen/cailiaoList.vue")),
          menu("yuanshenBossList", "Boss列表", () => import("@/views/game/yuanshen/bossList.vue")),
          menu("yuanshenShenyuanList", "深渊列表", () => import("@/views/game/yuanshen/shenyuanList.vue")),
          menu("yuanshenYoujingList", "幽境危战", () => import("@/views/game/yuanshen/youjingList.vue")),
        ]),
        folder("huoyanwenzhang", "火焰纹章", "UnorderedListOutlined", [
          menu("huoyanwenzhangArmsList", "兵种列表", () => import("@/views/game/hywz/armsList.vue")),
        ]),
        folder("mhmnz", "梦幻模拟战", "UnorderedListOutlined", [
          menu("mhmnzSoldier", "兵种列表", () => import("@/views/game/mhmnz/soldier.vue")),
          menu("mhmnzHero", "英雄列表", () => import("@/views/game/mhmnz/hero.vue")),
        ]),
      ]),
      folder("/play", "游戏试玩", "RocketOutlined", [
        menu("newGame", "坦克大战", () => import("@/views/play/tanke/index.vue"), { isLevel: [1] }),
        menu("sokoban", "推箱子", () => import("@/views/play/sokoban/index.vue"), { isLevel: [1] }),
        menu("chess", "象棋", () => import("@/views/play/chess/index.vue"), { isLevel: [1] }),
      ]),
      folder("/xingta", "星塔联盟", "DeploymentUnitOutlined", [
        menu("heroList", "人物列表", () => import("@/views/xingta/heroList.vue"), { isLevel: [1] }),
      ], { isLevel: [1] }),
      folder("/examination", "考试管理", "AlertOutlined", [
        menu("questionList", "题库列表", () => import("@/views/examination/questionList.vue"), { isLevel: [1] }),
        menu("paperList", "试卷列表", () => import("@/views/examination/paperList.vue"), { isLevel: [1] }),
        menu("userList", "用户列表", () => import("@/views/examination/userList.vue"), { isLevel: [1] }),
        menu("reportList", "答卷列表", () => import("@/views/examination/reportList.vue"), { isLevel: [1] }),
        menu("myReport", "我的试卷", () => import("@/views/examination/myReport.vue")),
      ]),
      folder("myLove", "爱的见证", "VideoCameraAddOutlined", [
        menu("travel", "时光回忆", () => import("@/views/myLove/photo.vue"), { isLevel: [1, 3] }),
        menu("worldMap", "世界地图", () => import("@/views/myLove/worldMap.vue"), { isLevel: [1, 3] }),
        menu("worldMap2", "世界地图2", () => import("@/views/myLove/worldMap2.vue"), { isLevel: [1, 3] }),
        menu("wedding", "结婚纪念", () => import("@/views/myLove/wedding/home.vue"), { isLevel: [1, 3] }),
        menu("myCanvas", "绘画天地", () => import("@/views/myLove/myCanvas.vue"), { isLevel: [1, 3] }),
      ], { isLevel: [1, 3] }),
    ],
  },
];

export default newRouterDate;
