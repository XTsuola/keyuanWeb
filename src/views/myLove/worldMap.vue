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

interface ListType {
    lng: number
    lat: number
    info: string[]
    time: string[]
    friend: string[]
}

const infoWindow = ref<any>(null)
const map = ref<any>(null)
let Bmap = window.BMap

function initMap() {
    map.value = new Bmap.Map("allmap")
    map.value.centerAndZoom(new Bmap.Point(118.701396, 32.165192), 13)
    map.value.enableScrollWheelZoom()
};

function setPoint() {
    let list: ListType[] = [{
        // 星悦城
        lng: 118.701396,
        lat: 32.165192,
        info: ["我们住的地方——星悦城"],
        time: [""],
        friend: ["（月色、江南）"]
    },{
        // 柯郑村
        lng: 118.889838,
        lat: 32.376873,
        info: ["我们的老家——柯郑村"],
        time: [""],
        friend: ["（月色、江南、爸爸、妈妈、奶奶）"]
    }, {
        // 龙海骏景
        lng: 118.868589,
        lat: 32.347434,
        info: ["我们的家——龙海骏景"],
        time: [""],
        friend: ["（月色、江南）"]
    }, {
        // 玄武湖公园
        lng: 118.805415,
        lat: 32.07912,
        info: ["南京玄武湖划船", "南京玄武湖划船2", "南京玄武湖划船3"],
        time: ["2022年6月3日", "2022年11月27日", "2022年7月22日"],
        friend: ["（月色、江南）", "（月色、江南、鹿鸣、黄果树）", "（月色、江南、江南妈妈、江南弟弟）"]
    }, {
        // 紫金山
        lng: 118.859446,
        lat: 32.067579,
        info: ["南京紫金山看日出"],
        time: ["2022年9月10日"],
        friend: ["（月色、江南、鹿鸣）"]
    }, {
        // 巴布洛
        lng: 118.615913,
        lat: 32.495992,
        info: ["竹镇巴布洛看花海"],
        time: ["2022年7月17日"],
        friend: ["（月色、江南、鹿鸣、恒恒）"]
    }, {
        // 金正农庄
        lng: 118.867358,
        lat: 32.378198,
        info: ["六合区金正农庄钓鱼"],
        time: ["2022年11月19日"],
        friend: ["（月色、江南、爸爸）"]
    }, {
        // TanGo探Go
        lng: 118.799818,
        lat: 32.046897,
        info: ["TanGo探Go剧本杀-布达佩斯大饭店2", "TanGo探Go剧本杀-月隐于时针之隙", "TanGo探Go剧本杀-忘川旅馆"],
        time: ["2022年11月26日", "2023年6月23日", "2023年8月26日"],
        friend: ["（月色、江南、鹿鸣、黄果树、嘉忻、海棠）", "（月色、江南、嘉忻、宁飞）", "（月色、江南、嘉忻、鹿鸣）"]
    }, {
        // 成南九肆
        lng: 118.788146,
        lat: 32.045605,
        info: ["城南九肆品茶"],
        time: ["2022年11月27日"],
        friend: ["（月色、江南、鹿鸣、黄果树、嘉忻、海棠）"]
    }, {
        // 秦淮河坐船
        lng: 118.795931,
        lat: 32.026238,
        info: ["秦淮河坐船"],
        time: ["2023年2月26日"],
        friend: ["（月色、江南、陆月、表妹夫）"]
    }, {
        // 酒吧狂欢
        lng: 118.791973,
        lat: 32.028703,
        info: ["炬猩NEW_LIVE酒吧狂欢"],
        time: ["2023年6月23日"],
        friend: ["（月色、江南、嘉忻、宁飞）"]
    }, {
        // 韩乐坊
        lng: 122.159782,
        lat: 37.434341,
        info: ["韩乐坊打卡"],
        time: ["2023年6月29日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 九龙湾
        lng: 122.180142,
        lat: 37.436425,
        info: ["九龙湾打卡"],
        time: ["2023年6月29日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 海上公园
        lng: 122.168338,
        lat: 37.443259,
        info: ["海上公园戏水"],
        time: ["2023年6月29日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 威海猫头山
        lng: 122.154538,
        lat: 37.56182,
        info: ["远眺猫头山"],
        time: ["2023年6月30日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 威海国际浴场
        lng: 122.050447,
        lat: 37.53505,
        info: ["威海国际浴场"],
        time: ["2023年6月30日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 火炬八街
        lng: 122.037565,
        lat: 37.532049,
        info: ["火炬八街打卡"],
        time: ["2023年6月30日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 那香海
        lng: 122.419395,
        lat: 37.415369,
        info: ["那香海玩沙戏水看日落"],
        time: ["2023年6月30日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 伦敦蓝桥
        lng: 122.420603,
        lat: 37.404984,
        info: ["那伦敦蓝桥打卡"],
        time: ["2023年6月30日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 海源公园
        lng: 122.158085,
        lat: 37.526496,
        info: ["海源公园打卡"],
        time: ["2023年7月1日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 淄博钟书阁
        lng: 117.995638,
        lat: 36.844852,
        info: ["钟书阁打卡"],
        time: ["2023年7月1日"],
        friend: ["（月色、江南、鹿鸣、湛雨）"]
    }, {
        // 淄博钟书阁
        lng: 118.790855,
        lat: 32.045131,
        info: ["异次元密室-林宅"],
        time: ["2023年78月26日"],
        friend: ["（月色、江南、鹿鸣、嘉忻）"]
    }]
    /* map.value.addEventListener('click', function (e: any) {
        console.log(e)
    }) */
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point);
        marker.addEventListener("click", function () {
            let aList: any = []
            for (let k = 0; k < list[i].time.length; k++) {
                aList.push(list[i].time[k])
                aList.push(list[i].info[k])
                aList.push(list[i].friend[k])
            }
            const str = aList.splice(1, aList.length).join("<br>")
            infoWindow.value = new Bmap.InfoWindow(str, {
                width: 240,
                title: list[i].time[0]
            })
            map.value.openInfoWindow(infoWindow.value, new Bmap.Point(list[i].lng, list[i].lat))
        })
        map.value.addOverlay(marker)
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
        initMap()
        setPoint()
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