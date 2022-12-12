<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
        :style="{ height: '100%', borderRight: 0 }">
        <MenuItem v-for="item in BaseRoute?.children" :menu="item">
        </MenuItem>
    </a-menu>
</template>

<script lang="ts" setup>
import { provide, reactive, ref } from 'vue';
import MenuItem from './menuItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu as aMenu } from 'ant-design-vue'

export interface CloseMenu {
    closeNow: (obj: any) => void;
}

const router = useRouter()
const route = useRoute()
const BaseRoute = router.getRoutes().find(e => e.path === "/")
const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const routerKey = router.getRoutes().find(e => e.path === route.path)

function updateMenu(arr: string[]) {
    if (!arr[0]) {
        arr.shift()
        arr.pop()
        openKeys.value = arr
    } else {
        arr.pop()
        openKeys.value = arr
    }
}

if (routerKey && routerKey.meta && routerKey.meta.key) {
    selectedKeys.value.push(routerKey.meta.key)
    const arr = route.path.split('/')
    updateMenu(arr)
}

const closeMenu = reactive<CloseMenu>({
    closeNow(obj) {
        const arr = obj.path.split('/')
        updateMenu(arr)
    }
})

provide<CloseMenu>("closeMenu", closeMenu)


</script>