<template>
    <div class="shengyiwu-page">
        <div class="page-header">
            <div class="title">圣遗物</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ baowuList.length }} 套</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索套装、效果或部位" class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">品质：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeQuality === 0 }"
                        @click="activeQuality = 0">
                        全部
                    </button>
                    <button v-for="item in shengyiwuQualities" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeQuality === item.id }"
                        :style="activeQuality === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeQuality = item.id">
                        {{ item.name }}
                        <span class="count">{{ qualityCounts[item.id] }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="filteredList.length" class="set-list">
            <article v-for="item in filteredList" :key="item.id" class="set-card"
                :style="{ borderLeftColor: qualityColor(item.quality) }" @click="showDetail(item)">
                <div class="set-top">
                    <h3 class="set-name">{{ item.name }}</h3>
                    <span class="quality-tag"
                        :style="{ color: qualityColor(item.quality), borderColor: qualityColor(item.quality), background: qualityColor(item.quality) + '14' }">
                        {{ qualityName(item.quality) }}
                    </span>
                    <span v-if="isSingleSet(item)" class="single-tag">单件套</span>
                </div>
                <div class="effect">
                    <span class="effect-label">{{ isSingleSet(item) ? "单件套" : "两件套" }}</span>
                    <p class="effect-text">{{ item.two }}</p>
                </div>
                <div v-if="!isSingleSet(item)" class="effect">
                    <span class="effect-label">四件套</span>
                    <p class="effect-text clamp">{{ item.four }}</p>
                </div>
                <div class="piece-names">
                    <span v-for="piece in shengyiwuPieces(item)" :key="piece.slot" class="piece-name">{{ piece.name }}</span>
                </div>
            </article>
        </div>
        <a-empty v-else class="empty" description="没有匹配的圣遗物" />
        <a-modal v-model:open="visible" :footer="null" destroyOnClose centered width="760px"
            wrap-class-name="shengyiwu-detail-modal">
            <template v-if="current" #title>
                <div class="modal-title">
                    <span>{{ current.name }}</span>
                    <span class="quality-tag"
                        :style="{ color: qualityColor(current.quality), borderColor: qualityColor(current.quality), background: qualityColor(current.quality) + '14' }">
                        {{ qualityName(current.quality) }}
                    </span>
                    <span v-if="isSingleSet(current)" class="single-tag">单件套</span>
                </div>
            </template>
            <template v-if="current">
                <div class="effect detail-effect">
                    <span class="effect-label">{{ isSingleSet(current) ? "单件套" : "两件套" }}</span>
                    <p class="effect-text">{{ current.two }}</p>
                </div>
                <div v-if="!isSingleSet(current)" class="effect detail-effect">
                    <span class="effect-label">四件套</span>
                    <p class="effect-text">{{ current.four }}</p>
                </div>
                <div class="piece-list">
                    <div v-for="piece in shengyiwuPieces(current)" :key="piece.slot" class="piece-item">
                        <div class="piece-slot">{{ piece.slot }}</div>
                        <div class="piece-body">
                            <div class="piece-title">{{ piece.name }}</div>
                            <p class="piece-info">{{ piece.info }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { baowuList, isSingleSet, shengyiwuPieces, shengyiwuQualities, type ShengyiwuQuality, type ShengyiwuSet } from "@/utils/sxsyyuanshen/shengyiwuData";

const keyword = ref("");
const activeQuality = ref<0 | ShengyiwuQuality>(0);
const visible = ref(false);
const current = ref<ShengyiwuSet | null>(null);

const qualityColorMap = Object.fromEntries(shengyiwuQualities.map((item) => [item.id, item.color]));
const qualityNameMap = Object.fromEntries(shengyiwuQualities.map((item) => [item.id, item.name]));

function qualityColor(quality: ShengyiwuQuality) {
    return qualityColorMap[quality] ?? "#1677ff";
}

function qualityName(quality: ShengyiwuQuality) {
    return qualityNameMap[quality] ?? "";
}

const qualityCounts = computed(() => {
    const counts = Object.fromEntries(shengyiwuQualities.map((item) => [item.id, 0])) as Record<ShengyiwuQuality, number>;
    for (const item of baowuList) counts[item.quality] += 1;
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return [...baowuList]
        .filter((item) => {
            if (activeQuality.value && item.quality !== activeQuality.value) return false;
            if (!q) return true;
            const pieces = shengyiwuPieces(item).flatMap((piece) => [piece.slot, piece.name, piece.info]);
            return [item.name, item.two, item.four, ...pieces].join(" ").toLowerCase().includes(q);
        })
        .sort((a, b) => b.id - a.id);
});

function showDetail(item: ShengyiwuSet) {
    current.value = item;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.shengyiwu-page {
    padding: 20px 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
}

.page-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 14px;

    .title {
        font-size: 18px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.3;
    }

    .result-tip {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
    }
}

.search-panel {
    margin-bottom: 16px;
    padding: 14px 16px 12px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
}

.searchHead {
    :deep(.ant-form-item) {
        margin-bottom: 10px;
        margin-inline-end: 16px;
    }

    .search-control {
        width: 280px;
    }
}

.filter-btns {
    padding-top: 12px;
    border-top: 1px dashed #e8e8e8;
}

.filter-btn-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-btn-label {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
    margin-right: 2px;
}

.filter-btn {
    appearance: none;
    border: 1px solid #e5e7eb;
    background: #fff;
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    line-height: 1;
    padding: 7px 12px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        border-color: #cbd5e1;
        color: rgba(0, 0, 0, 0.85);
    }

    &.active {
        font-weight: 600;
    }

    .count {
        margin-left: 4px;
        font-size: 12px;
        opacity: 0.7;
        font-weight: 400;
    }
}

.set-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.set-card {
    padding: 16px 18px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-left: 3px solid #d48806;
    border-radius: 8px;
    cursor: pointer;
    min-width: 0;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
}

.set-top,
.modal-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 12px;
}

.modal-title {
    margin-bottom: 0;
}

.set-name {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
}

.quality-tag,
.single-tag {
    padding: 2px 8px;
    border: 1px solid;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.6;
}

.single-tag {
    color: #ad6800;
    border-color: #f0d7a2;
    background: #fff8eb;
}

.effect {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin-bottom: 8px;
}

.effect-label {
    flex: none;
    margin-top: 1px;
    padding: 1px 6px;
    border-radius: 4px;
    background: #f5f5f5;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.45);
}

.effect-text {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: rgba(0, 0, 0, 0.88);
    overflow-wrap: anywhere;
}

.effect-text.clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.piece-names {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
}

.piece-name {
    padding: 2px 8px;
    border-radius: 4px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.65);
}

.detail-effect {
    margin-bottom: 12px;
}

.piece-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
}

.piece-item {
    display: flex;
    gap: 12px;
    padding: 10px 12px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
}

.piece-slot {
    flex: none;
    width: 56px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.35);
}

.piece-title {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
}

.piece-info {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: rgba(0, 0, 0, 0.65);
    overflow-wrap: anywhere;
}

.empty {
    padding: 48px 0;
}

@media screen and (max-width: 1100px) {
    .set-list {
        grid-template-columns: 1fr;
    }
}
</style>

<style lang="less">
.shengyiwu-detail-modal {
    .ant-modal-content {
        padding: 0;
        border-radius: 10px;
        overflow: hidden;
    }

    .ant-modal-header {
        margin: 0;
        padding: 14px 48px 14px 24px;
        border-bottom: 1px solid #f0f0f0;
    }

    .ant-modal-close {
        top: 12px;
        inset-inline-end: 14px;
    }

    .ant-modal-body {
        max-height: calc(100vh - 180px);
        overflow-y: auto;
        padding: 18px 24px 22px;
    }
}
</style>
