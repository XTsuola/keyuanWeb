<!-- 问答题 -->
<template>
    <div class="type">问答题</div>
    <div class="main">
        <div class="title">{{ prop.obj.index }}、{{ prop.obj.stem }}</div>
        <img class="img" v-if="imgFlag" :src="url" />
        <video v-if="videoFlag" class="video" controls>
            <source :src="url" type="video/mp4" />
        </video>
        <a-input v-model:value="prop.obj.anwser" type="text" placeholder="" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Input as aInput } from 'ant-design-vue';
import type { test4 } from './tixing'
import { networkConfig } from '@/utils/networkConfig'

const prop = defineProps<{
    obj: test4
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
}

.video {
    width: 60vw;
    height: 45vw;
    margin-bottom: 20px;
}
</style>