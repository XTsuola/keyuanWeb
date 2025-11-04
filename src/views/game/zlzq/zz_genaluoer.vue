<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[3, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["洞悉之眼1", "洞悉之眼2", "心灵黑洞1", "心灵黑洞2", "暗潮涌动", "学仆-观测型1", "学仆-观测型2", "沉重否定", "黑夜突袭", "狡诈学徒1",
    "全数否定", "热血矿工", "不法交易", "隐形术", "破魔系教授", "红海猎魔人", "克隆术1", "克隆术2", "海神赐福1", "海神赐福2",
    "走私狂徒", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "幻域秘树", "观星台大预言家", "米拉方舟", "流星-7号", "樱花·艾希尔", "月之神·米拉"])

</script>

<style lang="less" scoped></style>