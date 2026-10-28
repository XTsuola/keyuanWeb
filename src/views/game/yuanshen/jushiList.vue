<template>
    <div class="jushi-page">
        <div class="page-header">
            <div class="title">幻想剧诗</div>
            <div class="result-tip">共 {{ filteredList.length }} / {{ jushiList.length }} 期</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索期次或首领" class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">属性：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeElement === '' }"
                        @click="activeElement = ''">
                        全部
                    </button>
                    <button v-for="item in jushiElements" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeElement === item.id }"
                        :style="activeElement === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeElement = item.id">
                        {{ item.id }}
                        <span class="count">{{ elementCounts[item.id] }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="filteredList.length" class="period-list">
            <article v-for="item in filteredList" :key="item.id" class="period-card" @click="showDetail(item)">
                <div class="period-top">
                    <h3 class="period-name">{{ item.name }}</h3>
                    <div class="limit-tags">
                        <span v-for="el in item.limit" :key="el" class="limit-tag"
                            :style="{ color: elementColor(el), borderColor: elementColor(el), background: elementColor(el) + '14' }">
                            {{ el }}
                        </span>
                    </div>
                </div>
                <div class="boss-grid floor-grid">
                    <div v-for="boss in floorBosses(item)" :key="boss.floor" class="boss-cell">
                        <div class="boss-floor">{{ boss.floor }}</div>
                        <div class="boss-units">
                            <span v-for="unit in boss.units" :key="unit" class="boss-unit">{{ unit }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="saintBosses(item).length" class="saint-block">
                    <div class="saint-label">圣牌挑战</div>
                    <div class="boss-grid">
                        <div v-for="boss in saintBosses(item)" :key="boss.floor" class="boss-cell is-saint">
                            <div class="boss-floor">{{ boss.floor }}</div>
                            <div class="boss-units">
                                <span v-for="unit in boss.units" :key="unit" class="boss-unit">{{ unit }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <a-empty v-else class="empty" description="没有匹配的幻想剧诗期次" />
        <a-modal v-model:open="visible" :footer="null" destroyOnClose centered width="920px"
            wrap-class-name="jushi-detail-modal">
            <template v-if="current" #title>
                <div class="modal-title">
                    <span>{{ current.name }}</span>
                    <div class="limit-tags">
                        <span v-for="el in current.limit" :key="el" class="limit-tag"
                            :style="{ color: elementColor(el), borderColor: elementColor(el), background: elementColor(el) + '14' }">
                            {{ el }}
                        </span>
                    </div>
                </div>
            </template>
            <template v-if="current">
                <div class="boss-grid floor-grid">
                    <div v-for="boss in floorBosses(current)" :key="boss.floor" class="boss-cell">
                        <div class="boss-floor">{{ boss.floor }}</div>
                        <div class="boss-units">
                            <span v-for="unit in boss.units" :key="unit" class="boss-unit">{{ unit }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="saintBosses(current).length" class="saint-block">
                    <div class="saint-label">圣牌挑战</div>
                    <div class="boss-grid">
                        <div v-for="boss in saintBosses(current)" :key="boss.floor" class="boss-cell is-saint">
                            <div class="boss-floor">{{ boss.floor }}</div>
                            <div class="boss-units">
                                <span v-for="unit in boss.units" :key="unit" class="boss-unit">{{ unit }}</span>
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
import { jushiBosses, jushiElements, jushiList, type JushiElement, type JushiPeriod } from "@/utils/sxsyyuanshen/huanxiangjushi";

const keyword = ref("");
const activeElement = ref<"" | JushiElement>("");
const visible = ref(false);
const current = ref<JushiPeriod | null>(null);

const elementColorMap = Object.fromEntries(jushiElements.map((item) => [item.id, item.color]));

function elementColor(element: JushiElement) {
    return elementColorMap[element] ?? "#1677ff";
}

function floorBosses(item: JushiPeriod) {
    return jushiBosses(item).filter((boss) => !boss.floor.startsWith("圣牌"));
}

function saintBosses(item: JushiPeriod) {
    return jushiBosses(item).filter((boss) => boss.floor.startsWith("圣牌"));
}

const elementCounts = computed(() => {
    const counts = Object.fromEntries(jushiElements.map((item) => [item.id, 0])) as Record<JushiElement, number>;
    for (const item of jushiList) {
        for (const element of item.limit) counts[element] += 1;
    }
    return counts;
});

const filteredList = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return [...jushiList]
        .filter((item) => {
            if (activeElement.value && !item.limit.includes(activeElement.value)) return false;
            if (!q) return true;
            return [item.name, ...item.limit, ...item.boss].join(" ").toLowerCase().includes(q);
        })
        .sort((a, b) => b.id - a.id);
});

function showDetail(item: JushiPeriod) {
    current.value = item;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.jushi-page {
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

.period-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.period-card {
    padding: 16px 18px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
}

.period-top,
.modal-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 12px;
}

.modal-title {
    margin-bottom: 0;
}

.period-name {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
}

.limit-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.limit-tag {
    padding: 2px 8px;
    border: 1px solid;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.6;
}

.boss-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}

.floor-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.boss-cell {
    padding: 10px 12px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    min-width: 0;
}

.boss-floor {
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.35);
}

.boss-units {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.boss-unit {
    font-size: 13px;
    line-height: 1.45;
    color: rgba(0, 0, 0, 0.88);
    overflow-wrap: anywhere;
}

.saint-block {
    margin-top: 10px;
    padding: 10px 12px;
    background: #fff8eb;
    border: 1px solid #f0d7a2;
    border-radius: 8px;
}

.saint-label {
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #ad6800;
}

.boss-cell.is-saint {
    background: #fff;
    border-color: #f0d7a2;

    .boss-floor {
        color: #ad6800;
    }
}

.empty {
    padding: 48px 0;
}

@media screen and (max-width: 1100px) {
    .floor-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 768px) {

    .boss-grid,
    .floor-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<style lang="less">
.jushi-detail-modal {
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
