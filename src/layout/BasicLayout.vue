<template>
    <div class="BasicLayout">
        <sidebarVue ref="sider" />
        <mainVue style="width: 100%;" @showMenu="showMenu" />
    </div>
</template>
<script setup lang="ts">
import sidebarVue from './Sidebar.vue'
import mainVue from './Main.vue'
import { ref } from 'vue';

const sider = ref()

function showMenu() {
    sider.value.showMenu()
}

</script>
<style lang="less" scoped>
.BasicLayout {
    flex: 1;
    display: flex;
    height: 100%;
}
</style>