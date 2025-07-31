<!-- 问答题 -->
<template>
    <div class="type">问答题（分值：{{ prop.obj.score }}）</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <a-input v-model:value="prop.obj.answer" type="text" placeholder="" />
    </div>
</template>

<script lang="ts" setup>
import type { Test2 } from "./tixing";

const prop = defineProps<{
    obj: Test2
}>();

</script>

<style lang="less" scoped>
.type {
    color: darkgreen;
}

.main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div {
        width: 100%;
    }

    .title {
        display: flex;
        justify-content: flex-start;
    }
}
</style>