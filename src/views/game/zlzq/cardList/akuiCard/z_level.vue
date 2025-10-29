<template>
    <div>
        <CardLevel :cardData="data"></CardLevel>
    </div>
</template>

<script lang="ts" setup>
import simangdiguo from "./simangdiguo.json";
import tiantanggang from "./tiantanggang.json";
import manshikuangye from "./manshikuangye.json";
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
    name: "蛮石旷野",
    value: 4,
    data: manshikuangye
}, {
    name: "隐秘者",
    value: 7,
    data: yinmizhe
}]

</script>

<style lang="less" scoped></style>