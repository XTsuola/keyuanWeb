<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[1, 2]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["圣殿斥候1", "圣殿斥候2", "树木之怒", "飓风术", "锁妖塔守卫", "长耳庄巧姑", "圣殿弩手", "增援战线", "连击1", "执剑道者",
    "风铃道人", "光明惩戒1", "四芒军旗", "圣殿御卫", "逍遥琴师", "冲锋装备", "扫叶僧", "御风武者", "夺取阵地", "墨轩隐士",
    "禁卫指挥官", "惩戒天使", "花光春影·安娜贝尔", "百花长枪·卡洛琳", "明日香·露娜", "九天玄女·轩", "上宝沁金耙", "永恒之王·莱哈特", "白袍·伊恩", "武圣·云长"])

</script>

<style lang="less" scoped></style>