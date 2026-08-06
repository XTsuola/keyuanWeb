<template>
    <div class="wedding-gallery">
        <header class="header">
            <h1 class="title">{{ title }}</h1>
            <button type="button" class="back-btn" aria-label="返回" @click="goBack">
                <img src="@/assets/images/love/wedding/icon/goBack.png" alt="" />
            </button>
        </header>
        <div class="content">
            <button
                v-for="(src, index) in images"
                :key="src"
                type="button"
                class="photo-btn"
                @click="open(src)"
            >
                <img :src="src" :alt="`${title}-${index + 1}`" loading="lazy" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
    title: string;
    folder: string;
    count: number;
}>();

const router = useRouter();
const cosBase =
    import.meta.env.VITE_COS_BUCKET && import.meta.env.VITE_COS_REGION
        ? `https://${import.meta.env.VITE_COS_BUCKET}.cos.${import.meta.env.VITE_COS_REGION}.myqcloud.com`
        : "https://suola-1300285550.cos.ap-nanjing.myqcloud.com";

const images = computed(() =>
    Array.from({ length: props.count }, (_, i) => `${cosBase}/wedding/${props.folder}/${i + 1}.jpg`)
);

function open(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
}

function goBack() {
    router.back();
}
</script>

<style lang="less" scoped>
.wedding-gallery {
    min-height: 100vh;
    background: #f7f3ea;
    color: #3d3a32;
}

.header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    padding: 12px 64px;
    background: rgba(247, 243, 234, 0.92);
    backdrop-filter: blur(6px);
}

.title {
    margin: 0;
    font-size: clamp(28px, 6vw, 64px);
    font-weight: 700;
    text-shadow: 0 2px 0 #fff, 0 -2px 0 #9da181, 2px 0 0 #fff, -2px 0 0 #9da181;
}

.back-btn {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    img {
        width: 48px;
        height: auto;
        display: block;
    }
}

.content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 24px;
}

.photo-btn {
    display: block;
    width: 100%;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;

    img {
        display: block;
        width: 100%;
        height: auto;
    }
}
</style>
