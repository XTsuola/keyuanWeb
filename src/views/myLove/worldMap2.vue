<template>
    <div class="world-map-page" @contextmenu.prevent>
        <header class="page-header">
            <h2 class="page-title">实验室分布地图</h2>
        </header>
        <div class="page-body">
            <div class="map-panel">
                <div id="allmap"></div>
                <div class="map-tools">
                    <a-slider
                        v-model:value="level"
                        :min="3"
                        :max="21"
                        :step="0.5"
                        @change="changeSize"
                        @afterChange="afterChangeSize"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { cityList } from "./travel";

type BMapGLInstance = {
    Map: new (container: string | HTMLElement) => BMapMap;
    Point: new (lng: number, lat: number) => unknown;
    Marker: new (point: unknown, opts?: { icon?: unknown }) => BMapOverlay;
    Icon: new (url: string, size: unknown, opts?: { anchor?: unknown }) => unknown;
    Size: new (width: number, height: number) => unknown;
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
    setZoom: (zoom: number) => void;
    getZoom: () => number;
    addEventListener: (event: string, handler: () => void) => void;
    removeEventListener: (event: string, handler: () => void) => void;
    clearOverlays: () => void;
    destroy?: () => void;
};

type BMapOverlay = object;

const MAP_CENTER = { lng: 118.868589, lat: 32.347434 };
const DEFAULT_ZOOM = 12;
const DISTRICT_CITIES = [
    "北京", "成都", "广州", "杭州", "合肥", "济南", "南昌", "南京", "南宁",
    "上海", "沈阳", "石家庄", "武汉", "西安", "新乡", "长沙", "绍兴", "郑州",
];
const DISTRICT_KIND = 0;

const BMapGL = window.BMapGL as BMapGLInstance;

const flag = ref(true);
const level = ref<number>(DEFAULT_ZOOM);
const map = ref<BMapMap | null>(null);

let activeIcon: unknown = null;
let inactiveIcon: unknown = null;
let zoomEndHandler: (() => void) | null = null;

function createDownTriangle(size = 12, color = "#ff0000") {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const half = size / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.lineTo(half, size);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    return canvas.toDataURL();
}

function createMarkerIcons() {
    activeIcon = new BMapGL.Icon(
        createDownTriangle(12, "#FF0000"),
        new BMapGL.Size(12, 12),
        { anchor: new BMapGL.Size(8, 12) }
    );
    inactiveIcon = new BMapGL.Icon(
        createDownTriangle(12, "#000000"),
        new BMapGL.Size(12, 12),
        { anchor: new BMapGL.Size(8, 12) }
    );
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

function setPoint() {
    if (!map.value || !activeIcon || !inactiveIcon) return;

    for (const item of cityList) {
        const point = new BMapGL.Point(item.lng, item.lat);
        const icon = item.status === 1 ? activeIcon : inactiveIcon;
        const marker = new BMapGL.Marker(point, { icon });
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

function destroyMap() {
    if (!map.value) return;

    if (zoomEndHandler) {
        map.value.removeEventListener("zoomend", zoomEndHandler);
        zoomEndHandler = null;
    }

    try {
        map.value.clearOverlays();
        map.value.destroy?.();
    } catch {
        // BMapGL cleanup may throw if the container is already gone.
    }
    map.value = null;
}

onMounted(() => {
    createMarkerIcons();

    nextTick(() => {
        initMap();
        setPoint();
        bindZoomSync();
    });
});

onUnmounted(() => {
    destroyMap();
    activeIcon = null;
    inactiveIcon = null;
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
    flex: 1;
    min-height: 0;
    padding: 12px 16px 16px;
}

.map-panel {
    position: relative;
    width: 100%;
    height: 100%;
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
</style>
