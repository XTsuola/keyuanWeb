<template>
    <a-layout-sider width="200" v-if="flag">
        <menuList></menuList>
    </a-layout-sider>
    <a-drawer class="siderDrawer" placement="left" width="200" :closable="false" :visible="visible"
        @close="visible = false">
        <menuList></menuList>
    </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import menuList from "../layout/menuList.vue";

const visible = ref<boolean>(false);
const flag = ref<boolean>(true);
const mql = window.matchMedia("(max-width: 768px)");

function mediaMatchs() {
    if (mql.matches) {
        flag.value = false;
        visible.value = true;
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

defineExpose({
    showMenu
})

</script>

<style lang="less" scoped>
aside {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
}

.closeMenu {
    position: absolute;
    top: 50%;
    right: 0;
    cursor: pointer;
    display: none;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background-color: #f3f3f3;
}

::-webkit-scrollbar-thumb {
    background-color: #aaa;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
}

::-webkit-scrollbar-thumb:active {
    background-color: #aaa;
}
</style>