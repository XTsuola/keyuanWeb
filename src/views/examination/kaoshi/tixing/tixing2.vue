<!-- 判断题 -->
<template>
    <div class="type">判断题（分值：{{ prop.obj.score }}）</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <img class="img" v-if="imgFlag" :src="url" />·
        <video v-if="videoFlag" class="video" controls>
            <source :src="url" type="video/mp4" />
        </video>
        <div>
            <a-radio-group v-model:value="prop.obj.answer">
                <div class="radioDiv" v-for="index in 2" :key="index">
                    <a-radio :key="index - 1" :value="getAnwser(index - 1)">{{ TFlist[index - 1] }}</a-radio>
                </div>
            </a-radio-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { test2 } from "./tixing";

const TFlist = ref<Array<string>>(["正确", "错误"]);
const prop = defineProps<{
    obj: test2
}>()

function getAnwser(value: number) {
    return value.toString();
}

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
        padding: 10px 5px;
    }
}

.video {
    width: 60vw;
    height: 45vw;
    margin-bottom: 20px;
}
</style>