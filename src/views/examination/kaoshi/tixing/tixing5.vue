<!-- 消灭星星 -->
<template>
    <div class="type">消灭星星（分值：{{ prop.obj.score }}）</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <div v-for="item in arr" :key="item">
            <div v-if="item" class="star" ref="item" @click="mie(item)"
                :style="{ 'left': Math.floor((Math.random() * 100) + 2) + 'px', 'top': Math.floor((Math.random() * 100) + 2) + 'px' }">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { test5 } from "./tixing";

defineEmits(["update:obj"]);

const prop = defineProps<{
    obj: test5
}>();
const arr = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let flag = false;
let count = 0;
let timer: any = null;

function mie(item: number) {
    if (arr.value.filter(e => e === 0).length === 0) {
        flag = true;
    }
    arr.value[item - 1] = 0;
    if (flag) {
        timer = setInterval(() => {
            count++;
        }, 10)
        flag = false;
    }
    if (arr.value.filter(e => e === 0).length === 10 && timer) {
        clearInterval(timer);
        let time = (count / 100).toFixed(2);
        prop.obj.answer = time;
    }
}

</script>

<style lang="less" scoped>
.type {
    color: darkgreen;
}

.main {
    position: relative;

    .star {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: orange;
        border-radius: 50%;
    }
}
</style>