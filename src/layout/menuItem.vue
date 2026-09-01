<template>
    <a-sub-menu :key="menu.meta.key" v-if="menu.meta?.menuType === 'folder' && getShow(menu.meta)">
        <template #icon>
            <component v-if="menu.meta && menu.meta.icon" :is="getMenuIcon(menu.meta.icon)">
            </component>
        </template>
        <template #title>{{ menu.meta?.label }}</template>
        <menuItem v-for="item in menu.children" :key="String(item.meta?.key || item.path)" :menu="item">
        </menuItem>
    </a-sub-menu>
    <a-menu-item :key="menu.meta.key" @click="goView" v-if="menu.meta?.menuType === 'menu' && getShow(menu.meta)">
        <template #icon>
            <component v-if="menu.meta && menu.meta.icon" :is="getMenuIcon(menu.meta.icon)">
            </component>
        </template>
        {{ menu.meta?.label }}
    </a-menu-item>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import { useRouter, type RouteMeta, type RouteRecordRaw } from "vue-router";
import * as icon from "@ant-design/icons-vue";

interface Prop {
    menu: RouteRecordRaw
}

const router = useRouter();
const prop = defineProps<Prop>();
const userLevel = (() => {
    try {
        const info = JSON.parse(sessionStorage.getItem("userInfo") || "null");
        return info?.level as number | undefined;
    } catch {
        return undefined;
    }
})();

function getShow(meta: RouteMeta) {
    const level = (meta as any).isLevel;
    return level ? level.includes(userLevel) : true;
}

function goView() {
    const routes = router.getRoutes();
    const target = routes.find(e => e.path.split("/").pop() === prop.menu.path) || routes.find(e => e.path === prop.menu.path);
    if (target) router.push({ path: target.path });
}

function getMenuIcon(menuIcon: unknown): Component | undefined {
    if (!menuIcon || typeof menuIcon !== "string") return undefined;
    return (icon as Record<string, Component>)[menuIcon];
}
</script>
