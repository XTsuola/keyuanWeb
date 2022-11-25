<!-- 消灭星星 -->
<template>
    <div class="type">消灭星星</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <div v-for="item in arr">
            <div v-if="item" class="star" ref="item" @click="mie(item)"
                :style="{ 'left': Math.floor((Math.random() * 100) + 2) + 'px', 'top': Math.floor((Math.random() * 100) + 2) + 'px' }">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { test5 } from './tixing'

defineEmits(["update:obj"])

const prop = defineProps<{
    obj: test5
}>()
const arr = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
let flag = false
let count = 0
let timer: number | null = null

function mie(item: number) {
    arr.value[item - 1] = 0
    if (arr.value.length === 10) {
        flag = true
    }
    if (flag) {
        timer = setInterval(() => {
            count++
        }, 1)
        flag = false
    }
    if (arr.value.filter(e => e === 0).length === 10 && timer) {
        clearInterval(timer)
        let time = (count / 1000).toFixed(2)
        prop.obj.anwser = time
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