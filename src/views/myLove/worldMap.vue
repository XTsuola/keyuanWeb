<template>
    <div class="worldMap">
        <div id="allmap"></div>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, nextTick } from "vue"

const map = ref<any>(null)

let Bmap = window.BMap
const infoWindow = ref<any>(null)

function initMap() {
    map.value = new Bmap.Map("allmap");
    map.value.centerAndZoom(new Bmap.Point(118.701396, 32.165192), 14);
    map.value.enableScrollWheelZoom()
};

function setPoint() {
    let list = [{
        // 星悦城
        lng: 118.701396,
        lat: 32.165192,
        info: "我们住的地方——星悦城"
    }, {
        // 玄武湖公园
        lng: 118.805415,
        lat: 32.07912,
        info: "南京玄武湖荡舟"
    }, {
        // 紫金山
        lng: 118.859446,
        lat: 32.067579,
        info: "南京紫金山看日出"
    }, {
        // 巴布罗
        lng: 118.615913,
        lat: 32.495992,
        info: "竹镇巴布洛看花海"
    }, {
        // 金正农庄
        lng: 118.867358,
        lat: 32.378198,
        info: "六合区金正农庄钓鱼"
    }]
    map.value.addEventListener('click', function (e: any) {
        console.log(e, "eee")
    })
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point);
        marker.addEventListener('click', function () {
            infoWindow.value = new Bmap.InfoWindow("", {
                width: 200,
                height: 50,
                title: list[i].info
            })
            map.value.openInfoWindow(infoWindow.value, new Bmap.Point(list[i].lng, list[i].lat))
        })
        map.value.addOverlay(marker);
    }
}

onMounted(() => {
    nextTick(() => {
        console.log(111)
        initMap();
        setPoint()
    });
});
</script>

<style lang="less" scoped>
.worldMap {
    width: 100%;
    height: 100%;

    #allmap {
        width: 100%;
        height: 100%;
    }
}
</style>