<template>
    <div class="world-map-page" @contextmenu.prevent>
        <header class="page-header">
            <h2 class="page-title">游玩足迹地图</h2>
            <span class="page-sub">共 {{ tableData.length }} 处足迹</span>
        </header>
        <div class="page-body">
            <div class="map-panel">
                <div ref="mapEl" class="map-canvas"></div>
                <div class="map-tools">
                    <a-slider v-model:value="level" :min="3" :max="21" :step="0.5" @change="changeSize"
                        @afterChange="afterChangeSize" />
                </div>
            </div>
            <aside class="side-panel">
                <section class="panel-card">
                    <div class="panel-card__head">游玩地点统计</div>
                    <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 5, size: 'small' }"
                        size="small" row-key="no" :custom-row="tableRowProps">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                <a @click.prevent="goPoint(record)">{{ record.name }}</a>
                            </template>
                            <template v-else-if="column.key === 'action'">
                                <a-button size="small" type="link" @click.stop="goPoint(record)">查看</a-button>
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
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { init, type ECharts } from "echarts";
import { travelList, dataList, type ListType } from "./travel";
import { loadBMapGL } from "@/utils/loadBMapGL";

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

type BMapPoint = unknown;

type BMapGLInstance = {
    Map: new (container: string | HTMLElement, opts?: object) => BMapMap;
    Point: new (lng: number, lat: number) => BMapPoint;
    Marker: new (point: BMapPoint, opts?: object) => BMapOverlay;
    Label: new (content: string, opts?: object) => BMapLabel;
    Size: new (width: number, height: number) => unknown;
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
    centerAndZoom: (point: BMapPoint, zoom: number) => void;
    enableScrollWheelZoom: () => void;
    enableAutoResize?: () => void;
    setHeading: (heading: number) => void;
    setTilt: (tilt: number) => void;
    setDisplayOptions: (opts: {
        poi?: boolean;
        poiText?: boolean;
        poiIcon?: boolean;
        overlay?: boolean;
        building?: boolean;
        indoor?: boolean;
        street?: boolean;
    }) => void;
    addDistrictLayer: (layer: unknown) => void;
    addOverlay: (overlay: BMapOverlay) => void;
    openInfoWindow: (infoWindow: unknown, point: BMapPoint) => void;
    setZoom: (zoom: number) => void;
    getZoom: () => number;
    addEventListener: (event: string, handler: () => void) => void;
    removeEventListener: (event: string, handler: () => void) => void;
    clearOverlays: () => void;
    destroy?: () => void;
};

type BMapOverlay = {
    addEventListener: (event: string, handler: () => void) => void;
    setLabel: (label: BMapLabel) => void;
};

type BMapLabel = {
    setStyle: (style: Record<string, string>) => void;
};

const MAP_CENTER = { lng: 118.868589, lat: 32.347434 };
const DEFAULT_ZOOM = 12;
const FOCUS_ZOOM = 16;
const DISTRICT_CITIES = ["南京", "威海", "淄博"];
const DISTRICT_KIND = 1;
const BAR_COLORS = ["#5470C6", "#91CC75", "#FAC858", "#EE6666", "#73C0DE", "#3BA272", "#FC8452", "#9A60B4", "#EA7CCC"];
const MAP_DISPLAY = {
    poi: true,
    poiText: true,
    poiIcon: true,
    overlay: true,
    building: true,
    indoor: true,
    street: true,
};
const LABEL_STYLE = {
    color: "#1677ff",
    backgroundColor: "rgba(255,255,255,0.92)",
    border: "1px solid #91caff",
    borderRadius: "4px",
    padding: "1px 6px",
    fontSize: "12px",
    fontWeight: "600",
    lineHeight: "18px",
};
const WIDE_COLUMNS: ColumnDef[] = [
    { title: "序号", dataIndex: "no", key: "no", width: 64 },
    { title: "地点", dataIndex: "name", key: "name", width: 180 },
    { title: "城市", dataIndex: "city", key: "city", width: 80 },
    { title: "操作", key: "action", width: 72 },
];
const NARROW_COLUMNS: ColumnDef[] = [
    { title: "地点", dataIndex: "name", key: "name", width: 220 },
    { title: "操作", key: "action", width: 72 },
];

let BMapGL: BMapGLInstance;
let cancelled = false;
let syncingZoom = true;
let mapInstance: BMapMap | null = null;
let chartCity: ECharts | null = null;
let chartFriend: ECharts | null = null;
let zoomEndHandler: (() => void) | null = null;
let tilesLoadedHandler: (() => void) | null = null;

const level = ref(DEFAULT_ZOOM);
const isWideScreen = ref(window.innerWidth >= 1500);
const mapEl = ref<HTMLElement | null>(null);
const chartCityRef = ref<HTMLElement | null>(null);
const chartFriendRef = ref<HTMLElement | null>(null);
const tableData = ref<TableRow[]>([]);
const columns = computed(() => (isWideScreen.value ? WIDE_COLUMNS : NARROW_COLUMNS));

function getTableData(): TableRow[] {
    return travelList.map((item, index) => ({
        no: index + 1,
        ...item,
    }));
}

function aggregateByCity(): CountItem[] {
    const counts = new Map<string, number>();
    for (const item of travelList) {
        if (!item.city) continue;
        counts.set(item.city, (counts.get(item.city) ?? 0) + 1);
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
                data: topCounts(aggregateByCity()),
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
                    itemStyle: { color: BAR_COLORS[index % BAR_COLORS.length] },
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

function applyMapDisplay() {
    mapInstance?.setDisplayOptions(MAP_DISPLAY);
}

function initMap() {
    if (!mapEl.value) return;
    mapInstance = new BMapGL.Map(mapEl.value);
    mapInstance.centerAndZoom(new BMapGL.Point(MAP_CENTER.lng, MAP_CENTER.lat), DEFAULT_ZOOM);
    mapInstance.enableScrollWheelZoom();
    mapInstance.enableAutoResize?.();
    mapInstance.setHeading(0);
    mapInstance.setTilt(50);
    applyMapDisplay();
    for (const city of DISTRICT_CITIES) {
        mapInstance.addDistrictLayer(
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

function parseVisitTime(text: string) {
    const match = text.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (!match) return Number.NEGATIVE_INFINITY;
    return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function visitsOf(item: ListType) {
    return item.time
        .map((time, i) => ({
            time,
            info: item.info[i] ?? "",
            friend: item.friend[i] ?? "",
            value: parseVisitTime(time),
        }))
        .sort((a, b) => b.value - a.value);
}

function getLatestPlace(list: ListType[]) {
    let latest: ListType | null = null;
    let latestTime = Number.NEGATIVE_INFINITY;
    for (const item of list) {
        for (const time of item.time) {
            const value = parseVisitTime(time);
            if (value >= latestTime) {
                latestTime = value;
                latest = item;
            }
        }
    }
    return latest;
}

function buildInfoContent(item: ListType) {
    return visitsOf(item)
        .map((visit) => {
            return `<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #f0f0f0">
                <div style="color:#1677ff;font-weight:600">${visit.time}</div>
                <div style="margin:4px 0">${visit.info}</div>
                <div style="color:rgba(0,0,0,.45);font-size:12px">${visit.friend}</div>
            </div>`;
        })
        .join("");
}

function openInfo(item: ListType, point: BMapPoint) {
    mapInstance?.openInfoWindow(
        new BMapGL.InfoWindow(buildInfoContent(item), {
            width: 260,
            title: item.name,
        }),
        point
    );
}

function setPoint() {
    if (!mapInstance) return;
    for (const item of dataList) {
        const point = new BMapGL.Point(item.lng, item.lat);
        const marker = new BMapGL.Marker(point);
        const label = new BMapGL.Label(item.name, {
            offset: new BMapGL.Size(18, -8),
        });
        label.setStyle(LABEL_STYLE);
        marker.setLabel(label);
        marker.addEventListener("click", () => openInfo(item, point));
        mapInstance.addOverlay(marker);
    }
}

function bindMapEvents() {
    if (!mapInstance) return;
    zoomEndHandler = () => {
        if (!syncingZoom || !mapInstance) return;
        window.setTimeout(() => {
            level.value = mapInstance?.getZoom() ?? level.value;
        }, 200);
    };
    tilesLoadedHandler = () => {
        applyMapDisplay();
        openLatestPlace();
        if (mapInstance && tilesLoadedHandler) {
            mapInstance.removeEventListener("tilesloaded", tilesLoadedHandler);
            tilesLoadedHandler = null;
        }
    };
    mapInstance.addEventListener("zoomend", zoomEndHandler);
    mapInstance.addEventListener("tilesloaded", tilesLoadedHandler);
}

function changeSize(zoom: number) {
    syncingZoom = false;
    mapInstance?.setZoom(zoom);
}

function afterChangeSize() {
    syncingZoom = true;
}

function openLatestPlace() {
    const item = getLatestPlace(dataList);
    if (!item || !mapInstance) return;
    const point = new BMapGL.Point(item.lng, item.lat);
    mapInstance.centerAndZoom(point, FOCUS_ZOOM);
    level.value = FOCUS_ZOOM;
    openInfo(item, point);
}

function goPoint(record: TableRow) {
    if (!mapInstance) return;
    const point = new BMapGL.Point(record.lng, record.lat);
    mapInstance.centerAndZoom(point, FOCUS_ZOOM);
    openInfo(record, point);
}

function tableRowProps(record: TableRow) {
    return {
        style: { cursor: "pointer" },
        onClick: () => goPoint(record),
    };
}

function handleResize() {
    isWideScreen.value = window.innerWidth >= 1500;
    refreshCharts();
    chartCity?.resize();
    chartFriend?.resize();
}

function destroyMap() {
    if (!mapInstance) return;
    if (zoomEndHandler) {
        mapInstance.removeEventListener("zoomend", zoomEndHandler);
        zoomEndHandler = null;
    }
    if (tilesLoadedHandler) {
        mapInstance.removeEventListener("tilesloaded", tilesLoadedHandler);
        tilesLoadedHandler = null;
    }
    try {
        mapInstance.clearOverlays();
        mapInstance.destroy?.();
    } catch { }
    mapInstance = null;
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
    bindMapEvents();
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
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-shrink: 0;
    padding: 12px 16px 0;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
}

.page-sub {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
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

.map-canvas {
    width: 100%;
    height: 100%;
}

.map-tools {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 999;
    width: 112px;
    padding: 8px 10px 2px;
    background: rgba(255, 255, 255, 0.88);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
