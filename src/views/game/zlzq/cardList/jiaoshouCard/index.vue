<template>
    <CardLevel :cardData="data"></CardLevel>
</template>

<script lang="ts" setup>
import { simangdiguo, yinmizhe } from "./card";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "四芒帝国",
    value: 1,
    data: simangdiguo
}, {
    name: "隐秘者",
    value: 7,
    data: yinmizhe
}]

</script>

<style lang="less" scoped></style>