<template>
    <div class="cailiao-page">
        <div class="page-header">
            <div class="title">材料列表</div>
            <div class="result-tip">共 {{ filteredMaterials.length }} / {{ cailiaoList.length }} 种</div>
        </div>

        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索怪物、材料或描述"
                        class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">类型：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeType === 0 }"
                        @click="activeType = 0">
                        全部
                    </button>
                    <button v-for="item in cailiaoTypes" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeType === item.id }"
                        :style="activeType === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeType = item.id">
                        {{ item.name }}
                        <span class="count">{{ typeCounts[item.id] }}</span>
                    </button>
                </div>
                <div class="filter-btn-group">
                    <span class="filter-btn-label">品质：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeQuality === '' }"
                        @click="activeQuality = ''">
                        全部
                    </button>
                    <button v-for="item in cailiaoQualities" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeQuality === item.id }"
                        :style="activeQuality === item.id ? { borderColor: item.color, color: item.color, background: item.color + '18' } : {}"
                        @click="activeQuality = item.id">
                        {{ item.name }}
                        <span class="count">{{ qualityCounts[item.id] }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="grouped.length" class="enemy-list">
            <section v-for="group in grouped" :key="group.enemy.id" class="enemy-block">
                <div class="enemy-head">
                    <span class="enemy-dot" :style="{ background: typeColor(group.enemy.type) }"></span>
                    <h2 class="enemy-title">{{ group.enemy.name }}</h2>
                    <span class="enemy-type" :style="{ color: typeColor(group.enemy.type) }">{{ group.enemy.typeName }}</span>
                    <span class="enemy-count">{{ group.materials.length }} 种</span>
                </div>
                <div class="unit-row">
                    <span v-for="unit in group.enemy.units" :key="unit" class="unit-tag">{{ unit }}</span>
                </div>
                <div class="spot-grid">
                    <article v-for="item in group.materials" :key="item.id" class="spot-card"
                        :style="{ borderLeftColor: qualityColor(item.quality) }" @click="showDetail(item)">
                        <div class="spot-top">
                            <span class="spot-quality" :style="{ color: qualityColor(item.quality) }">{{ item.qualityName }}</span>
                            <span class="spot-enemy">{{ item.enemyName }}</span>
                        </div>
                        <h3 class="spot-name">{{ item.name }}</h3>
                        <p class="spot-info">{{ item.info }}</p>
                    </article>
                </div>
            </section>
        </div>
        <a-empty v-else class="empty" description="没有匹配的材料" />

        <a-modal v-model:open="visible" :title="current?.name" :footer="null" destroyOnClose centered width="640px"
            wrap-class-name="cailiao-detail-modal">
            <template v-if="current">
                <div class="detail-meta">
                    <span class="detail-dot" :style="{ background: qualityColor(current.quality) }"></span>
                    {{ current.qualityName }} · {{ current.typeName }} · {{ current.enemyName }}
                </div>
                <p class="detail-info">{{ current.info }}</p>
                <div class="detail-units">
                    <span class="detail-units-label">掉落来源</span>
                    <span v-for="unit in currentUnits" :key="unit" class="unit-tag">{{ unit }}</span>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import {
    cailiaoEnemies,
    cailiaoList,
    cailiaoQualities,
    cailiaoTypes,
    type CailiaoItem,
    type CailiaoQuality,
    type CailiaoType,
} from "@/utils/sxsyyuanshen/cailiaoData";

const keyword = ref("");
const activeType = ref<0 | CailiaoType>(0);
const activeQuality = ref<"" | CailiaoQuality>("");
const visible = ref(false);
const current = ref<CailiaoItem | null>(null);

const typeColorMap = Object.fromEntries(cailiaoTypes.map((item) => [item.id, item.color]));
const qualityColorMap = Object.fromEntries(cailiaoQualities.map((item) => [item.id, item.color]));

const typeCounts = computed(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0 };
    for (const item of cailiaoList) counts[item.type] += 1;
    return counts;
});

const qualityCounts = computed(() => {
    const counts: Record<string, number> = { white: 0, green: 0, blue: 0, purple: 0 };
    for (const item of cailiaoList) counts[item.quality] += 1;
    return counts;
});

const filteredMaterials = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return cailiaoList.filter((item) => {
        if (activeType.value && item.type !== activeType.value) return false;
        if (activeQuality.value && item.quality !== activeQuality.value) return false;
        if (!q) return true;
        const enemy = cailiaoEnemies.find((e) => e.id === item.enemyId);
        return (
            item.name.toLowerCase().includes(q) ||
            item.info.toLowerCase().includes(q) ||
            item.enemyName.toLowerCase().includes(q) ||
            !!enemy?.units.some((unit) => unit.toLowerCase().includes(q))
        );
    });
});

const grouped = computed(() => {
    const byEnemy = new Map<number, CailiaoItem[]>();
    for (const item of filteredMaterials.value) {
        const list = byEnemy.get(item.enemyId) ?? [];
        list.push(item);
        byEnemy.set(item.enemyId, list);
    }
    return cailiaoEnemies
        .filter((enemy) => byEnemy.has(enemy.id))
        .map((enemy) => ({
            enemy,
            materials: byEnemy.get(enemy.id) ?? [],
        }));
});

const currentUnits = computed(() => {
    if (!current.value) return [];
    return cailiaoEnemies.find((enemy) => enemy.id === current.value!.enemyId)?.units ?? [];
});

function typeColor(type: CailiaoType) {
    return typeColorMap[type] ?? "#1677ff";
}

function qualityColor(quality: CailiaoQuality) {
    return qualityColorMap[quality] ?? "#1677ff";
}

function showDetail(item: CailiaoItem) {
    current.value = item;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.cailiao-page {
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

.enemy-list {
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.enemy-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.enemy-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
}

.enemy-title {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    color: rgba(0, 0, 0, 0.88);
}

.enemy-type,
.enemy-count {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
}

.unit-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
}

.unit-tag {
    font-size: 12px;
    line-height: 1;
    padding: 5px 8px;
    border-radius: 4px;
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.65);
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

.spot-quality {
    font-size: 12px;
    font-weight: 600;
}

.spot-enemy {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
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

.detail-units {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid #f0f0f0;
}

.detail-units-label {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 4px;
}
</style>

<style lang="less">
.cailiao-detail-modal {
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
