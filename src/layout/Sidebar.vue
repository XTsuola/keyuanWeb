<template>
    <a-layout-sider class="sidebar-sider" width="200" v-if="flag">
        <menuList />
    </a-layout-sider>
    <a-drawer class="siderDrawer" placement="left" width="200" :closable="false" :visible="visible"
        @close="visible = false">
        <menuList />
    </a-drawer>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import menuList from "./menuList.vue";

const visible = ref(false);
const flag = ref(true);
const mql = window.matchMedia("(max-width: 768px)");

function mediaMatchs() {
    if (mql.matches) {
        flag.value = false;
        visible.value = false;
    } else {
        flag.value = true;
        visible.value = false;
    }
}

mediaMatchs();
mql.addEventListener("change", mediaMatchs);

function showMenu() {
    visible.value = true;
}

onBeforeUnmount(() => {
    mql.removeEventListener("change", mediaMatchs);
});

defineExpose({
    showMenu
});
</script>

<style lang="less" scoped>
.sidebar-sider {
    height: 100%;
    min-height: 0;
    overflow: hidden;
    background-color: #fff;
}

:deep(.ant-layout-sider-children) {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f3f3f3;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #aaa;

        &:hover,
        &:active {
            background-color: #aaa;
        }
    }
}
</style>
