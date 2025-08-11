<template>
    <div class="main" v-if="flag">
        <div class="title">
            第{{ level + 1 }}关：
            <a-button size="small" @click="reset">重置关卡</a-button>
        </div>
        <div class="box">
            <div class="list" v-for="(list, y) in mapList" :key="y">
                <div class="boxItem" v-for="(item, x) in list" :key="item + x">
                    <div v-if="item === 0">
                        <div></div>
                    </div>
                    <div v-if="item === 5">
                        <div class="obstacle"></div>
                    </div>
                    <div v-if="item === 9" style="position: absolute;">
                        <div style="font-size: 8px;">❤️</div>
                    </div>
                    <div v-if="item === 2">
                        <div style="font-size: 36px;">📦</div>
                    </div>
                    <div v-if="item === 1">
                        <Tanke></Tanke>
                    </div>
                    <div v-if="x === people.x && y === people.y" class="me">
                        <div></div>
                        <div class="me_tou"></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            <div>
                <a-button style="transform: translateX(100%);" @click="moveIt('ArrowUp')">上</a-button>
            </div>
            <div>
                <a-button @click="moveIt('ArrowLeft')">左</a-button>
                <a-button @click="moveIt('ArrowDown')">下</a-button>
                <a-button @click="moveIt('ArrowRight')">右</a-button>
                <a-button style="margin-left: 80px" @click="moveIt(' ')">发射</a-button>
            </div>
        </div>
    </div>
    <div v-if="!flag">恭喜通关！！！</div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from "vue";
import Tanke from "./tanke.vue";
import jsonData from "./data.json";

interface PositionType {
    x: number
    y: number
}

const flag = ref<boolean>(true);
const level = ref<number>(0);
const mapList = ref<number[][]>([]);
mapList.value = JSON.parse(JSON.stringify(jsonData[level.value].data));
const tankeDeg = ref<string>("-90deg");
const people = reactive<PositionType>({
    x: jsonData[level.value].peopleX,
    y: jsonData[level.value].peopleY
});
const trueList = [1, 2];

function xuanran(x: number, y: number, direction: string) {
    if (direction === "ArrowUp") {
        people.y--;
        mapList.value[y][x] = 0;
    } else if (direction === "ArrowLeft") {
        people.x--;
        mapList.value[y][x] = 0;
    } else if (direction === "ArrowDown") {
        people.y++;
        mapList.value[y][x] = 0;
    } else if (direction === "ArrowRight") {
        people.x++;
        mapList.value[y][x] = 0;
    }
}

function moveIt(direction: string) {
    if (direction === "ArrowUp") {
        if (tankeDeg.value === "-90deg" && people.y > 0 && trueList.findIndex(item => item == mapList.value[people.y - 1][people.x]) == -1) {
            xuanran(people.x, people.y - 1, direction);
        } else {
            tankeDeg.value = "-90deg";
        }
    } else if (direction === "ArrowLeft") {
        if (tankeDeg.value === "180deg" && people.x > 0 && trueList.findIndex(item => item == mapList.value[people.y][people.x - 1]) == -1) {
            xuanran(people.x - 1, people.y, direction);
        } else {
            tankeDeg.value = "180deg";
        }
    } else if (direction === "ArrowDown") {
        if (tankeDeg.value === "90deg" && people.y < 8 && trueList.findIndex(item => item == mapList.value[people.y + 1][people.x]) == -1) {
            xuanran(people.x, people.y + 1, direction);
        } else {
            tankeDeg.value = "90deg";
        }
    } else if (direction === "ArrowRight") {
        if (tankeDeg.value === "0deg" && people.x < 8 && trueList.findIndex(item => item == mapList.value[people.y][people.x + 1]) == -1) {
            xuanran(people.x + 1, people.y, direction);
        } else {
            tankeDeg.value = "0deg";
        }
    } else if (direction === " ") {
        sendZidan(people.x, people.y, tankeDeg.value);
    }
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.key === "ArrowUp") {
        if (tankeDeg.value === "-90deg" && people.y > 0 && trueList.findIndex(item => item == mapList.value[people.y - 1][people.x]) == -1) {
            xuanran(people.x, people.y - 1, e.key);
        } else {
            tankeDeg.value = "-90deg";
        }
    } else if (e && e.key === "ArrowLeft") {
        if (tankeDeg.value === "180deg" && people.x > 0 && trueList.findIndex(item => item == mapList.value[people.y][people.x - 1]) == -1) {
            xuanran(people.x - 1, people.y, e.key);
        } else {
            tankeDeg.value = "180deg";
        }
    } else if (e && e.key === "ArrowDown") {
        if (tankeDeg.value === "90deg" && people.y < 8 && trueList.findIndex(item => item == mapList.value[people.y + 1][people.x]) == -1) {
            xuanran(people.x, people.y + 1, e.key);
        } else {
            tankeDeg.value = "90deg";
        }
    } else if (e && e.key === "ArrowRight") {
        if (tankeDeg.value === "0deg" && people.x < 8 && trueList.findIndex(item => item == mapList.value[people.y][people.x + 1]) == -1) {
            xuanran(people.x + 1, people.y, e.key);
        } else {
            tankeDeg.value = "0deg";
        }
    } else if (e && e.key === " ") {
        sendZidan(people.x, people.y, tankeDeg.value);
    }
}

function sendZidan(x: number, y: number, deg: string) {
    if (deg === "0deg") {
        let timer: any = null;
        if (x < 8) {
            x++;
            if (mapList.value[y][x] == 2) {
                return false;
            }
            mapList.value[y][x] = 9;
            timer = setInterval(() => {
                if (x < 8) {
                    if (mapList.value[y][x + 1] == 2 && timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                        return false;
                    }
                    mapList.value[y][x] = 0;
                    mapList.value[y][x + 1] = 9;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                    }
                }
                x++;
            }, 50);
        }
    } else if (deg === "90deg") {
        let timer: any = null;
        if (y < 8) {
            y++;
            if (mapList.value[y][x] == 2) {
                return false;
            }
            mapList.value[y][x] = 9;
            timer = setInterval(() => {
                if (y < 8) {
                    if (mapList.value[y + 1][x] == 2 && timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                        return false;
                    }
                    mapList.value[y][x] = 0;
                    mapList.value[y + 1][x] = 9;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                    }
                }
                y++;
            }, 50);
        }
    } else if (deg === "-90deg") {
        let timer: any = null;
        if (y > 0) {
            y--;
            if (mapList.value[y][x] == 2) {
                return false;
            }
            mapList.value[y][x] = 9;
            timer = setInterval(() => {
                if (y > 0) {
                    if (mapList.value[y - 1][x] == 2 && timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                        return false;
                    }
                    mapList.value[y][x] = 0;
                    mapList.value[y - 1][x] = 9;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                    }
                }
                y--;
            }, 50);
        }
    } else if (deg === "180deg") {
        let timer: any = null
        if (x > 0) {
            x--;
            if (mapList.value[y][x] == 2) {
                return false;
            }
            mapList.value[y][x] = 9;
            timer = setInterval(() => {
                if (x > 0) {
                    if (mapList.value[y][x - 1] == 2 && timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                        return false;
                    }
                    mapList.value[y][x] = 0;
                    mapList.value[y][x - 1] = 9;
                } else {
                    if (timer) {
                        clearInterval(timer);
                        mapList.value[y][x] = 0;
                    }
                }
                x--;
            }, 50);
        }
    }
}

function reset() {
    mapList.value = JSON.parse(JSON.stringify(jsonData[level.value].data));
    people.x = jsonData[level.value].peopleX;
    people.y = jsonData[level.value].peopleY;
}

</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
    .box {
        width: 81vw !important;
        height: 81vw !important;

        .list {
            width: 81vw !important;
            height: 9vw !important;

            .boxItem {
                width: 9vw !important;
                height: 9vw !important;

                .people {
                    width: 8vw !important;
                    height: 8vw !important;
                }

                .obstacle {
                    width: 8vw !important;
                    height: 8vw !important;
                }
            }
        }
    }
}

.main {
    padding: 0 10px 10px;

    .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .action {
        margin-top: 15px;
        margin-left: 15px;
    }
}

.box {
    width: 630px;
    height: 630px;
    border: 1px solid red;

    .list {
        width: 630px;
        height: 70px;
        display: flex;
        justify-content: center;

        .boxItem {
            position: relative;
            width: 70px;
            height: 70px;
            border: 1px solid rgb(235, 90, 90);
            display: flex;
            justify-content: center;
            align-items: center;

            .me {
                position: absolute;
                width: 90%;
                height: 90%;
                background: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                row-gap: 2%;
                transform: rotate(v-bind(tankeDeg));

                div {
                    width: 20%;
                    height: 20%;
                    background: #000;
                    transform: translateX(-50%);
                }

                .me_tou {
                    transform: translateX(50%);
                }
            }

            .obstacle {
                background: orange;
                width: 60px;
                height: 60px;
                background: url("@/assets/images/game/box/qiang.png");
            }
        }
    }
}
</style>