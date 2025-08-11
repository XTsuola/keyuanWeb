<template>
    <a-sub-menu :key="menu.meta.key" v-if="menu.meta?.menuType === 'folder' && getShow(menu.meta)">
        <template #icon>
            <component v-if="menu.meta && menu.meta.icon" :is="getMenuIcon(menu.meta.icon)"></component>
        </template>
        <template #title>{{ menu.meta?.label }}</template>
        <menuItem v-for="item in menu.children" :menu="item">
        </menuItem>
    </a-sub-menu>
    <a-menu-item :key="menu.meta.key" @click="goView" v-if="menu.meta?.menuType === 'menu' && getShow(menu.meta)">
        <template #icon>
            <component v-if="menu.meta && menu.meta.icon" :is="getMenuIcon(menu.meta.icon)"></component>
        </template>
        {{ menu.meta?.label }}
    </a-menu-item>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, type RouteMeta, type RouteRecordRaw } from "vue-router";
import * as icon from "@ant-design/icons-vue";

interface Prop {
    menu: RouteRecordRaw
}
const router = useRouter();
const prop = defineProps<Prop>();
const userId = ref<number>();
const userInfo = window.sessionStorage.getItem("userInfo");
if (userInfo && JSON.parse(userInfo).userId) {
    userId.value = JSON.parse(userInfo).userId;
}

function getShow(meta: RouteMeta) {
    return (meta as any).isLevel && userId.value ? (meta as any).isLevel.includes(userId.value) : true;
}

function goView() {
    let path = router.getRoutes().find(e => e.path.split("/").pop() === prop.menu.path);
    if (!path) {
        path = router.getRoutes().find(e => e.path === prop.menu.path);
    } else {
        router.push({
            path: path.path
        });
    }
}

function getMenuIcon(menuIcon: string) {
    type MenuIconType = keyof typeof icon;
    return icon[menuIcon as MenuIconType];
}

</script>