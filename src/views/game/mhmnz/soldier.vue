<template>
    <div class="soldierList">
        <div class="page-header">
            <div class="title">兵种列表</div>
            <div class="result-tip">共 {{ total }} 条</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" :model="formState" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="formState.name" allow-clear placeholder="请输入名称" style="width: 180px"
                        @pressEnter="selectList" />
                </a-form-item>
                <a-form-item label="职业">
                    <a-select v-model:value="formState.type" allow-clear placeholder="全部职业" style="width: 140px"
                        :options="jobOptions" />
                </a-form-item>
                <a-form-item label="SP">
                    <a-select v-model:value="formState.sp" allow-clear placeholder="全部" style="width: 110px"
                        :options="spOptions" />
                </a-form-item>
                <a-form-item class="search-actions-item">
                    <a-space>
                        <a-button type="primary" @click="selectList">查询</a-button>
                        <a-button @click="reset">重置</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </div>
        <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="{ pageSize, currentPage, total }"
            @detail="showDetail" @change-page="changePage" />
        <a-modal v-model:open="visible" :footer="null" destroyOnClose centered width="680px"
            wrap-class-name="soldier-detail-modal" :title="null">
            <template v-if="current">
                <div class="detail-head">
                    <div class="detail-name-row">
                        <span class="detail-name">{{ current.name }}</span>
                        <a-tag color="blue">{{ jobName(current.type) }}</a-tag>
                        <a-tag v-if="current.isSp" color="gold">SP</a-tag>
                    </div>
                    <div class="detail-meta">ID {{ current.id }}</div>
                </div>
                <div class="attr-grid">
                    <div class="attr-card">
                        <div class="attr-label">生命</div>
                        <div class="attr-value">{{ current.attribute[0] }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">攻击</div>
                        <div class="attr-value">{{ current.attribute[1] }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">防御</div>
                        <div class="attr-value">{{ current.attribute[2] }}</div>
                    </div>
                    <div class="attr-card">
                        <div class="attr-label">魔防</div>
                        <div class="attr-value">{{ current.attribute[3] }}</div>
                    </div>
                </div>
                <div class="detail-block">
                    <div class="block-title">兵种效果</div>
                    <div class="block-body">{{ current.skill }}</div>
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
import { job } from "@/utils/mhmnz/func";
import { soldierData, type Soldier } from "@/utils/mhmnz/soldier";
import MyTabel from "@/components/table.vue";

interface Row extends Soldier {
    key: number;
    jobName: string;
    life: number;
    att: number;
    def: number;
    mof: number;
    isSp: boolean;
    spText: string;
}

const formState = reactive<{
    name: string;
    type: number | undefined;
    sp: number | undefined;
}>({
    name: "",
    type: undefined,
    sp: undefined,
});

const currentPage = ref(1);
const pageSize = ref(15);
const visible = ref(false);
const current = ref<Row | null>(null);

const jobOptions = job.map((label, index) => ({
    label,
    value: index + 1,
}));

const spOptions = [
    { label: "仅SP", value: 1 },
    { label: "仅非SP", value: 0 },
];

const isSp = (id: number) => id % 10 === 1;
const jobName = (type: number) => job[type - 1] ?? String(type);

const allRows = computed<Row[]>(() =>
    soldierData.map((item) => ({
        ...item,
        key: item.id,
        jobName: jobName(item.type),
        life: item.attribute[0],
        att: item.attribute[1],
        def: item.attribute[2],
        mof: item.attribute[3],
        isSp: isSp(item.id),
        spText: isSp(item.id) ? "是" : "否",
    }))
);

const filteredRows = computed(() => {
    const name = formState.name.trim().toLowerCase();
    return allRows.value.filter((item) => {
        if (name && !item.name.toLowerCase().includes(name)) return false;
        if (formState.type != null && item.type !== formState.type) return false;
        if (formState.sp === 1 && !item.isSp) return false;
        if (formState.sp === 0 && item.isSp) return false;
        return true;
    });
});

const total = computed(() => filteredRows.value.length);

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredRows.value.slice(start, start + pageSize.value);
});

const columns = [
    { title: "序号", key: "index", align: "center", width: 60 },
    { title: "名称", dataIndex: "name", key: "name", width: 140 },
    { title: "职业", dataIndex: "jobName", key: "jobName", width: 80 },
    { title: "SP", dataIndex: "spText", key: "spText", width: 60 },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 70,
        sorter: (a: Row, b: Row) => a.life - b.life,
    },
    {
        title: "攻击",
        dataIndex: "att",
        key: "att",
        width: 70,
        sorter: (a: Row, b: Row) => a.att - b.att,
    },
    {
        title: "防御",
        dataIndex: "def",
        key: "def",
        width: 70,
        sorter: (a: Row, b: Row) => a.def - b.def,
    },
    {
        title: "魔防",
        dataIndex: "mof",
        key: "mof",
        width: 70,
        sorter: (a: Row, b: Row) => a.mof - b.mof,
    },
    { title: "效果", dataIndex: "skill", key: "skill", width: 360 },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail"],
        width: 110,
    },
];

function selectList() {
    currentPage.value = 1;
}

function reset() {
    formState.name = "";
    formState.type = undefined;
    formState.sp = undefined;
    selectList();
}

function changePage(page: number, size: number) {
    currentPage.value = page;
    pageSize.value = size;
}

function showDetail(_type: string, record: Row) {
    current.value = record;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.soldierList {
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
        padding: 14px 16px 4px;
        background: #fafafa;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
    }

    .searchHead {
        row-gap: 8px;

        :deep(.ant-form-item) {
            margin-bottom: 10px;
            margin-inline-end: 16px;
        }

        :deep(.ant-form-item-label > label) {
            color: rgba(0, 0, 0, 0.65);
        }

        .search-actions-item {
            margin-inline-end: 0;
        }
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
}

.attr-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
.soldier-detail-modal {
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
