import type { RouteRecordRaw } from "vue-router";
import BlankLayout from "@/layout/BlankLayout.vue";

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
            path: "wzry",
            meta: {
              menuType: "folder",
              key: "wzry",
              label: "王者荣耀",
              icon: "UnorderedListOutlined",
            },
            component: BlankLayout,
            children: [
              {
                path: "wzryHeroList",
                meta: {
                  menuType: "menu",
                  key: "wzryHeroList",
                  label: "英雄列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/wzry/heroList.vue"),
              },
              {
                path: "zhanli",
                meta: {
                  menuType: "menu",
                  key: "zhanli",
                  label: "战力计算",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/wzry/zhanli.vue"),
              },
              {
                path: "wzryguanwang",
                meta: {
                  menuType: "menu",
                  key: "wzryguanwang",
                  label: "王者官网",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/wzry/guanwang.vue"),
              },
            ],
          },
          {
            path: "mhmnz",
            meta: {
              menuType: "folder",
              key: "mhmnz",
              label: "梦幻模拟战",
              icon: "UnorderedListOutlined",
            },
            component: BlankLayout,
            children: [
              {
                path: "mhmnzHeroList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzHeroList",
                  label: "英雄列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/mhmnz/heroList.vue"),
              },
              {
                path: "mhmnzArmsList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzArmsList",
                  label: "兵种列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/mhmnz/armsList.vue"),
              },
              {
                path: "mhmnzWeaponList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzWeaponList",
                  label: "装备列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/mhmnz/weaponList.vue"),
              },
            ],
          },
          {
            path: "yuanshen",
            meta: {
              menuType: "folder",
              key: "yuanshen",
              icon: "UnorderedListOutlined",
              label: "原神",
            },
            component: BlankLayout,
            children: [
              {
                path: "yuanshenHeroList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenHeroList",
                  label: "角色列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yuanshen/heroList.vue"),
              },
              {
                path: "yuanshenWeaponList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenWeaponList",
                  label: "武器列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yuanshen/weaponList.vue"),
              },
              {
                path: "yuanshenRelicsList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenRelicsList",
                  label: "圣遗物列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yuanshen/relicsList.vue"),
              },
              {
                path: "yuanshenEnemyList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenEnemyList",
                  label: "怪物列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yuanshen/enemyList.vue"),
              },
              {
                path: "yuanshenAbyss12",
                meta: {
                  menuType: "menu",
                  key: "yuanshenAbyss12",
                  label: "深渊十二层",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yuanshen/abyssList.vue"),
              },
            ],
          },
          {
            path: "yinyangshi",
            meta: {
              menuType: "folder",
              key: "yinyangshi",
              icon: "UnorderedListOutlined",
              label: "阴阳师",
            },
            component: BlankLayout,
            children: [
              {
                path: "yinyangshiHeroList",
                meta: {
                  menuType: "menu",
                  key: "yinyangshiHeroList",
                  label: "式神列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/yinyangshi/heroList.vue"),
              },
            ],
          },
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
                path: "zhenlizhiquanCardList",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanCardList",
                  label: "卡牌列表",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/cardList.vue"),
              },
              {
                path: "zhenlizhiquanCardLevel",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanCardLevel",
                  label: "我的卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/cardLevel.vue"),
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
                path: "zhenlizhiquanMei",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanMei",
                  label: "梅",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_mei.vue"),
              },
              {
                path: "zhenlizhiquanBaichuzun",
                meta: {
                  menuType: "menu",
                  key: "zhenlizhiquanBaichuzun",
                  label: "白处尊",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/zz_baichuzun.vue"),
              },
              {
                path: "xingkongCard",
                meta: {
                  menuType: "menu",
                  key: "xingkongCard",
                  label: "星空卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/z_xk_level.vue"),
              },
              {
                path: "dahetaoCard",
                meta: {
                  menuType: "menu",
                  key: "dahetaoCard",
                  label: "大核桃卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/z_dht_level.vue"),
              },
              {
                path: "qieCard",
                meta: {
                  menuType: "menu",
                  key: "qieCard",
                  label: "企鹅卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/z_qe_level.vue"),
              },
              {
                path: "akui",
                meta: {
                  menuType: "menu",
                  key: "akui",
                  label: "阿奎卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/z_ak_level.vue"),
              },
              {
                path: "laodu",
                meta: {
                  menuType: "menu",
                  key: "laodu",
                  label: "老杜卡等",
                  icon: "UnorderedListOutlined",
                },
                component: () => import("@/views/game/zlzq/z_ld_level.vue"),
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
