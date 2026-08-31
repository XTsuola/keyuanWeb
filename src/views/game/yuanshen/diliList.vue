<template>
    <div class="dili-page">
        <div class="page-header">
            <div class="title">地理志</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ diliList.length }} 处</div>
        </div>

        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索地点或描述" class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">地区：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeArea === 0 }"
                        @click="activeArea = 0">
                        全部
                    </button>
                    <button v-for="area in diliAreas" :key="area.id" type="button" class="filter-btn"
                        :class="{ active: activeArea === area.id }"
                        :style="activeArea === area.id ? { borderColor: area.color, color: area.color, background: area.color + '18' } : {}"
                        @click="activeArea = area.id">
                        {{ area.name }}
                        <span class="count">{{ areaCounts[area.id] }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="grouped.length" class="region-list">
            <section v-for="group in grouped" :key="group.id" class="region-block">
                <div class="region-head">
                    <span class="region-dot" :style="{ background: group.color }"></span>
                    <h2 class="region-title">{{ group.name }}</h2>
                    <span class="region-count">{{ group.spots.length }} 处</span>
                </div>
                <div class="spot-grid">
                    <article v-for="spot in group.spots" :key="spot.id" class="spot-card"
                        :style="{ borderLeftColor: group.color }" @click="showDetail(spot)">
                        <div class="spot-top">
                            <span class="spot-index">{{ String(spot.index).padStart(2, "0") }}</span>
                            <span class="spot-area" :style="{ color: group.color }">{{ spot.areaName }}</span>
                        </div>
                        <h3 class="spot-name">{{ spot.name }}</h3>
                        <p class="spot-info">{{ spot.info }}</p>
                    </article>
                </div>
            </section>
        </div>
        <a-empty v-else class="empty" description="没有匹配的地点" />

        <a-modal v-model:open="visible" :title="current?.name" :footer="null" destroyOnClose centered width="640px"
            wrap-class-name="dili-detail-modal">
            <template v-if="current">
                <div class="detail-meta">
                    <span class="detail-dot" :style="{ background: currentColor }"></span>
                    {{ current.areaName }} · 第 {{ current.index }} 处
                </div>
                <p class="detail-info">{{ current.info }}</p>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { diliAreas, diliList, type DiliSpot } from "@/utils/sxsyyuanshen/diliData";

const keyword = ref("");
const activeArea = ref(0);
const visible = ref(false);
const current = ref<DiliSpot | null>(null);

const areaCounts = computed(() => {
    const counts: Record<number, number> = {};
    for (const area of diliAreas) counts[area.id] = 0;
    for (const spot of diliList) counts[spot.area] += 1;
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return diliList.filter((spot) => {
        if (activeArea.value && spot.area !== activeArea.value) return false;
        if (!q) return true;
        return spot.name.toLowerCase().includes(q) || spot.info.toLowerCase().includes(q);
    });
});

const grouped = computed(() => {
    return diliAreas
        .map((area) => ({
            ...area,
            spots: filteredList.value.filter((spot) => spot.area === area.id),
        }))
        .filter((group) => group.spots.length);
});

const currentColor = computed(() => {
    if (!current.value) return "#1677ff";
    return diliAreas.find((area) => area.id === current.value!.area)?.color ?? "#1677ff";
});

function showDetail(spot: DiliSpot) {
    current.value = spot;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.dili-page {
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
        width: 240px;
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
    transition: border-color 0.15s, color 0.15s, background 0.15s;

    &:hover {
        border-color: #cbd5e1;
        color: rgba(0, 0, 0, 0.85);
    }

    &.active {
        border-color: #1677ff;
        color: #1677ff;
        background: #e6f4ff;
        font-weight: 600;
    }

    .count {
        margin-left: 4px;
        font-size: 12px;
        opacity: 0.7;
        font-weight: 400;
    }
}

.region-list {
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.region-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.region-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
}

.region-title {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
}

.region-count {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
}

.spot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
}

.spot-card {
    padding: 14px 16px 16px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-left: 3px solid #1677ff;
    border-radius: 8px;
    cursor: pointer;
    transition: box-shadow 0.15s, border-color 0.15s;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        border-color: #e6e6e6;
    }
}

.spot-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}

.spot-index {
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.35);
    font-variant-numeric: tabular-nums;
}

.spot-area {
    font-size: 12px;
}

.spot-name {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.4;
}

.spot-info {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.65);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.empty {
    padding: 48px 0;
}

.detail-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
}

.detail-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.detail-info {
    margin: 0;
    font-size: 15px;
    line-height: 1.85;
    color: rgba(0, 0, 0, 0.85);
}
</style>

<style lang="less">
.dili-detail-modal {
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
        padding: 18px 24px 22px;
    }
}
</style>
