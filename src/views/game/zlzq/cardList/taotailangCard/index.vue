<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import { chanyigu, manshikuangye, yinmizhe } from "./card";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "禅意谷",
    value: 2,
    data: chanyigu
}, {
    name: "蛮石旷野",
    value: 4,
    data: manshikuangye
}, {
    name: "隐秘者",
    value: 7,
    data: yinmizhe
}];

</script>

<style lang="less" scoped></style>