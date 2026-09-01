<template>
    <div class="main">
        <header class="page-header">
            <h1 class="page-title">卡牌列表</h1>
            <p class="page-sub">
                共 {{ tableData.length }} 张 · 平均卡等 {{ allLevel }}
            </p>
        </header>
        <section class="search-panel">
            <a-form class="searchHead" :model="formState" autocomplete="off" layout="inline">
                <a-form-item label="名称" class="search-item">
                    <a-input v-model:value="formState.name" class="form-control" placeholder="输入名称" allow-clear />
                </a-form-item>
                <a-form-item label="阵营" class="search-item">
                    <a-select v-model:value="formState.zhenyin" mode="multiple" class="form-control" placeholder="请选择阵营"
                        allow-clear>
                        <a-select-option v-for="item in zhenyinList" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="品质" class="search-item">
                    <a-select v-model:value="formState.quality" class="form-control" placeholder="请选择品质" allow-clear>
                        <a-select-option v-for="item in qualityList" :key="String(item.value)" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="费用" class="search-item">
                    <a-select v-model:value="formState.cost" class="form-control" placeholder="请选择费用" allow-clear>
                        <a-select-option v-for="item in costList" :key="String(item.value)" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="等级" class="search-item">
                    <a-select v-model:value="formState.level" class="form-control" placeholder="请选择等级" allow-clear>
                        <a-select-option v-for="item in levelList" :key="String(item.value)" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item class="search-item search-actions">
                    <a-button type="primary" size="small" @click="getList">查询</a-button>
                    <a-button size="small" @click="reset">重置</a-button>
                    <a-button size="small" :loading="exporting" @click="exportImage">导出图片</a-button>
                </a-form-item>
            </a-form>
        </section>
        <section ref="exportRef" class="summary-bar">
            <div class="summary-item" v-for="item in summaryRows" :key="item.label">
                <span class="summary-label">{{ item.label }}</span>
                <span class="summary-value">
                    {{ item.value }}
                    <em v-if="item.count != null">（{{ item.count }}张）</em>
                </span>
            </div>
        </section>
        <section class="table-wrap">
            <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="false"
                :rowClassName="(record) => `quality-row-${record.quality}`" />
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, h } from "vue";
import { message } from "ant-design-vue";
import { blueObj, purpleObj, goldObj, type Type } from "@/utils/global";
import html2canvas from "html2canvas";
import MyTabel from "@/components/table.vue";

interface Prop {
    cardData: any
}

const qualityMetaMap: Record<number, { label: string; color: string; bg: string }> = {
    0: { label: "白色", color: "#595959", bg: "#f5f5f5" },
    1: { label: "蓝色", color: "#1677ff", bg: "#e6f4ff" },
    2: { label: "紫色", color: "#722ed1", bg: "#f9f0ff" },
    3: { label: "橙色", color: "#d46b08", bg: "#fff7e6" },
};
const qualityConfigMap: Record<number, typeof blueObj> = {
    1: blueObj,
    2: purpleObj,
    3: goldObj,
};
const prop = defineProps<Prop>();
const exportRef = ref<HTMLElement | null>(null);
const exporting = ref(false);
const numSorter = (key: string) => (a: any, b: any) => Number(a[key]) - Number(b[key]);

function renderQualityTag(quality: number) {
    const meta = qualityMetaMap[quality] ?? {
        label: String(quality),
        color: "#595959",
        bg: "#f5f5f5",
    };
    return h(
        "span",
        {
            style: {
                display: "inline-block",
                minWidth: "40px",
                padding: "0 8px",
                borderRadius: "4px",
                color: meta.color,
                background: meta.bg,
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "22px",
                textAlign: "center",
            },
        },
        meta.label
    );
}

const columns = ref([
    { title: "序号", key: "index", align: "center", width: 60 },
    { title: "名称", dataIndex: "name", key: "name", width: 100 },
    {
        title: "阵营",
        dataIndex: "zhenyin",
        key: "zhenyin",
        width: 80,
        customRender: (opt: any) => zhenyinList.value.find((item) => item.value == opt.value)?.label,
    },
    {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        width: 80,
        customRender: (opt: any) => renderQualityTag(opt.value),
    },
    { title: "等级", dataIndex: "level", key: "level", width: 80, sorter: numSorter("level") },
    { title: "费用", dataIndex: "cost", key: "cost", width: 60, sorter: numSorter("cost") },
    {
        title: "钻石",
        key: "zuanshi",
        dataIndex: "zuanshi",
        width: 100,
        sorter: numSorter("zuanshi"),
        customRender: (opt: any) => formatAmount(Number(opt.value) || 0),
    },
    {
        title: "白石头消耗",
        key: "bai",
        dataIndex: "bai",
        width: 160,
        sorter: numSorter("bai"),
        customRender: (opt: any) => formatAmount(Number(opt.value) || 0),
    },
]);
const tableData = ref<any[]>([]);
const qualityList = [
    { label: "全部", value: "" },
    { label: "白色", value: 0 },
    { label: "蓝色", value: 1 },
    { label: "紫色", value: 2 },
    { label: "橙色", value: 3 },
];
const costList = [
    { label: "全部", value: "" },
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((v) => ({ label: `${v}费`, value: v })),
];
const levelList = [
    { label: "全部", value: "" },
    ...Array.from({ length: 13 }, (_, i) => 24 - i).map((v) => ({ label: `${v}级`, value: v })),
];
const zhenyinList = ref<Type[]>(
    prop.cardData.map((e: any) => ({
        label: e.name,
        value: e.value,
    }))
);
const formState = reactive({
    name: undefined as string | undefined,
    zhenyin: [] as any[],
    quality: undefined as number | string | undefined,
    level: undefined as number | undefined,
    cost: undefined as number | string | undefined,
});
const countBaishitou = ref(0);
const countHeishitou = ref(0);
const countZuanshi = ref(0);
const blueLevel = ref("0.00");
const purpleLevel = ref("0.00");
const goldLevel = ref("0.00");
const allLevel = ref("0.00");
const blueCount = ref(0);
const purpleCount = ref(0);
const goldCount = ref(0);

function getCostByQuality(quality: number, level: number) {
    const config = qualityConfigMap[quality]?.[level - 1];
    if (!config) return { hei: 0, bai: 0, zuanshi: 0 };
    return {
        hei: config.cailiao[2],
        bai: config.cailiao[3],
        zuanshi: config.zuanshi,
    };
}

function avgLevel(levels: number[]) {
    if (!levels.length) return "0.00";
    const sum = levels.reduce((acc, cur) => acc + cur, 0);
    return (sum / levels.length).toFixed(2);
}

function formatAmount(value: number) {
    if (value > 10000) return `${(value / 10000).toFixed(2)}w`;
    return String(value);
}

function getList() {
    countBaishitou.value = countHeishitou.value = countZuanshi.value = 0;
    const zhenyinSet = new Set(formState.zhenyin);
    const allData = prop.cardData
        .flatMap((faction: any) =>
            faction.data.flatMap((group: any[], qualityIndex: number) =>
                group.map((card: any) => ({
                    ...card,
                    zhenyin: faction.value,
                    quality: qualityIndex + 1,
                }))
            )
        )
        .filter((item: any) => {
            if (formState.name && !item.name.includes(formState.name)) return false;
            if (zhenyinSet.size > 0 && !zhenyinSet.has(item.zhenyin)) return false;
            if (formState.quality && item.quality != formState.quality) return false;
            if (formState.cost != undefined && formState.cost !== "" && item.cost != formState.cost) return false;
            if (formState.level && item.level != formState.level) return false;
            return true;
        });
    const blueLevels: number[] = [];
    const purpleLevels: number[] = [];
    const goldLevels: number[] = [];
    const allLevels: number[] = [];
    tableData.value = allData.map((item: any, index: number) => {
        const cost = getCostByQuality(item.quality, item.level);
        countBaishitou.value += cost.bai;
        countHeishitou.value += cost.hei;
        countZuanshi.value += cost.zuanshi;
        if (item.quality === 1) blueLevels.push(item.level);
        else if (item.quality === 2) purpleLevels.push(item.level);
        else if (item.quality === 3) goldLevels.push(item.level);
        allLevels.push(item.level);
        return {
            ...item,
            id: index + 1,
            bai: cost.bai,
            zuanshi: cost.zuanshi,
        };
    });
    blueCount.value = blueLevels.length;
    purpleCount.value = purpleLevels.length;
    goldCount.value = goldLevels.length;
    blueLevel.value = avgLevel(blueLevels);
    purpleLevel.value = avgLevel(purpleLevels);
    goldLevel.value = avgLevel(goldLevels);
    allLevel.value = avgLevel(allLevels);
}

function reset() {
    formState.zhenyin = [];
    formState.name = formState.quality = formState.cost = formState.level = undefined;
    getList();
}

async function exportImage() {
    if (!exportRef.value || !tableData.value.length) {
        message.warning("暂无数据可导出");
        return;
    }
    exporting.value = true;
    try {
        const canvas = await html2canvas(exportRef.value, {
            backgroundColor: "#ffffff",
            scale: 2,
        });
        const link = document.createElement("a");
        link.download = `卡牌统计_${tableData.value.length}张.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        message.success("导出成功");
    } catch {
        message.error("导出失败，请重试");
    } finally {
        exporting.value = false;
    }
}

const summaryRows = computed(() => [
    { label: "白石头", value: formatAmount(countBaishitou.value) },
    { label: "黑石头", value: formatAmount(countHeishitou.value) },
    { label: "钻石", value: formatAmount(countZuanshi.value) },
    { label: "蓝卡卡等", value: blueLevel.value, count: blueCount.value },
    { label: "紫卡卡等", value: purpleLevel.value, count: purpleCount.value },
    { label: "金卡卡等", value: goldLevel.value, count: goldCount.value },
    { label: "平均卡等", value: allLevel.value, count: blueCount.value + purpleCount.value + goldCount.value },
]);

onMounted(() => {
    getList();
});
</script>

<style lang="less" scoped>
.main {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --panel: #fafafa;

    padding: 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    color: var(--text);
}

.page-header {
    margin-bottom: 16px;
}

.page-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
}

.page-sub {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
}

.search-panel {
    margin-bottom: 16px;
    padding: 14px 16px 6px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
}

.searchHead {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
}

.search-item {
    margin-inline-end: 0 !important;
    margin-bottom: 8px !important;
}

.form-control {
    width: 140px;
}

.search-actions {
    :deep(.ant-form-item-control-input-content) {
        display: flex;
        gap: 8px;
    }
}

.summary-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 8px 0;
    margin-bottom: 16px;
    padding: 12px 8px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 1 0;
    min-width: 110px;
    padding: 0 14px;
    border-right: 1px solid var(--line);

    &:last-child {
        border-right: none;
    }
}

.summary-label {
    font-size: 12px;
    color: var(--muted);
}

.summary-value {
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;

    em {
        margin-left: 2px;
        font-style: normal;
        font-weight: 400;
        color: var(--muted);
        font-size: 12px;
    }
}

.table-wrap {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 12px;
}

@media screen and (max-width: 900px) {
    .summary-item {
        flex: 1 1 30%;
        border-right: none;
        padding: 6px 12px;
    }
}

@media screen and (max-width: 768px) {
    .form-control {
        width: 120px;
    }

    .summary-item {
        flex: 1 1 45%;
    }
}
</style>
