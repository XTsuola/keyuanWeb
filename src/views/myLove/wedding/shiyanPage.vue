<template>
    <div class="letter-page">
        <div class="text-col">
            <p v-for="(line, index) in text" :key="index" class="line">{{ line }}</p>
        </div>
        <aside class="gallery">
            <img v-show="show1" src="@/assets/images/love/wedding/shiyan/wh2.jpg" alt="" />
            <img v-show="show2" src="@/assets/images/love/wedding/shiyan/zjs1.jpg" alt="" />
            <img v-show="show3" src="@/assets/images/love/wedding/shiyan/wh1.jpg" alt="" />
            <button v-show="show4" type="button" class="back-btn" @click="goBack">
                <img src="@/assets/images/love/wedding/icon/goBack.png" alt="返回" />
            </button>
        </aside>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const text = ref<string[]>([""]);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const timers = new Set<ReturnType<typeof setTimeout>>();

const strList = [
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
    "满船星梦压星河",
];

function schedule(fn: () => void, delay: number) {
    const id = setTimeout(() => {
        timers.delete(id);
        fn();
    }, delay);
    timers.add(id);
}

function reveal(num: number) {
    if (num === 1) show1.value = true;
    if (num === 11) show2.value = true;
    if (num === 22) show3.value = true;
    if (num === 36) show4.value = true;
}

function reset(num: number) {
    reveal(num);
    if (num >= strList.length) return;
    const current = text.value[num] ?? "";
    if (current.length < strList[num].length) {
        text.value[num] = strList[num].slice(0, current.length + 1);
        schedule(() => reset(num), Math.random() * 160);
        return;
    }
    const next = num + 1;
    if (next >= strList.length) {
        reveal(next);
        return;
    }
    text.value[next] = "";
    schedule(() => reset(next), Math.random() * 160);
}

reset(0);

function goBack() {
    router.back();
}

onBeforeUnmount(() => {
    timers.forEach((id) => clearTimeout(id));
    timers.clear();
});
</script>

<style lang="less" scoped>
.letter-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(240px, 0.9fr);
    gap: 24px;
    padding: 24px 20px 40px;
    background: #f7f3ea;
    color: #3d3a32;
}

.text-col {
    font-size: clamp(20px, 2.6vw, 34px);
}

.line {
    margin: 0 0 10px;
    letter-spacing: 0.2em;
    text-shadow: 0 2px 0 #fff, 0 -1px 0 #9da181, 1px 0 0 #fff, -2px 0 0 #9da181;
    min-height: 1.2em;
}

.gallery {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    position: sticky;
    top: 24px;
    align-self: start;

    img {
        width: min(100%, 460px);
        height: auto;
        border-radius: 8px;
        animation: pop 0.8s ease;
    }
}

.back-btn {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    img {
        width: 64px;
    }
}

@keyframes pop {
    from {
        transform: scale(0.2);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

@media screen and (max-width: 900px) {
    .letter-page {
        grid-template-columns: 1fr;
    }

    .gallery {
        position: static;
        align-items: center;
    }
}

@media (prefers-reduced-motion: reduce) {
    .gallery img {
        animation: none;
    }
}
</style>
