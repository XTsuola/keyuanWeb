<template>
    <div>我是主页面
        <div id="tabAside"></div>
    </div>
    <a-button @click="tabCard(1)">点击1</a-button>
    <a-button @click="tabCard(2)">点击2</a-button>
    <a-button @click="tabCard(3)">点击3</a-button>
    <div>分割线</div>
    <component :is="pageSelect"></component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import tab1 from "./modal/tab1.vue"
import tab2 from "./modal/tab2.vue"
import tab3 from "./modal/tab3.vue"

const currentPage = ref(0)
const pageSelect = computed(() => {
    return [null, tab1, tab2, tab3][currentPage.value]
})

function tabCard(index: number) {
    currentPage.value = index
}

</script>

<style lang="less" scoped>

</style>