<template>
    <div class="main">
        暂无数据
    </div>
    <div v-hash>我是初见</div>
    <div v-show="false" v-color-bg="color"></div>
    <div v-color-bg>我是初见2</div>
    <div @click="change2()">{{ name2 }}</div>
    <xiangcePage>
        <span>轰轰火花</span>
        <template v-slot:slotHeader>头部</template>
        <template v-slot:slotBottom>尾部</template>
    </xiangcePage>
    <div>————————————————————————————————分割线———————————————————————————————————</div>
    <div class="box">
        <div class="horse">

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, provide } from "vue";
import xiangcePage from "./modal/xiangcePage.vue";

const color = ref("red");
localStorage.setItem("userFlag", "1");
const name = ref<string>("杰尼龟");
const name2 = ref("我是小智");

function vColorBg(el?: any, bind?: any) {
    el.style.background = color.value;
    if (localStorage.getItem("userFlag") as any == 1) {
        el.style.background = "pink";
    }
}

provide("name", name);

function change2() {
    name2.value = "111";
}

</script>

<style lang="less" scoped>
.main {
    padding: 20px;
}

.color {
    background-color: v-bind(color);
}

.box {
    position: relative;
    width: 100px;
    height: 40px;
    overflow: hidden;
    transform: scale(3) translate(50px, 50px);

    .horse {
        position: absolute;
        transform: translate(-10px, -10px);
        width: 2400px;
        height: 100px;
        background-image: url("@/assets/images/horse.png");
        animation: run 1s steps(12, end) infinite;
    }
}

@keyframes run {
    0% {
        left: 0;
    }

    100% {
        left: -2400px;
    }
}
</style>