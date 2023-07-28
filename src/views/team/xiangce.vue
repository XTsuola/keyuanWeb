<template>
    <div class="main">
        暂无数据
    </div>
    <div v-color-bg>我是初见</div>
    <div v-show="false" v-color-bg="color"></div>
    <div v-color-bg>我是初见2</div>
</template>

<script lang="ts" setup>
import { ref, type Directive, onMounted, onBeforeMount } from 'vue';

const color = ref("red")
localStorage.setItem("userFlag", "1")

const vColorBg: Directive = (el?, bind?) => {
    el.style.background = color.value
    if (localStorage.getItem("userFlag") as any == 1) {
        el.style.background = "pink"
    }
}

</script>

<style lang="less" scoped>
.main {
    padding: 20px;
}

.color {
    background-color: v-bind(color);
}
</style>