import type { RouteRecordRaw } from "vue-router";
import BlankLayout from "@/layout/BlankLayout.vue";
import { createDynamicChildren, friendCardRouterData } from "./friend";

const friendRouter = createDynamicChildren(friendCardRouterData);

const newRouterDate: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layout/BasicLayout.vue"),
    children: [
      {
        path: "/team",
        meta: {
          menuType: "folder",
          key: "team",
          icon: "UserOutlined",
          label: "客缘战队",
        },
        component: BlankLayout,
        children: [
          {
            path: "home",
            meta: {
              menuType: "menu",
              key: "home",
              label: "战队介绍",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/home.vue"),
          },
          {
            path: "memberList",
            meta: {
              menuType: "menu",
              key: "memberList",
              label: "成员管理",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/memberList.vue"),
          },
          {
            path: "manager",
            meta: {
              menuType: "menu",
              key: "manager",
              label: "战队高管",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/manager.vue"),
          },
          {
            path: "wonderfulVideo",
            meta: {
              menuType: "menu",
              key: "wonderfulVideo",
              label: "精彩集锦",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/wonderfulVideo.vue"),
          },
          {
            path: "welfareList",
            meta: {
              menuType: "menu",
              key: "welfareList",
              label: "战队福利",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/welfareList.vue"),
          },
          {
            path: "xiangce",
            meta: {
              menuType: "menu",
              key: "xiangce",
              label: "战队相册",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/team/xiangce.vue"),
          },
        ],
      },
      {
        path: "/game",
        meta: {
          menuType: "folder",
          key: "game",
          icon: "RocketOutlined",
          label: "游戏管理",
        },
        component: BlankLayout,
        children: [
          {
            path: "zhenlizhiquan",
            meta: {
              menuType: "folder",
              key: "zhenlizhiquan",
              icon: "UnorderedListOutlined",
              label: "真理之拳",
            },
            component: BlankLayout,
            children: [
              {
                path: "zhenlizhiquanCardLevel",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanCardLevel",
                  label: "我的卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/cardList/zz_myCard/index.vue"),
              },
              {
                path: "zhenlizhiquanAsitala",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanAsitala",
                  label: "阿斯塔拉",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_asitala.vue"),
              },
              {
                path: "zhenlizhiquanYiluolian",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanYiluolian",
                  label: "伊萝莲",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_yiluolian.vue"),
              },
              {
                path: "zhenlizhiquanLuo",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanLuo",
                  label: "洛",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_luo.vue"),
              },
              {
                path: "zhenlizhiquanGenaluoer",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanGenaluoer",
                  label: "格纳罗尔",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_genaluoer.vue"),
              },
              ...friendRouter,
              {
                path: "ceshiCard",
                meta: {
                  menuType: "menu",
                  key: "ceshiCard",
                  label: "测试卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zzz_ceshiLevel.vue"),
              },
              {
                path: "bikebiao",
                meta: {
                  menuType: "menu",
                  key: "bikebiao",
                  label: "提升曲线",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zzz_xy_bikebiao.vue"),
              },
            ],
          },
          {
            path: "huoyanwenzhang",
            meta: {
              menuType: "folder",
              key: "huoyanwenzhang",
              icon: "UnorderedListOutlined",
              label: "火焰纹章",
            },
            component: BlankLayout,
            children: [
              {
                path: "huoyanwenzhangArmsList",
                meta: {
                  menuType: "menu",
                  key: "huoyanwenzhangArmsList",
                  label: "兵种列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/hywz/armsList.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/play",
        meta: {
          menuType: "folder",
          key: "play",
          icon: "RocketOutlined",
          label: "游戏试玩",
        },
        component: BlankLayout,
        children: [
          {
            path: "newGame",
            meta: {
              menuType: "menu",
              key: "newGame",
              label: "坦克大战",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/play/tanke/index.vue"),
          },
          {
            path: "sokoban",
            meta: {
              menuType: "menu",
              key: "sokoban",
              label: "推箱子",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/play/sokoban/index.vue"),
          },
          {
            path: "chess",
            meta: {
              menuType: "menu",
              key: "chess",
              label: "象棋",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/play/chess/index.vue"),
          },
          {
            path: "qingshu",
            meta: {
              menuType: "menu",
              key: "qingshu",
              label: "情书",
              icon: "UnorderedListOutlined",
              isLevel: [1, 2],
            },
            component: () => import("@/views/play/qingshu/index.vue"),
          },
        ],
      },
      {
        path: "/xingta",
        meta: {
          menuType: "folder",
          key: "xingta",
          icon: "DeploymentUnitOutlined",
          label: "星塔联盟",
          isLevel: [1],
        },
        component: BlankLayout,
        children: [
          {
            path: "heroList",
            meta: {
              menuType: "menu",
              key: "heroList",
              label: "人物列表",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/xingta/heroList.vue"),
          },
        ],
      },
      {
        path: "/examination",
        meta: {
          menuType: "folder",
          key: "examination",
          icon: "AlertOutlined",
          label: "考试管理",
        },
        component: BlankLayout,
        children: [
          {
            path: "questionList",
            meta: {
              menuType: "menu",
              key: "questionList",
              label: "题库列表",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/examination/questionList.vue"),
          },
          {
            path: "paperList",
            meta: {
              menuType: "menu",
              key: "paperList",
              label: "试卷列表",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/examination/paperList.vue"),
          },
          {
            path: "userList",
            meta: {
              menuType: "menu",
              key: "userList",
              label: "用户列表",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/examination/userList.vue"),
          },
          {
            path: "reportList",
            meta: {
              menuType: "menu",
              key: "reportList",
              label: "答卷列表",
              icon: "UnorderedListOutlined",
              isLevel: [1],
            },
            component: () => import("@/views/examination/reportList.vue"),
          },
          {
            path: "myReport",
            meta: {
              menuType: "menu",
              key: "myReport",
              label: "我的试卷",
              icon: "UnorderedListOutlined",
            },
            component: () => import("@/views/examination/myReport.vue"),
          },
        ],
      },
      {
        path: "myLove",
        meta: {
          menuType: "folder",
          key: "myLove",
          icon: "VideoCameraAddOutlined",
          label: "爱的见证",
          isLevel: [1, 3],
        },
        component: BlankLayout,
        children: [
          {
            path: "travel",
            meta: {
              menuType: "menu",
              key: "travel",
              label: "时光回忆",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/photo.vue"),
          },
          {
            path: "worldMap",
            meta: {
              menuType: "menu",
              key: "worldMap",
              label: "世界地图",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/worldMap.vue"),
          },
          {
            path: "worldMap2",
            meta: {
              menuType: "menu",
              key: "worldMap2",
              label: "世界地图2",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/worldMap2.vue"),
          },
          {
            path: "cookList",
            meta: {
              menuType: "menu",
              key: "cookList",
              label: "菜谱列表",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/cookList.vue"),
          },
          {
            path: "wedding",
            meta: {
              menuType: "menu",
              key: "wedding",
              label: "结婚纪念",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/wedding/home.vue"),
          },
          {
            path: "myCanvas",
            meta: {
              menuType: "menu",
              key: "myCanvas",
              label: "绘画天地",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3],
            },
            component: () => import("@/views/myLove/myCanvas.vue"),
          }
        ],
      },
    ],
  },
];

export default newRouterDate;
