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

import { onMounted, ref, nextTick } from "vue"
import { Button as aButton } from "ant-design-vue"

interface ListType {
    lng: number
    lat: number
    info: string
    time: string
}

const map = ref<any>(null)
let Bmap = window.BMap
const infoWindow = ref<any>(null)

function initMap() {
    map.value = new Bmap.Map("allmap");
    map.value.centerAndZoom(new Bmap.Point(118.701396, 32.165192), 13);
    map.value.enableScrollWheelZoom()
};

function setPoint() {
    let list: ListType[] = [{
        // 星悦城
        lng: 118.701396,
        lat: 32.165192,
        info: "我们住的地方——星悦城",
        time: ""
    }, {
        // 玄武湖公园
        lng: 118.805415,
        lat: 32.07912,
        info: "南京玄武湖划船",
        time: "2022年6月3日"
    }, {
        // 紫金山
        lng: 118.859446,
        lat: 32.067579,
        info: "南京紫金山看日出",
        time: "2022年9月10日"
    }, {
        // 巴布罗
        lng: 118.615913,
        lat: 32.495992,
        info: "竹镇巴布洛看花海",
        time: "2020年7月17日"
    }, {
        // 金正农庄
        lng: 118.867358,
        lat: 32.378198,
        info: "六合区金正农庄钓鱼",
        time: "2022年11月19日"
    }, {
        // TanGo探Go
        lng: 118.799818,
        lat: 32.046897,
        info: "TanGo探Go沉浸式剧本杀",
        time: "2020年11月26日"
    }, {
        // 成南九肆
        lng: 118.788146,
        lat: 32.045605,
        info: "城南九肆品茶",
        time: "2020年11月27日"
    }]
    map.value.addEventListener('click', function (e: any) {
        console.log(e, "eee")
    })
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point);
        marker.addEventListener('click', function () {
            infoWindow.value = new Bmap.InfoWindow(list[i].info, {
                width: 200,
                height: 50,
                title: list[i].time
            })
            map.value.openInfoWindow(infoWindow.value, new Bmap.Point(list[i].lng, list[i].lat))
        })
        map.value.addOverlay(marker);
    }
}

function add() {
    map.value.zoomTo(map.value.getZoom() + 1)
}

function reduce() {
    map.value.zoomTo(map.value.getZoom() - 1)
}

onMounted(() => {
    nextTick(() => {
        initMap();
        setPoint()
    });
});
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