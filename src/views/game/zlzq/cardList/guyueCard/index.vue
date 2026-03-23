<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import { simangdiguo, chanyigu, dongshenshitu, yinmizhe } from "./card";
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
    name: "冬神使徒",
    value: 6,
    data: dongshenshitu
}, {
    name: "隐秘者",
    value: 7,
    data: yinmizhe
}]

</script>

<style lang="less" scoped></style>