<template>
    <div class="heroList">
        <div class="page-header">
            <div class="title">英雄列表</div>
            <div class="result-tip">共 {{ total }} 条</div>
        </div>
        <div class="search-panel">
            <a-form class="searchHead" layout="inline" :model="formState" autocomplete="off">
                <a-form-item label="名称">
                    <a-input v-model:value="formState.name" allow-clear placeholder="请输入名称" class="search-control"
                        @pressEnter="selectList" />
                </a-form-item>
                <a-form-item label="品质">
                    <a-select v-model:value="formState.quality" mode="multiple" allow-clear placeholder="全部品质"
                        class="search-control" :options="qualityOptions" :max-tag-count="2" />
                </a-form-item>
                <a-form-item label="阵营">
                    <a-select v-model:value="formState.zhenyin" mode="multiple" allow-clear placeholder="全部阵营"
                        class="search-control" :options="zhenyinOptions" :max-tag-count="2" />
                </a-form-item>
                <a-form-item label="职业">
                    <a-select v-model:value="formState.job" mode="multiple" allow-clear placeholder="全部职业"
                        class="search-control" :options="jobOptions" :max-tag-count="2" />
                </a-form-item>
                <a-form-item class="search-actions-item">
                    <a-space>
                        <a-button type="primary" @click="selectList">查询</a-button>
                        <a-button @click="reset">重置</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
            <div class="filter-btns">
                <div class="filter-btn-group">
                    <span class="filter-btn-label">SP：</span>
                    <button type="button" class="filter-btn" :class="{ active: formState.sp == null }"
                        @click="setSp(undefined)">
                        全部
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.sp === 1 }" @click="setSp(1)">
                        有SP
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.sp === 0 }" @click="setSp(0)">
                        无SP
                    </button>
                </div>
                <div class="filter-btn-group">
                    <span class="filter-btn-label">联动：</span>
                    <button type="button" class="filter-btn" :class="{ active: formState.liandong == null }"
                        @click="setLiandong(undefined)">
                        全部
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.liandong === 1 }"
                        @click="setLiandong(1)">
                        仅联动
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.liandong === 0 }"
                        @click="setLiandong(0)">
                        非联动
                    </button>
                </div>
                <div class="filter-btn-group">
                    <span class="filter-btn-label">专武：</span>
                    <button type="button" class="filter-btn" :class="{ active: formState.shenqi == null }"
                        @click="setShenqi(undefined)">
                        全部
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.shenqi === 1 }"
                        @click="setShenqi(1)">
                        有专武
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.shenqi === 0 }"
                        @click="setShenqi(0)">
                        无专武
                    </button>
                </div>
                <div class="filter-btn-group">
                    <span class="filter-btn-label">铸纹：</span>
                    <button type="button" class="filter-btn" :class="{ active: formState.zhuwen == null }"
                        @click="setZhuwen(undefined)">
                        全部
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.zhuwen === 1 }"
                        @click="setZhuwen(1)">
                        有铸纹
                    </button>
                    <button type="button" class="filter-btn" :class="{ active: formState.zhuwen === 0 }"
                        @click="setZhuwen(0)">
                        无铸纹
                    </button>
                </div>
            </div>
        </div>
        <a-table class="data-table" size="middle" bordered row-key="key" :columns="columns" :data-source="tableData"
            :pagination="false">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                </template>
                <template v-else-if="column.key === 'formSwitch'">
                    <a-switch v-if="record.hasAlt" size="small" :checked="record.showingAlt"
                        :checked-children="record.altLabel" un-checked-children="原版"
                        @change="(checked: boolean) => setShowAlt(record.id, checked)" />
                    <span v-else class="muted">—</span>
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
        <a-modal v-model:open="visible" title="英雄详情" :footer="null" destroyOnClose centered width="720px"
            wrap-class-name="mhmnz-hero-detail-modal">
            <template v-if="current">
                <div v-if="current.hasAlt" class="detail-switch">
                    <span>形态</span>
                    <a-segmented :value="current.showingAlt ? 'alt' : 'base'" :options="[
                        { label: '原版', value: 'base' },
                        { label: current.altLabel, value: 'alt' },
                    ]" @change="(val: string | number) => setShowAlt(current!.id, val === 'alt')" />
                </div>
                <div class="detail-head">
                    <div class="detail-name-row">
                        <span class="detail-name">{{ current.name }}</span>
                        <a-tag color="purple">{{ current.qualityName }}</a-tag>
                        <a-tag v-if="current.isSp" color="gold">SP</a-tag>
                        <a-tag v-if="current.isLiandong" color="magenta">联动</a-tag>
                        <a-tag v-if="current.hasShenqi" color="cyan">专武</a-tag>
                        <a-tag v-if="current.hasZhuwen" color="geekblue">铸纹</a-tag>
                        <a-tag v-for="zy in current.zhenyinNames" :key="zy" color="blue">{{ zy }}</a-tag>
                    </div>
                    <div class="detail-meta">ID {{ current.id }} · 职业 {{ current.jobName }}</div>
                </div>

                <div class="detail-block">
                    <div class="block-title">天赋 · {{ current.talent[0] || "—" }}</div>
                    <div class="block-body">{{ current.talent[1] || "—" }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">铸纹 · {{ current.zhuwen[0] || "—" }}</div>
                    <div class="block-body">{{ current.zhuwen[1] || "暂无铸纹" }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">
                        专武 · {{ current.shenqi[0] || "—" }}
                        <span v-if="current.shenqi[1]" class="sub">（{{ current.shenqi[1] }}）</span>
                    </div>
                    <div class="block-body">{{ current.shenqi[2] || "暂无专武" }}</div>
                </div>
                <div class="detail-block">
                    <div class="block-title">羁绊</div>
                    <div class="block-body">
                        <div v-if="current.heart[0]"><strong>防御：</strong>{{ current.heart[0] }}</div>
                        <div v-if="current.heart[1]" style="margin-top: 8px">
                            <strong>攻击：</strong>{{ current.heart[1] }}
                        </div>
                        <div v-if="!current.heart.length">—</div>
                    </div>
                </div>
                <div class="detail-block">
                    <div class="block-title">皮肤</div>
                    <div class="block-body remark">
                        {{ current.skin.length ? current.skin.join("、") : "—" }}
                    </div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { job, quality, zhenyin } from "@/utils/mhmnz/func";
import { heroData, type Hero } from "@/utils/mhmnz/hero";

interface Row extends Hero {
    key: string;
    qualityName: string;
    zhenyinNames: string[];
    zhenyinText: string;
    jobName: string;
    talentName: string;
    isSp: boolean;
    hasAlt: boolean;
    showingAlt: boolean;
    altLabel: string;
    isLiandong: boolean;
    liandongText: string;
    hasShenqi: boolean;
    shenqiText: string;
    hasZhuwen: boolean;
    zhuwenText: string;
}

interface HeroGroup {
    id: number;
    base: Hero;
    alt?: Hero;
}

const formState = reactive<{
    name: string;
    quality: number[];
    zhenyin: number[];
    job: number[];
    sp: number | undefined;
    liandong: number | undefined;
    shenqi: number | undefined;
    zhuwen: number | undefined;
}>({
    name: "",
    quality: [],
    zhenyin: [],
    job: [],
    sp: undefined,
    liandong: undefined,
    shenqi: undefined,
    zhuwen: undefined,
});
const showAltMap = reactive<Record<number, boolean>>({});
const currentPage = ref(1);
const pageSize = ref(15);
const visible = ref(false);
const currentId = ref<number | null>(null);
const qualityOptions = quality.map((label, index) => ({ label, value: index + 1 }));
const zhenyinOptions = zhenyin.map((label, index) => ({ label, value: index + 1 }));
const jobOptions = job.map((label, index) => ({ label, value: index + 1 }));
const LIANDONG_EXCLUDE = new Set(["安杰丽卡", "冰渊凌御者", "醒觉者"]);
const qualityName = (q: number) => quality[q - 1] ?? String(q);
const jobNames = (jobs: number[]) => jobs.map((j) => job[j - 1] ?? String(j)).join("、");
const zhenyinNamesFn = (zys: number[]) => zys.map((z) => zhenyin[z - 1] ?? String(z));
const isSpHero = (item: Hero) => item.quality === 4 || /^SP/i.test(item.name);
const isLiandongHero = (item: Hero) => item.zhenyin.includes(10) && !LIANDONG_EXCLUDE.has(item.name.replace(/^SP/, ""));
const checkHasShenqi = (item: Hero) => Array.isArray(item.shenqi) && item.shenqi.length > 0;
const checkHasZhuwen = (item: Hero) => Array.isArray(item.zhuwen) && item.zhuwen.length > 0;

function toRow(item: Hero, group: HeroGroup, showingAlt: boolean): Row {
    const hasAlt = !!group.alt;
    const altLabel = group.alt ? isSpHero(group.alt) ? "SP" : qualityName(group.alt.quality) : "升格";
    return {
        ...item,
        key: String(group.id),
        qualityName: qualityName(item.quality),
        zhenyinNames: zhenyinNamesFn(item.zhenyin),
        zhenyinText: zhenyinNamesFn(item.zhenyin).join("、"),
        jobName: jobNames(item.job),
        talentName: item.talent[0] || "—",
        isSp: isSpHero(item),
        hasAlt,
        showingAlt: hasAlt && showingAlt,
        altLabel,
        isLiandong: isLiandongHero(item),
        liandongText: isLiandongHero(item) ? "是" : "否",
        hasShenqi: checkHasShenqi(item),
        shenqiText: item.shenqi[0] || "/",
        hasZhuwen: checkHasZhuwen(item),
        zhuwenText: checkHasZhuwen(item) ? "有" : "无",
    };
}

const heroGroups = computed<HeroGroup[]>(() => {
    const map = new Map<number, Hero[]>();
    for (const h of heroData) {
        if (!map.has(h.id)) map.set(h.id, []);
        map.get(h.id)!.push(h);
    }
    const groups: HeroGroup[] = [];
    for (const [id, list] of map) {
        const sorted = [...list].sort((a, b) => a.quality - b.quality);
        const best = sorted[sorted.length - 1];
        const base = sorted.find((h) => !isSpHero(h) && h !== best) ?? sorted.find((h) => h !== best) ?? sorted[0];
        const alt = best !== base ? best : undefined;
        groups.push({ id, base, alt });
    }
    return groups.sort((a, b) => b.id - a.id);
});

function matchHero(item: Hero, group: HeroGroup) {
    const name = formState.name.trim().toLowerCase();
    if (name) {
        const names = [group.base.name, group.alt?.name].filter(Boolean) as string[];
        if (!names.some((n) => n.toLowerCase().includes(name))) return false;
    }
    if (formState.quality.length && !formState.quality.includes(item.quality)) return false;
    if (formState.zhenyin.length && !item.zhenyin.some((z) => formState.zhenyin.includes(z))) return false;
    if (formState.job.length && !item.job.some((j) => formState.job.includes(j))) return false;
    if (formState.liandong === 1 && !isLiandongHero(item)) return false;
    if (formState.liandong === 0 && isLiandongHero(item)) return false;
    if (formState.shenqi === 1 && !checkHasShenqi(item)) return false;
    if (formState.shenqi === 0 && checkHasShenqi(item)) return false;
    if (formState.zhuwen === 1 && !checkHasZhuwen(item)) return false;
    if (formState.zhuwen === 0 && checkHasZhuwen(item)) return false;
    return true;
}

function preferAltForm(group: HeroGroup) {
    if (!group.alt) return false;
    if (showAltMap[group.id] !== undefined) return !!showAltMap[group.id];
    const nameQ = formState.name.trim().toLowerCase();
    if (nameQ && group.base.name.toLowerCase().includes(nameQ) && !group.alt.name.toLowerCase().includes(nameQ)) return false;
    return true;
}

const filteredRows = computed(() => {
    const rows: Row[] = [];
    for (const group of heroGroups.value) {
        if (formState.sp === 1 && !(group.alt && isSpHero(group.alt))) continue;
        if (formState.sp === 0 && group.alt && isSpHero(group.alt)) continue;
        const useAlt = preferAltForm(group);
        const active = useAlt && group.alt ? group.alt : group.base;
        if (!matchHero(active, group)) {
            if (group.alt && active === group.base && matchHero(group.alt, group)) {
                rows.push(toRow(group.alt, group, true));
                continue;
            }
            if (group.alt && active === group.alt && matchHero(group.base, group)) {
                rows.push(toRow(group.base, group, false));
                continue;
            }
            continue;
        }
        rows.push(toRow(active, group, useAlt));
    }
    return rows;
});

const total = computed(() => filteredRows.value.length);

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredRows.value.slice(start, start + pageSize.value);
});

const current = computed(() => {
    if (currentId.value == null) return null;
    const group = heroGroups.value.find((g) => g.id === currentId.value);
    if (!group) return null;
    const useAlt = preferAltForm(group);
    const item = useAlt && group.alt ? group.alt : group.base;
    return toRow(item, group, useAlt);
});

watch(total, () => {
    const maxPage = Math.max(1, Math.ceil(total.value / pageSize.value) || 1);
    if (currentPage.value > maxPage) currentPage.value = maxPage;
});

const columns = [
    { title: "序号", key: "index", align: "center" as const, width: 60 },
    { title: "名称", dataIndex: "name", key: "name", width: 140 },
    { title: "形态", key: "formSwitch", align: "center" as const, width: 110 },
    { title: "品质", dataIndex: "qualityName", key: "qualityName", width: 70 },
    { title: "联动", dataIndex: "liandongText", key: "liandongText", width: 60 },
    { title: "专武", dataIndex: "shenqiText", key: "shenqiText", width: 120 },
    { title: "铸纹", dataIndex: "zhuwenText", key: "zhuwenText", width: 60 },
    { title: "阵营", dataIndex: "zhenyinText", key: "zhenyinText", width: 160 },
    { title: "职业", dataIndex: "jobName", key: "jobName", width: 140 },
    { title: "天赋", dataIndex: "talentName", key: "talentName", width: 140 },
    { title: "操作", key: "action", align: "center" as const, width: 110 },
];

function setShowAlt(id: number, checked: boolean) {
    showAltMap[id] = checked;
}

function setSp(val: number | undefined) {
    formState.sp = val;
    selectList();
}

function setLiandong(val: number | undefined) {
    formState.liandong = val;
    selectList();
}

function setShenqi(val: number | undefined) {
    formState.shenqi = val;
    selectList();
}

function setZhuwen(val: number | undefined) {
    formState.zhuwen = val;
    selectList();
}

function selectList() {
    currentPage.value = 1;
}

function reset() {
    formState.name = "";
    formState.quality = [];
    formState.zhenyin = [];
    formState.job = [];
    formState.sp = formState.liandong = formState.shenqi = formState.zhuwen = undefined;
    selectList();
}

function showDetail(record: Row) {
    currentId.value = record.id;
    showAltMap[record.id] = record.showingAlt;
    visible.value = true;
}
</script>

<style lang="less" scoped>
.heroList {
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
        padding: 14px 16px 12px;
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

        .search-control {
            width: 180px;
        }

        .search-actions-item {
            margin-inline-end: 0;
        }
    }

    .filter-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 16px 28px;
        margin-top: 4px;
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
        padding: 7px 14px;
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
    }

    .data-table {
        :deep(.ant-table-thead > tr > th) {
            background: #fafafa;
        }
    }

    .pagination-bar {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
    }

    .muted {
        color: rgba(0, 0, 0, 0.25);
    }
}

.detail-switch {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
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

        .sub {
            font-weight: 400;
            color: rgba(0, 0, 0, 0.45);
        }
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
.mhmnz-hero-detail-modal {
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
