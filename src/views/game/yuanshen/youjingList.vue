<template>
    <div class="youjing-page">
        <div class="page-header">
            <div class="title">幽境危战</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ youjingList.length }} 期</div>
        </div>

        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索期次、版本、战役或首领"
                        class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">版本：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeVersion === '' }"
                        @click="activeVersion = ''">
                        全部
                    </button>
                    <button v-for="item in youjingVersions" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeVersion === item.id }"
                        :style="activeVersion === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeVersion = item.id">
                        {{ item.name }}
                        <span class="count">{{ versionCounts[item.id] }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="filteredList.length" class="period-list">
            <article v-for="item in filteredList" :key="item.period" class="period-card"
                :style="{ borderLeftColor: versionColor(item.version) }" @click="showDetail(item)">
                <div class="period-top">
                    <h3 class="period-name">第 {{ item.period }} 期 · {{ item.name }}</h3>
                    <span class="period-ver" :style="{ color: versionColor(item.version) }">{{ item.version }}</span>
                </div>
                <p class="period-date">{{ item.start }} ～ {{ item.end }}</p>
                <div class="boss-grid">
                    <div v-for="boss in bossesOf(item)" :key="boss.index" class="boss-cell">
                        <div class="boss-index">首领 {{ boss.index }}</div>
                        <div class="boss-name">{{ boss.name }}</div>
                        <div v-if="boss.title" class="boss-title">{{ boss.title }}</div>
                    </div>
                </div>
            </article>
        </div>
        <a-empty v-else class="empty" description="没有匹配的幽境危战期次" />

        <a-modal v-model:open="visible" :title="current ? `第 ${current.period} 期 · ${current.name}` : ''"
            :footer="null" destroyOnClose centered width="560px" wrap-class-name="youjing-detail-modal">
            <template v-if="current">
                <div class="detail-meta">
                    {{ current.version }} 版本 · {{ current.start }} ～ {{ current.end }}
                </div>
                <div class="boss-grid">
                    <div v-for="boss in bossesOf(current)" :key="boss.index" class="boss-cell">
                        <div class="boss-index">首领 {{ boss.index }}</div>
                        <div class="boss-name">{{ boss.name }}</div>
                        <div v-if="boss.title" class="boss-title">{{ boss.title }}</div>
                    </div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { bossesOf, youjingList, youjingVersions, type YoujingPeriod } from "@/utils/sxsyyuanshen/youjingData";

const keyword = ref("");
const activeVersion = ref("");
const visible = ref(false);
const current = ref<YoujingPeriod | null>(null);

const versionColorMap = Object.fromEntries(youjingVersions.map((item) => [item.id, item.color]));

function majorOf(version: string) {
    return version.match(/^(\d+)/)?.[1] ?? "";
}

function versionColor(version: string) {
    return versionColorMap[majorOf(version)] ?? "#1677ff";
}

const versionCounts = computed(() => {
    const counts: Record<string, number> = {};
    for (const item of youjingVersions) counts[item.id] = 0;
    for (const item of youjingList) {
        const major = majorOf(item.version);
        if (counts[major] != null) counts[major] += 1;
    }
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return [...youjingList]
        .filter((item) => {
            if (activeVersion.value && majorOf(item.version) !== activeVersion.value) return false;
            if (!q) return true;
            const blob = [item.period, item.version, item.name, item.start, item.end, ...item.bosses]
                .join(" ")
                .toLowerCase();
            return blob.includes(q);
        })
        .sort((a, b) => b.period - a.period);
});

function showDetail(item: YoujingPeriod) {
    current.value = item;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.youjing-page {
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

.period-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.period-card {
    padding: 16px 18px;
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

.period-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 4px;
}

.period-name {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
}

.period-ver {
    font-size: 13px;
    font-weight: 600;
}

.period-date {
    margin: 0 0 12px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
}

.boss-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.boss-cell {
    padding: 10px 12px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    min-width: 0;
}

.boss-index {
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.35);
    margin-bottom: 4px;
}

.boss-name {
    font-size: 14px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.4;
}

.boss-title {
    margin-top: 4px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.55);
}

.empty {
    padding: 48px 0;
}

.detail-meta {
    margin-bottom: 14px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
}

@media screen and (max-width: 768px) {
    .boss-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<style lang="less">
.youjing-detail-modal {
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
