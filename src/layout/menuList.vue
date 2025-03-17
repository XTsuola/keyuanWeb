<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" theme="light"
        :style="{ height: '100%', borderRight: 0 }">
        <MenuItem v-for="item in BaseRoute?.children" :menu="item">
        </MenuItem>
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
const routerKey = router.getRoutes().find(e => e.path === route.path);

function updateMenu(arr: string[]) {
    if (!arr[0]) {
        arr.shift();
        arr.pop();
        openKeys.value = arr;
    } else {
        arr.pop();
        openKeys.value = arr;
    }
}

function updatePath(routerObj: any) {
    selectedKeys.value = [];
    if (routerObj && routerObj.meta && routerObj.meta.key) {
        selectedKeys.value.push(routerObj.meta.key);
        const arr = route.path.split("/");
        updateMenu(arr);
    }
}
updatePath(routerKey);

watch(route, (val) => {
    updatePath(val);
})

</script>

<style lang="less" scoped>
:deep(.ant-menu-submenu-title) {
    background: #fff;
}

:deep(.ant-menu-inline) {
    background-color: #fff;
}
</style>