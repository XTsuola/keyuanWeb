<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import simangdiguo from "./simangdiguo.json";
import tiantanggang from "./tiantanggang.json";
import lianyushenyuan from "./lianyushenyuan.json";
import yinmizhe from "./yinmizhe.json";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "四芒帝国",
    value: 1,
    data: simangdiguo
}, {
    name: "天堂港",
    value: 3,
    data: tiantanggang
}, {
    name: "炼狱深渊",
    value: 5,
    data: lianyushenyuan
}, {
    name: "隐秘者",
    value: 7,
    data: yinmizhe
}]

</script>

<style lang="less" scoped></style>