<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[2, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./z_heroLevel.vue";

const myData = ref(["洞悉之眼", "学仆-观测型1", "学仆-观测型2", "长耳庄巧姑", "沉重否定", "飓风术1", "飓风术1", "连击", "全数否定", "铁山靠",
    "风铃道人", "风卷残云1", "风卷残云1", "破魔系教授", "克隆术1", "克隆术2", "学仆-脉冲型1", "学仆-脉冲型2", "驱魔道人", "学仆-脉冲型3",
    "幻域秘树", "御风武者", "墨轩隐士", "蟠桃会", "观星台大预言家", "万物之灵", "流星-7号", "九天玄女·轩", "上宝沁金耙", "月之神·米拉"])

</script>

<style lang="less" scoped></style>