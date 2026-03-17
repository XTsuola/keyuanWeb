<template>
    <CardLevel :cardData="data"></CardLevel>
</template>

<script lang="ts" setup>
import { simangdiguo } from "./card";
import CardLevel from "@/components/cardLevel.vue";

const data = [{
    name: "四芒帝国",
    value: 1,
    data: simangdiguo
}]

</script>

<style lang="less" scoped></style>