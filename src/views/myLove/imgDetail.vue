<template>
    <div class="img-detail">
        <header class="toolbar">
            <a-button size="small" @click="goBack">返回</a-button>
            <span class="title">{{ resultObj?.name || "图片详情" }}</span>
        </header>
        <div v-if="resultObj?.url" class="stage">
            <img :src="resultObj.url" :alt="resultObj.name || '详情图'" />
        </div>
        <a-empty v-else description="未找到图片数据" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

interface ImgObj {
    url: string;
    name?: string;
}

const router = useRouter();
const resultObj = ref<ImgObj | null>(null);

onMounted(() => {
    try {
        const raw = localStorage.getItem("imgObj");
        resultObj.value = raw ? (JSON.parse(raw) as ImgObj) : null;
    } catch {
        resultObj.value = null;
    }
});

function goBack() {
    router.back();
}
</script>

<style lang="less" scoped>
.img-detail {
    min-height: 100vh;
    background: #111;
    color: #fff;
}

.toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
}

.title {
    font-size: 14px;
    opacity: 0.85;
}

.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px 24px;

    img {
        max-width: 100%;
        max-height: calc(100vh - 80px);
        object-fit: contain;
    }
}

:deep(.ant-empty) {
    margin-top: 20vh;
    color: #fff;
}
</style>
