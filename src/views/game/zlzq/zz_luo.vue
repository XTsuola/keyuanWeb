<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[2, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["学仆-观测型1", "学仆-观测型2", "沉重否定", "树木之怒", "飓风术", "锁妖塔守卫", "长耳庄巧姑", "执剑道者", "连击", "全数否定",
    "铁山靠", "风铃道人", "隐形术", "破魔系教授", "克隆术", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "逍遥琴师", "驱魔道人",
    "扫叶僧", "御风武者", "幻域秘树", "观星台大预言家", "万物之灵", "米拉方舟", "九天玄女·轩", "上宝沁金耙", "流星-7号", "月之神·米拉"])

</script>

<style lang="less" scoped></style>