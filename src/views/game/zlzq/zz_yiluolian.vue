<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[1, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["圣殿斥候1", "圣殿斥候2", "学仆-观测型1", "学仆-观测型2", "沉重否定", "圣殿弩手", "增援战线", "全数否定", "光明惩戒", "四芒军旗",
    "隐形术", "圣殿御卫", "破魔系教授", "克隆术", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "冲锋装备", "夺取阵地", "观星台大预言家",
    "惩戒天使", "米拉方舟", "花光春影·安娜贝尔", "百花长枪·卡洛琳", "流星-7号", "明日香·露娜", "月之神·米拉", "永恒之王·莱哈特", "白袍·伊恩", "武圣·云长"])

</script>

<style lang="less" scoped></style>