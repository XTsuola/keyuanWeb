<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[2, 7]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["学仆-观测型", "树木之怒", "沉重否定", "长耳庄巧姑", "锁妖塔守卫", "飓风术", "连击", "全数否定", "铁山靠", "虚化术",
    "风铃道人", "隐形术", "破魔系教授", "蟠桃隐士", "克隆术1", "克隆术2", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "驱魔道人",
    "幻域秘树", "御风武者", "墨轩隐士", "蟠桃会", "观星台大预言家", "万物之灵", "米拉方舟", "九天玄女·轩", "上宝沁金耙", "月之神·米拉"])

</script>

<style lang="less" scoped></style>