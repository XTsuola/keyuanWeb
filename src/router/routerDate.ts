import type { RouteRecordRaw } from 'vue-router'

import BlankLayout from "@/layout/BlankLayout.vue"

/* let hiddenFlag = false

const userInfo = window.sessionStorage.getItem('userInfo')
if(userInfo && JSON.parse(userInfo) && JSON.parse(userInfo).userId != 1){
  hiddenFlag = true
} else {
  hiddenFlag = false
} */

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
          label: "客缘战队"
        },
        component: BlankLayout,
        children: [
          {
            path: "home",
            meta: {
              menuType: "menu",
              key: "home",
              label: "战队介绍",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/home.vue")
          },
          {
            path: "memberList",
            meta: {
              menuType: "menu",
              key: "memberList",
              label: "成员管理",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/memberList.vue")
          },
          {
            path: "manager",
            meta: {
              menuType: "menu",
              key: "manager",
              label: "战队高管",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/manager.vue")
          },
          {
            path: "wonderfulVideo",
            meta: {
              menuType: "menu",
              key: "wonderfulVideo",
              label: "精彩集锦",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/wonderfulVideo.vue")
          },
          {
            path: "welfareList",
            meta: {
              menuType: "menu",
              key: "welfareList",
              label: "战队福利",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/welfareList.vue")
          },
          {
            path: "xiangce",
            meta: {
              menuType: "menu",
              key: "xiangce",
              label: "战队相册",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/team/xiangce.vue")
          },
        ]
      },
      {
        path: "/game",
        meta: {
          menuType: "folder",
          key: "game",
          icon: "RocketOutlined",
          label: "游戏管理"
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
              isLevel: []
            },
            component: () => import("@/views/game/tanke/index.vue")
          },
          {
            path: "sokoban",
            meta: {
              menuType: "menu",
              key: "sokoban",
              label: "推箱子",
              icon: "UnorderedListOutlined",
              isLevel: []
            },
            component: () => import("@/views/game/sokoban/index.vue")
          },
          {
            path: "wzry",
            meta: {
              menuType: "folder",
              key: "wzry",
              label: "王者荣耀",
              icon: "UnorderedListOutlined"
            },
            component: BlankLayout,
            children: [
              {
                path: "wzryHeroList",
                meta: {
                  menuType: "menu",
                  key: "wzryHeroList",
                  label: "英雄列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/wzry/heroList.vue")
              },
              {
                path: "zhanli",
                meta: {
                  menuType: "menu",
                  key: "zhanli",
                  label: "战力计算",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/wzry/zhanli.vue")
              },
              {
                path: "wzryguanwang",
                meta: {
                  menuType: "menu",
                  key: "wzryguanwang",
                  label: "王者官网",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/wzry/guanwang.vue")
              }
            ]
          },
          {
            path: "mhmnz",
            meta: {
              menuType: "folder",
              key: "mhmnz",
              label: "梦幻模拟战",
              icon: "UnorderedListOutlined"
            },
            component: BlankLayout,
            children: [
              {
                path: "mhmnzHeroList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzHeroList",
                  label: "英雄列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/mhmnz/heroList.vue")
              },
              {
                path: "mhmnzArmsList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzArmsList",
                  label: "兵种列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/mhmnz/armsList.vue")
              },
              {
                path: "mhmnzWeaponList",
                meta: {
                  menuType: "menu",
                  key: "mhmnzWeaponList",
                  label: "装备列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/mhmnz/weaponList.vue")
              },
            ]
          },
          {
            path: "yuanshen",
            meta: {
              menuType: "folder",
              key: "yuanshen",
              icon: "UnorderedListOutlined",
              label: "原神"
            },
            component: BlankLayout,
            children: [
              {
                path: "yuanshenHeroList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenHeroList",
                  label: "角色列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/yuanshen/heroList.vue")
              },
              {
                path: "yuanshenWeaponList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenWeaponList",
                  label: "武器列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/yuanshen/weaponList.vue")
              },
              {
                path: "yuanshenRelicsList",
                meta: {
                  menuType: "menu",
                  key: "yuanshenRelicsList",
                  label: "圣遗物列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/yuanshen/relicsList.vue")
              }
            ]
          },
          {
            path: "yinyangshi",
            meta: {
              menuType: "folder",
              key: "yinyangshi",
              icon: "UnorderedListOutlined",
              label: "阴阳师"
            },
            component: BlankLayout,
            children: [
              {
                path: "yinyangshiHeroList",
                meta: {
                  menuType: "menu",
                  key: "yinyangshiHeroList",
                  label: "式神列表",
                  icon: "UnorderedListOutlined"
                },
                component: () => import("@/views/game/yinyangshi/heroList.vue")
              }
            ]
          }
        ]
      },
      {
        path: "/xingta",
        meta: {
          menuType: "folder",
          key: "xingta",
          icon: "DeploymentUnitOutlined",
          label: "星塔联盟",
          isLevel: [1]
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
              isLevel: [1]
            },
            component: () => import("@/views/xingta/heroList.vue")
          }
        ]
      },
      {
        path: "/examination",
        meta: {
          menuType: "folder",
          key: "examination",
          icon: "AlertOutlined",
          label: "考试管理"
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
              isLevel: [1]
            },
            component: () => import("@/views/examination/questionList.vue")
          },
          {
            path: "paperList",
            meta: {
              menuType: "menu",
              key: "paperList",
              label: "试卷列表",
              icon: "UnorderedListOutlined",
              isLevel: [1]
            },
            component: () => import("@/views/examination/paperList.vue")
          },
          {
            path: "userList",
            meta: {
              menuType: "menu",
              key: "userList",
              label: "用户列表",
              icon: "UnorderedListOutlined",
              isLevel: [1]
            },
            component: () => import("@/views/examination/userList.vue")
          },
          {
            path: "reportList",
            meta: {
              menuType: "menu",
              key: "reportList",
              label: "答卷列表",
              icon: "UnorderedListOutlined",
              isLevel: [1]
            },
            component: () => import("@/views/examination/reportList.vue")
          },
          {
            path: "myReport",
            meta: {
              menuType: "menu",
              key: "myReport",
              label: "我的试卷",
              icon: "UnorderedListOutlined"
            },
            component: () => import("@/views/examination/myReport.vue")
          },
        ]
      },
      {
        path: "myLove",
        meta: {
          menuType: "folder",
          key: "myLove",
          icon: "VideoCameraAddOutlined",
          label: "爱的见证",
          isLevel: [1, 3]
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
              isLevel: [1, 3]
            },
            component: () => import("@/views/myLove/photo.vue")
          },
          {
            path: "worldMap",
            meta: {
              menuType: "menu",
              key: "worldMap",
              label: "世界地图",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3]
            },
            component: () => import("@/views/myLove/worldMap.vue")
          },
          {
            path: "cookList",
            meta: {
              menuType: "menu",
              key: "cookList",
              label: "菜谱列表",
              icon: "UnorderedListOutlined",
              isLevel: [1, 3]
            },
            component: () => import("@/views/myLove/cookList.vue")
          },
        ]
      }
    ]
  }
]

export default newRouterDate
