<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[2, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["学仆-观测型1", "学仆-观测型2", "沉重否定", "树木之怒", "飓风术", "锁妖塔守卫", "长耳庄巧姑", "执剑道者", "连击1", "全数否定",
    "铁山靠", "风铃道人", "隐形术", "破魔系教授1", "克隆术", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "逍遥琴师", "扫叶僧",
    "驱魔道人", "学仆-塑钢型", "御风武者", "幻域秘树", "墨轩隐士", "观星台大预言家", "米拉方舟", "九天玄女·轩", "上宝沁金耙", "月之神·米拉"])

</script>

<style lang="less" scoped></style>