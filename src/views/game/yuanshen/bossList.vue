<template>
    <div class="boss-page">
        <div class="page-header">
            <div class="title">Boss 列表</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ bossList.length }} 只</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索 Boss、材料或描述" class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">地区：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeArea === 0 }"
                        @click="activeArea = 0">
                        全部
                    </button>
                    <button v-for="area in bossAreas" :key="area.id" type="button" class="filter-btn"
                        :class="{ active: activeArea === area.id }"
                        :style="activeArea === area.id ? { borderColor: area.color, color: area.color, background: area.color + '18' } : {}"
                        @click="activeArea = area.id">
                        {{ area.name }}
                        <span class="count">{{ areaCounts[area.id] }}</span>
                    </button>
                </div>
                <div class="filter-btn-group">
                    <span class="filter-btn-label">类型：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeKind === 0 }"
                        @click="activeKind = 0">
                        全部
                    </button>
                    <button v-for="item in bossKinds" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeKind === item.id }"
                        :style="activeKind === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeKind = item.id">
                        {{ item.name }}
                        <span class="count">{{ kindCounts[item.id] }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="grouped.length" class="region-list">
            <section v-for="group in grouped" :key="group.id" class="region-block">
                <div class="region-head">
                    <span class="region-dot" :style="{ background: group.color }"></span>
                    <h2 class="region-title">{{ group.name }}</h2>
                    <span class="region-count">{{ group.bosses.length }} 只</span>
                </div>
                <div class="spot-grid">
                    <article v-for="boss in group.bosses" :key="`${boss.area}-${boss.name}`" class="spot-card"
                        :style="{ borderLeftColor: kindColor(boss.kind) }">
                        <div class="spot-top">
                            <span class="spot-index">{{ String(bossIndex(group.bosses, boss)).padStart(2, "0") }}</span>
                            <span class="spot-kind" :style="{ color: kindColor(boss.kind) }">{{ kindNameOf(boss.kind)
                                }}</span>
                        </div>
                        <h3 class="spot-name">{{ boss.name }}</h3>
                        <div class="mat-list">
                            <button v-for="mat in boss.materials" :key="mat[0]" type="button" class="mat-item"
                                @click="showDetail(boss, mat)">
                                <div class="mat-name">{{ mat[0] }}</div>
                                <p class="mat-info">{{ mat[1] }}</p>
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </div>
        <a-empty v-else class="empty" description="没有匹配的 Boss" />
        <a-modal v-model:open="visible" :title="currentMat?.[0]" :footer="null" destroyOnClose centered width="640px"
            wrap-class-name="boss-detail-modal">
            <template v-if="currentBoss && currentMat">
                <div class="detail-meta">
                    <span class="detail-dot" :style="{ background: kindColor(currentBoss.kind) }"></span>
                    {{ areaNameOf(currentBoss.area) }} · {{ kindNameOf(currentBoss.kind) }} · {{ currentBoss.name }}
                </div>
                <p class="detail-info">{{ currentMat[1] }}</p>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { areaNameOf, bossAreas, bossKinds, bossList, kindNameOf, type BossItem, type BossKind, type BossMaterial } from "@/utils/sxsyyuanshen/bossData";

const keyword = ref("");
const activeArea = ref(0);
const activeKind = ref<0 | BossKind>(0);
const visible = ref(false);
const currentBoss = ref<BossItem | null>(null);
const currentMat = ref<BossMaterial | null>(null);
const kindColorMap = Object.fromEntries(bossKinds.map((item) => [item.id, item.color]));
const areaCounts = computed(() => {
    const counts: Record<number, number> = {};
    for (const area of bossAreas) counts[area.id] = 0;
    for (const boss of bossList) counts[boss.area] += 1;
    return counts;
});

const kindCounts = computed(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0 };
    for (const boss of bossList) counts[boss.kind] += 1;
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return bossList.filter((boss) => {
        if (activeArea.value && boss.area !== activeArea.value) return false;
        if (activeKind.value && boss.kind !== activeKind.value) return false;
        if (!q) return true;
        return (
            boss.name.toLowerCase().includes(q) ||
            boss.materials.some((mat) => mat[0].toLowerCase().includes(q) || mat[1].toLowerCase().includes(q))
        );
    });
});

const grouped = computed(() => {
    return bossAreas
        .map((area) => ({
            ...area,
            bosses: filteredList.value.filter((boss) => boss.area === area.id),
        }))
        .filter((group) => group.bosses.length);
});

function kindColor(kind: BossKind) {
    return kindColorMap[kind] ?? "#1677ff";
}

function bossIndex(list: BossItem[], boss: BossItem) {
    return list.filter((item) => item.kind === boss.kind).indexOf(boss) + 1;
}

function showDetail(boss: BossItem, mat: BossMaterial) {
    currentBoss.value = boss;
    currentMat.value = mat;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.boss-page {
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
        width: 260px;
    }
}

.filter-btns {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px;
}

.spot-card {
    padding: 14px 16px 12px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-left: 3px solid #1677ff;
    border-radius: 8px;
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

.spot-kind {
    font-size: 12px;
    font-weight: 600;
}

.spot-name {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.4;
}

.mat-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.mat-item {
    appearance: none;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background: #fafafa;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;

    &:hover {
        background: #f5f8ff;
        border-color: #d6e4ff;
    }
}

.mat-name {
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 4px;
}

.mat-info {
    margin: 0;
    font-size: 12px;
    line-height: 1.65;
    color: rgba(0, 0, 0, 0.55);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
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
.boss-detail-modal {
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
