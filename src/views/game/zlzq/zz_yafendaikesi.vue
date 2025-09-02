<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[1, 3]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["圣殿斥候1", "圣殿斥候2", "心灵黑洞1", "心灵黑洞2", "心灵黑洞3", "暗潮涌动", "黑夜突袭", "狡诈学徒", "圣殿弩手", "增援战线",
    "不法交易", "热血矿工", "酗酒醉汉", "光明惩戒", "四芒军旗", "圣殿御卫", "海燕精卫", "红海猎魔人", "黑水伏击", "夺取阵地",
    "黑金诈术师", "惩戒天使", "花光春影·安娜贝尔", "沙滩派对·鲍莉", "百花长枪·卡洛琳", "明日香·露娜", "樱花·艾希尔", "永恒之王·莱哈特", "白袍·伊恩", "武圣·云长"])

</script>

<style lang="less" scoped></style>