<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
        :style="{ height: '100%', borderRight: 0 }">
        <MenuItem v-for="item in BaseRoute?.children" :menu="item">
        </MenuItem>
    </a-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuItem from './menuItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu as aMenu } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const BaseRoute = router.getRoutes().find(e => e.path === "/")
const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const routerKey = router.getRoutes().find(e => e.path === route.path)
if (routerKey && routerKey.meta && routerKey.meta.key) {
    selectedKeys.value.push(routerKey.meta.key)
    const arr = route.path.split('/')
    if (!arr[0]) {
        arr.shift()
        arr.pop()
        openKeys.value = arr
    } else {
        arr.pop()
        openKeys.value = arr
    }
}

</script>