<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" theme="light"
        class="side-menu">
        <MenuItem v-for="item in BaseRoute?.children" :key="item.meta?.key || item.path" :menu="item" />
    </a-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./menuItem.vue";

const router = useRouter();
const route = useRoute();
const BaseRoute = router.getRoutes().find(e => e.path === "/");
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

function updateMenu(path: string) {
    const segments = path.split("/").filter(Boolean);
    segments.pop();
    openKeys.value = segments;
}

function updatePath(routerObj: any) {
    selectedKeys.value = [];
    if (routerObj?.meta?.key) {
        selectedKeys.value.push(routerObj.meta.key);
        updateMenu(route.path);
    }
}

updatePath(router.getRoutes().find(e => e.path === route.path));

watch(route, (val) => {
    updatePath(val);
});
</script>

<style lang="less" scoped>
.side-menu {
    min-height: 100%;
    border-right: 0;
}

:deep(.ant-menu-submenu-title),
:deep(.ant-menu-inline) {
    background: #fff;
}
</style>
