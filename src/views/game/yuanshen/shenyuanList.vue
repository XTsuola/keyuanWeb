<template>
    <div class="shenyuan-page">
        <div class="page-header">
            <div class="title">深渊列表</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ shenyuanList.length }} 期</div>
        </div>

        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索期次、版本、怪物或地脉"
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
                    <button v-for="item in shenyuanVersions" :key="item.id" type="button" class="filter-btn"
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
                    <h3 class="period-name">第 {{ item.period }} 期</h3>
                    <span class="period-ver" :style="{ color: versionColor(item.version) }">{{ item.version }}</span>
                </div>
                <p class="period-buff">{{ buffText(item.buff) }}</p>
                <div class="chamber-grid">
                    <div v-for="room in rooms" :key="room" class="chamber-row">
                        <div v-for="half in halves" :key="half" class="chamber-cell">
                            <div class="chamber-label">{{ roomName(room) }}{{ half === "up" ? "上半" : "下半" }}</div>
                            <div class="enemy-tags">
                                <span v-for="(enemy, idx) in enemiesOf(item, room, half)" :key="idx" class="enemy-tag">
                                    {{ formatEnemy(enemy) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <a-empty v-else class="empty" description="没有匹配的深渊期次" />

        <a-modal v-model:open="visible" :title="current ? `第 ${current.period} 期 · ${current.version}` : ''"
            :footer="null" destroyOnClose centered width="720px" wrap-class-name="shenyuan-detail-modal">
            <template v-if="current">
                <div class="detail-buff">
                    <template v-if="Array.isArray(current.buff)">
                        <p><strong>上半：</strong>{{ current.buff[0] }}</p>
                        <p><strong>下半：</strong>{{ current.buff[1] }}</p>
                    </template>
                    <p v-else>{{ current.buff }}</p>
                </div>
                <div class="chamber-grid detail-grid">
                    <div v-for="room in rooms" :key="room" class="chamber-row">
                        <div v-for="half in halves" :key="half" class="chamber-cell">
                            <div class="chamber-label">{{ roomName(room) }}{{ half === "up" ? "上半" : "下半" }}</div>
                            <div class="enemy-tags">
                                <span v-for="(enemy, idx) in enemiesOf(current, room, half)" :key="idx" class="enemy-tag">
                                    {{ formatEnemy(enemy) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import {
    buffText,
    enemiesOf,
    formatEnemy,
    shenyuanList,
    shenyuanVersions,
    type ShenyuanPeriod,
} from "@/utils/sxsyyuanshen/shenyuanData";

const rooms = [1, 2, 3] as const;
const halves = ["up", "down"] as const;
const keyword = ref("");
const activeVersion = ref("");
const visible = ref(false);
const current = ref<ShenyuanPeriod | null>(null);

const versionColorMap = Object.fromEntries(shenyuanVersions.map((item) => [item.id, item.color]));

function majorOf(version: string) {
    return version.match(/^(\d+)/)?.[1] ?? "";
}

function versionColor(version: string) {
    return versionColorMap[majorOf(version)] ?? "#1677ff";
}

function roomName(room: number) {
    return room === 1 ? "第一间" : room === 2 ? "第二间" : "第三间";
}

const versionCounts = computed(() => {
    const counts: Record<string, number> = {};
    for (const item of shenyuanVersions) counts[item.id] = 0;
    for (const item of shenyuanList) {
        const major = majorOf(item.version);
        if (counts[major] != null) counts[major] += 1;
    }
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return [...shenyuanList]
        .filter((item) => {
            if (activeVersion.value && majorOf(item.version) !== activeVersion.value) return false;
            if (!q) return true;
            const blob = [item.period, item.version, buffText(item.buff), ...item.up.flat(), ...item.down.flat()].join(" ").toLowerCase();
            return blob.includes(q);
        })
        .sort((a, b) => b.period - a.period);
});

function showDetail(item: ShenyuanPeriod) {
    current.value = item;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.shenyuan-page {
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
    margin-bottom: 6px;
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

.period-buff {
    margin: 0 0 12px;
    font-size: 13px;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.55);
}

.chamber-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.chamber-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.chamber-cell {
    padding: 8px 10px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    min-width: 0;
}

.chamber-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 6px;
}

.enemy-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.enemy-tag {
    font-size: 12px;
    line-height: 1.4;
    padding: 2px 6px;
    border-radius: 4px;
    background: #fff;
    color: rgba(0, 0, 0, 0.75);
    border: 1px solid #f0f0f0;
}

.empty {
    padding: 48px 0;
}

.detail-buff {
    margin-bottom: 14px;
    padding: 10px 12px;
    background: #fafafa;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.75;
    color: rgba(0, 0, 0, 0.75);

    p {
        margin: 0;

        & + p {
            margin-top: 6px;
        }
    }
}

.detail-grid {
    .chamber-cell {
        background: #fff;
    }
}

@media screen and (max-width: 768px) {
    .chamber-row {
        grid-template-columns: 1fr;
    }
}
</style>

<style lang="less">
.shenyuan-detail-modal {
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
        max-height: 70vh;
        overflow-y: auto;
    }
}
</style>
