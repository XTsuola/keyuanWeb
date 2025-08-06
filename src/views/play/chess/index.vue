<template>
    <div class="chess">
        <div class="map">
            <div class="map_one" v-for="(item, index) in mapData" :key="index">
                <div :class="getNowClass(index)" v-for="(item2, index2) in mapData[index]" :key="index * 10 + index2">
                    <div v-if="panduan1(index, index2)" class="diagonal1">
                    </div>
                    <div v-if="panduan2(index, index2)" class="diagonal2">
                    </div>
                    <div v-if="item2 > 10" class="qizi qizi2" :class="(index * 10 + index2) == nowIndex ? 'active' : ''"
                        @click="getQizi(index, index2)">{{ translate[item2] }}
                    </div>
                    <div v-else-if="item2 > 0" class="qizi qizi1"
                        :class="(index * 10 + index2) == nowIndex ? 'active' : ''" @click="getQizi(index, index2)">{{
                            translate[item2] }}</div>
                    <div v-else :class="(nowIndex != null && canMap[index][index2] == 1) ? 'blank' : ''"
                        @click="getQizi(index, index2, true)">
                    </div>
                    <div v-if="(nowIndex != null && canMap[index][index2] == 1) && item2 > 0" class="blank bgRed"></div>
                </div>
            </div>
            <div class="chuhe">楚河</div>
            <div class="hanjie">汉界</div>
            <div class="player">
                当前：
                <span v-if="status == 1" :class="nowPlay == 1 ? 'red' : 'black'">{{ nowPlay == 1 ? "红旗" : "黑旗" }}</span>
                <span v-else>对局结束</span>
                <div v-if="status == 2" :class="nowPlay == 1 ? 'red' : 'black'">{{ nowPlay == 1 ? "黑棋获胜" : "红棋获胜" }}
                </div>
            </div>
        </div>
        <div class="reset">
            <a-button @click="reset">重新开始</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { initArray2D, luoji } from "./fun";
import { getChessMap, resetChessMap, updateChessMap } from "@/api/chess";
import jsonData from "./data.json";

const mapData = ref<any>([]);
mapData.value = jsonData.map;
const status = ref(0);
status.value = jsonData.status;
const translate: any = {
    "1": "兵",
    "2": "炮",
    "3": "車",
    "4": "馬",
    "5": "相",
    "6": "仕",
    "7": "帥",
    "11": "卒",
    "12": "炮",
    "13": "車",
    "14": "馬",
    "15": "象",
    "16": "士",
    "17": "将"
}
const nowIndex = ref<number | null>(null);
const nowQizi = ref<number | null>(null);
const canMap = ref<any>([]);
canMap.value = initArray2D();
const nowPlay = ref(1);

function getNowClass(index: number) {
    if (index == 0 || index == 5) {
        return "map_two2";
    } else {
        if (index == mapData.value.length - 1 || index == 4) {
            return "map_two3";
        } else {
            return "map_two";
        }
    }
}

async function getQizi(index1: number, index2: number, isBlank?: boolean) {
    if (status.value != 1) {
        alert("对局已结束，" + (nowPlay.value == 1 ? "黑棋" : "红棋") + "获胜！");
        return false;
    }
    let qizi = mapData.value[index1][index2];
    if (nowPlay.value == 1) {
        if (qizi < 10 && !isBlank) {
            canMap.value = luoji(index1, index2, mapData.value);
            nowIndex.value = index1 * 10 + index2;
            nowQizi.value = mapData.value[index1][index2];
        } else {
            if (canMap.value[index1][index2] == 1) {
                if (nowIndex.value != null) {
                    const data = {
                        nowPlay: 1,
                        nowIndex: nowIndex.value,
                        index1: index1,
                        index2: index2,
                        qizi: nowQizi.value
                    }
                    uopdateData(data);
                }
            }
        }
    } else {
        if (qizi > 10 && !isBlank) {
            canMap.value = luoji(index1, index2, mapData.value);
            nowIndex.value = index1 * 10 + index2;
            nowQizi.value = mapData.value[index1][index2];
        } else {
            if (canMap.value[index1][index2] == 1) {
                if (nowIndex.value != null) {
                    if (nowIndex.value != null) {
                        const data = {
                            nowPlay: 2,
                            nowIndex: nowIndex.value,
                            index1: index1,
                            index2: index2,
                            qizi: nowQizi.value
                        };
                        uopdateData(data);
                    }
                }
            }
        }
    }
}

function panduan1(index1: number, index2: number) {
    if ((index1 == 0 && index2 == 3) || (index1 == 1 && index2 == 4) || (index1 == mapData.value.length - 3 && index2 == 3) || (index1 == mapData.value.length - 2 && index2 == 4)) {
        return true;
    }
    return false;
}

function panduan2(index1: number, index2: number) {
    if ((index1 == 0 && index2 == 4) || (index1 == 1 && index2 == 3) || (index1 == mapData.value.length - 3 && index2 == 4) || (index1 == mapData.value.length - 2 && index2 == 3)) {
        return true;
    }
    return false;
}

async function getData() {
    const res = await getChessMap();
    if (res.data.code == 200) {
        mapData.value = res.data.rows.map;
        nowPlay.value = res.data.rows.nowPlay;
        status.value = res.data.rows.status;
        if (res.data.rows.status == 2) {
            alert("游戏已结束，" + (nowPlay.value == 1 ? "黑棋" : "红棋") + "获胜！");
        }
    }
}

async function uopdateData(data: any) {
    const res = await updateChessMap(data);
    if (res.data.code == 200) {
        nowIndex.value = null;
        getData();
    }
}

async function reset() {
    const res = await resetChessMap();
    if (res.data.code == 200) {
        nowIndex.value = nowQizi.value = null;
        nowPlay.value = 1;
        status.value = 1;
    }
    getData();
}

onMounted(() => {
    getData();
})

</script>
<style lang="less" scoped>
.chess {
    padding: 20px;

    .map {
        position: relative;
        margin: 50px auto;
        width: 550px;
        height: 610px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        border: 1px solid #000;
        border-radius: 8px;

        .map_one {
            width: 540px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;

            .map_two,
            .map_two2,
            .map_two3 {
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .map_two::before,
            .map_two2::before,
            .map_two3::before {
                position: absolute;
                content: "";
                width: 60px;
                height: 1px;
                background: #000;
            }

            .map_two:first-child::before,
            .map_two2:first-child::before,
            .map_two3:first-child::before {
                position: absolute;
                content: "";
                width: 30px;
                height: 1px;
                background: #000;
                transform: translateX(15px);
            }


            .map_two:last-child::before,
            .map_two2:last-child::before,
            .map_two3:last-child::before {
                position: absolute;
                content: "";
                width: 30px;
                height: 1px;
                background: #000;
                transform: translateX(-15px);
            }

            .map_two::after {
                position: absolute;
                content: "";
                width: 1px;
                height: 60px;
                background: #000;
            }

            .map_two2::after {
                position: absolute;
                content: "";
                width: 1px;
                height: 30px;
                background: #000;
                transform: translateY(15px);
            }

            .map_two3::after {
                position: absolute;
                content: "";
                width: 1px;
                height: 30px;
                background: #000;
                transform: translateY(-15px);
            }
        }

        .diagonal1 {
            position: absolute;
            width: 84.4px;
            height: 84.4px;
            background-color: transparent;
            border-left: 1px dashed #000;
            transform: translate(42px, 42px) rotate(-45deg);
            transform-origin: 0 0;
        }

        .diagonal2 {
            position: absolute;
            width: 84.4px;
            height: 84.4px;
            background-color: transparent;
            border-left: 1px dashed #000;
            transform: translate(102px, 42px) rotate(45deg);
            transform-origin: 0 0;
        }

        .qizi {
            z-index: 1999;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background-color: #fff;
        }

        .qizi1 {
            border: 1px solid red;
            color: red;

        }

        .qizi2 {
            border: 1px solid #000;
            color: #000;
        }

        .blank {
            position: relative;
            z-index: 8888;
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: #000;
            opacity: .3;
            cursor: pointer;
        }

        .bgRed {
            background-color: red;
        }

        .active {
            border: 2px solid rgb(0, 38, 255);
            background-color: yellow;
        }

        .chuhe {
            position: absolute;
            font-size: 18px;
            left: 100px;
            transform: translateY(-5px);
        }

        .hanjie {
            position: absolute;
            font-size: 18px;
            right: 100px;
            transform: translateY(5px);
        }

        .player {
            position: absolute;
            right: -150px;
            color: blue;
        }

        .red {
            color: red;
        }

        .black {
            color: black;
        }
    }

    .reset {
        display: flex;
        justify-content: center;
    }

    .pointer {
        cursor: pointer;
    }
}
</style>