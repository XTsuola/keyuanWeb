<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[2, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["洞悉之眼1", "洞悉之眼2", "学仆-观测型1", "学仆-观测型2", "长耳庄巧姑1", "长耳庄巧姑2", "树木之怒", "沉重否定", "飓风术", "连击",
    "全数否定", "铁山靠", "风铃道人", "隐形术", "破魔系教授", "克隆术1", "克隆术2", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3",
    "幻域秘树", "御风武者", "墨轩隐士", "蟠桃会", "萌化术1", "萌化术2", "观星台大预言家", "万物之灵", "九天玄女·轩", "上宝沁金耙"])

</script>

<style lang="less" scoped></style>