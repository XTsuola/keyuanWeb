<template>
    <div class="weaponList">
        <div class="page-header">
            <div class="title">神器列表</div>
            <div class="result-tip">共 {{ total }} 条</div>
        </div>
        <div class="search-panel">
            <div class="filter-bar">
                <span class="filter-group-label">名称</span>
                <a-input v-model:value="formState.name" size="small" allow-clear placeholder="请输入名称"
                    class="search-control" @pressEnter="selectList" />
                <a-button type="primary" size="small" @click="selectList">查询</a-button>
                <a-button size="small" @click="reset">重置</a-button>
                <span class="filter-group-label quality-label">品质</span>
                <button type="button" class="opt-chip" :class="{ active: formState.quality == null }"
                    @click="setQuality(undefined)">全部</button>
                <button v-for="item in qualityFilters" :key="item.id" type="button" class="opt-chip"
                    :class="{ active: formState.quality === item.id }" @click="setQuality(item.id)">
                    {{ item.label }}
                </button>
                <span class="filter-group-label quality-label">SP</span>
                <button type="button" class="opt-chip" :class="{ active: formState.sp == null }"
                    @click="setSp(undefined)">全部</button>
                <button type="button" class="opt-chip" :class="{ active: formState.sp === 1 }"
                    @click="setSp(1)">仅SP</button>
                <button type="button" class="opt-chip" :class="{ active: formState.sp === 0 }"
                    @click="setSp(0)">仅非SP</button>
            </div>
            <div class="filter-group">
                <span class="filter-group-label">类型</span>
                <div class="filter-group-opts">
                    <button type="button" class="opt-chip" :class="{ active: formState.category == null }"
                        @click="setCategory(undefined)">全部</button>
                    <button v-for="(label, index) in weaponType" :key="label" type="button" class="opt-chip"
                        :class="{ active: formState.category === index + 1 }" @click="setCategory(index + 1)">
                        {{ label }}
                    </button>
                </div>
            </div>
            <div class="filter-group">
                <span class="filter-group-label">兵种</span>
                <div class="filter-group-opts">
                    <button type="button" class="opt-chip" :class="{ active: !formState.job.length }"
                        @click="clearJob">全部</button>
                    <button v-for="(label, index) in weaponJob" :key="label" type="button" class="opt-chip"
                        :class="{ active: formState.job.includes(index + 1) }" @click="toggleJob(index + 1)">
                        {{ label }}
                    </button>
                </div>
            </div>
        </div>
        <a-table class="data-table" size="middle" bordered row-key="key" :columns="columns" :data-source="tableData"
            :pagination="false" :scroll="{ x: 1280 }">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                </template>
                <template v-else-if="column.key === 'typeText'">
                    <a-tag v-if="record.category === 5" color="gold">专属</a-tag>
                    <a-tag :color="typeColor(record.type)">{{ slotName(record.type) }}</a-tag>
                </template>
                <template v-else-if="column.key === 'qualityName'">
                    <a-tag :color="qualityColor(record.displayQuality)">{{ record.qualityName }}</a-tag>
                </template>
                <template v-else-if="column.key === 'jobName'">
                    <span class="tag-list">
                        <a-tag v-for="j in record.job" :key="j" :color="jobColor(j)">{{ jobLabel(j) }}</a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <a-button size="small" @click="showDetail(record)">查看详情</a-button>
                </template>
            </template>
        </a-table>
        <div class="pagination-bar">
            <a-pagination v-model:current="currentPage" v-model:page-size="pageSize"
                :pageSizeOptions="['15', '50', '100', '200', '500']" :total="total" show-size-changer
                :show-total="(n: number) => `共 ${n} 条`" />
        </div>
        <a-modal v-model:open="visible" :footer="null" destroyOnClose centered width="720px"
            wrap-class-name="weapon-detail-modal" :title="null">
            <template v-if="current">
                <div class="detail-head">
                    <div class="detail-name-row">
                        <span class="detail-name">{{ current.name }}</span>
                        <a-tag v-if="current.category === 5" color="gold">专属</a-tag>
                        <a-tag :color="typeColor(current.type)">{{ slotName(current.type) }}</a-tag>
                        <a-tag :color="qualityColor(current.displayQuality)">{{ current.qualityName }}</a-tag>
                        <a-tag v-if="current.isSp" color="gold">SP</a-tag>
                    </div>
                    <div class="detail-meta">ID {{ current.id }}</div>
                    <div class="tag-list detail-jobs">
                        <a-tag v-for="j in current.job" :key="j" :color="jobColor(j)">{{ jobLabel(j) }}</a-tag>
                    </div>
                </div>
                <div class="attr-grid">
                    <div v-for="item in attrItems" :key="item.label" class="attr-card">
                        <div class="attr-label">{{ item.label }}</div>
                        <div class="attr-value">{{ current.attribute[item.index] }}</div>
                    </div>
                </div>
                <div class="detail-block">
                    <div class="block-title">神器效果 · {{ current.skillName }}</div>
                    <div class="block-body">{{ current.skillDesc }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">介绍备注</div>
                    <div class="block-body remark">{{ current.remark || "—" }}</div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { weaponJob, weaponQuality, weaponType } from "@/utils/mhmnz/func";
import { weaponData, type Weapon } from "@/utils/mhmnz/weapon";

interface Row extends Weapon {
    key: string;
    isSp: boolean;
    displayQuality: number;
    qualityName: string;
    skillName: string;
    skillDesc: string;
    skillText: string;
    life: number;
    att: number;
    intel: number;
    def: number;
    mof: number;
    tec: number;
}

const formState = reactive<{
    name: string;
    category: number | undefined;
    quality: number | undefined;
    sp: number | undefined;
    job: number[];
}>({
    name: "",
    category: undefined,
    quality: undefined,
    sp: undefined,
    job: [],
});

const currentPage = ref(1);
const pageSize = ref(15);
const visible = ref(false);
const current = ref<Row | null>(null);
const qualityFilters = [
    { id: 5, label: "SP" },
    { id: 4, label: "SSR" },
    { id: 3, label: "SR" },
    { id: 2, label: "R" },
    { id: 1, label: "N" },
];
const attrItems = [
    { label: "生命", index: 0 },
    { label: "攻击", index: 1 },
    { label: "智力", index: 2 },
    { label: "防御", index: 3 },
    { label: "魔防", index: 4 },
    { label: "技巧", index: 5 },
];
const typeColors = ["blue", "green", "orange", "purple"];
const qualityColors = ["default", "blue", "purple", "gold", "magenta"];
const jobColors = ["blue", "cyan", "green", "geekblue", "orange", "gold", "volcano", "purple", "magenta", "red", "lime", "gold"];

const slotName = (type: number) => weaponType[type - 1] ?? String(type);
const qualityName = (q: number) => weaponQuality[q - 1] ?? String(q);
const typeColor = (type: number) => typeColors[type - 1] ?? "default";
const qualityColor = (q: number) => qualityColors[q - 1] ?? "default";
const jobLabel = (j: number) => weaponJob[j - 1] ?? String(j);
const jobColor = (j: number) => jobColors[j - 1] ?? "default";
const isSpWeapon = (item: { name: string }) => /^SP/i.test(item.name);
const groupKey = (item: { category: number; id: number }) => `${item.category}-${item.id}`;

function skillParts(skill: string[]) {
    const name = skill[0] || "—";
    const desc = skill[1] || (skill[0] ? "—" : "无神器效果");
    return {
        skillName: name,
        skillDesc: desc,
        skillText: skill[0] ? `${skill[0]}：${skill[1] || ""}` : "—",
    };
}

const allRows = computed<Row[]>(() =>
    [...weaponData].reverse().map((item, index) => {
        const skill = skillParts(item.skill);
        const isSp = isSpWeapon(item);
        const displayQuality = isSp ? 5 : item.quality;
        return {
            ...item,
            key: `${item.category}-${item.id}-${isSp ? "sp" : "base"}-${index}`,
            isSp,
            displayQuality,
            qualityName: qualityName(displayQuality),
            ...skill,
            life: item.attribute[0],
            att: item.attribute[1],
            intel: item.attribute[2],
            def: item.attribute[3],
            mof: item.attribute[4],
            tec: item.attribute[5],
        };
    })
);

function textMatch(item: Row, name: string) {
    return item.name.toLowerCase().includes(name) || item.skillText.toLowerCase().includes(name);
}

const filteredRows = computed(() => {
    const name = formState.name.trim().toLowerCase();
    const rows = allRows.value;
    const matchedGroups = new Set<string>();
    if (name) {
        for (const item of rows) {
            if (textMatch(item, name)) matchedGroups.add(groupKey(item));
        }
    }
    const qualityGroups = new Set<string>();
    if (formState.quality != null) {
        for (const item of rows) {
            if (item.displayQuality === formState.quality || item.quality === formState.quality) qualityGroups.add(groupKey(item));
        }
    }
    return rows.filter((item) => {
        if (name && !matchedGroups.has(groupKey(item))) return false;
        if (formState.category != null && item.category !== formState.category) return false;
        if (formState.quality != null && !qualityGroups.has(groupKey(item))) return false;
        if (formState.sp === 1 && !item.isSp) return false;
        if (formState.sp === 0 && item.isSp) return false;
        if (formState.job.length && !item.job.some((j) => formState.job.includes(j) || j === 12)) return false;
        return true;
    });
});

const total = computed(() => filteredRows.value.length);

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredRows.value.slice(start, start + pageSize.value);
});

const columns = [
    { title: "序号", key: "index", align: "center", width: 64, fixed: "left" },
    { title: "名称", dataIndex: "name", key: "name", width: 150, ellipsis: true, fixed: "left" },
    { title: "类型", dataIndex: "typeText", key: "typeText", width: 140 },
    { title: "品质", dataIndex: "qualityName", key: "qualityName", width: 80, align: "center" },
    { title: "兵种", dataIndex: "jobName", key: "jobName", width: 220 },
    { title: "生命", dataIndex: "life", key: "life", width: 72, sorter: (a: Row, b: Row) => a.life - b.life },
    { title: "攻击", dataIndex: "att", key: "att", width: 72, sorter: (a: Row, b: Row) => a.att - b.att },
    { title: "智力", dataIndex: "intel", key: "intel", width: 72, sorter: (a: Row, b: Row) => a.intel - b.intel },
    { title: "防御", dataIndex: "def", key: "def", width: 72, sorter: (a: Row, b: Row) => a.def - b.def },
    { title: "魔防", dataIndex: "mof", key: "mof", width: 72, sorter: (a: Row, b: Row) => a.mof - b.mof },
    { title: "技巧", dataIndex: "tec", key: "tec", width: 72, sorter: (a: Row, b: Row) => a.tec - b.tec },
    { title: "效果", dataIndex: "skillText", key: "skillText", ellipsis: true },
    { title: "操作", key: "action", align: "center", width: 110, fixed: "right" },
];

function selectList() {
    currentPage.value = 1;
}

function reset() {
    formState.name = "";
    formState.category = undefined;
    formState.quality = undefined;
    formState.sp = undefined;
    formState.job = [];
    selectList();
}

function setSp(value: number | undefined) {
    formState.sp = formState.sp === value ? undefined : value;
    selectList();
}

function setQuality(value: number | undefined) {
    formState.quality = value;
    selectList();
}

function setCategory(value: number | undefined) {
    formState.category = value;
    selectList();
}

function clearJob() {
    formState.job = [];
    selectList();
}

function toggleJob(id: number) {
    const index = formState.job.indexOf(id);
    if (index >= 0) formState.job.splice(index, 1);
    else formState.job.push(id);
    selectList();
}

function showDetail(record: Row) {
    current.value = record;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.weaponList {
    padding: 20px 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

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
        padding: 12px 16px 8px;
        background: #fafafa;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
        font-size: 13px;
    }

    .filter-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding-bottom: 10px;

        .filter-group-label {
            padding-top: 0;
        }

        .quality-label {
            margin-left: 12px;
        }
    }

    .filter-group {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 8px 0;
        border-top: 1px dashed #e8e8e8;
    }

    .filter-group-label {
        width: 36px;
        flex: none;
        padding-top: 4px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 24px;
    }

    .filter-group-opts {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }

    .search-control {
        width: 180px;
    }

    .opt-chip {
        appearance: none;
        height: 28px;
        padding: 0 10px;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        background: #fff;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.65);
        font-size: 13px;
        line-height: 1;
        transition: border-color 0.15s, color 0.15s, background 0.15s;

        &:hover {
            border-color: #d9d9d9;
            color: rgba(0, 0, 0, 0.88);
        }

        &.active {
            border-color: #1677ff;
            color: #1677ff;
            background: #f0f7ff;
        }
    }

    .data-table {
        :deep(.ant-table-thead > tr > th) {
            background: #fafafa;
        }
    }

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;

        :deep(.ant-tag) {
            margin: 0;
        }
    }

    .pagination-bar {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
    }
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

    .detail-jobs {
        margin-top: 10px;
    }
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    :deep(.ant-tag) {
        margin: 0;
    }
}

.attr-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 16px;

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
        font-size: 22px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
        font-variant-numeric: tabular-nums;
        line-height: 1.2;
    }
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
        white-space: pre-wrap;
        word-break: break-word;

        &.remark {
            color: rgba(0, 0, 0, 0.55);
        }
    }
}
</style>

<style lang="less">
.weapon-detail-modal {
    .ant-modal-content {
        padding: 20px 24px 22px;
        border-radius: 10px;
    }

    .ant-modal-close {
        top: 18px;
        inset-inline-end: 18px;
    }
}
</style>
