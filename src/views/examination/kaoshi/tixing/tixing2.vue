<!-- 判断题 -->
<template>
    <div class="type">判断题</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <img class="img" v-if="imgFlag" :src="url" />
        <video v-if="videoFlag" class="video" controls>
            <source :src="url" type="video/mp4" />
        </video>
        <div>
            <a-radio-group v-model:value="prop.obj.anwser">
                <div class="radioDiv" v-for="index in 2">
                    <a-radio :key="index - 1" :value="index - 1">{{ TFlist[index - 1] }}</a-radio>
                </div>
            </a-radio-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { test2 } from './tixing'
import { networkConfig } from '@/utils/networkConfig'

const TFlist = ref<Array<string>>(["正确", "错误"])
const prop = defineProps<{
    obj: test2
}>()
const url = ref<string>("")
const imgFlag = ref<boolean>(false)
const videoFlag = ref<boolean>(false)
const imgSuffixList = ref<string[]>([".jpg", ".png", ".gif", ".jpeg", ".bmp"])
const videoSuffixList = ref<string[]>([".mp4", ".mp3", ".m4a"])

onMounted(() => {
    if (prop.obj.url) {
        let str = prop.obj.url
        const index = str.lastIndexOf('.')
        const suffix = str.substring(index, str.length)
        if (imgSuffixList.value.includes(suffix)) {
            imgFlag.value = true
            videoFlag.value = false
            url.value = networkConfig.serverUrl + 'video/' + prop.obj.url
        } else if (videoSuffixList.value.includes(suffix)) {
            imgFlag.value = false
            videoFlag.value = true
            url.value = networkConfig.serverUrl + 'video/' + prop.obj.url
        }
    } else {
        imgFlag.value = false
        videoFlag.value = false
        url.value = ""
    }
})

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