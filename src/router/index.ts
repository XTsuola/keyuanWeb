import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import routerDate from "./routerDate";
import Login from "../views/login/login.vue";

const routeList: RouteRecordRaw[] = [
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
  routes: [...routeList, ...routerDate],
});

router.beforeEach((to) => {
  const token = sessionStorage.getItem("token");
  if (to.fullPath === "/") {
    return token ? { path: "/team/memberList" } : { path: "/login" };
  }
  if (to.fullPath === "/login") {
    return token ? { path: "/" } : true;
  }
  if (!token) {
    return { path: "/login" };
  }
});

export default router;
