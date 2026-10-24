<template>
    <div class="BasicLayout">
        <sidebarVue ref="sider" />
        <mainVue class="main-area" @showMenu="showMenu" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import sidebarVue from "./Sidebar.vue";
import mainVue from "./Main.vue";

const sider = ref<InstanceType<typeof sidebarVue>>();

function showMenu() {
    sider.value?.showMenu();
}
</script>
<style lang="less" scoped>
.BasicLayout {
    flex: 1;
    display: flex;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    background: #f5f6f8;
}

.main-area {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
}
</style>
