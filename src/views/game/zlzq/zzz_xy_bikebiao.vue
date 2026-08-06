<template>
    <div class="bikebiao">
        <header class="page-header">
            <div>
                <h1 class="page-title">提升曲线</h1>
                <p class="page-sub">星宿战力周更走势 · 共 {{ timeList.length }} 周</p>
            </div>
            <a-radio-group v-model:value="mode" button-style="solid" size="small" @change="renderChart">
                <a-radio-button value="total">累计战力</a-radio-button>
                <a-radio-button value="delta">周提升</a-radio-button>
            </a-radio-group>
        </header>

        <div class="chart-card">
            <div ref="chartRef" class="chart" />
        </div>

        <div class="stat-row">
            <div v-for="item in latestStats" :key="item.name" class="stat-item">
                <span class="dot" :style="{ background: item.color }" />
                <span class="name">{{ item.name }}</span>
                <span class="value">{{ formatNum(item.value) }}</span>
                <span class="delta" :class="{ up: item.delta > 0 }">
                    {{ item.delta > 0 ? "+" : "" }}{{ formatNum(item.delta) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";

type Mode = "total" | "delta";

interface PlayerSeries {
    name: string;
    data: number[];
}

const COLORS = [
    "#3860f4",
    "#13c2c2",
    "#52c41a",
    "#fa8c16",
    "#eb2f96",
    "#722ed1",
    "#faad14",
    "#2f54eb",
    "#f5222d",
];

const timeList = [
    "3.26", "4.02", "4.09", "4.16", "4.23", "4.30", "5.07", "5.14", "5.21", "5.28",
    "6.04", "6.11", "6.18", "6.25", "7.02", "7.09", "7.16", "7.23", "7.30", "8.06",
    "8.13", "8.20", "8.27", "9.03", "9.10", "9.17", "9.24", "10.01", "10.08", "10.15",
    "10.22", "10.28", "11.04", "11.11", "11.18", "11.25", "12.02", "12.09", "12.16", "12.23",
    "12.30", "1.06", "1.13", "1.20", "1.27",
];

const dataList: PlayerSeries[] = [
    {
        name: "KB",
        data: [
            4105.48, 4286.69, 4425.78, 4480.66, 4585.56, 4655.85, 4705.02, 4743.24, 4788.86, 4816.45,
            4974.67, 5007.57, 5027.14, 5104.83, 5132.28, 5261.63, 5355.67, 5458.09, 5516.04, 5625.79,
            5740.82, 5816.10, 5893.24, 5984.85, 6186.70, 6218.23, 6220.88, 6347.95, 6478.73, 6491.09,
            6541.82, 6747.74, 6790.43, 6852.34, 6873.45, 6933.33, 7010.85, 7077.71, 7302.01, 7415.71,
            7497.71, 7637.72, 7814.42, 7897.24, 8081.41,
        ],
    },
    {
        name: "核桃",
        data: [
            2714.10, 2837.39, 2933.24, 3025.70, 3116.11, 3219.65, 3295.31, 3384.29, 3486.75, 3555.98,
            3689.44, 3700.04, 3845.62, 3909.80, 4008.64, 4166.56, 4269.90, 4336.15, 4474.85, 4553.30,
            4610.07, 4642.44, 4720.07, 4841.40, 4902.64, 4966.95, 5054.05, 5208.34, 5389.79, 5488.79,
            5542.74, 5614.77, 5736.88, 5758.96, 5867.53, 5949.42, 6013.40, 6078.39, 6164.53, 6193.87,
            6276.59, 6437.03, 6477.92, 6580.51, 6675.65,
        ],
    },
    {
        name: "企鹅",
        data: [
            2533.85, 2583.90, 2669.66, 2751.45, 2834.62, 2891.61, 2995.59, 3064.44, 3112.05, 3150.21,
            3296.31, 3328.25, 3408.13, 3477.04, 3620.78, 3702.88, 3813.98, 3933.57, 3973.28, 4067.42,
            4118.60, 4152.05, 4183.57, 4217.31, 4282.16, 4307.91, 4350.35, 4448.94, 4542.31, 4648.11,
            4697.58, 4755.44, 4810.99, 4874.88, 4929.13, 4998.01, 5070.20, 5109.03, 5211.64, 5270.96,
            5334.18, 5606.43, 5684.79, 5801.00, 5863.17,
        ],
    },
    {
        name: "古月",
        data: [
            1754.54, 1807.91, 1898.15, 1988.53, 2048.24, 2202.23, 2266.44, 2314.00, 2373.65, 2444.29,
            2540.22, 2630.54, 2700.32, 2757.84, 2974.90, 2993.34, 3031.63, 3102.75, 3172.19, 3241.27,
            3265.49, 3304.29, 3389.17, 3452.29, 3451.43, 3500.39, 3554.77, 3646.90, 3767.04, 3803.46,
            3890.63, 3911.39, 4022.19, 4059.83, 4130.34, 4190.05, 4330.19, 4379.85, 4411.20, 4486.28,
            4643.08, 4731.89, 4783.71, 4849.10, 4891.55,
        ],
    },
    {
        name: "老王",
        data: [
            2136.24, 2177.06, 2239.66, 2286.73, 2312.25, 2349.03, 2331.01, 2393.77, 2449.33, 2481.29,
            2590.76, 2611.19, 2644.18, 2690.08, 2752.87, 2825.15, 2863.34, 2945.47, 2985.01, 3027.06,
            3077.64, 3120.20, 3212.08, 3286.13, 3330.11, 3365.46, 3403.85, 3457.06, 3572.42, 3591.50,
            3642.45, 3674.58, 3720.99, 3773.02, 3800.88, 3850.17, 3974.70, 3985.02, 4108.77, 4138.97,
            4167.93, 4255.44, 4304.69, 4331.67, 4352.42,
        ],
    },
    {
        name: "索拉",
        data: [
            1735.94, 1784.54, 1858.70, 1924.25, 1959.98, 2001.86, 2076.52, 2125.23, 2182.65, 2251.59,
            2323.62, 2347.25, 2411.78, 2442.04, 2546.98, 2585.02, 2681.72, 2747.97, 2823.96, 2874.46,
            2923.21, 2971.85, 3047.31, 3128.47, 3181.34, 3246.93, 3297.31, 3383.09, 3424.73, 3479.46,
            3574.39, 3618.91, 3680.46, 3752.07, 3842.74, 3820.70, 3929.29, 3968.37, 4046.54, 4124.06,
            4181.27, 4291.67, 4331.79, 4395.68, 4418.95,
        ],
    },
    {
        name: "阿奎",
        data: [
            1350.52, 1403.20, 1458.52, 1491.20, 1546.16, 1638.29, 1697.73, 1769.07, 1831.97, 1898.56,
            1947.33, 2006.80, 2089.19, 2188.01, 2204.24, 2299.63, 2359.66, 2405.04, 2449.79, 2517.00,
            2594.18, 2660.84, 2717.22, 2815.78, 2885.14, 2936.84, 2985.11, 3101.70, 3207.58, 3261.13,
            3330.48, 3381.69, 3455.08, 3506.23, 3571.98, 3620.31, 3674.07, 3716.53, 3806.82, 3868.11,
            3915.21, 3978.64, 4038.15, 4074.70, 4102.85,
        ],
    },
    {
        name: "老杜",
        data: [
            1726.42, 1782.70, 1853.62, 1903.20, 1943.61, 1973.62, 2056.90, 2082.54, 2149.00, 2192.56,
            2238.88, 2256.11, 2353.69, 2412.55, 2446.07, 2523.49, 2568.04, 2628.71, 2667.57, 2708.53,
            2761.74, 2805.74, 2863.24, 2917.67, 2974.05, 3015.49, 3057.63, 3101.62, 3206.66, 3245.44,
            3275.95, 3320.81, 3380.65, 3405.28, 3498.62, 3534.75, 3611.51, 3651.28, 3688.53, 3767.62,
            3813.98, 3902.11, 3955.19, 3990.11, 4059.42,
        ],
    },
    {
        name: "星空",
        data: [
            1446.65, 1474.83, 1538.65, 1561.57, 1632.43, 1669.84, 1702.67, 1754.62, 1794.74, 1872.24,
            1951.83, 1960.85, 2034.85, 2066.65, 2174.08, 2227.43, 2277.76, 2336.49, 2414.43, 2503.16,
            2563.65, 2616.43, 2643.29, 2700.20, 2749.51, 2785.12, 2856.37, 2890.95, 2922.07, 2982.34,
            3024.90, 3091.75, 3140.73, 3209.40, 3231.05, 3299.38, 3367.30, 3420.26, 3461.59, 3512.73,
            3613.09, 3698.72, 3745.54, 3835.63, 3890.73,
        ],
    },
];

const mode = ref<Mode>("total");
const chartRef = ref<HTMLElement | null>(null);
const chart = shallowRef<ECharts | null>(null);

function formatNum(n: number) {
    return Number(n || 0).toLocaleString("zh-CN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

function toDelta(data: number[]) {
    return data.map((v, i) => (i === 0 ? 0 : Number((v - data[i - 1]).toFixed(2))));
}

const latestStats = computed(() =>
    dataList.map((item, index) => {
        const last = item.data.length - 1;
        const value = item.data[last] ?? 0;
        const prev = item.data[last - 1] ?? value;
        return {
            name: item.name,
            color: COLORS[index % COLORS.length],
            value,
            delta: Number((value - prev).toFixed(2)),
        };
    })
);

function buildOption(): EChartsOption {
    const isDelta = mode.value === "delta";
    return {
        color: COLORS,
        animationDuration: 500,
        legend: {
            type: "scroll",
            top: 8,
            left: "center",
            icon: "roundRect",
            itemWidth: 12,
            itemHeight: 8,
            textStyle: { color: "#595959", fontSize: 12 },
        },
        grid: {
            top: 52,
            left: 16,
            right: 24,
            bottom: 56,
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#f0f0f0",
            borderWidth: 1,
            textStyle: { color: "#1f1f1f", fontSize: 12 },
            axisPointer: {
                type: "cross",
                crossStyle: { color: "#bfbfbf" },
                lineStyle: { color: "#bfbfbf", type: "dashed" },
            },
            formatter(params: any) {
                const list = Array.isArray(params) ? params : [params];
                if (!list.length) return "";
                const title = list[0].axisValueLabel ?? list[0].name;
                const rows = list
                    .slice()
                    .sort((a: any, b: any) => Number(b.value) - Number(a.value))
                    .map(
                        (p: any) =>
                            `<div style="display:flex;justify-content:space-between;gap:24px;margin-top:4px">
                                <span>${p.marker}${p.seriesName}</span>
                                <b>${formatNum(Number(p.value))}</b>
                            </div>`
                    )
                    .join("");
                return `<div style="font-weight:600;margin-bottom:4px">${title}</div>${rows}`;
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: timeList,
            axisLine: { lineStyle: { color: "#d9d9d9" } },
            axisTick: { show: false },
            axisLabel: {
                color: "#8c8c8c",
                hideOverlap: true,
                showMinLabel: true,
                showMaxLabel: true,
            },
        },
        yAxis: {
            type: "value",
            name: isDelta ? "周提升" : "累计战力",
            nameTextStyle: { color: "#8c8c8c", padding: [0, 0, 0, 8] },
            splitLine: { lineStyle: { color: "#f0f0f0", type: "dashed" } },
            axisLabel: {
                color: "#8c8c8c",
                formatter: (v: number) => formatNum(v),
            },
        },
        dataZoom: [
            { type: "inside", start: 0, end: 100 },
            {
                type: "slider",
                height: 18,
                bottom: 10,
                borderColor: "transparent",
                backgroundColor: "#f5f5f5",
                fillerColor: "rgba(56,96,244,0.18)",
                handleStyle: { color: "#3860f4", borderColor: "#3860f4" },
                moveHandleStyle: { color: "#3860f4" },
                textStyle: { color: "#8c8c8c" },
                showDetail: false,
            },
        ],
        series: dataList.map((item) => ({
            name: item.name,
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            sampling: "lttb",
            lineStyle: { width: 2 },
            emphasis: { focus: "series", scale: true },
            data: isDelta ? toDelta(item.data) : item.data,
        })),
    };
}

function renderChart() {
    if (!chart.value) return;
    chart.value.setOption(buildOption(), true);
}

function handleResize() {
    chart.value?.resize();
}

onMounted(async () => {
    await nextTick();
    if (!chartRef.value) return;
    chart.value = echarts.init(chartRef.value);
    renderChart();
    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    chart.value?.dispose();
    chart.value = null;
});
</script>

<style lang="less" scoped>
.bikebiao {
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --line: #f0f0f0;

    box-sizing: border-box;
    height: calc(100vh - 140px);
    padding: 12px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    color: var(--text);
}

.page-header {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 650;
    line-height: 1.2;
}

.page-sub {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.2;
}

.chart-card {
    flex: 1;
    min-height: 0;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
}

.chart {
    width: 100%;
    height: 100%;
}

.stat-row {
    flex: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 8px;
}

.stat-item {
    display: grid;
    grid-template-columns: 8px 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 8px;
    row-gap: 2px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #fff;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    grid-row: 1 / span 2;
}

.name {
    font-size: 12px;
    color: var(--muted);
}

.value {
    grid-column: 2;
    font-size: 15px;
    font-weight: 650;
}

.delta {
    grid-column: 3;
    grid-row: 1 / span 2;
    font-size: 12px;
    color: var(--muted);

    &.up {
        color: #389e0d;
    }
}

@media screen and (max-width: 768px) {
    .bikebiao {
        height: calc(100vh - 120px);
        padding: 8px;
        gap: 8px;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .stat-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        max-height: 140px;
        overflow: auto;
    }
}
</style>
