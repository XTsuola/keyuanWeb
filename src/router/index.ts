import { createRouter, createWebHashHistory } from "vue-router";
import routerDate from "./routerDate";
import Login from "../views/login/login.vue";

const routeList = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/room",
    name: "room",
    component: () => import("@/views/examination/room.vue"),
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/views/examination/result.vue"),
  },
  {
    path: "/imgDetail",
    name: "imgDetail",
    component: () => import("@/views/myLove/imgDetail.vue"),
  },
  {
    path: "/photos/filmSpace",
    name: "filmSpace",
    component: () => import("@/views/myLove/wedding/photos/filmSpace.vue"),
  },
  {
    path: "/photos/parkExterior",
    name: "parkExterior",
    component: () => import("@/views/myLove/wedding/photos/parkExterior.vue"),
  },
  {
    path: "/photos/chineseStyle",
    name: "chineseStyle",
    component: () => import("@/views/myLove/wedding/photos/chineseStyle.vue"),
  },
  {
    path: "/photos/hanayome",
    name: "hanayome",
    component: () => import("@/views/myLove/wedding/photos/hanayome.vue"),
  },
  {
    path: "/shiyan",
    name: "shiyan",
    component: () => import("@/views/myLove/wedding/shiyanPage.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routeList.concat(routerDate as any),
});

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token");
  if (to.fullPath === "/") {
    if (token) {
      next({
        path: "/team/memberList",
      });
    } else {
      next({
        path: "/login",
      });
    }
  } else if (to.fullPath === "/login") {
    if (token) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (token) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});

export default router;
