<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import simangdiguo from "./simangdiguo.json";
import chanyigu from "./chanyigu.json";
import tiantanggang from "./tiantanggang.json";
import manshikuangye from "./manshikuangye.json";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "四芒帝国",
    value: 1,
    data: simangdiguo
}, {
    name: "禅意谷",
    value: 2,
    data: chanyigu
}, {
    name: "天堂港",
    value: 3,
    data: tiantanggang
}, {
    name: "蛮石旷野",
    value: 4,
    data: manshikuangye
}]

</script>

<style lang="less" scoped></style>