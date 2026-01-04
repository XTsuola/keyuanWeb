<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import chanyigu from "./chanyigu.json";
import tiantanggang from "./tiantanggang.json";
import dongshenshitu from "./dongshenshitu.json";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "禅意谷",
    value: 2,
    data: chanyigu
}, {
    name: "天堂港",
    value: 3,
    data: tiantanggang
}, {
    name: "冬神使徒",
    value: 6,
    data: dongshenshitu
}]

</script>

<style lang="less" scoped></style>