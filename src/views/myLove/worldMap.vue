<template>
    <div class="world-map-page" @contextmenu.prevent>
        <header class="page-header">
            <h2 class="page-title">游玩足迹地图</h2>
        </header>
        <div class="page-body">
            <div class="map-panel">
                <div id="allmap"></div>
                <div class="map-tools">
                    <a-slider v-model:value="level" :min="3" :max="21" :step="0.5" @change="changeSize"
                        @afterChange="afterChangeSize" />
                </div>
            </div>
            <aside class="side-panel">
                <section class="panel-card">
                    <div class="panel-card__head">游玩地点统计</div>
                    <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 3 }" size="small"
                        row-key="no">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                <a>{{ record.name }}</a>
                            </template>
                            <template v-else-if="column.key === 'action'">
                                <a-button size="small" type="link" @click="goPoint(record)">查看</a-button>
                            </template>
                        </template>
                    </a-table>
                </section>
                <section class="panel-card">
                    <div class="panel-card__head">景点城市统计</div>
                    <div ref="chartCityRef" class="panel-card__chart"></div>
                </section>
                <section class="panel-card">
                    <div class="panel-card__head">人次出行统计</div>
                    <div ref="chartFriendRef" class="panel-card__chart"></div>
                </section>
            </aside>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, nextTick, } from "vue";
import { init, type ECharts } from "echarts";
import type { ListType } from "./travel";
import { loadBMapGL } from "@/utils/loadBMapGL";
import { travelList, dataList } from "./travel";

interface TableRow extends ListType {
    no: number;
}

interface CountItem {
    name: string;
    count: number;
}

type ColumnDef = {
    title: string;
    dataIndex?: string;
    key: string;
    width: number;
};

type BMapGLInstance = {
    Map: new (container: string | HTMLElement) => BMapMap;
    Point: new (lng: number, lat: number) => unknown;
    Marker: new (point: unknown, opts?: object) => BMapOverlay;
    InfoWindow: new (content: string, opts?: object) => unknown;
    DistrictLayer: new (opts: {
        name: string;
        fillColor: string;
        strokeColor: string;
        fillOpacity: number;
        kind: number;
    }) => unknown;
};

type BMapMap = {
    centerAndZoom: (point: unknown, zoom: number) => void;
    enableScrollWheelZoom: () => void;
    setHeading: (heading: number) => void;
    setTilt: (tilt: number) => void;
    addDistrictLayer: (layer: unknown) => void;
    addOverlay: (overlay: BMapOverlay) => void;
    openInfoWindow: (infoWindow: unknown, point: unknown) => void;
    setZoom: (zoom: number) => void;
    getZoom: () => number;
    addEventListener: (event: string, handler: () => void) => void;
    removeEventListener: (event: string, handler: () => void) => void;
    clearOverlays: () => void;
    destroy?: () => void;
};

type BMapOverlay = {
    addEventListener: (event: string, handler: () => void) => void;
};

const MAP_CENTER = { lng: 118.868589, lat: 32.347434 };
const DEFAULT_ZOOM = 12;
const DISTRICT_CITIES = ["南京", "威海", "淄博"];
const DISTRICT_KIND = 1;
const BAR_COLORS = [
    "#5470C6", "#91CC75", "#FAC858", "#EE6666", "#73C0DE",
    "#3BA272", "#FC8452", "#9A60B4", "#EA7CCC", "#5470C6",
];
const WIDE_COLUMNS: ColumnDef[] = [
    { title: "序号", dataIndex: "no", key: "no", width: 90 },
    { title: "地点", dataIndex: "name", key: "name", width: 180 },
    { title: "城市", dataIndex: "city", key: "city", width: 120 },
    { title: "操作", key: "action", width: 120 },
];
const NARROW_COLUMNS: ColumnDef[] = [
    { title: "地点", dataIndex: "name", key: "name", width: 270 },
    { title: "操作", key: "action", width: 90 },
];
let BMapGL: BMapGLInstance;
let cancelled = false;
const flag = ref(true);
const level = ref<number>(DEFAULT_ZOOM);
const isWideScreen = ref(window.innerWidth >= 1500);
const map = ref<BMapMap | null>(null);
const chartCityRef = ref<HTMLElement | null>(null);
const chartFriendRef = ref<HTMLElement | null>(null);
const tableData = ref<TableRow[]>([]);
let chartCity: ECharts | null = null;
let chartFriend: ECharts | null = null;
let zoomEndHandler: (() => void) | null = null;

const columns = computed(() => (isWideScreen.value ? WIDE_COLUMNS : NARROW_COLUMNS));

function getTableData(): TableRow[] {
    return travelList.map((item, index) => ({
        no: index + 1,
        ...item,
    }));
}

function aggregateByField(list: ListType[], field: "city"): CountItem[] {
    const counts = new Map<string, number>();
    for (const item of list) {
        const key = item[field];
        if (!key) continue;
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
}

function getFriendCounts(): CountItem[] {
    const counts = new Map<string, number>();
    for (const item of travelList) {
        for (const group of item.friend) {
            for (const name of group.split("、")) {
                if (!name) continue;
                counts.set(name, (counts.get(name) ?? 0) + 1);
            }
        }
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
}

function topCounts(items: CountItem[], limit = 10) {
    return items
        .map(({ name, count }) => ({ name, value: count }))
        .sort((a, b) => b.value - a.value)
        .slice(0, limit);
}

function buildCityChartOption() {
    return {
        tooltip: { trigger: "item" },
        legend: {
            orient: "vertical",
            left: "left",
            show: isWideScreen.value,
        },
        series: [
            {
                name: "城市",
                type: "pie",
                radius: "70%",
                data: topCounts(aggregateByField(travelList, "city")),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
}

function buildFriendChartOption() {
    const data = topCounts(getFriendCounts());
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
        },
        xAxis: {
            type: "category",
            data: data.map((item) => item.name),
            axisLabel: { interval: 0 },
        },
        yAxis: { type: "value" },
        series: [
            {
                type: "bar",
                data: data.map((item, index) => ({
                    value: item.value,
                    itemStyle: { color: BAR_COLORS[index] },
                })),
                label: {
                    show: true,
                    position: "top",
                    color: "black",
                    fontSize: 10,
                },
            },
        ],
    };
}

function initCharts() {
    if (chartCityRef.value && !chartCity) {
        chartCity = init(chartCityRef.value);
    }
    if (chartFriendRef.value && !chartFriend) {
        chartFriend = init(chartFriendRef.value);
    }
    chartCity?.setOption(buildCityChartOption());
    chartFriend?.setOption(buildFriendChartOption());
}

function refreshCharts() {
    chartCity?.setOption(buildCityChartOption(), true);
    chartFriend?.setOption(buildFriendChartOption(), true);
}

function disposeCharts() {
    chartCity?.dispose();
    chartCity = null;
    chartFriend?.dispose();
    chartFriend = null;
}

function initMap() {
    map.value = new BMapGL.Map("allmap");
    map.value.centerAndZoom(new BMapGL.Point(MAP_CENTER.lng, MAP_CENTER.lat), DEFAULT_ZOOM);
    map.value.enableScrollWheelZoom();
    map.value.setHeading(0);
    map.value.setTilt(50);
    for (const city of DISTRICT_CITIES) {
        map.value.addDistrictLayer(
            new BMapGL.DistrictLayer({
                name: `(${city})`,
                fillColor: "#5e8bff",
                strokeColor: "#0000ff",
                fillOpacity: 0.1,
                kind: DISTRICT_KIND,
            })
        );
    }
}

function buildInfoContent(item: ListType) {
    const lines: string[] = [];
    for (let i = 0; i < item.time.length; i++) {
        lines.push(item.time[i], item.info[i], item.friend[i]);
    }
    return lines.join("<br>");
}

function setPoint() {
    if (!map.value) return;
    for (const item of dataList) {
        const point = new BMapGL.Point(item.lng, item.lat);
        const marker = new BMapGL.Marker(point);
        marker.addEventListener("click", () => {
            const infoWindow = new BMapGL.InfoWindow(buildInfoContent(item), {
                width: 240,
                title: item.name,
            });
            map.value?.openInfoWindow(infoWindow, new BMapGL.Point(item.lng, item.lat));
        });
        map.value.addOverlay(marker);
    }
}

function bindZoomSync() {
    if (!map.value) return;
    zoomEndHandler = () => {
        if (!flag.value || !map.value) return;
        window.setTimeout(() => {
            level.value = map.value?.getZoom() ?? level.value;
        }, 200);
    };
    map.value.addEventListener("zoomend", zoomEndHandler);
}

function changeSize(zoom: number) {
    flag.value = false;
    map.value?.setZoom(zoom);
}

function afterChangeSize() {
    flag.value = true;
}

function goPoint(record: TableRow) {
    map.value?.centerAndZoom(new BMapGL.Point(record.lng, record.lat), 15);
}

function handleResize() {
    isWideScreen.value = window.innerWidth >= 1500;
    refreshCharts();
    chartCity?.resize();
    chartFriend?.resize();
}

function destroyMap() {
    if (!map.value) return;
    if (zoomEndHandler) {
        map.value.removeEventListener("zoomend", zoomEndHandler);
        zoomEndHandler = null;
    }
    try {
        map.value.clearOverlays();
        map.value.destroy?.();
    } catch { }
    map.value = null;
}

onMounted(async () => {
    cancelled = false;
    tableData.value = getTableData();
    initCharts();
    window.addEventListener("resize", handleResize);
    BMapGL = await loadBMapGL() as BMapGLInstance;
    if (cancelled) return;
    await nextTick();
    if (cancelled) return;
    initMap();
    setPoint();
    bindZoomSync();
});

onUnmounted(() => {
    cancelled = true;
    window.removeEventListener("resize", handleResize);
    disposeCharts();
    destroyMap();
});
</script>

<style lang="less" scoped>
.world-map-page {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.page-header {
    flex-shrink: 0;
    padding: 12px 16px 0;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
}

.page-body {
    display: flex;
    flex: 1;
    min-height: 0;
    gap: 12px;
    padding: 12px 16px 16px;
}

.map-panel {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    overflow: hidden;
}

#allmap {
    width: 100%;
    height: 100%;
}

.map-tools {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 999;
    width: 100px;
    background: transparent;
}

.side-panel {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 30vw;
    min-width: 300px;
    max-width: 420px;
    min-height: 0;
    gap: 12px;
}

.panel-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    padding: 10px;
    border: 1px solid #1677ff;
    border-radius: 8px;
    overflow: hidden;
}

.panel-card__head {
    flex-shrink: 0;
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 1.4;
}

.panel-card__chart {
    flex: 1;
    min-height: 120px;
    width: 100%;
}

@media screen and (max-width: 768px) {
    .page-body {
        padding: 8px;
    }

    .side-panel {
        display: none;
    }
}
</style>
