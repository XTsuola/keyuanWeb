<template>
    <a-layout-sider width="200" class="sider" v-if="flag">
        <menuList></menuList>
    </a-layout-sider>
    <a-drawer class="siderDrawer" placement="left" width="200" :closable="false" :visible="visible"
        @close="visible = false">
        <menuList></menuList>
    </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import menuList from "../layout/menuList.vue"

const visible = ref<boolean>(false)
const flag = ref<boolean>(true)
const mql = window.matchMedia("(max-width: 768px)")

function mediaMatchs() {
    if (mql.matches) {
        flag.value = false
        visible.value = true
    } else {
        flag.value = true
        visible.value = false
    }
}
mediaMatchs()
mql.addEventListener("change", mediaMatchs)

function showMenu() {
    visible.value = true
}

defineExpose({
    showMenu
})

</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
    .sider {
        background: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(125, 188, 162, 0.2);
        height: 100%;
        position: absolute;
        background: #000;
        z-index: 888;
    }
}

.closeMenu {
    position: absolute;
    top: 50%;
    right: 0;
    cursor: pointer;
    display: none;
}
</style>