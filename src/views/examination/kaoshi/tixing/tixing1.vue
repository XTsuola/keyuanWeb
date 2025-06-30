<!-- 选择题 -->
<template>
    <div class="type">选择题（分值：{{ prop.obj.score }}）</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}：()</div>
        <div>
            <a-radio-group v-model:value="prop.obj.answer">
                <div class="radioDiv">
                    <a-radio :key="1" value="1">A: {{ prop.obj.a }}</a-radio>
                    <a-radio :key="2" value="2">B: {{ prop.obj.b }}</a-radio>
                    <a-radio :key="3" value="3">C: {{ prop.obj.c }}</a-radio>
                    <a-radio :key="4" value="4">D: {{ prop.obj.d }}</a-radio>
                </div>
            </a-radio-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { test1 } from './tixing';

defineEmits(["update:obj"]);

const prop = defineProps<{
    obj: test1
}>()

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

    .radioDiv {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        row-gap: 20px;
        padding: 10px 5px;
    }
}

.video {
    width: 60vw;
    height: 45vw;
    margin-bottom: 20px;
}
</style>