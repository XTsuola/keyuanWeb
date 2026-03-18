<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import { simangdiguo, chanyigu, tiantanggang } from "./card";
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
}];

</script>

<style lang="less" scoped></style>