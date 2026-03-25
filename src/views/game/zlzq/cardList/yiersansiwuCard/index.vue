<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import { chanyigu, tiantanggang, dongshenshitu } from "./card";
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