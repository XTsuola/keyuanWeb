<template>
    <div>
        <MyCardList :myData="myData" :zhongzu="[1, 2]" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyCardList from "./modal/myCardList.vue";

const myData = ref(["圣殿斥候1", "圣殿斥候2", "长耳庄巧姑", "树木之怒", "飓风术", "圣殿弩手", "增援战线", "连击", "田园守望者", "铁山靠",
    "风铃道人", "光明惩戒1", "光明惩戒2", "四芒军旗", "圣殿御卫", "蟠桃隐士", "驱魔道人", "御风武者", "夺取阵地", "墨轩隐士",
    "蟠桃会", "萌化术", "万物之灵", "惩戒天使", "花光春影·安娜贝尔", "百花长枪·卡洛琳", "九天玄女·轩", "明日香·露娜", "上宝沁金耙", "白袍·伊恩"])

</script>

<style lang="less" scoped></style>