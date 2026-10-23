<template>
    <div class="unit-page">
        <div class="page-header">
            <div class="title">{{ title }}</div>
            <div class="result-tip">共 {{ total }} / {{ allRows.length }} 条</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="keyword" allow-clear placeholder="搜索单位或升级线" class="search-control" />
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">标签：</span>
                    <button type="button" class="filter-btn" :class="{ active: activeTag === 0 }" @click="activeTag = 0">
                        全部
                    </button>
                    <button v-for="item in tagFilters" :key="item.id" type="button" class="filter-btn"
                        :class="{ active: activeTag === item.id }" @click="activeTag = item.id">
                        {{ item.name }}
                    </button>
                </div>
            </div>
        </div>
        <a-table class="data-table" size="middle" bordered row-key="id" :columns="columns" :data-source="tableData"
            :pagination="false">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-else-if="column.key === 'name'">
                    <a @click.prevent="showDetail(record)">{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span class="tag-list">
                        <a-tag v-for="tag in record.tags" :key="tag" :color="tagColor(tag)"
                            :class="tagClass(tag)">{{ tagName(tag) }}</a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <a-button size="small" @click="showDetail(record)">查看详情</a-button>
                </template>
            </template>
        </a-table>
        <a-modal v-model:open="visible" :footer="null" destroyOnClose centered width="720px"
            wrap-class-name="dgsd-unit-detail-modal" :title="null">
            <template v-if="detail">
                <div v-if="detail.names.length > 1" class="detail-switch">
                    <span class="detail-switch-label">等级</span>
                    <button v-for="(name, index) in detail.names" :key="name" type="button" class="filter-btn"
                        :class="{ active: detailLevel === index }" @click="detailLevel = index">
                        {{ name }}
                    </button>
                </div>
                <div class="detail-head">
                    <div class="detail-name-row">
                        <span class="detail-name">{{ detail.name }}</span>
                        <a-tag v-for="tag in detail.tags" :key="tag" :color="tagColor(tag)"
                            :class="tagClass(tag)">{{ tagName(tag) }}</a-tag>
                    </div>
                    <div class="detail-meta">{{ detail.line }}</div>
                </div>
                <div class="attr-grid">
                    <div class="attr-card">
                        <div class="attr-label">生命</div>
                        <div class="attr-value">{{ detail.life }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">攻击</div>
                        <div class="attr-value">{{ detail.att }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">护甲</div>
                        <div class="attr-value">{{ detail.def }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">远程护甲</div>
                        <div class="attr-value">{{ detail.mof }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">移速</div>
                        <div class="attr-value">{{ detail.speed }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">视野</div>
                        <div class="attr-value">{{ detail.eyes }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">射程</div>
                        <div class="attr-value">{{ detail.shecheng }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">攻击间隔</div>
                        <div class="attr-value">{{ detail.attInterval }}</div>
                    </div>
                </div>
                <div class="detail-block">
                    <div class="block-title">花费 / 训练</div>
                    <div class="block-body">{{ detail.costText }} · {{ detail.time }} 秒</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">特殊能力</div>
                    <div class="block-body">{{ detail.skill }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">攻击加成</div>
                    <div class="block-body">{{ detail.bonus }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">升级花费</div>
                    <div class="block-body">{{ detail.level }}</div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { formatCost, lastOf, tagClass, tagColor, tagName, usedTags, type UnitLine } from "./func";

interface Row {
    id: number;
    name: string;
    names: string[];
    tags: number[];
    life: number;
    att: number;
    def: number;
    mof: number;
    speed: number;
    shecheng: number;
    costText: string;
    source: UnitLine;
}

const props = defineProps<{
    title: string;
    list: UnitLine[];
}>();

const keyword = ref("");
const activeTag = ref(0);
const visible = ref(false);
const current = ref<Row | null>(null);
const detailLevel = ref(0);
const tagFilters = computed(() => usedTags(props.list.map((item) => item.tag)));

const allRows = computed<Row[]>(() =>
    props.list.map((item) => ({
        id: item.id,
        name: lastOf(item.name),
        names: item.name,
        tags: item.tag,
        life: lastOf(item.life),
        att: lastOf(item.att),
        def: lastOf(item.def),
        mof: lastOf(item.mof),
        speed: lastOf(item.speed),
        shecheng: lastOf(item.shecheng),
        costText: formatCost(item.cost),
        source: item,
    }))
);

const detail = computed(() => {
    const row = current.value;
    if (!row) return null;
    const item = row.source;
    const index = Math.min(detailLevel.value, item.name.length - 1);
    return {
        names: item.name,
        name: item.name[index],
        tags: item.tag,
        line: item.name.join(" → "),
        life: item.life[index],
        att: item.att[index],
        def: item.def[index],
        mof: item.mof[index],
        speed: item.speed[index],
        eyes: item.eyes[index],
        shecheng: item.shecheng[index],
        attInterval: item.att_interval[index],
        time: item.time[index],
        costText: formatCost(item.cost),
        skill: displayText(item.skill[index]),
        bonus: displayText(item.bonus[index]),
        level: displayText(item.level[index]),
    };
});

const filteredRows = computed(() => {
    const q = keyword.value.trim().toLowerCase();
    return allRows.value.filter((item) => {
        if (activeTag.value && !item.tags.includes(activeTag.value)) return false;
        if (!q) return true;
        return item.names.some((name) => name.toLowerCase().includes(q));
    });
});

const total = computed(() => filteredRows.value.length);
const tableData = filteredRows;

const columns = [
    { title: "序号", key: "index", align: "center", width: 64 },
    { title: "名称", dataIndex: "name", key: "name", width: 160 },
    { title: "标签", key: "tags", width: 220 },
    { title: "生命", dataIndex: "life", key: "life", width: 72, sorter: (a: Row, b: Row) => a.life - b.life },
    { title: "攻击", dataIndex: "att", key: "att", width: 72, sorter: (a: Row, b: Row) => a.att - b.att },
    { title: "护甲", dataIndex: "def", key: "def", width: 72, sorter: (a: Row, b: Row) => a.def - b.def },
    { title: "远程护甲", dataIndex: "mof", key: "mof", width: 88, sorter: (a: Row, b: Row) => a.mof - b.mof },
    { title: "移速", dataIndex: "speed", key: "speed", width: 72, sorter: (a: Row, b: Row) => a.speed - b.speed },
    { title: "射程", dataIndex: "shecheng", key: "shecheng", width: 72, sorter: (a: Row, b: Row) => a.shecheng - b.shecheng },
    { title: "花费", dataIndex: "costText", key: "costText", width: 160 },
    { title: "操作", key: "action", align: "center", width: 110 },
];

function displayText(text: string) {
    return !text || text === "/" ? "—" : text;
}

function showDetail(record: Row) {
    current.value = record;
    const q = keyword.value.trim();
    const matched = q ? record.names.findIndex((name) => name.includes(q)) : -1;
    detailLevel.value = matched >= 0 ? matched : record.names.length - 1;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.unit-page {
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
    padding-top: 8px;
    border-top: 1px dashed #e8e8e8;
}

.filter-btn-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-btn-label,
.detail-switch-label {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
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

    &.active {
        border-color: #1677ff;
        color: #1677ff;
        background: #e6f4ff;
        font-weight: 600;
    }
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.data-table {
    background: #fff;
}

.detail-switch {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.detail-head {
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f0f0f0;

    .detail-name-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
    }

    .detail-name {
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.3;
    }

    .detail-meta {
        margin-top: 6px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
    }
}

.attr-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 16px;
}

.attr-card {
    text-align: center;
    padding: 12px 8px;
    background: #f7f8fa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
}

.attr-label {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 4px;
}

.attr-value {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
}

.detail-block {
    margin-bottom: 12px;
    padding: 12px 14px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;

    &:last-child {
        margin-bottom: 0;
    }
}

.block-title {
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 8px;
}

.block-body {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.85);
}
</style>

<style lang="less">
.dgsd-unit-detail-modal {
    .ant-modal-content {
        padding: 14px 48px 22px 24px;
        border-radius: 10px;
    }

    .ant-modal-close {
        top: 16px;
        inset-inline-end: 16px;
    }
}

.dgsd-tag-1.ant-tag { color: #1d4ed8; background: #eff6ff; border-color: #93c5fd; }
.dgsd-tag-2.ant-tag { color: #c2410c; background: #fff7ed; border-color: #fdba74; }
.dgsd-tag-3.ant-tag { color: #15803d; background: #f0fdf4; border-color: #86efac; }
.dgsd-tag-4.ant-tag { color: #6d28d9; background: #f5f3ff; border-color: #ddd6fe; }
.dgsd-tag-5.ant-tag { color: #7c2d12; background: #faf5f0; border-color: #e7c8a8; }
.dgsd-tag-6.ant-tag { color: #059669; background: #ecfdf5; border-color: #6ee7b7; }
.dgsd-tag-7.ant-tag { color: #7f1d1d; background: #fef2f2; border-color: #fca5a5; }
.dgsd-tag-8.ant-tag { color: #115e59; background: #f0fdfa; border-color: #5eead4; }
.dgsd-tag-9.ant-tag { color: #0369a1; background: #f0f9ff; border-color: #7dd3fc; }
.dgsd-tag-10.ant-tag { color: #e11d48; background: #fff1f2; border-color: #fecdd3; }
.dgsd-tag-11.ant-tag { color: #c026d3; background: #fdf4ff; border-color: #f0abfc; }
.dgsd-tag-12.ant-tag { color: #9d174d; background: #fdf2f8; border-color: #f9a8d4; }
.dgsd-tag-13.ant-tag { color: #155e75; background: #ecfeff; border-color: #67e8f9; }
.dgsd-tag-14.ant-tag { color: #78350f; background: #faf5f0; border-color: #d6b48a; }
.dgsd-tag-15.ant-tag { color: #4d7c0f; background: #f7fee7; border-color: #bef264; }
.dgsd-tag-16.ant-tag { color: #b45309; background: #fffbeb; border-color: #fcd34d; }
.dgsd-tag-17.ant-tag { color: #172554; background: #e0e7ff; border-color: #a5b4fc; }
.dgsd-tag-18.ant-tag { color: #0891b2; background: #ecfeff; border-color: #67e8f9; }
.dgsd-tag-19.ant-tag { color: #f5222d; background: #fff1f0; border-color: #ffa39e; }
.dgsd-tag-20.ant-tag { color: #ca8a04; background: #fefce8; border-color: #fde047; }
.dgsd-tag-21.ant-tag { color: #18181b; background: #fafafa; border-color: #a1a1aa; }
.dgsd-tag-22.ant-tag { color: #52525b; background: #f4f4f5; border-color: #d4d4d8; }
.dgsd-tag-23.ant-tag { color: #92400e; background: #fff7ed; border-color: #fdba74; }
.dgsd-tag-24.ant-tag { color: #312e81; background: #eef2ff; border-color: #a5b4fc; }
</style>
