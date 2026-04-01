<template>
    <div class="main">
        <div v-for="i in text">{{ i }}</div>
        <img v-show="show3" style="width: 500px;right: 10px;top: 1200px;"
            src="@/assets/images/love/wedding/shiyan/wh1.jpg" />
        <img v-show="show1" style="width: 560px;right: 10px;top: 20px;"
            src="@/assets/images/love/wedding/shiyan/wh2.jpg" />
        <img v-show="show2" style="width: 300px;right: 10px;top: 580px;"
            src="@/assets/images/love/wedding/shiyan/zjs1.jpg" />
        <img v-show="show4" style="right: 10px;top: 1990px;" src="@/assets/images/love/wedding/icon/goBack.png"
            @click="goBack()">
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const text = ref<string[]>([""]);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const strList: string[] = [
    "晓看天色暮看云",
    "行也思君",
    "坐也思君",
    "愿为江水",
    "与君重逢",
    "一日不见兮",
    "思之若狂",
    "好想回到那个夏天",
    "我们泛舟玄武之上",
    "你是我灰色人生中的一道彩虹",
    "柳絮空缱绻",
    "南风知不知",
    "我见青山多妩媚",
    "料青山见我也应如是",
    "三笑徒然当一痴",
    "人生若只如初见",
    "我余光中都是你",
    "因为你，我多少适应了这个世界",
    "有了更多的勇气",
    "那年秋天",
    "你我登上紫禁之巅",
    "风萧萧兮，夜微凉",
    "愿我如星君如月",
    "夜夜流光相皎洁",
    "沙滩之上埋彼此",
    "大海之中笑欢颜",
    "海鸥阵阵随风起",
    "扶摇直上九万里",
    "杳霭流玉",
    "日落星升",
    "霞姿月韵",
    "喜上眉梢",
    "落花人独立",
    "微雨燕双飞",
    "醉后不知天在水",
    "满船星梦压星河"
];

function reset(num: number) {
    if (num == 1) {
        show1.value = true;
    } else if (num == 11) {
        show2.value = true;
    } else if (num == 22) {
        show3.value = true;
    } else if (num == 36) {
        show4.value = true;
    }
    if (num >= strList.length) {
        return false;
    } else {
        if (text.value.length <= strList.length) {
            if (text.value[num].length < strList[num].length) {
                text.value[num] += strList[num].substring(text.value[num].length, text.value[num].length + 1);
                setTimeout(() => {
                    reset(num);
                }, Math.random() * 160);
            } else {
                num++;
                text.value[num] = "";
                setTimeout(() => {
                    reset(num);
                }, Math.random() * 160);
            }
        } else {
            return false;
        }
    }
}
reset(0);

function goBack() {
    history.back();
}

</script>

<style lang="less" scoped>
.main {
    padding-top: 20px;
    padding-left: 30px;
    font-size: 36px;
    position: relative;

    div {
        letter-spacing: 8px;
        text-shadow: 0px 2px 0px #fff, 0px -1px 0px #9da181, 1px 0px 0px #fff, -2px 0px 0px #9da181;
    }

    img {
        position: absolute;
        animation: rTol 1s;
    }
}

@keyframes rTol {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
}
</style>