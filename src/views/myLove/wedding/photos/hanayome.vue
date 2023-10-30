<template>
    <div class="filmSpace">
        <div class="header">欢喜花嫁<img src="@/assets/images/love/wedding/icon/goBack.png" @click="goBack()"></div>
        <div class="content">
            <img style="width: 100vw;" v-for="i in imglist" :src="i" @click="go(i)" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imglist: any = ref([])
const baseUrl = "https://suola-1300285550.cos.ap-nanjing.myqcloud.com/wedding/twoList/"

let list: string[] = []
for (let i = 1; i <= 23; i++) {
    const str = baseUrl + i + ".jpg"
    list.push(str)
}

for (let i = 0; i < list.length; i++) {
    const url = new URL(list[i], import.meta.url)
    imglist.value.push(url)
}

function go(obj: any) {
    const url: string = obj.href
    window.open(url)
}

function goBack() {
    history.back()
}

</script>
    
<style lang="less" scoped>
.filmSpace {
    .header {
        font-size: 80px;
        text-shadow: 0px 3px 0px #fff, 0px -3px 0px #9da181, 3px 0px 0px #fff, -3px 0px 0px #9da181;
        text-align: center;
        img {
            position: absolute;
            right: 10px;
            top: 30px
        }
    }
}
</style>