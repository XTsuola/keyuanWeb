<template>
    <div class="mapMain" @contextmenu="handleRightClick">
        <div class="worldMap">
            <div id="allmap"></div>
            <div class="tools">
                <a-slider id="test" v-model:value="level" :min="3" :max="21" @change="changeSize"
                    @afterChange="afterChangeSize" :step="0.5" />
            </div>
        </div>
        <!-- <div class="content">
            <div class="content_box top10 bottom18">
                <div class="content_box_head">游玩地点统计</div>
                <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 3 }" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'name'">
                            <a>{{ record.name }}</a>
                        </template>
<template v-else-if="column.key === 'action'">
                            <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                                <a-button size="small" type="link" @click="goPoint(record)">查看</a-button>
                            </span>
                        </template>
</template>
</a-table>
</div>
<div class="content_box bottom18">
    <div class="content_box_head">景点城市统计</div>
    <div class="content_box_chart" ref="myEcharts2"></div>
</div>
<div class="content_box bottom18">
    <div class="content_box_head">人次出行统计</div>
    <div class="content_box_chart" ref="myEcharts3"></div>
</div>
</div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { init } from 'echarts';
import type { ListType } from "./travel";
import { cityList } from "./travel";

const flag = ref(true);
const infoWindow = ref(null);
const map = ref<any>(null);
let Bmap: any = window.BMapGL
const level = ref<number>(12);
let myCharts2: any = null;
const myEcharts2 = ref();
let myCharts3: any = null;
const myEcharts3 = ref();
const colorList = ["#5470C6", "#91CC75", "#FAC858", "#EE6666", "#73C0DE", "#3BA272", "#FC8452", "#9A60B4", "#EA7CCC", "#5470C6"];
const showFlag = ref(true);
const originalColumns = [
    {
        title: "序号",
        dataIndex: "no",
        key: "no",
        width: 90
    },
    {
        title: "地点",
        dataIndex: "name",
        key: "name",
        width: 180
    },
    {
        title: "城市",
        dataIndex: "city",
        key: "city",
        width: 120
    },
    {
        title: "操作",
        key: "action",
        width: 120
    },
];
const newColumns = [
    {
        title: "地点",
        dataIndex: "name",
        key: "name",
        width: 270
    },
    {
        title: "操作",
        key: "action",
        width: 90
    },
];
const columns = ref([])
columns.value = JSON.parse(JSON.stringify(originalColumns));
const tableData = ref<any>([]);

function handleResize() {
    if (window.innerWidth < 1500) {
        columns.value = JSON.parse(JSON.stringify(newColumns));
        showFlag.value = false;
    } else {
        columns.value = JSON.parse(JSON.stringify(originalColumns))
        showFlag.value = true;
    }
    setTimeout(() => {
        drawCharts();
    }, 100)
}

function initMap() {
    map.value = new Bmap.Map("allmap");
    map.value.centerAndZoom(new Bmap.Point(118.868589, 32.347434), 12);
    map.value.enableScrollWheelZoom();
    map.value.setHeading(0);   // 设置地图旋转角度
    map.value.setTilt(50);     // 设置地图的倾斜角度
    let list = ["北京", "成都", "广州", "杭州", "合肥", "济南", "南昌", "南京", "南宁", "上海", "沈阳", "石家庄", "武汉", "西安", "新乡", "长沙", "绍兴", "郑州"];
    for (let i = 0; i < list.length; i++) {
        var dist = new Bmap.DistrictLayer({
            name: `(${list[i]})`,
            fillColor: '#5e8bff',
            strokeColor: '#0000ff',
            fillOpacity: 0.1,
            kind: 0
        });
        map.value.addDistrictLayer(dist);
    }
};

function createDownTriangle(size = 12, color = "#ff0000") {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx: any = canvas.getContext("2d");

    // 三角形顶点坐标（倒三角）
    const half = size / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);            // 左上角
    ctx.lineTo(size, 0);         // 右上角
    ctx.lineTo(half, size);      // 下方顶点
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    return canvas.toDataURL();   // 返回Base64图像
}

var myIcon1 = new Bmap.Icon(
    createDownTriangle(12, "#FF0000"),
    new Bmap.Size(12, 12),
    {
        anchor: new Bmap.Size(8, 12) // 锚点在底部中心
    }
);

var myIcon2 = new Bmap.Icon(
    createDownTriangle(12, "#000000"),
    new Bmap.Size(12, 12),
    {
        anchor: new Bmap.Size(8, 12) // 锚点在底部中心
    }
);

function setPoint() {
    let list: any = cityList
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point, { icon: (list[i].status == 1) ? myIcon1 : myIcon2 });
        map.value.addOverlay(marker);
    }
}

function changeSize(e: any) {
    flag.value = false;
    map.value.setZoom(e);
}

function afterChangeSize() {
    flag.value = true;
}

function handleRightClick(e: any) {
    e.preventDefault();
}

function getTableData() {
    const list = cityList;
    const arr = [];
    for (let i = 0; i < list.length; i++) {
        arr.push({
            no: i + 1,
            ...list[i]
        })
    }
    return arr;
}

function getList() {
    tableData.value = getTableData();
}

function drawCharts() {
    getList();
    if (myCharts2) {
        myCharts2 = null;
    }
    if (myCharts3) {
        myCharts3 = null;
    }
}

function goPoint(record: any) {
    map.value.centerAndZoom(new Bmap.Point(record.lng, record.lat), 15);
}

onMounted(() => {
    drawCharts();
    nextTick(() => {
        initMap();
        setPoint();
        map.value.addEventListener("zoomend", () => {
            if (flag.value) {
                setTimeout(() => {
                    level.value = map.value.getZoom();
                }, 200);
            }
        });
    });
    window.addEventListener('resize', handleResize);
})

</script>

<style lang="less" scoped>
.mapMain {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .worldMap {
        position: relative;
        flex: 1;
        height: 100%;

        #allmap {
            width: 100%;
            height: 100%;
        }

        .tools {
            z-index: 999;
            background: transparent;
            width: 100px;
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
    }

    .content {
        width: 30vw;
        min-width: 300px;
        padding: 10px;

        .content_box {
            height: calc(33.3% - 20px);
            border: 2px solid blue;
            border-radius: 8px;
            padding: 10px;
            overflow-y: hidden;

            .content_box_head {
                font-weight: bold;
                height: 25px;
            }

            .content_box_chart {
                height: calc(100% - 25px);
                width: 100%;
            }
        }
    }

    .top10 {
        margin-top: 10px;
    }

    .bottom18 {
        margin-bottom: 18px;
    }
}

@media screen and (max-width: 768px) {
    .content {
        display: none;
    }
}
</style>