<template>
    <div class="main" id="main" v-if="false">
        <h1 class="title">{{title}}</h1>
        <div class="content" v-for="item in imgList">
            <div v-if="okFlag" class="dvContent">
                <img v-show="item.flag" :class="`img${item.index}`" :src="item.url" @click="goImgDetail(item)" />
                <div class="text" v-show="item.flag">{{item.text}}</div>
            </div>
        </div>
        <h1></h1>
        <div @click="nextPage">下一页</div>
    </div>
    <div style="padding: 10px;" v-else>
        暂无数据
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

interface BgType {
    name: string
    url: string
}

interface ImgType {
    index: number
    url: string
    flag: boolean
    text: string
}

const title = ref<string>("")
const imgList = ref<ImgType[]>([])
const flagIndex = ref<number>(0)
const pageIndex = ref<number>(0)
const bgImgList = ref<BgType[]>([])
const dataList = ref<ImgType[][]>([])

const okFlag = ref<boolean>(true)

async function getImg() {
    bgImgList.value = [
        {
            name: "玄武湖之旅",
            url: (await import("@/assets/images/love/bg6.png")).default,
        },
        {
            name: "紫金山之旅",
            url: (await import("@/assets/images/love/bg5.webp")).default,
        }
    ]
    dataList.value = [
        [{
            index: 1,
            url: (await import("@/assets/images/love/p11.jpg")).default,
            flag: false,
            text: "拍姻缘树1"
        }, {
            index: 2,
            url: (await import("@/assets/images/love/p12.jpg")).default,
            flag: false,
            text: "荡舟玄武湖"
        }, {
            index: 3,
            url: (await import("@/assets/images/love/p13.jpg")).default,
            flag: false,
            text: "拍姻缘树2"
        }],
        [{
            index: 1,
            url: (await import("@/assets/images/love/p12.jpg")).default,
            flag: false,
            text: "拍姻缘树1"
        }, {
            index: 2,
            url: (await import("@/assets/images/love/p13.jpg")).default,
            flag: false,
            text: "荡舟玄武湖"
        }, {
            index: 3,
            url: (await import("@/assets/images/love/p11.jpg")).default,
            flag: false,
            text: "拍姻缘树2"
        }]
    ]
    renderImg()
}
getImg()

function renderImg() {
    const main = document.getElementById("main")
    if (main) {
        main.style.background = `url(${bgImgList.value[pageIndex.value].url})`
        title.value = bgImgList.value[pageIndex.value].name
    }
    imgList.value = dataList.value[pageIndex.value]
    showImg()
}

function showImg() {
    imgList.value[flagIndex.value].flag = true
    flagIndex.value++
    setTimeout(() => {
        if (flagIndex.value < imgList.value.length) {
            showImg()
        }
    }, 3000)
}

function goImgDetail(item: ImgType) {
    localStorage.setItem("imgObj", JSON.stringify(item))
    window.open("#/imgDetail", '_blank');
}

function nextPage() {
    pageIndex.value = 1
    flagIndex.value = 0
    okFlag.value = false
    /* setTimeout(() => {
        okFlag.value = true
        renderImg()
    }, 0) */
    nextTick(() => {
        okFlag.value = true
        renderImg()
    })
}

</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-position: center;
    background-size: auto 100%;
    position: relative;
    overflow: hidden;

    .title {
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "楷体";
    }

    .content {
        width: 100%;
        height: 29%;

        .dvContent {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                display: block;
                width: 100%;
                animation: showme 3s forwards;
                font-family: "楷体";
                background: rgba(255, 255, 255, 0.4);
                margin-right: 40px;
                padding: 4px;
            }

            .img1,
            .img2,
            .img3 {
                width: 200px;
                height: auto;
                border: 2px solid gold;
            }

            .img1 {
                animation: donghua1 3s forwards;
            }

            .img2 {
                animation: donghua2 3s forwards;
            }

            .img3 {
                animation: donghua3 3s forwards;
            }
        }
    }


    @keyframes donghua1 {
        0% {
            transform: translate(100px, 200px) scale(0);
        }

        30% {
            transform: translate(100px, 200px) scale(1.3);
        }

        100% {
            transform: translate(0, 0) scale(0.6);
        }
    }

    @keyframes donghua2 {
        0% {
            transform: translate(100px, 0) scale(0);
        }

        30% {
            transform: translate(100px, 0) scale(1.3);
        }

        100% {
            transform: translate(0, 0) scale(0.6);
        }
    }

    @keyframes donghua3 {
        0% {
            transform: translate(100px, -200px) scale(0);
        }

        30% {
            transform: translate(100px, -200px) scale(1.3);
        }

        100% {
            transform: translate(0, 0) scale(0.6);
        }
    }

    @keyframes showme {
        0% {
            transform: translateX(300px);
            opacity: 0;
        }

        100% {
            transform: translateX(-300);
            opacity: 1;
        }
    }
}
</style>