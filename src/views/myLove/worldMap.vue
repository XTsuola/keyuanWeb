<template>
    <div class="worldMap">
        <div id="allmap"></div>
        <div class="tools">
            <a-button style="margin-right: 10px;" @click="add()">放大</a-button>
            <a-button @click="reduce()">缩小</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import { travelList } from "./travel";
import type { ListType } from "./travel";

const infoWindow = ref<any>(null);
const map = ref<any>(null);
let Bmap = window.BMapGL;

function initMap() {
    map.value = new Bmap.Map("allmap");
    map.value.centerAndZoom(new Bmap.Point(118.701396, 32.165192), 13);
    map.value.enableScrollWheelZoom();
    var dist = new Bmap.DistrictLayer({
        name: '(南京),(威海)',
        fillColor: '#5e8bff',
        strokeColor: '#0000ff',
        fillOpacity: 0.1,
        kind: 1
    });
    map.value.addDistrictLayer(dist);
};

function setPoint() {
    let list: ListType[] = travelList;
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point);
        marker.addEventListener("click", function () {
            let aList: any = [];
            for (let k = 0; k < list[i].time.length; k++) {
                aList.push(list[i].time[k], list[i].info[k], list[i].friend[k]);
            }
            const str = aList.splice(1, aList.length).join("<br>");
            infoWindow.value = new Bmap.InfoWindow(str, {
                width: 240,
                title: list[i].time[0]
            });
            map.value.openInfoWindow(infoWindow.value, new Bmap.Point(list[i].lng, list[i].lat));
        })
        map.value.addOverlay(marker);
    }
}

function add() {
    map.value.zoomTo(map.value.getZoom() + 1);
}

function reduce() {
    map.value.zoomTo(map.value.getZoom() - 1);
}

onMounted(() => {
    nextTick(() => {
        initMap();
        setPoint();
    })
})
</script>

<style lang="less" scoped>
.worldMap {
    position: relative;
    width: 100%;
    height: 100%;

    #allmap {
        width: 100%;
        height: 100%;
    }

    .tools {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
}
</style>